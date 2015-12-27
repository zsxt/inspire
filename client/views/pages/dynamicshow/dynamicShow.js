Template.dynamicShow.helpers({
    ipEventCount: function(){
        var selector = {};
        Meteor.call('getIPEventCount', selector,function (err, count) {
            Session.set('ipEventCount', count);
        });

        return Session.get('ipEventCount');
    }

});