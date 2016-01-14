Template.reportShow.events({

    // Timeline options buttons
    'click #leftVersion' : function(event){
        event.preventDefault()
        $('#vertical-timeline').toggleClass('center-orientation');
    }

});

Template.reportShow.helpers({
    reports: function(){
        return Inspire.Collection.Report.find();
    },

    reportDate: function(reportAt){
        return reportAt.toLocaleDateString();
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