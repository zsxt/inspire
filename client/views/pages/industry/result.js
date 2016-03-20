Template.industryResult.onCreated(function(){
	var instance = Template.instance()
	instance.autorun(function(){
		var subscription = instance.subscribe('industry_control_brand');
	})
})
Template.industryResult.onRendered(function(){
	var dom = document.getElementById('compBar');
	var bar = echarts.init(dom);
	var myBar = echarts.init(document.getElementById('mybar'));
		/*加载对象数据  first*/
		myBar.setOption({
			title : {
				text : '安防监控品牌Top 10',
				x : 'center',
				y : 'top',
			},
			tooltip : {
				trigger : 'item'
			},
			toolbox : {
				show : true,
				feature : {
					mark : {
						show : true
					},
					dataView : {
						show : true,
						readOnly : false
					},
					magicType : {
						show : true,
						type : ['line', 'bar']
					},
					restore : {
						show : true
					},
					saveAsImage : {
						show : true
					}
				}
			},
			grid : {
				x : 5,
				x2 : 5,
				y2 : 20,
			},
			xAxis : [{
					type : 'category',
					data : ['Hikvision', 'TVT', 'Dahua', 'D-Link', 'Sony', 'Samsung', 'AVTECH', 'GeoVision', 'Netwave', 'TRENDnet'],
					splitLine : {
						show : false,
					},
					axisTick : {
						interval : 0,
					},
					axisLabel : {
						show : false,
						interval : 0,
						rotate : -60,
						textStyle : {
							fontWeight : 'bold',
							color : function (params) {
								var colorList = [
									'#C1232B', '#B5C334', '#FCCE10', '#E87C25', '#27727B',
									'#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD'
					
								];
								return colorList[params.dataIndex];
							}
						}

					}
				}
			],
			yAxis : [{
					type : 'value'
				}
			],
			series : [{
					name : '数量',
					type : 'bar',
					data : [453925, 234121, 192364, 190753, 135013, 73860, 63983, 47523, 46869, 31046],
					itemStyle : {
						normal : {
							color : function (params) {
								// build a color map as your need.
								var colorList = [
									/* '#C1232B', '#B5C334', '#FCCE10', '#E87C25', '#27727B',
									'#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD', */
									'#4169E1' 
								];
								return colorList[0];
							},
							label : {
								show : true,
								position : 'top',
								formatter : '{b}\n{c}'
							}
						}
					},
					/* markPoint : {
					data : [{
					type : 'max',
					name : '最大值'
					}, {
					type : 'min',
					name : '最小值'
					}
					]
					}, */
					/* markLine : {
					data : [{
					type : 'average',
					name : '平均值'
					}
					]
					} */
				}
			]
		});
		//second
		var option ={
			title : {
				text : '系统对比',
				x : 'center',
				y : 'top',
			},
			tooltip : {
				trigger : 'item',
			},
			// legend : {
				// data : ['全国搜索结果', '全球搜索结果'],
				// orient : 'horizontal',
				// x : 'left'

			// },
			toolbox : {
				show : true,
				feature : {
					mark : {
						show : true
					},
					dataView : {
						show : true,
						readOnly : false
					},
					magicType : {
						show : true,
						type : ['line', 'bar']
					},
					restore : {
						show : true
					},
					saveAsImage : {
						show : true
					}
				}
			},
			calculable : true,
			grid : {
				x : 5,
				x2 : 5,
				y2 : 33,
			},
			xAxis : [{
					type : 'category',
					data : ['CNCERT', 'ZoomEye', 'SHODAN'],
					splitLine : {
						show : false,
					},
					axisTick : {
						interval : 0,
					},
					axisLabel : {
						show : true,
						interval : 0,
						textStyle : {
							fontSize:'20px',
							color : 'auto'
						}

					}
				}
			],
			yAxis : [{
					type : 'value'
				}
			],
			series : [{
					name : '全国搜索结果',
					type : 'bar',
					data : [198393,  121937, 28653],
					itemStyle : {
						normal : {
							color : function (params) {
								// build a color map as your need.
								var colorList = [
									'#4169E1', '#228B22', ' #9370DB',
								];
								return colorList[params.dataIndex]
							},
							label : {
								show : true,
								position : 'top',
								formatter : '{a}\n{b}:{c}'
							}
						}
					},
					/* markPoint : {
						data : [{
								type : 'max',
								name : '最大值'
							}
						]
					} */
				}, {
					name : '全球搜索结果',
					type : 'bar',
					data : [1419387,  1246925, 500618],
					itemStyle : {
						normal : {
							color : function (params) {
								// build a color map as your need.
								var colorList = [
									'#4169E1', '#228B22', ' #9370DB',
								];
								return colorList[params.dataIndex]
							},
							label : {
								show : true,
								position : 'top',
								formatter : '{a}\n{b}:{c}'
							}
						}
					},
					/* markPoint : {
						data : [{
								type : 'max',
								name : '最大值'
							}
						]
					}, */
				}
			]

		};
		bar.setOption(option);
		
		
})