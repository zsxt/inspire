Template.accounts.onCreated(function()
{
    var instance = Template.instance();
    instance.autorun(function() 
    {
        var subscription = instance.subscribe('allAccountsInfoExceptAdmin');
    });        
});


Template.accounts.helpers
({
    listUser: function()
    {
        return Meteor.users.find({username:{$ne:"admin"}},{sort:{'username': 1}});
    }
});


Template.accounts.onRendered(function() {
    this.$('.full-height-scroll').slimscroll({
        height: '500px',
        railOpacity: 1,
        color: '#cccccc',
        opacity: 1,
        alwaysVisible: true,
        allowPageScroll: false
    });
});