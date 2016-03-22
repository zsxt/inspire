var PlcSchema = new SimpleSchema({
    ip:{
        type: String,
        optional: true,
        label: "ip"
    },
    country:{
        type: String,
        optional: true,
        label: "country"
    },
    province:{
        type: String,
        optional: true,
        label: "province"
    },
    device:{
        type: String,
        optional: true,
        label: "device"
    }
});

Inspire.Schema.Plc = PlcSchema;
Inspire.Collection.Plc = new Meteor.Collection("plc");
Inspire.Collection.Plc.attachSchema(Inspire.Schema.Plc);


if (Meteor.isServer) {
    //ToDo -- publish


    //PERIMISSION
    Inspire.Collection.Plc.allow({
        insert: function(userId,doc,fieldNames,modifier) { return userId && Roles.userIsInRole(userId,['admin']); },
        update: function(userId,doc,fieldNames,modifier) { return userId && Roles.userIsInRole(userId,['admin']); },
        remove: function(userId,doc) { return userId && Roles.userIsInRole(userId,['admin']); }
    });
}
