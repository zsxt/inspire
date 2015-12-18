Template.basicProfile.helpers({

});

Template.basicProfile.events({
    'change input[id=searchIP]': function(event, instance) {
        event.preventDefault();
        var inputIP = instance.find("#searchIP").value;
        var ip_bigint = instance.IPCovertToInt(inputIP);
        console.log(ip_bigint);
        return instance.searchIP.set(ip_bigint);
    }
});

Template.basicProfile.onCreated(function() {
    var instance = Template.instance();
    instance.searchIP = new ReactiveVar(0);
    instance.map = new ReactiveVar();
    instance.autorun(function() {
        var subscription = instance.subscribe('findIPbyBigint', instance.searchIP.get());
        if (subscription.ready()) {
            var ips = Inspire.Collection.IPAddr.find().fetch();
            ips.forEach(function(ip){
                var map = instance.map.get();
                L.marker([ip.addr.lat, ip.addr.lng]).addTo(map)
                    .bindPopup(ip.addr.country+ip.addr.province+ip.addr.city+ip.addr.district+ip.addr.street);
            });
        }
    });

    instance.IPCovertToInt = function(ip) {
        ip = ip.split(".");
        var num = Number(ip[0]) * 256 * 256 * 256 + Number(ip[1]) * 256 * 256 + Number(ip[2]) * 256 + Number(ip[3]);
        num = num >>> 0;
        return num;
    };
});

Template.basicProfile.rendered = function(){
    //leaflet map
    L.Icon.Default.imagePath = 'packages/bevanhunt_leaflet/images';
    var map = L.map('dmap', {
        doubleClickZoom: false
    }).setView([0, 0], 2);

    L.tileLayer.provider('OpenStreetMap.HOT').addTo(map);
    this.map.set(map);

    // Options, data for doughnut chart
    var doughnutData = [
        {
            value: 300,
            color: "#a3e1d4",
            highlight: "#1ab394",
            label: "App"
        },
        {
            value: 50,
            color: "#dedede",
            highlight: "#1ab394",
            label: "Software"
        },
        {
            value: 100,
            color: "#b5b8cf",
            highlight: "#1ab394",
            label: "Laptop"
        }
    ];

    var doughnutOptions = {
        segmentShowStroke: true,
        segmentStrokeColor: "#fff",
        segmentStrokeWidth: 2,
        percentageInnerCutout: 45, // This is 0 for Pie charts
        animationSteps: 100,
        animationEasing: "easeOutBounce",
        animateRotate: true,
        animateScale: false
    };

    var ctx = document.getElementById("doughnutChart").getContext("2d");
    var DoughnutChart = new Chart(ctx).Doughnut(doughnutData, doughnutOptions);

    // Options/data for polar chart
    var polarData = [
        {
            value: 300,
            color: "#a3e1d4",
            highlight: "#1ab394",
            label: "App"
        },
        {
            value: 140,
            color: "#dedede",
            highlight: "#1ab394",
            label: "Software"
        },
        {
            value: 200,
            color: "#b5b8cf",
            highlight: "#1ab394",
            label: "Laptop"
        }
    ];

    var polarOptions = {
        scaleShowLabelBackdrop: true,
        scaleBackdropColor: "rgba(255,255,255,0.75)",
        scaleBeginAtZero: true,
        scaleBackdropPaddingY: 1,
        scaleBackdropPaddingX: 1,
        scaleShowLine: true,
        segmentShowStroke: true,
        segmentStrokeColor: "#fff",
        segmentStrokeWidth: 2,
        animationSteps: 100,
        animationEasing: "easeOutBounce",
        animateRotate: true,
        animateScale: false
    };
    var ctx = document.getElementById("polarChart").getContext("2d");
    var Polarchart = new Chart(ctx).PolarArea(polarData, polarOptions);

    // Options/data for flot chart
    var data1 = [
        [0,4],[1,8],[2,5],[3,10],[4,4],[5,16],[6,5],[7,11],[8,6],[9,11],[10,30],[11,10],[12,13],[13,4],[14,3],[15,3],[16,6]
    ];
    var data2 = [
        [0,1],[1,0],[2,2],[3,0],[4,1],[5,3],[6,1],[7,5],[8,2],[9,3],[10,2],[11,1],[12,0],[13,2],[14,8],[15,0],[16,0]
    ];

    $("#flot-dashboard-chart").length && $.plot($("#flot-dashboard-chart"), [
            data1, data2
        ],
        {
            series: {
                lines: {
                    show: false,
                    fill: true
                },
                splines: {
                    show: true,
                    tension: 0.4,
                    lineWidth: 1,
                    fill: 0.4
                },
                points: {
                    radius: 0,
                    show: true
                },
                shadowSize: 2
            },
            grid: {
                hoverable: true,
                clickable: true,
                tickColor: "#d5d5d5",
                borderWidth: 1,
                color: '#d5d5d5'
            },
            colors: ["#1ab394", "#464f88"],
            xaxis:{
            },
            yaxis: {
                ticks: 4
            },
            tooltip: false
        }
    );
};