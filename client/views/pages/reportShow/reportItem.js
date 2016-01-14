Template.reportItem.helpers({
    reportDate: function(reportAt){
        return reportAt.toLocaleDateString();
    },

    reportUrl: function(fid){
        var reportFile = Inspire.Collection.ReportFile.findOne(fid);
        if(reportFile){
            console.log(reportFile.url());
            return reportFile.url();
        }
    }
});