Template.navigation.rendered = function(){

    // Initialize metisMenu
    $('#side-menu').metisMenu();

};

// Used only on OffCanvas layout
Template.navigation.events({

    'click .close-canvas-menu' : function(){
        $('body').toggleClass("mini-navbar");
    }

});

Template.navigation.helpers({

    userName: function() {
        return Meteor.user().profile.name;
    },

    userRole: function() {
        var roles =  Meteor.user().roles;
        if(roles[0] == 'admin'){
            return '系统管理员'
        }
        else if(roles[0] == 'analyst'){
            return '数据分析师'
        }
        else{
            return '一般用户'
        }
    },

    userAvatar: function() {
        return Meteor.user().profile.avatar;
    },

    isAdmin: function() {
        return Meteor.user().roles[0] == 'admin'
    }

});