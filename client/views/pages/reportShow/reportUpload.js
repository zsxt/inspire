Template.reportUpload.events({
    'show.bs.modal #reportUploadModal': function() {
        var myDropZone = Template.instance().myDropZone.get();
        if (myDropZone) {
            myDropZone.removeAllFiles();
        }
        $('#date_report').val('');
        $('#title_report').val('');
        $('#abstract_report').val('');
        $("#upload_msg")[0].setAttribute('class', '');
        $("#upload_msg")[0].innerHTML = '';
    },
    'click button[id=data_report]': function(e, t){
        e.preventDefault();
        Template.instance().reportType.set('data');
    },
    'click button[id=analysis_report]': function(e, t){
        e.preventDefault();
        Template.instance().reportType.set('analysis');
    },
    'click button[id=trend_report]': function(e, t){
        e.preventDefault();
        Template.instance().reportType.set('trend');
    },
    'click button[id=other_report]': function(e, t){
        e.preventDefault();
        Template.instance().reportType.set('other');
    },
    'click button[type=submit]': function(e, t) {
        e.preventDefault();
        var uploadFile = Template.instance().uploadFile.get();
        var myDropZone = Template.instance().myDropZone.get();

        if (!uploadFile) {
            $("#upload_msg")[0].setAttribute("class", "alert alert-danger");
            return $("#upload_msg")[0].innerHTML = "请选择报告文件！";
        }

        var title = t.find('#title_report').value;
        if (!title) {
            $("#upload_msg")[0].setAttribute("class", "alert alert-danger");
            return $("#upload_msg")[0].innerHTML = "请添加报告标题！";
        }

        var date = t.find('#date_report').value;
        if (!date) {
            $("#upload_msg")[0].setAttribute("class", "alert alert-danger");
            return $("#upload_msg")[0].innerHTML = "请选择报告时间！";
        }

        var abstract = t.find('#abstract_report').value;
        if (!abstract) {
            abstract = '';
        }

        var type = Template.instance().reportType.get();
        if (!type) {
            $("#upload_msg")[0].setAttribute("class", "alert alert-danger");
            return $("#upload_msg")[0].innerHTML = "请选择报告类型！";
        }

        return Inspire.Collection.ReportFile.insert(uploadFile, function(error, fileObj) {
            var newReport;
            if (!error) {
                newReport = {
                    uid: Meteor.userId(),
                    fid: fileObj._id,
                    title: title,
                    abstract: abstract,
                    type: type,
                    reportAt: new Date(date)
                };
                Inspire.Collection.Report.insert(newReport);
                uploadFile = undefined;
                if (myDropZone) {
                    myDropZone.removeAllFiles();
                }
                return t.$("#reportUploadModal").modal('hide');
            } else {
                $("#upload_msg")[0].setAttribute("class", "alert alert-danger");
                return $("#upload_msg")[0].innerHTML = error;
            }
        });
    }
});

Template.reportUpload.helpers({

});

Template.reportUpload.rendered = function() {
    var instance = this;

    var myDropZone = new Dropzone('#dropzoneDiv', {
        url: "handle-upload.php",
        maxFiles: 1,
        maxFilesize: 10,
        acceptedFiles: ".jpg,.pdf,.jpeg",
        init: function() {
            this.on('success', function(file) {
                var fileWithoutExtension = file.name.substring(0, file.name.lastIndexOf('.'));
                $('#title_report').val(fileWithoutExtension);
                instance.uploadFile.set(file);
            });
            return this.on('removedfile', function(file) {
                instance.uploadFile.set(undefined);
            });
        }
    });

    instance.myDropZone.set(myDropZone);

    this.$('#date_report').datetimepicker({
        timepicker: false,
        format: 'Y-m-d',
        lang: 'zh_cn',
        i18n: {
            zh_cn: {
                months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                dayOfWeek: ["日", "一", "二", "三", "四", "五", "六"]
            }
        }
    });
};

Template.reportUpload.onCreated(function() {
    var instance = Template.instance();
    instance.myDropZone = new ReactiveVar(undefined);
    instance.uploadFile = new ReactiveVar(undefined);
    instance.reportType = new ReactiveVar(undefined);
});