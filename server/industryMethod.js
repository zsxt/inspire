var fs = Npm.require('fs');
var base = '/home/ever/workspace/HikvisionPocCert/'
Meteor.methods({
  traverse: function(ip, last) {
    var r = fs.readdirSync(base + ip);
    if (last) {
      return r.filter(function(f) {
        return f > last;
      });
    } else {
      return r;
    }    
  },
  ipImage: function(ip, name) {
    console.log(ip, name, 'hello');
    var p = base + ip + '/' + name;
    var r = fs.readFileSync(p);
    return r;
  }
})