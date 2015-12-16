Template.icpAnalysis.rendered = function() {
  // Set white background color for top navbar
  $('body').addClass('light-navbar');

  function pie2d(domId, fields, data) {
      var chart = AmCharts.makeChart(domId, {
          "type": "pie",
          "startDuration": 1,
          "theme": "light",
          "addClassNames": true,
          "legend": {
              "position": "right",
              "marginRight": 150,
              "autoMargins": false,
              "valueWidth": 100
          },
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

  function column2d(domId, fields, data) {
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

  function chart(context, attr) {
    var id = context + attr.toLowerCase()
    var r = OtherData.findOne({context: context, attr: attr})
    pie2d('chart-pie-' + id, {category: 'id', value: 'value', yTitle: '数值'}, r.data);
    column2d('chart-line-' + id, {category: 'id', value: 'value', yTitle: '数值'}, r.data);
  }

  chart('zt', 'BBFS')
  chart('zt', 'LRYHLX')
  chart('wz', 'LRYHLX')
  chart('ymlb', 'POSTFIX')
  chart('ip', 'FPFS')
  chart('ip', 'IP_LX')
  chart('ip', 'SFGN')
}
