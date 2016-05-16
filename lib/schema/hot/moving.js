var GeoSchema = new SimpleSchema
({
    toponym : 
    {
        type: String,
        optional: true,
        label: "地名"
    },
        
    latitude :
    {
        type: Number,
        optional: true,
        decimal:true,
        label: '纬度'
    },
    
    longitude :
    {
        type: Number,
        optional: true,
        decimal:true,
        label: '经度',
    }
});


var MovingSchema = new SimpleSchema
({
    srcPlace :
    {
        type: String,
        optional: true,
        label: "起始地点"
    },
    
    destPlace :
    {
        type: String,
        optional: true,
        label: "目的地点"   
    },
    
    movingCount :
    {
        type: Number,
        optional: true,
        label: "迁移计数"        
    }
});


Inspire.Schema.ToponymGeoCoord = GeoSchema;
Inspire.Collection.ToponymGeoCoord = new Meteor.Collection("toponym_geo_coord");
Inspire.Collection.ToponymGeoCoord.attachSchema(Inspire.Schema.ToponymGeoCoord);

Inspire.Schema.HotMoving = MovingSchema;
Inspire.Collection.HotMoving = new Meteor.Collection("hot_moving");
Inspire.Collection.HotMoving.attachSchema(Inspire.Schema.HotMoving);


if (Meteor.isServer) 
{
    // Publish
    Meteor.publish('geoCoord', function () 
    {
        if (!this.userId) throw new Meteor.Error('403', '没有登录，权限不足');
        return Inspire.Collection.ToponymGeoCoord.find();
    });

    Meteor.publish('hotMoving', function () 
    {
        if (!this.userId) throw new Meteor.Error('403', '没有登录，权限不足');
        return Inspire.Collection.HotMoving.find();
    });

    //PERIMISSION
    Inspire.Collection.ToponymGeoCoord.allow
    ({
        insert: function(userId,doc,fieldNames,modifier) { return userId && Roles.userIsInRole(userId,['admin']); },
        update: function(userId,doc,fieldNames,modifier) { return userId && Roles.userIsInRole(userId,['admin']); },
        remove: function(userId,doc) { return userId && Roles.userIsInRole(userId,['admin']); }
    });
    
    Inspire.Collection.HotMoving.allow
    ({
        insert: function(userId,doc,fieldNames,modifier) { return userId && Roles.userIsInRole(userId,['admin']); },
        update: function(userId,doc,fieldNames,modifier) { return userId && Roles.userIsInRole(userId,['admin']); },
        remove: function(userId,doc) { return userId && Roles.userIsInRole(userId,['admin']); }
    });
}