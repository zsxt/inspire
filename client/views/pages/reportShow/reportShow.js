Template.reportShow.events({

    // Timeline options buttons

    'click #lightVersion' : function(event){
        event.preventDefault()
        $('#ibox-content').removeClass('ibox-content');
        $('#vertical-timeline').removeClass('dark-timeline');
        $('#vertical-timeline').addClass('light-timeline');
    },

    'click #darkVersion' : function(event){
        event.preventDefault()
        $('#ibox-content').addClass('ibox-content');
        $('#vertical-timeline').removeClass('light-timeline');
        $('#vertical-timeline').addClass('dark-timeline');
    },

    'click #leftVersion' : function(event){
        event.preventDefault()
        $('#vertical-timeline').toggleClass('center-orientation');
    }

});

Template.reportShow.helpers({
    reports: function(){
        return Inspire.Collection.Report.find();
    },

    reportAt: function(createdAt){
        return createdAt.toLocaleString();
    },

    reportUrl: function(fid){
        var reportFile = Inspire.Collection.ReportFile.findOne(fid);
        if(reportFile){
            return Inspire.Collection.ReportFile.findOne(fid).url();
        }

    }
});



Template.reportShow.onCreated(function() {
    var instance = Template.instance();

    instance.autorun(function() {
        var subscription = instance.subscribe('reports');
    })

});