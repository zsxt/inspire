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
        if(Session.get('worldIPCount')){
            return Session.get('worldIPCount').toFixed(2);
        }
        else{
            return '未知';
        }
    },

    worldIPSeg: function() {
        if(Session.get('worldIPSeg')){
            return Session.get('worldIPSeg');
        }
        else{
            return '未知';
        }
    },

    chinaIPCount: function(){
        if(Session.get('chinaIPCount')){
            return Session.get('chinaIPCount').toFixed(2);
        }
        else{
            return '未知';
        }
    },

    chinaIPSeg: function() {
        if(Session.get('chinaIPSeg')){
            return Session.get('chinaIPSeg');
        }
        else{
            return '未知';
        }
    }
});