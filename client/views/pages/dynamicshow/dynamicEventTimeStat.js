/**
 * Created by meteor on 12/25/15.
 */
var timeStatOptions = {
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

var timeStatData = {
    labels: [],
    datasets: [
        {
            label: "Dynamic event statistics",
            fillColor: "rgba(26,179,148,0.5)",
            strokeColor: "rgba(26,179,148,0.8)",
            highlightFill: "rgba(26,179,148,0.75)",
            highlightStroke: "rgba(26,179,148,1)",
            data: []
        }
    ]
};

Template.dynamicEventTimeStat.helpers({

});

Template.dynamicEventTimeStat.rendered = function(){
    var ctx = document.getElementById("flot-dashboard-chart").getContext("2d");
    var myNewChart = new Chart(ctx);
    myNewChart.Bar(timeStatData, timeStatOptions);
    this.timeStat.set(myNewChart);
};

Template.dynamicEventTimeStat.onCreated(function() {
    var instance = Template.instance();
    instance.timeStat = new ReactiveVar();

    instance.autorun(function() {
        var limit = 10;
        var subscription = instance.subscribe('ipEventStat', {
            attr: 'eventAt',
            limit: limit
        });

        if (subscription.ready()) {
            var ipEventStat = Inspire.Collection.IPEventStat.find().fetch();
            var labels = [];
            var data = [];
            ipEventStat.forEach(function(stat) {
                labels.push(stat.name.toLocaleDateString());
                data.push(stat.value);
            });

            var timeStat = instance.timeStat.get();
            if(timeStat){
                console.log(data);
                timeStatData.labels = labels;
                timeStatData.datasets[0].data = data;
                timeStat.Bar(timeStatData, timeStatOptions);
            }
        }
    })

});