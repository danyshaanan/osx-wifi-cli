# osx-wifi-cli

[![Build Status](https://travis-ci.org/danyshaanan/osx-wifi-cli.png)](https://travis-ci.org/danyshaanan/osx-wifi-cli)
[![NPM Version](https://img.shields.io/npm/v/osx-wifi-cli.svg?style=flat)](https://npmjs.org/package/osx-wifi-cli)
[![License](http://img.shields.io/npm/l/osx-wifi-cli.svg?style=flat)](LICENSE)
[![Dependency Status](https://david-dm.org/danyshaanan/osx-wifi-cli.svg)](https://david-dm.org/danyshaanan/osx-wifi-cli)
[![devDependency Status](https://david-dm.org/danyshaanan/osx-wifi-cli/dev-status.svg)](https://david-dm.org/danyshaanan/osx-wifi-cli#info=devDependencies)

A command line tool for managing wifi connections on OSX

* * *
### Installation
```bash
$ npm install -g osx-wifi-cli
```
* * *
### Usage

`osx-wifi-cli` shows you which network you are connected to, if you are.

`osx-wifi-cli scan` shows available networks.

`osx-wifi-cli on`, `osx-wifi-cli off`, and `osx-wifi-cli restart` control the wifi device state.

`osx-wifi-cli NETWORK PASSWORD` tries to connects to NETWORK with PASSWORD.

* * *
### Notes
* For easier use, add to your `.bashrc` file: `alias wifi='osx-wifi-cli'`
* To connect to network without a password (bad idea!) use `osx-wifi-cli networkname " "`

* * *
### Feedback
* If you enjoyed this package, please star it [on Github](https://github.com/danyshaanan/osx-wifi-cli).
* You are invited to [Open an issue on Github](https://github.com/danyshaanan/osx-wifi-cli/issues).
* For other matters, my email address can be found on my [NpmJS page](https://www.npmjs.org/~danyshaanan), my [Github page](https://github.com/danyshaanan), or my [website](http://danyshaanan.com/).

