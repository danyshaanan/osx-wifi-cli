#!/usr/bin/env node

'use strict'

var Q = require('q')
var cli = require('commander')
var exec = require('child_process').exec
var version = require('./package.json').version

cli
  .version(version)
  .usage('[on | off | restart | scan | <network> <password>]')
  .option('on', 'turn wifi on')
  .option('off', 'turn wifi off')
  .option('restart', 'restart wifi')
  .option('scan', 'show available networks')
  .option('--device <device>', 'set device (default is en0)') // see ugly todo below.
  .parse(process.argv)

var commands = {
  osx: {
    on: 'networksetup -setairportpower en0 on',
    off: 'networksetup -setairportpower en0 off',
    scan: '/System/Library/PrivateFrameworks/Apple80211.framework/Versions/A/Resources/airport scan',
    connect: 'networksetup -setairportnetwork en0 "NETWORK_TOKEN" "PASSWORD_TOKEN"',
    currentNetwork: '/System/Library/PrivateFrameworks/Apple80211.framework/Versions/A/Resources/airport -I | grep -e "\\bSSID:" | sed -e "s/^.*SSID: //"'
  }
}

var utils = commands.osx // If implementing other OSs, this is the place to check which we're on.

var args = process.argv.slice(2)

// This is very ugly!! TODO: check how to combine flags and "commands" properly. maybe use 'npm i cli'.
if (cli.device) {
  Object.keys(utils).forEach(function(key) {
    if (typeof utils[key] === 'string') {
      utils[key] = utils[key].replace('en0', cli.device)
    }
  })
  args.splice(args.indexOf('--device'), 2)
}

if (args[0] === 'on') {
  execute(utils.on) // cli.on is a function
} else if (cli.off) {
  execute(utils.off)
} else if (cli.restart) {
  execute(utils.off).then(execute.bind(this, utils.on))
} else if (cli.scan) {
  execute(utils.scan).then(console.log.bind(console))
} else if (args.length === 2) {
  execute(utils.connect.replace('NETWORK_TOKEN', args[0]).replace('PASSWORD_TOKEN', args[1]))
} else if (args.length === 0) {
  execute(utils.currentNetwork).then(help)
} else {
  cli.help()
}

// -----------------------------------------------------------------------------

function help(SSID) {
  console.log(SSID.trim() ? 'you are connected to ' + SSID : 'you are not connected anywhere')
  // TODO: add more help text
}

function execute(cmd) {
  // console.log('executing command:', cmd)
  var deferred = Q.defer()
  exec(cmd, function(err, strout, strerr) {
    if (err) {
      deferred.reject(new Error(err))
    } else if (strerr) {
      deferred.reject(new Error(strerr))
    } else {
      deferred.resolve(strout)
    }
  })
  return deferred.promise
}
