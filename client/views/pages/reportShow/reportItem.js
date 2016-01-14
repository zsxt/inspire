Template.reportItem.helpers({
    reportDate: function(reportAt){
        return reportAt.toLocaleDateString();
    },

    reportUrl: function(fid){
        var reportFile = Inspire.Collection.ReportFile.findOne(fid);
        if(reportFile){
            return reportFile.url();
        }
    }
});


Template.reportItem.events({
    'click #removeReport': function(event, template) {
        var id = this._id;
        return Inspire.Collection.ReportFile.remove(this.fid, function(error) {
            if (!error) {
                return Inspire.Collection.Report.remove(id);
            } else {
                return alert(error);
            }
        });
    }
});