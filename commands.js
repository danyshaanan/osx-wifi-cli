'use strict';


module.exports = {
  osx: {
    on: 'networksetup -setairportpower en0 on',
    off: 'networksetup -setairportpower en0 off',
    scan: '/System/Library/PrivateFrameworks/Apple80211.framework/Versions/A/Resources/airport scan',
    connect: 'networksetup -setairportnetwork en0 "NETWORK_TOKEN" "PASSWORD_TOKEN"',
    parseScan: function(output) {
      var lineRegex = /^\s+(.*)\s+([a-z0-9:]{17})\s+([^\s]+)\s+([^\s]+)\s+([^\s]+)\s+([^\s]+)\s+(.*)$/;
      return output.split('\n').map(function(line) {
        var parts = line.match(lineRegex);
        return parts && { SSID: parts[1], BSSID: parts[2], RSSI: parseInt(parts[3]), CHANNEL: parseInt(parts[4]), HT: parts[5], CC: parts[6], SECURITY: parts[7] };
      }).filter(Boolean);
    },
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