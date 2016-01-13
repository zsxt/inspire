var myDropZone = undefined;
var uploadFile = undefined;

Template.reportUpload.events({
    'show.bs.modal #reportUploadModal': function() {
        if (myDropZone) {
            myDropZone.removeAllFiles();
        }
        $('#date_report').val('');
    },
    'click button[type=submit]': function(e, t) {
        e.preventDefault();
        if (!uploadFile) {
            alert('请选择报告文件！');
            return;
        }

        var title = t.find('#title_report').value;
        if (!title) {
            alert('请添加报告标题');
            return;
        }

        var date = t.find('#date_report').value;
        if (!date) {
            alert('请选择报告时间');
            return;
        }

        var abstract = t.find('#abstract_report').value;

        return Inspire.Collection.ReportFile.insert(uploadFile, function(error, fileObj) {
            var newReport;
            if (!error) {
                newReport = {
                    uid: Meteor.userId(),
                    fid: fileObj._id,
                    title: title,
                    abstract: abstract,
                    createAt: date
                };
                console.log(newReport);
                Inspire.Collection.Report.insert(newReport);
                uploadFile = undefined;
                if (myDropZone) {
                    myDropZone.removeAllFiles();
                }
                return t.$("#reportUploadModal").modal('hide');
            } else {
                return console.log(error);
            }
        });
    }
});

Template.reportUpload.helpers({

});

Template.reportUpload.rendered = function() {
    myDropZone = new Dropzone('#dropzoneDiv', {
        url: "handle-upload.php",
        maxFiles: 1,
        maxFilesize: 10,
        acceptedFiles: ".jpg,.pdf,.jpeg",
        init: function() {
            this.on('success', function(file) {
                var fileWithoutExtension = file.name.substring(0, file.name.lastIndexOf('.'));
                $('#title_report').val(fileWithoutExtension);
                return uploadFile = file;
            });
            return this.on('removedfile', function(file) {
                return uploadFile = undefined;
            });
        }
    });

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