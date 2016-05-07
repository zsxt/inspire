var fs = Npm.require('fs');
var base = '/home/ever/workspace/HikvisionPocCert/'
Meteor.methods({
  traverse: function(ip, last, callback) {
    console.log(ip, ',,,', last, '...', callback);
    if (!callback) {
      callback = last;
    }
    var r = fs.readdirSync(base + ip);
    return r;
    // fs.readdir(base + ip, function(error, files) {
    //   console.log(base + ip);
    //   if (error) {
    //     console.log(error);
    //     return;
    //   }
    //   console.log(files);
    //   var r= files.filter(function(f) {
    //     return f > last;
    //   });
    //   console.log(r);
    //   console.log(callback);
    //   callback(r);
    // })
    
  },
  ipImage: function(ip, name) {
    console.log(ip, name, 'hello');
    var p = base + ip + '/' + name;
    var r = fs.readFileSync(p);
    return r;
  }
})