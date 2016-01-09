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

    chinaIPCount: function(){
        if(Session.get('chinaIPCount')){
            return Session.get('chinaIPCount').toFixed(2);
        }
    },

    chinaIPSeg: function() {
        if(Session.get('chinaIPSeg')){
            return Session.get('chinaIPSeg');
        }
    }
});