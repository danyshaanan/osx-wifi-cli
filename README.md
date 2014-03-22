## osx-wifi-cli
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

* * *
#### TODOs
* Enable connection to a network without a password. (Should currently be possible with `" "`)
* Enable picking a network by a numeric id

* * *
#### Feedback
* If you enjoyed this tool, please star it on Github!
* I'd love to get any feedback you might have! Mail me at danyshaanan@gmail.com, or [open an issue](https://github.com/danyshaanan/osx-wifi-cli/issues/new).
* More material appreciation is welcome in the form of bitcoins. My address can be found on [this page](http://danyshaanan.com/bitcoin).
