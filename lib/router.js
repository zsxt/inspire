var homeSubs, requireLogin, MainController;

homeSubs = new SubsManager({
    cacheLimit: 9999,
    expireIn: 9999
});

Router.configure({
    layoutTemplate: 'mainLayout',
    loadingTemplate: "loading",
    notFoundTemplate: "notFound"
});

requireLogin = function() {
    if (!Meteor.userId()) {
        Session.set('username', '');
        this.layout('blankLayout');
        return this.render('login');
    } else {
        return this.next();
    }
};

Router.onBeforeAction(requireLogin, {
    except: ['login', 'industry.attackimage']
});

MainController = RouteController.extend({
    layoutTemplate: "mainLayout",
    notFoundTemplate: "notFound",
    waitOn: function() {
        if (Meteor.userId()) {

        }
    }
});


//
// Dashboards routes
//
Router.route('/basicProfile', function () {
    this.render('basicProfile');
});

Router.route('/staticShow', function () {
    this.render('staticShow');
});

Router.route('/icpAnalysis', {
  name: 'icpAnalysis'
});

Router.route('/dynamicShow', function () {
    this.render('dynamicShow');
});

Router.route('/webScanShow', function () {
    this.render('webScanShow');
});

Router.route('/plc', function() {
  this.render('plc');
})

Router.route('/industry/introduction', function() {
    this.render('industryIntroduction');
}, {
  name: 'industry.introduction'
});

Router.route('/industry/globe', function() {
    this.render('industryGlobe');
}, {
  name: 'industry.globe'
});

Router.route('/industry/china', function() {
    this.render('industryChina');
}, {
  name: 'industry.china'
});

Router.route('/industry/result', function() {
    this.render('industryResult');
}, {
  name: 'industry.result'
});

Router.route('/industry/attack', function() {
    this.render('industryAttack');
}, {
  name: 'industry.attack'
});

Router.route('/industry/realtime', function() {
    this.render('industryRealtime');
}, {
  name: 'industry.realtime'
});

Router.route('/industry/monitor', function() {
    this.render('industryMonitor');
}, {
  name: 'industry.monitor'
});

Router.route('/industry/attackimg/:ip/:name', function() {
    var fs = Npm.require('fs');
    var base = '/home/ever/workspace/HikvisionPocCert/'
    var self = this;
    var chunk = fs.createReadStream(base + this.params.ip + '/' + this.params.name);
    var headers = {
        'Content-Type': 'image/jpeg'
    }
    self.response.writeHead(200, headers);
    chunk.pipe(this.response);
}, {
    where: 'server',
    name: 'industry.attackimage'
})

Router.route('/hot/scatter', function() {
    this.render('hotScatter')
}, {
    name: 'hot.scatter'
})

Router.route('/hot/moving', function() {
    this.render('hotMoving')
}, {
    name: 'hot.moving'
})

Router.route('/topologyShow', function () {
    this.render('topologyShow');
});

Router.route('/reportShow', function () {
    this.render('reportShow');
});

//
// Other pages
//
Router.route('/login', function () {
    this.render('login');
    this.layout('blankLayout')
});

Router.route('/logout', {
    action: function() {
        return Meteor.logout(function(err) {
            if (!err) {
                return Router.go('/login');
            }
        });
    }
});

Router.route('/register', function () {
    this.render('register');
    this.layout('blankLayout')
});

//
// Other pages routes
//
Router.route('/notFound', function () {
    this.render('notFound');
});


// Default route
// You can use direct this.render('template')
// We use Router.go method because dashboard1 is our nested view in menu
Router.route("/home", {
    action: function() {
        return Router.go("/");
    }
});

Router.route("/dashboard1", {
    action: function() {
        return Router.go("/");
    }
});

Router.route("/", {
    controller: MainController,
    action: function() {
        if (this.ready) {
            return this.render("basicProfile");
        }
    },
    waitOn: function() {
        if (Meteor.userId()) {

        }
    }
});
