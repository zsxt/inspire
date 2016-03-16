var IndustryControlDataSchema = new SimpleSchema({
    host:{
        type: String,
        optional: true,
        label: "host"
    },
    country:{
        type: String,
        optional: true,
        label: "country"
    },
    city:{
        type: String,
        optional: true,
        label: "city"
    },
    port:{
        type: Number,
        optional: true,
        label: "port"
    },
    update_time:{
        type: Date,
        optional: true,
        label: "update_time"
    },
    banner:{
        type: String,
        optional: true,
        label: "banner"
    },
    brand:{
        type: String,
        optional: true,
        label: "brand"
    },
    model:{
        type: Number,
        optional: true,
        label: "model"
    },
    register_id:{
        type: Number,
        optional: true,
        label: "register_id"
    },
    is_index:{
        type: String,
        optional: true,
        label: "is_index"
    },
    result_type:{
        type: Number,
        optional: true,
        label: "result_type"
    },
    platform:{
        type: Number,
        optional: true,
        label: "platform"
    },
    device_type:{
        type: String,
        optional: true,
        label: "device_type"
    }
});

Inspire.Schema.IndustryControlData = IndustryControlDataSchema;
Inspire.Collection.IndustryControlData = new Meteor.Collection("industry_control");
Inspire.Collection.IndustryControlData.attachSchema(Inspire.Schema.IndustryControlData);


if (Meteor.isServer) {
    //ToDo -- publish


    //PERIMISSION
    Inspire.Collection.IndustryControlData.allow({
        insert: function(userId,doc,fieldNames,modifier) { return userId && Roles.userIsInRole(userId,['admin']); },
        update: function(userId,doc,fieldNames,modifier) { return userId && Roles.userIsInRole(userId,['admin']); },
        remove: function(userId,doc) { return userId && Roles.userIsInRole(userId,['admin']); }
    });
}
