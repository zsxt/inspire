Inspire.Collection.ReportFile = new FS.Collection("reportfile", {
    stores: [new FS.Store.FileSystem("reportfile", {path: "~/uploads"})]
});

if (Meteor.isServer) {
    //ToDo -- publish

    //PERIMISSION
    Inspire.Collection.ReportFile.allow({
        insert: function(userId,doc,fieldNames,modifier) { return userId && Roles.userIsInRole(userId,['admin']); },
        update: function(userId,doc,fieldNames,modifier) { return userId && Roles.userIsInRole(userId,['admin']); },
        remove: function(userId,doc) { return userId && Roles.userIsInRole(userId,['admin']); }
    });
}