'use strict';


module.exports = {
  osx: {
    on: 'networksetup -setairportpower en0 on',
    off: 'networksetup -setairportpower en0 off',
    scan: '/System/Library/PrivateFrameworks/Apple80211.framework/Versions/A/Resources/airport scan',
    connect: 'networksetup -setairportnetwork en0 "NETWORK_TOKEN" "PASSWORD_TOKEN"',
    currentNetwork: '/System/Library/PrivateFrameworks/Apple80211.framework/Versions/A/Resources/airport -I',
    extractCurrentNetwork: function(output) {
      return output.split('\n').reduce(function(obj, pair) {
          var match = pair.match(/^\s+([^:]+):\s+(.*)(\b\s+)?$/);
          if (match) obj[match[1]] = isNaN(match[2]) ? match[2] : parseInt(match[2]);
          return obj;
      }, {});
    }
  }
}
