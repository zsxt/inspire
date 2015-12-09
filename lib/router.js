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
Router.route('/staticShow', function () {
    this.render('staticShow');
});
Router.route('/dynamicShow', function () {
    this.render('dynamicShow');
});
Router.route('/topologyShow', function () {
    this.render('topologyShow');
});

//
// Other pages
//

Router.route('/searchResult', function () {
    this.render('searchResult');
});

Router.route('/lockScreen', function () {
    this.render('lockScreen');
    this.layout('blankLayout')
});

Router.route('/invoice', function () {
    this.render('invoice');
});

Router.route('/invoicePrint', function () {
    this.render('invoicePrint');
    this.layout('blankLayout')
});

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

Router.route('/forgotPassword', function () {
    this.render('forgotPassword');
    this.layout('blankLayout')
});

Router.route('/register', function () {
    this.render('register');
    this.layout('blankLayout')
});

Router.route('/errorOne', function () {
    this.render('errorOne');
    this.layout('blankLayout')
});

Router.route('/errorTwo', function () {
    this.render('errorTwo');
    this.layout('blankLayout')
});

Router.route('/emptyPage', function () {
    this.render('emptyPage');
});

//
// Mailbox
//

Router.route('/mailbox', function () {
    this.render('mailbox');
});

Router.route('/emailView', function () {
    this.render('emailView');
});

Router.route('/emailCompose', function () {
    this.render('emailCompose');
});

Router.route('/emailTemplates', function () {
    this.render('emailTemplates');
});

//
// UI Elements
//

Router.route('/notifications', function () {
    this.render('notifications');
});

//
// Grid Options
//

Router.route('/gridOptions', function () {
    this.render('gridOptions');
});

//
// App Views
//

Router.route('/contacts', function () {
    this.render('contacts');
});

Router.route('/profile', function () {
    this.render('profile');
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
            return this.render("staticShow");
        }
    },
    waitOn: function() {
        if (Meteor.userId()) {

        }
    }
});