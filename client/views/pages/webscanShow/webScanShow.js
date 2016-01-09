Template.webScanShow.rendered = function(){

    // Set white background color for top navbar
    $('body').addClass('light-navbar');

};

Template.webScanShow.destroyed = function(){
    // Remove special class
    $('body').removeClass('light-navbar');
};

Template.webScanShow.helpers({
    worldIPCount: function(){
        if(Session.get('worldIPCount')){
            return Session.get('worldIPCount').toFixed(2);
        }
    },

    worldIPSeg: function() {
        if(Session.get('worldIPSeg')){
            return Session.get('worldIPSeg');
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