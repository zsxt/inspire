Template.dynamicShow.helpers({

    // For demo purpose
    // Example of notification list
    notifications : [
        {number: 1, labelClass: 'success', content: 'Please contact me', time: '09:00 pm'},
        {number: 2, labelClass: 'info', content: 'Sign a contract', time: '10:16 am'},
        {number: 3, labelClass: 'primary', content: 'Open new shop', time: '08.22 pm'},
        {number: 4, labelClass: 'default', content: 'Call back to Sylvia', time: '11:06 pm'},
        {number: 5, labelClass: 'primary', content: 'Write a letter to Sandra', time: '12:00 pm'}
    ],

    ipEventCount: function(){
        var selector = {};
        Meteor.call('getIPEventCount', selector,function (err, count) {
            Session.set('ipEventCount', count);
        });

        return Session.get('ipEventCount');
    }

});

Template.dynamicShow.rendered = function(){


};

Template.dynamicShow.onCreated(function() {
    var instance = Template.instance();

    instance.autorun(function() {

    })

});