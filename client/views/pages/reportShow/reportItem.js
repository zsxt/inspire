Template.reportItem.helpers({
    reportDate: function(reportAt){
        return reportAt.toLocaleDateString();
    },

    reportUrl: function(fid){
        var reportFile = Inspire.Collection.ReportFile.findOne(fid);
        if(reportFile){
            return reportFile.url();
        }
    },

    timelineIcon: function(){
        if(this.type == 'data'){
            return "vertical-timeline-icon yellow-bg";
        }
        else if(this.type == 'analysis'){
            return "vertical-timeline-icon blue-bg";
        }
        else if(this.type == 'trend'){
            return "vertical-timeline-icon red-bg";
        }
        else{
            return "vertical-timeline-icon lazur-bg";
        }
    },

    fileIcon: function(){
        if(this.type == 'data'){
            return "fa fa-file-text";
        }
        else if(this.type == 'analysis'){
            return "fa fa-tasks";
        }
        else if(this.type == 'trend'){
            return "fa fa-cloud";
        }
        else{
            return "fa fa-paperclip";
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