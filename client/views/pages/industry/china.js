Template.industryChina.onRendered(function() {
  var dom = document.getElementById('chart');
  var map = echarts.init(dom);

  var data = [{
				name : '北京',
				value : 3404
			}, {
				name : '天津',
				value : 931
			}, {
				name : '上海',
				value : 2785
			}, {
				name : '重庆',
				value : 1394
			}, {
				name : '河北',
				value : 2243
			}, {
				name : '河南',
				value : 2818
			}, {
				name : '云南',
				value : 1193
			}, {
				name : '辽宁',
				value : 7984
			}, {
				name : '黑龙江',
				value : 1548
			}, {
				name : '湖南',
				value : 1369
			}, {
				name : '安徽',
				value : 2660
			}, {
				name : '山东',
				value : 6028
			}, {
				name : '新疆',
				value : 732
			}, {
				name : '江苏',
				value : 11342
			}, {
				name : '浙江',
				value : 5223
			}, {
				name : '江西',
				value : 1810
			}, {
				name : '湖北',
				value : 1978
			}, {
				name : '广西',
				value : 1021
			}, {
				name : '甘肃',
				value : 828
			}, {
				name : '山西',
				value : 1786
			}, {
				name : '内蒙古',
				value : 1879
			}, {
				name : '陕西',
				value : 1704
			}, {
				name : '吉林',
				value :3248
			}, {
				name : '福建',
				value : 5905
			}, {
				name : '贵州',
				value : 1045
			}, {
				name : '广东',
				value : 38586
			}, {
				name : '青海',
				value : 116
			}, {
				name : '西藏',
				value : 130
			}, {
				name : '四川',
				value : 1744
			}, {
				name : '宁夏',
				value : 179
			}, {
				name : '海南',
				value : 511
			}, {
				name : '台湾',
				value : 77340
			}, {
				name : '香港',
				value : 11740
			}, {
				name : '澳门',
				value : 1209
			}
		];

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

  map.setOption(mapOption);
});
