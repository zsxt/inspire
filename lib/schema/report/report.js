var ReportSchema = new SimpleSchema({
    uid: {
        type: String,
        label: "用户 ID"
    },
    fid: {
        type: String,
        label: "报告 ID"
    },
    title: {
        type: String,
        label: "报告标题"
    },
    type: {
        type: String,
        optional: true,
        label: "报告领域",
        allowedValues: ['data', 'analysis', 'trend', 'other']
    },
    abstract: {
        type: String,
        optional: true,
        label: "报告摘要"
    },
    reportAt: {
        type: Date,
        label: "报告时间"
    },
    createdAt: {
        type: Date,
        autoValue: function () {
            if (this.isInsert) {
                return new Date();
            }
            else if (this.isUpsert) {
                return {$setOnInsert: new Date};
            }
            else {
                this.unset();
            }
        }
    },
    updatedAt: {
        type: Date,
        optional: true,
        autoValue: function () {
            if (this.isUpdate) return new Date()
        }
    }
});

Inspire.Schema.Report = ReportSchema;
Inspire.Collection.Report = new Meteor.Collection("report");
Inspire.Collection.Report.attachSchema(Inspire.Schema.Report);

if (Meteor.isServer) {

    Meteor.publishComposite('reports', function () {
        if (!this.userId) throw new Meteor.Error('403', '没有登录，权限不足');

        var userid = this.userId;
        return {
            find: function() {
                return Inspire.Collection.Report.find({uid: userid},{sort:{reportAt: -1}});
            },
            children: [
                {
                    find: function(report) {
                        return Inspire.Collection.ReportFile.find(report.fid);
                    }
                }
            ]
        }
    });

    //PERIMISSION
    Inspire.Collection.Report.allow({
        insert: function(userId,doc,fieldNames,modifier) { return userId && Roles.userIsInRole(userId,['admin']); },
        update: function(userId,doc,fieldNames,modifier) { return userId && Roles.userIsInRole(userId,['admin']); },
        remove: function(userId,doc) { return userId && Roles.userIsInRole(userId,['admin']); }
    });
}