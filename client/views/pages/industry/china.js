Template.industryChina.onCreated(function() {
  var instance = Template.instance()
  instance.autorun(function() {
      var subscription = instance.subscribe('industry_control_china');
  })
})

Template.industryChina.onRendered(function() {
  var dom = document.getElementById('chart');
  var map = echarts.init(dom);
  var data = [{
				name : '北京',
				value : 0
			}, {
				name : '天津',
				value : 0
			}, {
				name : '上海',
				value : 0
			}, {
				name : '重庆',
				value : 0
			}, {
				name : '河北',
				value : 0
			}, {
				name : '河南',
				value : 0
			}, {
				name : '云南',
				value : 0
			}, {
				name : '辽宁',
				value : 0
			}, {
				name : '黑龙江',
				value : 0
			}, {
				name : '湖南',
				value : 0
			}, {
				name : '安徽',
				value : 0
			}, {
				name : '山东',
				value : 0
			}, {
				name : '新疆',
				value : 0
			}, {
				name : '江苏',
				value : 0
			}, {
				name : '浙江',
				value : 0
			}, {
				name : '江西',
				value : 0
			}, {
				name : '湖北',
				value : 0
			}, {
				name : '广西',
				value : 0
			}, {
				name : '甘肃',
				value : 0
			}, {
				name : '山西',
				value : 0
			}, {
				name : '内蒙古',
				value : 0
			}, {
				name : '陕西',
				value : 0
			}, {
				name : '吉林',
				value :0
			}, {
				name : '福建',
				value : 0
			}, {
				name : '贵州',
				value : 0
			}, {
				name : '广东',
				value : 0
			}, {
				name : '青海',
				value : 0
			}, {
				name : '西藏',
				value : 0
			}, {
				name : '四川',
				value : 0
			}, {
				name : '宁夏',
				value : 0
			}, {
				name : '海南',
				value : 0
			}, {
				name : '台湾',
				value : 0
			}, {
				name : '香港',
				value : 0
			}, {
				name : '澳门',
				value : 0
			}
		];

  var mapOption = {
		//backgroundColor:'rgba(232, 232, 232, 1)',
		//color:['#da70d6','#cd5c5c'],
		title : {
			text : '',
			x : 'center',
			y : 'top'
		},
		tooltip : {
			trigger : 'item',
			formatter : '{b}:{c}'
		},
		/*legend : {
			orient : 'vertical',
			x : 'left',
			data : ['全国搜索结果']
		},*/
		dataRange : {
			x : 'left',
			y : 'bottom',
			color: ['orangered','yellow','lightskyblue'],
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
    var newData = result.fetch();

    var cities = _.pluck(newData, 'name');
    data = _.reject(data, function (d) {
      return _.contains(cities, d.name);
    })
    data = _.union(data, newData);
    mapOption.series[0].data = data;

    var max = 0;
    var sMax = 0;
    for (var i = 0; i < data.length; ++i) {
      if (data[i].value > max) {
        max = data[i].value;
      }
      if(data[i].value < max && data[i].value > sMax){
	sMax = data[i].value;
      }//倒数第二大的数
    }

    if(max - sMax > 20000){
	max = sMax;
    }//防止差距过大

    var segCount = 10;
    var size = max / segCount;
    var segs = [];
    for (var j = 1; j < segCount; ++j) {
      segs[segCount - j] = {
        start: size * j,
        end: size * (j + 1) - 1
      }
    }
    segs[segCount] = {end: size};
    segs[0] = {start: size * segCount - 1};
    mapOption.dataRange.splitList = segs;

    map.setOption(mapOption);
  })
});
