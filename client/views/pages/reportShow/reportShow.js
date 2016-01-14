Template.reportShow.events({

    // Timeline options buttons
    'click #leftVersion' : function(event){
        event.preventDefault()
        $('#vertical-timeline').toggleClass('center-orientation');
    }

});

Template.reportShow.helpers({
    reports: function(){
        return Inspire.Collection.Report.find({},{sort:{reportAt: -1}});
    }
});



Template.reportShow.onCreated(function() {
    var instance = Template.instance();

    instance.autorun(function() {
        var subscription = instance.subscribe('reports');
    })

});
