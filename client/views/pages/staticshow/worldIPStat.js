Template.worldIPStat.rendered = function(){
    // Options, data for map plugin

    var mapData = {
        "US": 298,
        "SA": 200,
        "DE": 220,
        "FR": 540,
        "CN": 120,
        "AU": 760,
        "BR": 550,
        "IN": 200,
        "GB": 120
    };

    $('#jvectormap-world').vectorMap({
        map: 'world_mill_en',
        backgroundColor: "transparent",
        regionStyle: {
            initial: {
                fill: '#e4e4e4',
                "fill-opacity": 0.9,
                stroke: 'none',
                "stroke-width": 0,
                "stroke-opacity": 0
            }
        },

        series: {
            regions: [{
                values: mapData,
                scale: ["#1ab394", "#22d6b1"],
                normalizeFunction: 'polynomial'
            }]
        }
    });

    //统计图标1
    var barData = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
            {
                label: "My First dataset",
                fillColor: "rgba(220,220,220,0.5)",
                strokeColor: "rgba(220,220,220,0.8)",
                highlightFill: "rgba(220,220,220,0.75)",
                highlightStroke: "rgba(220,220,220,1)",
                data: [65, 59, 80, 81, 56, 55, 40]
            },
            {
                label: "My Second dataset",
                fillColor: "rgba(26,179,148,0.5)",
                strokeColor: "rgba(26,179,148,0.8)",
                highlightFill: "rgba(26,179,148,0.75)",
                highlightStroke: "rgba(26,179,148,1)",
                data: [28, 48, 40, 19, 86, 27, 90]
            }
        ]
    };

    var barOptions = {
        scaleBeginAtZero: true,
        scaleShowGridLines: true,
        scaleGridLineColor: "rgba(0,0,0,.05)",
        scaleGridLineWidth: 1,
        barShowStroke: true,
        barStrokeWidth: 2,
        barValueSpacing: 5,
        barDatasetSpacing: 1,
        responsive: true
    };


    var ctx = document.getElementById("barChart").getContext("2d");
    var myNewChart = new Chart(ctx).Bar(barData, barOptions);
};

Template.worldIPStat.onCreated(function() {
    var instance = Template.instance();
    //instance.worldIP = new ReactiveVar();

    instance.autorun(function() {
        var limit = 5;
        var attr = 'addr.country';
        var subscription = instance.subscribe('ipAddrStat', {
            attr: attr,
            limit: limit
        });

        if (subscription.ready()) {
            var worldIPAddr = Inspire.Collection.IPAddrStat.find({attr: attr}).fetch();
            console.log(worldIPAddr);
            //var data = [];
            //var labelClass = ['success', 'info', 'primary', 'default', 'primary'];
            //for(var i=0; i<ipEventSrc.length; i++){
            //    data.push({
            //        number: i+1,
            //        count: ipEventSrc[i].value,
            //        labelClass: labelClass[i],
            //        ipsrc: ipEventSrc[i].name
            //    });
            //}

            //instance.ipSrc.set(data);
        }
    })

});