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
    except: ['login']
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
