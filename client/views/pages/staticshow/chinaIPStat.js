Template.chinaIPStat.rendered = function(){
    //统计图标2
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
        animateScale: false,
        responsive: true
    };


    var ctx = document.getElementById("doughnutChart").getContext("2d");
    var myNewChart = new Chart(ctx).Doughnut(doughnutData, doughnutOptions);

    //统计图标3
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
        animateScale: false,
        responsive: true

    };

    var ctx = document.getElementById("polarChart").getContext("2d");
    var myNewChart = new Chart(ctx).PolarArea(polarData, polarOptions);
};

Template.chinaIPStat.onCreated(function() {
    var instance = Template.instance();
    //instance.worldIP = new ReactiveVar();

    instance.autorun(function() {
        var limit = 10;
        var attr = 'addr.province';
        var subscription = instance.subscribe('ipAddrStat', {
            attr: attr,
            limit: limit,
            match: {'addr.country': '中国'}
        });

        if (subscription.ready()) {
            var chinaIPAddr = Inspire.Collection.IPAddrStat.find({attr: attr}).fetch();
            console.log(chinaIPAddr);
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