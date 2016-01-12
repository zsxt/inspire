Template.webScanStatChina.helpers({
    webScanChinaRegion: function(){
        if(Session.get('webScanChinaRegion')){
            return Session.get('webScanChinaRegion');
        }
        else{
            return '未知';
        }
    },

    webScanChinaServer: function() {
        if(Session.get('webScanChinaServer')){
            return Session.get('webScanChinaServer');
        }
        else{
            return '未知';
        }
    },

    webScanChinaRegionMax: function(){
        if(Session.get('webScanChinaRegionMax')){
            return Session.get('webScanChinaRegionMax');
        }
        else{
            return '未知';
        }
    },

    webScanChinaRegionMin: function() {
        if(Session.get('webScanChinaRegionMin')){
            return Session.get('webScanChinaRegionMin');
        }
        else{
            return '未知';
        }
    }
});

Template.webScanStatChina.onRendered(function() {
    var map = echarts.init(document.getElementById('WebScanStatChinaStatMap'));

    var mapOption = {
        tooltip : {
            trigger: 'item'
        },
        toolbox: {
            show : true,
            orient : 'vertical',
            x: 'right',
            y: 'center',
            feature : {
                mark : {show: true},
                dataView : {show: false, readOnly: false},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        dataRange: {
            //show: false,
            min: 0,
            max: 10000,
            text:['高','低'],
            realtime: false,
            calculable : true,
            color: ['orangered','yellow','lightskyblue'],
            orient: 'vertical',
            x: 'left',
            y: 'bottom',
            precision: 2
        },
        series : [
            {
                name:"数量",
                type:"map",
                mapType: 'china',
                //selectedMode: 'single',
                roam: true,
                //mapLocation: {
                //    y : 100
                //},
                itemStyle:{
                    emphasis:{label:{show:true}}
                },
                "data":[]
            }
        ]
    };

    this.autorun(function() {
        var webScanChina = Inspire.Collection.WebScanStatChinaStat.find({attr: "region"}).fetch();
        var dataArray = [];
        var maxValue = 0;
        var webScanChinaServer = 0;
        webScanChina.forEach(function(webScan) {
            webScanChinaServer += webScan.value;

            dataArray.push({
                name: webScan.label,
                value: webScan.value
            });


            if (maxValue < webScan.value) {
                maxValue = webScan.value;
            }
        });

        if(webScanChina.length > 0)
        {
            Session.set('webScanChinaRegionMax', webScanChina[0].label);
            Session.set('webScanChinaRegionMin', webScanChina[webScanChina.length - 1].label);
        }

        Session.set('webScanChinaServer', webScanChinaServer);
        Session.set('webScanChinaRegion', webScanChina.length);

        mapOption.series[0].data = dataArray;
        mapOption.dataRange.max = parseInt(maxValue * 1.1);
        map.setOption(mapOption);
    })
});

Template.webScanStatChina.onCreated(function() {
    var instance = Template.instance();

    instance.autorun(function() {
        var limit = 35;
        var attr = 'region';
        var subscription = instance.subscribe('webScanStatChinaStat', {
            attr: attr,
            limit: limit,
            match: {'$and':[{'region': {$ne: ''}}, {'region': {$ne: null}}]}
        });
    })

});