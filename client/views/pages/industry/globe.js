Template.industryGlobe.onCreated(function(){
	var instance = Template.instance()
	instance.autorun(function(){
		var subscription = instance.subscribe('industry_control_globe');
	})
})
Template.industryGlobe.onRendered(function(){
	var dom = document.getElementById("chart");
	var map = echarts.init(dom);

	var globeData =[{
				name : 'Afghanistan',
				value : 0
			}, {
				name : 'Angola',
				value : 0
			}, {
				name : 'Albania',
				value : 0
			}, {
				name : 'United Arab Emirates',
				value : 0
			}, {
				name : 'Argentina',
				value : 0
			}, {
				name : 'Armenia',
				value : 0
			}, {
				name : 'French Southern and Antarctic Lands',
				value : 0
			}, {
				name : 'Australia',
				value : 0
			}, {
				name : 'Austria',
				value : 0
			}, {
				name : 'Azerbaijan',
				value : 0
			}, {
				name : 'Burundi',
				value : 0
			}, {
				name : 'Belgium',
				value : 0
			}, {
				name : 'Benin',
				value : 0
			}, {
				name : 'Burkina Faso',
				value : 0
			}, {
				name : 'Bangladesh',
				value : 0
			}, {
				name : 'Bulgaria',
				value : 0
			}, {
				name : 'The Bahamas',
				value : 0
			}, {
				name : 'Bosnia and Herzegovina',
				value : 0
			}, {
				name : 'Belarus',
				value : 0
			}, {
				name : 'Belize',
				value : 0
			}, {
				name : 'Bermuda',
				value : 0
			}, {
				name : 'Bolivia',
				value : 0
			}, {
				name : 'Brazil',
				value : 0
			}, {
				name : 'Brunei',
				value : 0
			}, {
				name : 'Bhutan',
				value : 0
			}, {
				name : 'Botswana',
				value : 0
			}, {
				name : 'Central African Republic',
				value : 0
			}, {
				name : 'Canada',
				value : 0
			}, {
				name : 'Switzerland',
				value : 0
			}, {
				name : 'Chile',
				value : 0
			}, {
				name : 'China',
				value : 0
			}, {
				name : 'Ivory Coast',
				value : 0
			}, {
				name : 'Cameroon',
				value : 0
			}, {
				name : 'Democratic Republic of the Congo',
				value : 0
			}, {
				name : 'Republic of the Congo',
				value : 0
			}, {
				name : 'Colombia',
				value : 0
			}, {
				name : 'Costa Rica',
				value : 0
			}, {
				name : 'Cuba',
				value : 0
			}, {
				name : 'Northern Cyprus',
				value : 0
			}, {
				name : 'Cyprus',
				value : 0
			}, {
				name : 'Czech Republic',
				value : 0
			}, {
				name : 'Germany',
				value : 0
			}, {
				name : 'Djibouti',
				value : 0
			}, {
				name : 'Denmark',
				value : 0
			}, {
				name : 'Dominican Republic',
				value : 0
			}, {
				name : 'Algeria',
				value : 0
			}, {
				name : 'Ecuador',
				value : 0
			}, {
				name : 'Egypt',
				value : 0
			}, {
				name : 'Eritrea',
				value : 0
			}, {
				name : 'Spain',
				value : 0
			}, {
				name : 'Estonia',
				value : 0
			}, {
				name : 'Ethiopia',
				value : 0
			}, {
				name : 'Finland',
				value : 0
			}, {
				name : 'Fiji',
				value : 0
			}, {
				name : 'Falkland Islands',
				value : 0
			}, {
				name : 'France',
				value : 0
			}, {
				name : 'Gabon',
				value : 0
			}, {
				name : 'United Kingdom',
				value : 0
			}, {
				name : 'Georgia',
				value : 0
			}, {
				name : 'Ghana',
				value : 0
			}, {
				name : 'Guinea',
				value : 0
			}, {
				name : 'Gambia',
				value : 0
			}, {
				name : 'Guinea Bissau',
				value : 0
			}, {
				name : 'Equatorial Guinea',
				value : 0
			}, {
				name : 'Greece',
				value : 0
			}, {
				name : 'Greenland',
				value : 0
			}, {
				name : 'Guatemala',
				value : 0
			}, {
				name : 'French Guiana',
				value : 0
			}, {
				name : 'Guyana',
				value : 0
			}, {
				name : 'Honduras',
				value : 0
			}, {
				name : 'Croatia',
				value : 0
			}, {
				name : 'Haiti',
				value : 0
			}, {
				name : 'Hungary',
				value : 0
			}, {
				name : 'Indonesia',
				value : 0
			}, {
				name : 'India',
				value : 0
			}, {
				name : 'Ireland',
				value : 0
			}, {
				name : 'Iran',
				value : 0
			}, {
				name : 'Iraq',
				value : 0
			}, {
				name : 'Iceland',
				value : 0
			}, {
				name : 'Israel',
				value : 0
			}, {
				name : 'Italy',
				value : 0
			}, {
				name : 'Jamaica',
				value : 0
			}, {
				name : 'Jordan',
				value : 0
			}, {
				name : 'Japan',
				value : 0
			}, {
				name : 'Kazakhstan',
				value : 0
			}, {
				name : 'Kenya',
				value : 0
			}, {
				name : 'Kyrgyzstan',
				value : 0
			}, {
				name : 'Cambodia',
				value : 0
			}, {
				name : 'South Korea',
				value : 0
			}, {
				name : 'Kosovo',
				value : 0
			}, {
				name : 'Kuwait',
				value : 0
			}, {
				name : 'Laos',
				value : 0
			}, {
				name : 'Lebanon',
				value : 0
			}, {
				name : 'Liberia',
				value : 0
			}, {
				name : 'Libya',
				value : 0
			}, {
				name : 'Sri Lanka',
				value : 0
			}, {
				name : 'Lesotho',
				value : 0
			}, {
				name : 'Lithuania',
				value : 0
			}, {
				name : 'Luxembourg',
				value : 0
			}, {
				name : 'Latvia',
				value : 0
			}, {
				name : 'Morocco',
				value : 0
			}, {
				name : 'Moldova',
				value : 0
			}, {
				name : 'Madagascar',
				value : 0
			}, {
				name : 'Mexico',
				value : 0
			}, {
				name : 'Macedonia',
				value : 0
			}, {
				name : 'Mali',
				value : 0
			}, {
				name : 'Myanmar',
				value : 0
			}, {
				name : 'Montenegro',
				value : 0
			}, {
				name : 'Mongolia',
				value : 0
			}, {
				name : 'Mozambique',
				value : 0
			}, {
				name : 'Mauritania',
				value : 0
			}, {
				name : 'Malawi',
				value : 0
			}, {
				name : 'Malaysia',
				value : 0
			}, {
				name : 'Namibia',
				value : 0
			}, {
				name : 'New Caledonia',
				value : 0
			}, {
				name : 'Niger',
				value : 0
			}, {
				name : 'Nigeria',
				value : 0
			}, {
				name : 'Nicaragua',
				value : 0
			}, {
				name : 'Netherlands',
				value : 0
			}, {
				name : 'Norway',
				value : 0
			}, {
				name : 'Nepal',
				value : 0
			}, {
				name : 'New Zealand',
				value : 0
			}, {
				name : 'Oman',
				value : 0
			}, {
				name : 'Pakistan',
				value : 0
			}, {
				name : 'Panama',
				value : 0
			}, {
				name : 'Peru',
				value : 0
			}, {
				name : 'Philippines',
				value : 0
			}, {
				name : 'Papua New Guinea',
				value : 0
			}, {
				name : 'Poland',
				value : 0
			}, {
				name : 'Puerto Rico',
				value : 0
			}, {
				name : 'North Korea',
				value : 0
			}, {
				name : 'Portugal',
				value : 0
			}, {
				name : 'Paraguay',
				value : 0
			}, {
				name : 'Qatar',
				value : 0
			}, {
				name : 'Romania',
				value : 0
			}, {
				name : 'Russia',
				value : 0
			}, {
				name : 'Rwanda',
				value : 0
			}, {
				name : 'Western Sahara',
				value : 0
			}, {
				name : 'Saudi Arabia',
				value : 0
			}, {
				name : 'Sudan',
				value : 0
			}, {
				name : 'South Sudan',
				value : 0
			}, {
				name : 'Senegal',
				value : 0
			}, {
				name : 'Solomon Islands',
				value : 0
			}, {
				name : 'Sierra Leone',
				value : 0
			}, {
				name : 'El Salvador',
				value : 0
			}, {
				name : 'Somaliland',
				value : 0
			}, {
				name : 'Somalia',
				value : 0
			}, {
				name : 'Republic of Serbia',
				value : 0
			}, {
				name : 'Suriname',
				value : 0
			}, {
				name : 'Slovakia',
				value : 0
			}, {
				name : 'Slovenia',
				value : 0
			}, {
				name : 'Sweden',
				value : 0
			}, {
				name : 'Swaziland',
				value : 0
			}, {
				name : 'Syria',
				value : 0
			}, {
				name : 'Chad',
				value : 0
			}, {
				name : 'Togo',
				value : 0
			}, {
				name : 'Thailand',
				value : 0
			}, {
				name : 'Tajikistan',
				value : 0
			}, {
				name : 'Turkmenistan',
				value : 0
			}, {
				name : 'East Timor',
				value : 0
			}, {
				name : 'Trinidad and Tobago',
				value : 0
			}, {
				name : 'Tunisia',
				value : 0
			}, {
				name : 'Turkey',
				value : 0
			}, {
				name : 'United Republic of Tanzania',
				value : 0
			}, {
				name : 'Uganda',
				value : 0
			}, {
				name : 'Ukraine',
				value : 0
			}, {
				name : 'Uruguay',
				value : 0
			}, {
				name : 'United States of America',
				value : 0
			}, {
				name : 'Uzbekistan',
				value : 0
			}, {
				name : 'Venezuela',
				value : 0
			}, {
				name : 'Vietnam',
				value : 0
			}, {
				name : 'Vanuatu',
				value : 0
			}, {
				name : 'West Bank',
				value : 0
			}, {
				name : 'Yemen',
				value : 0
			}, {
				name : 'South Africa',
				value : 0
			}, {
				name : 'Zambia',
				value : 0
			}, {
				name : 'Zimbabwe',
				value : 0
			}
		];
		
		var nameMap = {
			'Afghanistan' : '阿富汗',
			'Angola' : '安哥拉',
			'Albania' : '阿尔巴尼亚',
			'United Arab Emirates' : '阿联酋',
			'Argentina' : '阿根廷',
			'Armenia' : '亚美尼亚',
			'French Southern and Antarctic Lands' : '法属南半球和南极领地',
			'Australia' : '澳大利亚',
			'Austria' : '奥地利',
			'Azerbaijan' : '阿塞拜疆',
			'Burundi' : '布隆迪',
			'Belgium' : '比利时',
			'Benin' : '贝宁',
			'Burkina Faso' : '布基纳法索',
			'Bangladesh' : '孟加拉国',
			'Bulgaria' : '保加利亚',
			'The Bahamas' : '巴哈马',
			'Bosnia and Herzegovina' : '波斯尼亚和黑塞哥维那',
			'Belarus' : '白俄罗斯',
			'Belize' : '伯利兹',
			'Bermuda' : '百慕大',
			'Bolivia' : '玻利维亚',
			'Brazil' : '巴西',
			'Brunei' : '文莱',
			'Bhutan' : '不丹',
			'Botswana' : '博茨瓦纳',
			'Central African Republic' : '中非共和国',
			'Canada' : '加拿大',
			'Switzerland' : '瑞士',
			'Chile' : '智利',
			'China' : '中国',
			'Ivory Coast' : '象牙海岸',
			'Cameroon' : '喀麦隆',
			'Democratic Republic of the Congo' : '刚果民主共和国',
			'Republic of the Congo' : '刚果共和国',
			'Colombia' : '哥伦比亚',
			'Costa Rica' : '哥斯达黎加',
			'Cuba' : '古巴',
			'Northern Cyprus' : '北塞浦路斯',
			'Cyprus' : '塞浦路斯',
			'Czech Republic' : '捷克共和国',
			'Germany' : '德国',
			'Djibouti' : '吉布提',
			'Denmark' : '丹麦',
			'Dominican Republic' : '多明尼加共和国',
			'Algeria' : '阿尔及利亚',
			'Ecuador' : '厄瓜多尔',
			'Egypt' : '埃及',
			'Eritrea' : '厄立特里亚',
			'Spain' : '西班牙',
			'Estonia' : '爱沙尼亚',
			'Ethiopia' : '埃塞俄比亚',
			'Finland' : '芬兰',
			'Fiji' : '斐济',
			'Falkland Islands' : '福克兰群岛',
			'France' : '法国',
			'Gabon' : '加蓬',
			'United Kingdom' : '英国',
			'Georgia' : '格鲁吉亚',
			'Ghana' : '加纳',
			'Guinea' : '几内亚',
			'Gambia' : '冈比亚',
			'Guinea Bissau' : '几内亚比绍',
			'Equatorial Guinea' : '赤道几内亚',
			'Greece' : '希腊',
			'Greenland' : '格陵兰',
			'Guatemala' : '危地马拉',
			'French Guiana' : '法属圭亚那',
			'Guyana' : '圭亚那',
			'Honduras' : '洪都拉斯',
			'Croatia' : '克罗地亚',
			'Haiti' : '海地',
			'Hungary' : '匈牙利',
			'Indonesia' : '印尼',
			'India' : '印度',
			'Ireland' : '爱尔兰',
			'Iran' : '伊朗',
			'Iraq' : '伊拉克',
			'Iceland' : '冰岛',
			'Israel' : '以色列',
			'Italy' : '意大利',
			'Jamaica' : '牙买加',
			'Jordan' : '约旦',
			'Japan' : '日本',
			'Kazakhstan' : '哈萨克斯坦',
			'Kenya' : '肯尼亚',
			'Kyrgyzstan' : '吉尔吉斯斯坦',
			'Cambodia' : '柬埔寨',
			'South Korea' : '韩国',
			'Kosovo' : '科索沃',
			'Kuwait' : '科威特',
			'Laos' : '老挝',
			'Lebanon' : '黎巴嫩',
			'Liberia' : '利比里亚',
			'Libya' : '利比亚',
			'Sri Lanka' : '斯里兰卡',
			'Lesotho' : '莱索托',
			'Lithuania' : '立陶宛',
			'Luxembourg' : '卢森堡',
			'Latvia' : '拉脱维亚',
			'Morocco' : '摩洛哥',
			'Moldova' : '摩尔多瓦',
			'Madagascar' : '马达加斯加',
			'Mexico' : '墨西哥',
			'Macedonia' : '马其顿',
			'Mali' : '马里',
			'Myanmar' : '缅甸',
			'Montenegro' : '黑山',
			'Mongolia' : '蒙古',
			'Mozambique' : '莫桑比克',
			'Mauritania' : '毛里塔尼亚',
			'Malawi' : '马拉维',
			'Malaysia' : '马来西亚',
			'Namibia' : '纳米比亚',
			'New Caledonia' : '新喀里多尼亚',
			'Niger' : '尼日尔',
			'Nigeria' : '尼日利亚',
			'Nicaragua' : '尼加拉瓜',
			'Netherlands' : '荷兰',
			'Norway' : '挪威',
			'Nepal' : '尼泊尔',
			'New Zealand' : '新西兰',
			'Oman' : '阿曼',
			'Pakistan' : '巴基斯坦',
			'Panama' : '巴拿马',
			'Peru' : '秘鲁',
			'Philippines' : '菲律宾',
			'Papua New Guinea' : '巴布亚新几内亚',
			'Poland' : '波兰',
			'Puerto Rico' : '波多黎各',
			'North Korea' : '北朝鲜',
			'Portugal' : '葡萄牙',
			'Paraguay' : '巴拉圭',
			'Qatar' : '卡塔尔',
			'Romania' : '罗马尼亚',
			'Russia' : '俄罗斯',
			'Rwanda' : '卢旺达',
			'Western Sahara' : '西撒哈拉',
			'Saudi Arabia' : '沙特阿拉伯',
			'Sudan' : '苏丹',
			'South Sudan' : '南苏丹',
			'Senegal' : '塞内加尔',
			'Solomon Islands' : '所罗门群岛',
			'Sierra Leone' : '塞拉利昂',
			'El Salvador' : '萨尔瓦多',
			'Somaliland' : '索马里兰',
			'Somalia' : '索马里',
			'Republic of Serbia' : '塞尔维亚共和国',
			'Suriname' : '苏里南',
			'Slovakia' : '斯洛伐克',
			'Slovenia' : '斯洛文尼亚',
			'Sweden' : '瑞典',
			'Swaziland' : '斯威士兰',
			'Syria' : '叙利亚',
			'Chad' : '乍得',
			'Togo' : '多哥',
			'Thailand' : '泰国',
			'Tajikistan' : '塔吉克斯坦',
			'Turkmenistan' : '土库曼斯坦',
			'East Timor' : '东帝汶',
			'Trinidad and Tobago' : '特里尼达和多巴哥',
			'Tunisia' : '突尼斯',
			'Turkey' : '土耳其',
			'United Republic of Tanzania' : '坦桑尼亚联合共和国',
			'Uganda' : '乌干达',
			'Ukraine' : '乌克兰',
			'Uruguay' : '乌拉圭',
			'United States of America' : '美国',
			'Uzbekistan' : '乌兹别克斯坦',
			'Venezuela' : '委内瑞拉',
			'Vietnam' : '越南',
			'Vanuatu' : '瓦努阿图',
			'West Bank' : '西岸',
			'Yemen' : '也门',
			'South Africa' : '南非',
			'Zambia' : '赞比亚',
			'Zimbabwe' : '津巴布韦'
		}; 
	var globeOption = {
			//backgroundColor:'rgba(232, 232, 232, 1)',
			tooltip : {
				trigger : 'item',
				formatter : function (params) {
					var value = params.value.toString();
					value = value.replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,');
					return params.name + ':' + value + '</br>' //+ '所占比例：' + Math.round((params.value / sum) * 10000) / 100 + '%'
				} 
			},
			title : {
				text : '',
				x : 'center',
				y : 'top',	
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
			dataRange : {
				x : 'left',
				y : 'bottom',
				splitList : [{
						start : 100001,
						//color:'red'
					},{
						start :60001,
						end:100000
					},{
						start :20001,
						end:60000
					},{
						start :10001,
						end:20000
					}, 
					{
						start :4501,
						end:10000
					},{
						start : 3501,
						end:4500
					},{
						start : 2001,
						end:3500
					}, {
						start : 1001,
						end : 2000
					}, {
						start : 101,
						end : 1000
					}, {	
						end : 100,
						//color : 'white'
					}
				]
			},
			roamController : {
				show : true,
				x : 'right',
				y : 'bottom',
				mapTypeControl : {
					'world' : true
				}
			},
			series : [{
					name : '全球各国设备数量',
					type : 'map',
					mapType : 'world',
					roam : false,
					itemStyle : {
						normal : {
							borderColor : 'rgba(100,149,237,1)',
							borderWidth : 0.5,
							areaStyle : {
								color : '#1b1b1b'
							},
							label : {
								show : false,
							}
						},
						emphasis : {
							label : {
								show : true,
							}
						}
					},
					data : globeData,
					nameMap:nameMap
					// 自定义名称,
					
				} 
			]
		};
this.autorun(function(){
	var resultGlobe = IndustryControlGlobe.find({});
	var dataGlobe = resultGlobe.fetch();
	//console.log(dataGlobe);
	var countrys = _.pluck(dataGlobe,'country');
	globeData = _.reject(globeData,function(d){
		return  _.contains(countrys,d.name);
	})
	globeData = _.union(globeData,dataGlobe);
	globeOption.series[0].data = globeData;
	globeOption.series[0].nameMap = nameMap;

	//console.log(globeData);

	var m = 0;
    	for (var i = 0; i < globeData.length; ++i) {
      	if (globeData[i].value > m) {
        	m = globeData[i].value;
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

    	globeOption.dataRange.splitList = segs;
    	map.setOption(globeOption);
})

});