Template.webScanShow.rendered = function(){

    // Set white background color for top navbar
    $('body').addClass('light-navbar');

};

Template.webScanShow.destroyed = function(){
    // Remove special class
    $('body').removeClass('light-navbar');
};

Template.webScanShow.helpers({
    webScanWorldCountry: function(){
        if(Session.get('webScanWorldCountry')){
            return Session.get('webScanWorldCountry');
        }
    },

    webScanWorldServer: function() {
        if(Session.get('webScanWorldServer')){
            return Session.get('webScanWorldServer');
        }
    },

    webScanChinaRegion: function(){
        if(Session.get('webScanChinaRegion')){
            return Session.get('webScanChinaRegion');
        }
    },

    webScanChinaServer: function() {
        if(Session.get('webScanChinaServer')){
            return Session.get('webScanChinaServer');
        }
    }
});