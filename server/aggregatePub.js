//IP统计
Meteor.publish('ipAddrStat', function(options) {
    if (!this.userId) throw new Meteor.Error('403', '没有登录，权限不足');
    if(!options.attr){
        throw new Meteor.Error('404', 'Not found!');
    }

    if(!options.match){
        options.match = {};
    }

    if(!options.limit){
        options.limit = 10;
    }

    var sub = this;
    var collection = Inspire.Collection.IPAddr;
    var projection = {
        _id: 0,
        ipfrom: 1,
        ipto: 1
    };
    projection[options.attr] = 1;

    var group = {
        _id: '$' + options.attr,
        ipfrom: {$sum: '$ipfrom'},
        ipto: {$sum: '$ipto'},
        ipseg: {$sum: 1}
    };

    var projection1 = {
        _id: 0,
        label: '$_id',
        ipfrom: 1,
        ipto: 1,
        ipseg: 1,
        attr: {$literal: options.attr}
    };

    if(options.attr == 'addr.country'){
        projection['addr.countrycode'] = 1;
        group['code'] = {$first: '$addr.countrycode'};
        projection1['code'] = 1;
    }
    else if(options.attr == 'addr.province'){
        projection['addr.country'] = 1;
        projection['addr.adcode'] = 1;
        group['code'] = {$first: '$addr.adcode'};
        projection1['code'] = 1;
    }

    var pipeline = [
        {$project: projection},
        {$match: options.match},
        {$group: group},
        {$sort: {ipseg: -1}},
        {$limit: options.limit},
        {$project: projection1}
    ];

    var results = collection.aggregate(pipeline);
    _(results).each(function(r) {
        r.ipcount = r.ipto - r.ipfrom + r.ipseg;
        delete r.ipto;
        delete r.ipfrom;
        sub.added('ipaddr_stat', Random.id(), r)
    });
    sub.ready()
});

//IP EVENT统计
Meteor.publish('ipEventStat', function(options) {
    if (!this.userId) throw new Meteor.Error('403', '没有登录，权限不足');
    if(!options.attr){
        throw new Meteor.Error('404', 'Not found!');
    }

    if(!options.limit){
        options.limit = 10;
    }

    var sub = this;
    var collection = Inspire.Collection.IPEvent;
    var projection = {
        _id: 0
    };
    projection[options.attr] = 1;

    var group = {
        _id: '$' + options.attr,
        value: {$sum: 1}
    };

    var projection1 = {
        _id: 0,
        name: '$_id',
        value: 1,
        attr: {$literal: options.attr}
    };

    if(options.attr == 'eventAt'){
        group = {
            _id: { $dayOfYear: '$' + options.attr},
            value: {$sum: 1},
            first: {$min: '$' + options.attr}
        };

        projection1 = {
            _id: 0,
            name: '$first',
            value: 1,
            attr: {$literal: options.attr}
        };
    }

    var pipeline = [
        {$project: projection},
        {$group: group},
        {$sort: {value: -1}},
        {$limit: options.limit},
        {$project: projection1}
    ];

    if (options.start && options.end) {
        var between = {$lte: new Date(options.end), $gte: new Date(options.start)};

        pipeline.unshift({$match: {eventAt: between}})
    }

    var results = collection.aggregate(pipeline);
    _(results).each(function(r) {
        sub.added('ipevent_stat', Random.id(), r)
    });
    sub.ready()
});
