#!/usr/bin/env node

'use strict';

return console.log('WIP');

var Q;
var clc;
var cli = require('commander');
var rek = require('rekuire');
// var utils = rek('utils');
var version = rek('package.json').version;

cli
  .version(version)
  .usage('[on | off | scan | <network> <password>]')
  .option('on', 'include empty files')
  .option('off', 'print only duplicates list')
  .option('scan', 'print only progression and statistics')
  .parse(process.argv);

var utils = commands.osx; //get os and require its utils or error if does not exist

var args = process.argv.slice(2);

if      (cli.on)            execute(utils.on);
else if (cli.off)           execute(utils.off);
else if (cli.scan)          execute(utils.scan).then(utils.parseScan).then(printNetworks);
else if (args.length == 2)  execute(utils.connect.replace('NETWORK_TOKEN',args[0]).replace('PASSWORD_TOKEN',args[1]))
else if (args.length == 0)  execute(utils.currentNetwork).then(utils.extractCurrentNetwork).then(help);
else                        console.log('input error')

////////////////////////////////////////////////

function help(currentNetwork) {
  if (currentNetwork) {
    console.log('you are connected to ' + currentNetwork);
  } else {
    console.log('you are not connected anywhere');
  }
}

function printNetworks(networksObj) {

}

function execute(command) {
  console.log(command);
  //return promise
}
/////////////////////////////////////////////

var commands = {
  osx: {
    on: 'networksetup -setairportpower en0 on',
    off: 'networksetup -setairportpower en0 off',
    scan: '/System/Library/PrivateFrameworks/Apple80211.framework/Versions/A/Resources/airport scan',
    connect: 'networksetup -setairportnetwork en0 "NETWORK_TOKEN" "PASSWORD_TOKEN"',
    parseScan: function(output) {
      //todo
      return {};
    },
    currentNetwork: '/System/Library/PrivateFrameworks/Apple80211.framework/Versions/A/Resources/airport -I',
    extractCurrentNetwork: function(outout) {
      //todo
      return '';
    }
  }
}
