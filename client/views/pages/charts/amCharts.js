AmCharts_path = '/packages/em0ney_amcharts/lib'

pie2d = function(domId, fields, data) {
    var chart = AmCharts.makeChart(domId, {
        "type": "pie",
        "startDuration": 1,
        "theme": "light",
        "addClassNames": true,
        // "legend": {
        //     "position": "right",
        //     "marginRight": 150,
        //     "autoMargins": false,
        //     "valueWidth": 100
        // },
        "labelsEnabled": false,
        "innerRadius": "30%",
        "defs": {
            "filter": [{
                "id": "shadow",
                "width": "200%",
                "height": "200%",
                "feOffset": {
                    "result": "offOut",
                    "in": "SourceAlpha",
                    "dx": 0,
                    "dy": 0
                },
                "feGaussianBlur": {
                    "result": "blurOut",
                    "in": "offOut",
                    "stdDeviation": 5
                },
                "feBlend": {
                    "in": "SourceGraphic",
                    "in2": "blurOut",
                    "mode": "normal"
                }
            }]
        },
        "dataProvider": data,
        "valueField": fields && fields.value || 'value',
        "titleField": fields && fields.category || 'category',
        // "export": {
        //     "enabled": true
        // }
    });
}

column2d = function(domId, fields, data) {
  AmCharts.makeChart(domId, {
      type: 'serial',
      theme: 'light',
      dataProvider: data,
      "valueAxes": [{
          "gridColor": "#FFFFFF",
          "gridAlpha": 0.2,
          "dashLength": 0,
          "position": "left",
          "title": fields && fields.yTitle
      }],
      "gridAboveGraphs": true,
      "startDuration": 1,
      "graphs": [{
          "balloonText": "[[category]]: <b>[[value]]</b>",
          "fillAlphas": 0.8,
          "lineAlpha": 0.2,
          "type": "column",
          "valueField": fields && fields.value || 'value'
      }],
      "chartCursor": {
          "categoryBalloonEnabled": false,
          "cursorAlpha": 0,
          "zoomable": false
      },
      "categoryField": fields && fields.category || 'category',
      "categoryAxis": {
          "autoGridCount": false,
          "gridPosition": "mid",
          "gridAlpha": 0,
          "tickPosition": "mid",
          "tickLength": 10,
          "title": fields && fields.xTitle,
          "autoRotateCount": 10,
          "autoRotateAngle": 45,
          "gridCount": data.length
      },
      // "export": {
      //     "enabled": true
      // }
  });
}

line = function(domId, fields, data) {
    var chartData = data;
    var chart = AmCharts.makeChart(domId, {
        "pathToImages": "/packages/em0ney_amcharts/lib/images/",
        "type": "serial",
        "theme": "light",
        "marginRight": 80,
        "autoMarginOffset": 20,
        "marginTop": 7,
        "dataProvider": chartData,
        "valueAxes": [{
            "axisAlpha": 0.2,
            "dashLength": 1,
            "position": "left"
        }],
        "mouseWheelZoomEnabled": true,
        "graphs": [{
            "id": "g1",
            "balloonText": "[[category]]<br/><b><span style='font-size:14px;'>value: [[value]]</span></b>",
            "bullet": "round",
            "bulletBorderAlpha": 1,
            "bulletColor": "#FFFFFF",
            "hideBulletsCount": 50,
            "title": "red line",
            "valueField": fields && fields.value || "value",
            "useLineColorForBulletBorder": true
        }],
        "chartScrollbar": {
            "oppositeAxis": false,
            "autoGridCount": true,
            "graph": "g1",
            "scrollbarHeight": 40
        },
        "chartCursor": {

        },
        "categoryField": fields && fields.date || "date",
        "categoryAxis": {
            "parseDates": true,
            "axisColor": "#DADADA",
            "dashLength": 1,
            "minorGridEnabled": true
        },
        // "export": {
        //     "enabled": true
        // }
    });

    chart.addListener("rendered", zoomChart);
    zoomChart();

    // this method is called when chart is first inited as we listen for "dataUpdated" event
    function zoomChart() {
        // different zoom methods can be used - zoomToIndexes, zoomToDates, zoomToCategoryValues
        chart.zoomToIndexes(chartData.length - 40, chartData.length - 1);
    }

}
