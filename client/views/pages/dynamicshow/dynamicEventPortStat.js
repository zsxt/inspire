Template.dynamicEventPortStat.helpers({

});

Template.dynamicEventPortStat.rendered = function(){
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
};

Template.dynamicEventPortStat.onCreated(function() {
    var instance = Template.instance();


});