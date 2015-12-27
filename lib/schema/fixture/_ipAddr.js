/**
 * Created by meteor on 12/17/15.
 */
Inspire.Seed.IPAddr = function(){
    if (Inspire.Collection.IPAddr.findOne()) {
        return;
    }

    console.log('Construct IP Address.......');

    var newIP1 ={
        "ipfrom": 16777472,
        "ipto": 16778239,
        "addr": {
            "country": '中国',
            "province": '福建',
            "city": '三明',
            "district": '尤溪县',
            "lat": 25.908899,
            "lng": 118.125809
        },
        "access": {
            "operator1": '电信'
        }
    };

    var newIP2 ={
        "ipfrom": 16908800,
        "ipto": 16909055,
        "addr": {
            "country": '中国',
            "province": '北京市',
            "city": '北京',
            "district": '西城区',
            "street": '地安门西大街',
            "lat": 39.9388838,
            "lng": 116.3974589
        },
        "access": {
            "operator1": '联通'
        }
    };

    var newIP3 ={
        "ipfrom": 16910592,
        "ipto": 16912383,
        "addr": {
            "country": '中国',
            "province": '广东',
            "city": '广州',
            "district": '番禺区',
            "street": 'G1501(广州绕城高速公路)',
            "lat": 22.858749,
            "lng": 113.419327
        },
        "access": {
            "operator1": '电信'
        }
    };

    var newIPCreated = Inspire.Collection.IPAddr.insert(newIP1);
    console.log('IP is created :' + newIPCreated);

    newIPCreated = Inspire.Collection.IPAddr.insert(newIP2);
    console.log('IP is created :' + newIPCreated);

    newIPCreated = Inspire.Collection.IPAddr.insert(newIP3);
    console.log('IP is created :' + newIPCreated);
};