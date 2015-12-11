/**
 * Created by meteor on 12/11/15.
 */
//ICP备案信息
var ICPGnBaxxSchema = new SimpleSchema({
    SHENGID:{
        type: Number,
        optional: true,
        label: "省份ID"
    },
    SHIID:{
        type: Number,
        optional: true,
        label: "城市ID"
    },
    XIANID:{
        type: Number,
        optional: true,
        label: "区县ID"
    },
    DWXZ:{
        type: Number,
        optional: true,
        label: "单位性质"
    },
    DWFL:{
        type: Number,
        optional: true,
    },
    SEG_COUNT:{
        type: Number,
        optional: true,
    },
    DWZXJB:{
        type: Number,
        optional: true,
    },
    DWHYFL:{
        type: Number,
        optional: true,
    },
    VALUE:{
        type: Number,
        optional: true,
        label: "值"
    },
    SFGN:{
        type: Number,
        optional: true
    },
    SHENG:{
        type: String,
        optional: true,
        label: "省份"
    },
    SHI:{
        type: String,
        optional: true,
        label: "城市"
    },
    XIAN:{
        type: String,
        optional: true,
        label: "区县"
    },
    FPFS:{
        type: String,
        optional: true
    },
    IP_LX:{
        type: String,
        optional: true
    },
    SCBBSJ:{
        type: Date,
        optional: true
    }
});

Inspire.Schema.ICPGnBaxx = ICPGnBaxxSchema;
Inspire.Collection.ICPGnBaxx = new Meteor.Collection("data_icp_gn_baxx");
Inspire.Collection.ICPGnBaxx.attachSchema(Inspire.Schema.ICPGnBaxx);


if (Meteor.isServer) {
    //ToDo -- publish

    //PERIMISSION
    Meteor.users.allow({
        insert: function(userId,doc,fieldNames,modifier) { return userId && Roles.userIsInRole(userId,['admin']); },
        update: function(userId,doc,fieldNames,modifier) { return userId && Roles.userIsInRole(userId,['admin']); },
        remove: function(userId,doc) { return userId && Roles.userIsInRole(userId,['admin']); }
    });
}