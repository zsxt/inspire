Template.industryChina.onCreated(function() {
  var instance = Template.instance()
  instance.autorun(function() {
      var subscription = instance.subscribe('industry_control_china');
  })
})

Template.industryChina.onRendered(function() {
  var dom = document.getElementById('chart');
  var map = echarts.init(dom);
  var data = [];

  var mapOption = {
		//backgroundColor:'rgba(232, 232, 232, 1)',
		color:['#da70d6','#cd5c5c'],
		title : {
			text : '全国大规模搜索呈现',
			x : 'center',
			y : 'bottom'
		},
		tooltip : {
			trigger : 'item',
			formatter : '{b}:{c}'
		},
		legend : {
			orient : 'vertical',
			x : 'left',
			data : ['全国搜索结果']
		},
		dataRange : {
			x : 'left',
			y : 'bottom',
			splitList : [{
					start : 15001,
					//color:'red'
				},{
					start :10001,
					end:15000
				},
				{
					start :4501,
					end:10000
				},{
					start : 3501,
					end:4500
				}, {
					start : 2501,
					end:3500
				}, {
					start : 2001,
					end:2500
				}, {
					start : 1501,
					end : 2000
				}, {
					start : 1001,
					end : 1500
				}, {
					start : 501,
					end : 1000
				}, {
					start : 101,
					end : 500,
				}, {
					end : 100,
					//color : 'white'
				}
			],
		},
		toolbox : {
			show : true,
			orient : 'vertical',
			x : 'right',
			y : 'center',
			feature : {
				mark : {
					show : true
				},
				dataView : {
					show : true,
					readOnly : false
				},
				restore : {
					show : true
				},
				saveAsImage : {
					show : true
				}
			}
		},
		roamController : {
			show : true,
			x : 'right',
			y : 'bottom',
			mapTypeControl : {
				'china' : true
			}
		},
		series : [{
				name : '全国搜索结果',
				type : 'map',
				mapType : 'china',
				roam : false,
				itemStyle : {
					normal : {
						borderColor : 'rgba(100,149,237,1)',
						borderWidth : 0.5,
						areaStyle : {
							color : '#1b1b1b'
						},
						label : {
							show : true,
						}
					},
					emphasis : {
						label : {
							show : true,
						}
					}
				},
				data : data
			}
		]
	};

  this.autorun(function() {
    var result = IndustryControlChina.find({});
    console.log(result.fetch());
    data = result.fetch();
    mapOption.series[0].data = data;
    var m = 0;
    for (var i = 0; i < data.length; ++i) {
      if (data[i].value > m) {
        m = data[i].value;
      }
    }

    var size = m / 6;
    var segs = [];
    for (var j = 1; j < 6; ++j) {
      segs[6 - j] = {
        start: size * j,
        end: size * (j + 1) - 1
      }
    }
    segs[6] = {end: size};
    segs[0] = {start: size * 6 - 1};
    mapOption.dataRange.splitList = segs;

    map.setOption(mapOption);
  })
});
