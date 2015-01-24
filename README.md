## osx-wifi-cli

[![Build Status](https://travis-ci.org/danyshaanan/osx-wifi-cli.png?branch=master)](https://travis-ci.org/danyshaanan/osx-wifi-cli)

### A command line tool for managing wifi connections on OSX

* * *
#### Installation
```bash
$ npm install -g osx-wifi-cli
```
* * *
#### Usage

`osx-wifi-cli` shows you which network you are connected to, if you are.

`osx-wifi-cli scan` shows available networks.

`osx-wifi-cli on`, `osx-wifi-cli off`, and `osx-wifi-cli restart` control the wifi device state.

`osx-wifi-cli NETWORK PASSWORD` tries to connects to NETWORK with PASSWORD.

* * *
#### Notes
* This has been so far developed to "Work on my machine". If it's not working on yours, please tell me what's up, and I'll try to fix it. (For instance, wifi device is assumed to be en0).
* For easier execution, add to your `.bashrc` file: `alias wifi='osx-wifi-cli'`
* This was developed in a way that should make implementing this for other operating systems easy. If you want to give it a shot, check out the code or send me a message.
* To connect to network without a password (bad idea!) use `osx-wifi-cli networkname " "`
