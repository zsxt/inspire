Template.plcChina.onCreated(function() {
  var instance = Template.instance();
  instance.autorun(function() {
    instance.subscribe('plcStat', {attr: 'province'});
  })
});

Template.plcChina.onRendered(function() {
  var map = echarts.init(document.getElementById('map'))

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
    tooltip: {
        trigger: 'item'
    },
    dataRange: {
        min: 0,
        max: 2500,
        x: 'left',
        y: 'bottom',
        text:['高','低'],           // 文本，默认为数值文本
        color: ['orangered','yellow','lightskyblue'],
        calculable : true
    },
    series : [
        {
            "name":"数量",
            "type":"map",
            "mapType": 'china',
            selectedMode: 'single',
            itemStyle:{
                normal:{label:{show:true}},
                emphasis:{label:{show:true}}
            },
            "data":[]
        }
    ]
  }
  
  this.autorun(function() {
    var newData = PlcStat.find({attr: 'province'}).fetch()
    
    var provinces = _.pluck(newData, 'name');
    data = _.reject(data, function (d) {
      return _.contains(provinces, d.name);
    })
    data = _.union(data, newData);
    
    var maxValue = 0;
    for (var i = 0; i < data.length; ++i) {
      if (maxValue < data[i].value) {
        maxValue = data[i].value;
      }
    }
    mapOption.series[0].data = data;
    mapOption.dataRange.max = parseInt(maxValue * 1.1);
    map.setOption(mapOption, true);
  })
})