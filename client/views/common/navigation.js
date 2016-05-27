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
        if (Meteor.userId() && Meteor.user()){          
            if(Meteor.user().profile){
                return Meteor.user().profile.name;
            }
        }
    },

    userRole: function() {
        if (Meteor.userId() && Meteor.user()){
            var roles =  Meteor.user().roles;
            if(roles[0] == 'admin'){
                return '系统管理员'
            }
            else if(roles[0] == 'analyst'){
                return '数据分析师'
            }
            else if(roles[0] == 'normal'){
                return '一般用户'
            }
            else{
                return '匿名游客'
            }
        }
    },

    userAvatar: function() {
        if (Meteor.userId() && Meteor.user()){
            if(Meteor.user().profile != undefined){
                return Meteor.user().profile.avatar;
            }
        }
    },

    isAdmin: function() {
        if (Meteor.userId() && Meteor.user()){
            return Meteor.user().roles[0] == 'admin'
        }
        else{
            return false;
        }
    }

});
