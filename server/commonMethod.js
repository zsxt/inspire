Meteor.methods({
  clientIp: function() {
    console.log(this.connection.clientAddress);
    return this.connection.clientAddress;
  }
})