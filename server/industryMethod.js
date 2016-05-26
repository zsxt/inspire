var fs = Npm.require('fs');
var base = '/var/storage/ictrl/';
Meteor.methods({
  traverse: function(ip, last) {
    var r = fs.readdirSync(base + ip);
    if (last) {
      r = r.filter(function(f) {
        return f > last;
      });
    }
    r = r.filter(function(f) {
        return f.indexOf('bak') == -1;
    });
    return r;
  },
  ipImage: function(ip, name) {
    console.log(ip, name, 'hello');
    var p = base + ip + '/' + name;
    var r = fs.readFileSync(p);
    return r;
  }
})
