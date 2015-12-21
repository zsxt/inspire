/**
 * Created by meteor on 12/20/15.
 */
Meteor.methods({
    getIPAddrCount: function () {
        return Inspire.Collection.IPAddr.find().count();
    }
});