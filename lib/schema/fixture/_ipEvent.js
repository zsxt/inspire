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
        "ipdst": 16875519
    };

    var newEvent2 ={
        "ipsrc": 17040384,
        "ipdst": 17104895
    };

    var newEvent3 ={
        "ipsrc": 17435391,
        "ipdst": 18155519
    };


    var newEventCreated = Inspire.Collection.IPEvent.insert(newEvent1);
    console.log('Event is created :' + newEventCreated);

    newEventCreated = Inspire.Collection.IPEvent.insert(newEvent2);
    console.log('Event is created :' + newEventCreated);

    newEventCreated = Inspire.Collection.IPEvent.insert(newEvent3);
    console.log('Event is created :' + newEventCreated);
};