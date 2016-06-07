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
            if(!Meteor.user().roles || !Meteor.user().roles[0]){
		return;
	    }

	    var roles =  Meteor.user().roles;
            if(roles[0] == 'admin'){
                return '系统管理员'
            }
            else if(roles[0] == 'analyst'){
                return '数据分析师'
            }
            else if(roles[0] == 'industry'){
                return '工控分析师'
            }
            else{
                return '临时游客'
            }
        }
    },

    userAvatar: function() {
        if (Meteor.userId() && Meteor.user()){
            if(Meteor.user().profile){	
                return Meteor.user().profile.avatar;
            }
        }
    },

    isAdmin: function() {
	if (Meteor.userId() && Meteor.user()){
            if(!Meteor.user().roles || !Meteor.user().roles[0]){
                return false;
            }
            
            return Meteor.user().roles[0] == 'admin'
        }
        else{
            return false;
        }
    },

    isAnalyst: function() {
        if (Meteor.userId() && Meteor.user()){
            if(!Meteor.user().roles || !Meteor.user().roles[0]){
                return false;
            }

	    return Meteor.user().roles[0] == 'analyst'
        }
	else{
            return false;
        }
    },

    isIndustry: function() {
        if (Meteor.userId() && Meteor.user()){
            if(!Meteor.user().roles || !Meteor.user().roles[0]){
                return false;
            }
            
            return Meteor.user().roles[0] == 'industry'
        }
        else{
            return false;
        }
    }
});
