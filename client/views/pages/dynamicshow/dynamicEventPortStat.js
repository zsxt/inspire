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

Template.dynamicEventPortStat.helpers({
    portSrcMax: function(){
        return Inspire.Collection.IPEventStat.findOne({
            attr: 'portsrc'
        },{
            $sort: {value: -1}
        });
    },
    portDstMax: function(){
        return Inspire.Collection.IPEventStat.findOne({
            attr: 'portdst'
        },{
            $sort: {value: -1}
        });
    }
});

Template.dynamicEventPortStat.rendered = function(){
    // construct doughnut chart
    var ctx = document.getElementById("ipEventPortSrcChart").getContext("2d");
    var DoughnutChart = new Chart(ctx);
    this.portSrcChart.set(DoughnutChart);

    // construct polar chart
    var ctx1 = document.getElementById("ipEventPortDstChart").getContext("2d");
    var Polarchart = new Chart(ctx1);
    this.portDstChart.set(Polarchart);
};

Template.dynamicEventPortStat.onCreated(function() {
    var instance = Template.instance();
    instance.portSrcChart = new ReactiveVar();
    instance.portDstChart = new ReactiveVar();

    instance.autorun(function() {
        var limit = 3;
        var subscription = instance.subscribe('ipEventStat', {
            attr: 'portsrc',
            limit: limit
        });

        if (subscription.ready()) {
            var ipEventStat = Inspire.Collection.IPEventStat.find({attr: 'portsrc'}).fetch();
            var doughnutData = [];
            var doughnutColor = ['#a3e1d4', '#dedede', '#b5b8cf'];
            for(var i=0; i<ipEventStat.length; i++){
                doughnutData.push({
                    value: ipEventStat[i].value,
                    color: doughnutColor[i],
                    highlight: "#1ab394",
                    label: ipEventStat[i].name
                })
            }

            var portSrcChart = instance.portSrcChart.get();
            if(portSrcChart){
                portSrcChart.Doughnut(doughnutData, doughnutOptions);
            }
        }


        subscription = instance.subscribe('ipEventStat', {
            attr: 'portdst',
            limit: limit
        });
        if (subscription.ready()) {
            var ipEvents = Inspire.Collection.IPEventStat.find({attr: 'portdst'}).fetch();
            var polarData = [];
            var polarDataColor = ['#a3e1d4', '#dedede', '#b5b8cf'];
            for(var i=0; i<ipEvents.length; i++){
                polarData.push({
                    value: ipEvents[i].value,
                    color: polarDataColor[i],
                    highlight: "#1ab394",
                    label: ipEvents[i].name
                })
            }

            var portDstChart = instance.portDstChart.get();
            if(portDstChart){
                portDstChart.PolarArea(polarData, polarOptions);
            }
        }
    })
});