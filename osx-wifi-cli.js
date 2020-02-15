#!/usr/bin/env node

'use strict'

const cli = require('commander')

cli
  .version(require('./package.json').version)
  .usage('[on | off | restart | scan | pass | <network> <password>]')
  .option('on', 'turn wifi on')
  .option('off', 'turn wifi off')
  .option('restart', 'restart wifi')
  .option('scan', 'show available networks')
  .option('pass', 'show password for current network')
  .option('network', 'show network information')
  .option('--device <device>', 'set device (default is en0)', 'en0')
  .parse(process.argv)

const airport = '/System/Library/PrivateFrameworks/Apple80211.framework/Versions/A/Resources/airport'

const platforms = {
  /*
    Adding another operating system might only require finding matching commands
    the few below. If, however, you'll discover that it's not so simple, I'd be
    happy to discuss it online at https://github.com/danyshaanan/osx-wifi-cli
  */
  darwin: {
    on: 'networksetup -setairportpower DEVICE on',
    off: 'networksetup -setairportpower DEVICE off',
    scan: `${airport} scan`,
    pass: 'security find-generic-password -wa "SSID"',
    connect: 'networksetup -setairportnetwork DEVICE "NETWORK" "PASSWORD"',
    ssid: `${airport} -I | grep -e "\\bSSID:" | sed -e "s/^.*SSID: //"`,
    network: `${airport} -I`
  }
  // The commented out linux object below is a result of ~5 minutes online,
  // Can you do better? (This is untested guesswork that might be distro dependent).
  // ,linux : {
  //   on: 'sudo ifconfig DEVICE up',
  //   off: 'sudo ifconfig DEVICE down',
  //   scan: 'sudo iw dev wlan0 scan | grep SSID',
  //   pass: 'echo "Error: 'pass' command not implemented for linux" 1>&2 && exit 1',
  //   connect: 'echo "Error: 'pass' command not implemented for linux" 1>&2 && exit 1',
  //   ssid: 'iwgetid -r'
  // }
  // ,yourFavoriteOS: {}, // Add your favorite OS here!!
}

const utils = platforms[process.platform]
if (!utils) {
  console.log([
    `ERROR!`,
    `Your 'process.platform' is '${process.platform}', which is not supported.`,
    `Open a pull request or issue on Github:`,
    `https://github.com/danyshaanan/osx-wifi-cli`
  ].join('\n'))
  process.exit(1)
}

const args = process.argv.slice(2, Infinity)
Object.keys(utils).forEach(key => { utils[key] = utils[key].replace('DEVICE', cli.device) })
if (args.includes('--device')) args.splice(args.indexOf('--device'), 2)

const exec = command => require('child_process').execSync(command).toString()
const execTrim = command => exec(command).trim()

if (args[0] === 'on') { // cli.on is a function
  execTrim(utils.on)
} else if (args[0] === 'off') {
  execTrim(utils.off)
} else if (cli.restart) {
  execTrim(utils.off)
  execTrim(utils.on)
} else if (cli.scan) {
  console.log(execTrim(utils.scan))
} else if (cli.pass) {
  const ssid = execTrim(utils.ssid)
  const pass = execTrim(utils.pass.replace('SSID', ssid))
  console.log(pass)
} else if (cli.network) {
  console.log(exec(utils.network))
} else if (args.length === 2) {
  execTrim(utils.connect.replace('NETWORK', args[0]).replace('PASSWORD', args[1]))
} else if (args.length === 0) {
  const ssid = execTrim(utils.ssid)
  console.log(ssid ? `you are connected to ${ssid}.` : 'You are not connected anywhere.')
} else {
  cli.help()
}
