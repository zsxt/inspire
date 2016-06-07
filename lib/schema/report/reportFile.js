Inspire.Collection.ReportFile = new FS.Collection("reportfile", {
    stores: [new FS.Store.FileSystem("reportfile", {path: "~/uploads"})]
});

if (Meteor.isServer) {
    //ToDo -- publish

    //PERIMISSION
    Inspire.Collection.ReportFile.allow({
        insert: function(userId,doc,fieldNames,modifier) { return userId && Roles.userIsInRole(userId,['admin', 'industry', 'analyst']); },
        update: function(userId,doc,fieldNames,modifier) { return userId && Roles.userIsInRole(userId,['admin', 'industry', 'analyst']); },
        remove: function(userId,doc) { return userId && Roles.userIsInRole(userId,['admin', 'industry', 'analyst']); },
        download: function(userId, fileObj) { return userId && Roles.userIsInRole(userId,['admin', 'industry', 'analyst']); }
    });
}