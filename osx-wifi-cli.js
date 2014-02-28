#!/usr/bin/env node

'use strict';

var Q = require('q');
var cli = require('commander');
var exec = require('child_process').exec;
var rek = require('rekuire');
var commands = rek('commands');
var version = rek('package.json').version;

cli
  .version(version)
  .usage('[on | off | restart | scan | <network> <password>]')
  .option('on', 'turn wifi on')
  .option('off', 'turn wifi off')
  .option('restart', 'restart wifi')
  .option('scan', 'show available networks')
  .parse(process.argv);

var utils = commands.osx; // If implementing other OSs, this is the place to check which we're on.

var args = process.argv.slice(2);

if      (args[0] == 'on')   execute(utils.on); //cli.on is a function
else if (cli.off)           execute(utils.off);
else if (cli.restart)       execute(utils.off).then(execute.bind(this,utils.on));
else if (cli.scan)          execute(utils.scan).then(utils.parseScan).then(printNetworks);
else if (args.length == 2)  execute(utils.connect.replace('NETWORK_TOKEN',args[0]).replace('PASSWORD_TOKEN',args[1]))
else if (args.length == 0)  execute(utils.currentNetwork).then(utils.extractCurrentNetwork).then(help);
else                        console.log('input error')

////////////////////////////////////////////////

function help(currentNetwork) {
  if (currentNetwork.SSID) {
    console.log('you are connected to ' + currentNetwork.SSID);
  } else {
    console.log('you are not connected anywhere');
  }
  //TODO: add more help text
}

function printNetworks(networksObj) {
  networksObj.sort(function(a,b){return a.SSID > b.SSID});
  var maxLengths = networksObj.reduce(function(lengths, network) {
    Object.keys(network).forEach(function(key) {
      lengths[key] = Math.max(lengths[key] || 0, network[key].toString().length)
    });
    return lengths;
  }, {});
  //TODO: add numeric IDs and colors
  var output = networksObj.map(function(network) { return Object.keys(network).map(function(key) {return pad(network[key].toString(), maxLengths[key]+2, ' ') }).join(' ')}).join('\n');
  console.log(output);
}

function execute(cmd) {
  //console.log('executing command:', cmd);
  var deferred = Q.defer();
  exec(cmd, function(err, strout, strerr) {
    if (err) deferred.reject(new Error(err));
    else if (strerr) deferred.reject(new Error(strerr));
    else deferred.resolve(strout);
  });
  return deferred.promise;
};

////////////////////////////////////////////////////////////////////////////////

function pad(path, len, char) {
  return (path.length >= len) ? path : pad(path + char[0], len, char);
}

