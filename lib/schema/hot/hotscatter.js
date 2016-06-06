var HotScatterSchema = new SimpleSchema({
	latitude:{
		type:Number,
		optional:true,
		label:"latitude"
	},
	longitude:{
		type:Number,
		optional:true,
		label:"longitude"
	},
	if_point:{
		type:Number,
		optional:true,
		label:"if_point"
	},
});

Inspire.Schema.HotScatter = HotScatterSchema;
Inspire.Collection.HotScatter = new Meteor.Collection("hotscatterdata");
Inspire.Collection.HotScatter.attachSchema(Inspire.Schema.HotScatter);

if(Meteor.isServer){
	Meteor.publish('hotscatter',function(){
		if(!this.userId) throw new Meteor.Error('403', '没有登录，权限不足');
		return Inspire.Collection.HotScatter.find();
	})
	Inspire.Collection.HotScatter.allow({
		insert: function(userId,doc,fieldNames,modifier) { return userId && Roles.userIsInRole(userId,['admin']); },
        		update: function(userId,doc,fieldNames,modifier) { return userId && Roles.userIsInRole(userId,['admin']); },
        		remove: function(userId,doc) { return userId && Roles.userIsInRole(userId,['admin']); }
	});
}