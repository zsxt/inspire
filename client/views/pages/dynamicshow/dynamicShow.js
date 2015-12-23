// svg path for target icon
var targetSVG = "M9,0C4.029,0,0,4.029,0,9s4.029,9,9,9s9-4.029,9-9S13.971,0,9,0z M9,15.93 c-3.83,0-6.93-3.1-6.93-6.93S5.17,2.07,9,2.07s6.93,3.1,6.93,6.93S12.83,15.93,9,15.93 M12.5,9c0,1.933-1.567,3.5-3.5,3.5S5.5,10.933,5.5,9S7.067,5.5,9,5.5 S12.5,7.067,12.5,9z";
// svg path for plane icon
var planeSVG = "M19.671,8.11l-2.777,2.777l-3.837-0.861c0.362-0.505,0.916-1.683,0.464-2.135c-0.518-0.517-1.979,0.278-2.305,0.604l-0.913,0.913L7.614,8.804l-2.021,2.021l2.232,1.061l-0.082,0.082l1.701,1.701l0.688-0.687l3.164,1.504L9.571,18.21H6.413l-1.137,1.138l3.6,0.948l1.83,1.83l0.947,3.598l1.137-1.137V21.43l3.725-3.725l1.504,3.164l-0.687,0.687l1.702,1.701l0.081-0.081l1.062,2.231l2.02-2.02l-0.604-2.689l0.912-0.912c0.326-0.326,1.121-1.789,0.604-2.306c-0.452-0.452-1.63,0.101-2.135,0.464l-0.861-3.838l2.777-2.777c0.947-0.947,3.599-4.862,2.62-5.839C24.533,4.512,20.618,7.163,19.671,8.11z";

Template.dynamicShow.helpers({

    // For demo purpose
    // Example of notification list
    notifications : [
        {number: 1, labelClass: 'success', content: 'Please contact me', time: '09:00 pm'},
        {number: 2, labelClass: 'info', content: 'Sign a contract', time: '10:16 am'},
        {number: 3, labelClass: 'primary', content: 'Open new shop', time: '08.22 pm'},
        {number: 4, labelClass: 'default', content: 'Call back to Sylvia', time: '11:06 pm'},
        {number: 5, labelClass: 'primary', content: 'Write a letter to Sandra', time: '12:00 pm'}
    ]

});

Template.dynamicShow.rendered = function(){

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

    // Options and data for sparkline charts
    $("#sparkline8").sparkline([5, 6, 7, 2, 0, 4, 2, 4, 5, 7, 2, 4, 12, 14, 4, 2, 14, 12, 7], {
        type: 'bar',
        barWidth: 8,
        height: '150px',
        barColor: '#1ab394',
        negBarColor: '#c6c6c6'}
    );

    $(".bar_dashboard").peity("bar", {
        fill: ["#1ab394", "#d7d7d7"],
        width:100
    });

    var updatingChart = $(".updating-chart").peity("line", { fill: '#1ab394',stroke:'#169c81', width: 64 })

    setInterval(function() {
        var random = Math.round(Math.random() * 10)
        var values = updatingChart.text().split(",")
        values.shift()
        values.push(random)

        updatingChart
            .text(values.join(","))
            .change()
    }, 1000);





    //amChartsMapWithCurvedLines
    var areasData = [ {
        title: "Austria",
        id: "AT",
        color: "#67b7dc",
        customData: "1995",
        groupId: "before2004"
    }, {
        title: "Ireland",
        id: "IE",
        color: "#67b7dc",
        customData: "1973",
        groupId: "before2004"
    }, {
        title: "Denmark",
        id: "DK",
        color: "#67b7dc",
        customData: "1973",
        groupId: "before2004"
    }, {
        title: "Finland",
        id: "FI",
        color: "#67b7dc",
        customData: "1995",
        groupId: "before2004"
    }, {
        title: "Sweden",
        id: "SE",
        color: "#67b7dc",
        customData: "1995",
        groupId: "before2004"
    }, {
        title: "Great Britain",
        id: "GB",
        color: "#67b7dc",
        customData: "1973",
        groupId: "before2004"
    }, {
        title: "Italy",
        id: "IT",
        color: "#67b7dc",
        customData: "1957",
        groupId: "before2004"
    }, {
        title: "France",
        id: "FR",
        color: "#67b7dc",
        customData: "1957",
        groupId: "before2004"
    }, {
        title: "Spain",
        id: "ES",
        color: "#67b7dc",
        customData: "1986",
        groupId: "before2004"
    }, {
        title: "Greece",
        id: "GR",
        color: "#67b7dc",
        customData: "1981",
        groupId: "before2004"
    }, {
        title: "Germany",
        id: "DE",
        color: "#67b7dc",
        customData: "1957",
        groupId: "before2004"
    }, {
        title: "Belgium",
        id: "BE",
        color: "#67b7dc",
        customData: "1957",
        groupId: "before2004"
    }, {
        title: "Luxembourg",
        id: "LU",
        color: "#67b7dc",
        customData: "1957",
        groupId: "before2004"
    }, {
        title: "Netherlands",
        id: "NL",
        color: "#67b7dc",
        customData: "1957",
        groupId: "before2004"
    }, {
        title: "Portugal",
        id: "PT",
        color: "#67b7dc",
        customData: "1986",
        groupId: "before2004"
    },

    {
        title: "Lithuania",
        id: "LT",
        color: "#ebdb8b",
        customData: "2004",
        groupId: "2004"
    }, {
        title: "Latvia",
        id: "LV",
        color: "#ebdb8b",
        customData: "2004",
        groupId: "2004"
    }, {
        title: "Czech Republic ",
        id: "CZ",
        color: "#ebdb8b",
        customData: "2004",
        groupId: "2004"
    }, {
        title: "Slovakia",
        id: "SK",
        color: "#ebdb8b",
        customData: "2004",
        groupId: "2004"
    }, {
        title: "Slovenia",
        id: "SI",
        color: "#ebdb8b",
        customData: "2004",
        groupId: "2004"
    }, {
        title: "Estonia",
        id: "EE",
        color: "#ebdb8b",
        customData: "2004",
        groupId: "2004"
    }, {
        title: "Hungary",
        id: "HU",
        color: "#ebdb8b",
        customData: "2004",
        groupId: "2004"
    }, {
        title: "Cyprus",
        id: "CY",
        color: "#ebdb8b",
        customData: "2004",
        groupId: "2004"
    }, {
        title: "Malta",
        id: "MT",
        color: "#ebdb8b",
        customData: "2004",
        groupId: "2004"
    }, {
        title: "Poland",
        id: "PL",
        color: "#ebdb8b",
        customData: "2004",
        groupId: "2004"
    },

    {
        title: "Romania",
        id: "RO",
        color: "#83c2ba",
        customData: "2007",
        groupId: "2007"
    }, {
        title: "Bulgaria",
        id: "BG",
        color: "#83c2ba",
        customData: "2007",
        groupId: "2007"
    }, {
        title: "Croatia",
        id: "HR",
        color: "#db8383",
        customData: "2013",
        groupId: "2013"
    }];

    var linesData = [{
        latitudes: [51.5002, 50.4422],
        longitudes: [-0.1262, 30.5367]
    }, {
        latitudes: [51.5002, 46.9480],
        longitudes: [-0.1262, 7.4481]
    }, {
        latitudes: [51.5002, 59.3328],
        longitudes: [-0.1262, 18.0645]
    }, {
        latitudes: [51.5002, 40.4167],
        longitudes: [-0.1262, -3.7033]
    }, {
        latitudes: [51.5002, 46.0514],
        longitudes: [-0.1262, 14.5060]
    }, {
        latitudes: [51.5002, 48.2116],
        longitudes: [-0.1262, 17.1547]
    }, {
        latitudes: [51.5002, 44.8048],
        longitudes: [-0.1262, 20.4781]
    }, {
        latitudes: [51.5002, 55.7558],
        longitudes: [-0.1262, 37.6176]
    }, {
        latitudes: [51.5002, 38.7072],
        longitudes: [-0.1262, -9.1355]
    }, {
        latitudes: [51.5002, 54.6896],
        longitudes: [-0.1262, 25.2799]
    }, {
        latitudes: [51.5002, 64.1353],
        longitudes: [-0.1262, -21.8952]
    }, {
        latitudes: [51.5002, 40.4300],
        longitudes: [-0.1262, -74.0000]
    }];

    var imagesData = [{
        id: "london",
        svgPath: targetSVG,
        title: "London",
        latitude: 51.5002,
        longitude: -0.1262,
        scale: 1
    }, {
        svgPath: targetSVG,
        title: "Brussels",
        latitude: 50.8371,
        longitude: 4.3676,
        scale: 0.5
    }, {
        svgPath: targetSVG,
        title: "Prague",
        latitude: 50.0878,
        longitude: 14.4205,
        scale: 0.5
    }, {
        svgPath: targetSVG,
        title: "Athens",
        latitude: 37.9792,
        longitude: 23.7166,
        scale: 0.5
    }, {
        svgPath: targetSVG,
        title: "Reykjavik",
        latitude: 64.1353,
        longitude: -21.8952,
        scale: 0.5
    }, {
        svgPath: targetSVG,
        title: "Dublin",
        latitude: 53.3441,
        longitude: -6.2675,
        scale: 0.5
    }, {
        svgPath: targetSVG,
        title: "Oslo",
        latitude: 59.9138,
        longitude: 10.7387,
        scale: 0.5
    }, {
        svgPath: targetSVG,
        title: "Lisbon",
        latitude: 38.7072,
        longitude: -9.1355,
        scale: 0.5
    }, {
        svgPath: targetSVG,
        title: "Moscow",
        latitude: 55.7558,
        longitude: 37.6176,
        scale: 0.5
    }, {
        svgPath: targetSVG,
        title: "Belgrade",
        latitude: 44.8048,
        longitude: 20.4781,
        scale: 0.5
    }, {
        svgPath: targetSVG,
        title: "Bratislava",
        latitude: 48.2116,
        longitude: 17.1547,
        scale: 0.5
    }, {
        svgPath: targetSVG,
        title: "Ljubljana",
        latitude: 46.0514,
        longitude: 14.5060,
        scale: 0.5
    }, {
        svgPath: targetSVG,
        title: "Madrid",
        latitude: 40.4167,
        longitude: -3.7033,
        scale: 0.5
    }, {
        svgPath: targetSVG,
        title: "Stockholm",
        latitude: 59.3328,
        longitude: 18.0645,
        scale: 0.5
    }, {
        svgPath: targetSVG,
        title: "Bern",
        latitude: 46.9480,
        longitude: 7.4481,
        scale: 0.5
    }, {
        svgPath: targetSVG,
        title: "Kiev",
        latitude: 50.4422,
        longitude: 30.5367,
        scale: 0.5
    }, {
        svgPath: targetSVG,
        title: "Paris",
        latitude: 48.8567,
        longitude: 2.3510,
        scale: 0.5
    }, {
        svgPath: targetSVG,
        title: "New York",
        latitude: 40.43,
        longitude: -74,
        scale: 0.5
    }];

    mapWithCurvedLines('amChartsMapWithCurvedLines', areasData, linesData, imagesData);

};