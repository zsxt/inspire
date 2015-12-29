Template.staticShow.rendered = function(){

    // Set white background color for top navbar
    $('body').addClass('light-navbar');

};

Template.staticShow.destroyed = function(){
    // Remove special class
    $('body').removeClass('light-navbar');
};

Template.staticShow.helpers({
    worldIPCount: function(){
        return Session.get('worldIPCount').toFixed(2);
    },

    worldIPSeg: function() {
        return Session.get('worldIPSeg');
    },

    chinaIPCount: function(){
        return Session.get('chinaIPCount').toFixed(2);
    },

    chinaIPSeg: function() {
        return Session.get('chinaIPSeg');
    }
});