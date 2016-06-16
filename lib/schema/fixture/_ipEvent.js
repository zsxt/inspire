/**
 * Created by meteor on 12/17/15.
 */
Inspire.Seed.IPEvent = function(){
    if (Inspire.Collection.IPEvent.findOne()) {
        return;
    }

    console.log('Construct IP Event.......');

    var newEvent1 ={
        "ipsrc": 16859135,
        "ipdst": 16875519,
        "portsrc": 80,
        "portdst": 21,
        "pro": 6,          //协议类型
        "eventAt": new Date()
    };

    var newEvent2 ={
        "ipsrc": 17040384,
        "ipdst": 17104895,
        "portsrc": 80,
        "portdst": 21,
        "pro": 17,
        "eventAt": new Date()
    };

    var newEvent3 ={
        "ipsrc": 17435391,
        "ipdst": 18155519,
        "portsrc": 80,
        "portdst": 21,
        "pro": 6,
        "eventAt": new Date()
    };

    var newEvent4 ={
        "ipsrc": 16778239,
        "ipdst": 16909055,
        "portsrc": 80,
        "portdst": 21,
        "pro": 17,
        "eventAt": new Date()
    };

    var newEvent5 ={
        "ipsrc": 16778239,
        "ipdst": 16910592,
        "portsrc": 80,
        "portdst": 21,
        "pro": 6,
        "eventAt": new Date()
    };

    var newEvent6 ={
        "ipsrc": 16912383,
        "ipdst": 16909055,
        "portsrc": 80,
        "portdst": 21,
        "pro": 17,
        "eventAt": new Date()
    };

    var newEventCreated = Inspire.Collection.IPEvent.insert(newEvent1);
    console.log('Event is created :' + newEventCreated);

    newEventCreated = Inspire.Collection.IPEvent.insert(newEvent2);
    console.log('Event is created :' + newEventCreated);

    newEventCreated = Inspire.Collection.IPEvent.insert(newEvent3);
    console.log('Event is created :' + newEventCreated);

    newEventCreated = Inspire.Collection.IPEvent.insert(newEvent4);
    console.log('Event is created :' + newEventCreated);

    newEventCreated = Inspire.Collection.IPEvent.insert(newEvent5);
    console.log('Event is created :' + newEventCreated);

    newEventCreated = Inspire.Collection.IPEvent.insert(newEvent6);
    console.log('Event is created :' + newEventCreated);
};