Template.topologyShow.onRendered(function() {
    var nodes = [];
    var links = [];
    var constMaxDepth = 2;
    var constMaxChildren = 7;
    var constMinChildren = 4;
    var constMaxRadius = 10;
    var constMinRadius = 2;

    function rangeRandom(min, max) {
        return Math.random() * (max - min) + min;
    }

    function createRandomNode(depth) {
        var node = {
            name : 'NODE_' + nodes.length,
            value : rangeRandom(constMinRadius, constMaxRadius),
            // Custom properties
            id : nodes.length,
            depth : depth,
            category : depth === constMaxDepth ? 0 : 1
        };
        nodes.push(node);

        return node;
    }

    function forceMockThreeData() {
        var depth = 0;
        var rootNode = {
            name : 'ROOT',
            value : rangeRandom(constMinRadius, constMaxRadius),
            // Custom properties
            id : 0,
            depth : 0,
            category : 2
        };
        nodes.push(rootNode);

        function mock(parentNode, depth) {
            var nChildren = Math.round(rangeRandom(constMinChildren, constMaxChildren));

            for (var i = 0; i < nChildren; i++) {
                var childNode = createRandomNode(depth);
                links.push({
                    source : parentNode.id,
                    target : childNode.id,
                    weight : 1
                });
                if (depth < constMaxDepth) {
                    mock(childNode, depth + 1);
                }
            }
        }

        mock(rootNode, 0);
    }

    forceMockThreeData();

    var topologyChartTree = echarts.init(document.getElementById('topologyChart-tree'));
    var chartTreeOption = {
        title : {
            text: 'Force',
            subtext: 'Force-directed tree',
            x:'right',
            y:'bottom'
        },
        tooltip : {
            trigger: 'item',
            formatter: '{a} : {b}'
        },
        toolbox: {
            show : true,
            feature : {
                restore : {show: true},
                magicType: {show: true, type: ['force', 'chord']},
                saveAsImage : {show: true}
            }
        },
        legend: {
            x: 'left',
            data:['叶子节点','非叶子节点', '根节点']
        },
        series : [
            {
                type:'force',
                name : "Force tree",
                ribbonType: false,
                categories : [
                    {
                        name: '叶子节点'
                    },
                    {
                        name: '非叶子节点'
                    },
                    {
                        name: '根节点'
                    }
                ],
                itemStyle: {
                    normal: {
                        label: {
                            show: false
                        },
                        nodeStyle : {
                            brushType : 'both',
                            borderColor : 'rgba(255,215,0,0.6)',
                            borderWidth : 1
                        }
                    }
                },
                minRadius : constMinRadius,
                maxRadius : constMaxRadius,
                coolDown: 0.995,
                steps: 10,
                nodes : nodes,
                links : links,
                steps: 1
            }
        ]
    };

    topologyChartTree.setOption(chartTreeOption);



    var topologyChartTree1 = echarts.init(document.getElementById('topologyChart-tree1'));
    var chartTree1Option = {
        title : {
            text: '德国队效力联盟',
            x:'right',
            y:'bottom'
        },
        tooltip : {
            trigger: 'item',
            formatter: function (params) {
                if (params.indicator2) {    // is edge
                    return params.indicator2 + ' ' + params.name + ' ' + params.indicator;
                } else {    // is node
                    return params.name
                }
            }
        },
        toolbox: {
            show : true,
            feature : {
                restore : {show: true},
                magicType: {show: true, type: ['force', 'chord']},
                saveAsImage : {show: true}
            }
        },
        legend: {
            x: 'left',
            data:['阿森纳', '拜仁慕尼黑', '多特蒙德']
        },
        series : [
            {
                type:'chord',
                sort : 'ascending',
                sortSub : 'descending',
                showScale : false,
                itemStyle : {
                    normal : {
                        label : {
                            rotate : true
                        }
                    }
                },
                // 使用 nodes links 表达和弦图
                nodes: [
                    {name:'默特萨克'},
                    {name:'厄齐尔'},
                    {name:'波多尔斯基'},
                    {name:'诺伊尔'},
                    {name:'博阿滕'},
                    {name:'施魏因施泰格'},
                    {name:'拉姆'},
                    {name:'克罗斯'},
                    {name:'穆勒'},
                    {name:'格策'},
                    {name:'胡梅尔斯'},
                    {name:'魏登费勒'},
                    {name:'杜尔姆'},
                    {name:'格罗斯克罗伊茨'},
                    {name:'阿森纳'},
                    {name:'拜仁慕尼黑'},
                    {name:'多特蒙德'}
                ],
                links: [
                    {source: '阿森纳', target: '默特萨克', weight: 0.9, name: '效力'},
                    {source: '阿森纳', target: '厄齐尔', weight: 0.9, name: '效力'},
                    {source: '阿森纳', target: '波多尔斯基', weight: 0.9, name: '效力'},
                    {source: '拜仁慕尼黑', target: '诺伊尔', weight: 0.9, name: '效力'},
                    {source: '拜仁慕尼黑', target: '博阿滕', weight: 0.9, name: '效力'},
                    {source: '拜仁慕尼黑', target: '施魏因施泰格', weight: 0.9, name: '效力'},
                    {source: '拜仁慕尼黑', target: '拉姆', weight: 0.9, name: '效力'},
                    {source: '拜仁慕尼黑', target: '克罗斯', weight: 0.9, name: '效力'},
                    {source: '拜仁慕尼黑', target: '穆勒', weight: 0.9, name: '效力'},
                    {source: '拜仁慕尼黑', target: '格策', weight: 0.9, name: '效力'},
                    {source: '多特蒙德', target: '胡梅尔斯', weight: 0.9, name: '效力'},
                    {source: '多特蒙德', target: '魏登费勒', weight: 0.9, name: '效力'},
                    {source: '多特蒙德', target: '杜尔姆', weight: 0.9, name: '效力'},
                    {source: '多特蒙德', target: '格罗斯克罗伊茨', weight: 0.9, name: '效力'},

                    // Ribbon Type 的和弦图每一对节点之间必须是双向边
                    {target: '阿森纳', source: '默特萨克', weight: 1},
                    {target: '阿森纳', source: '厄齐尔', weight: 1},
                    {target: '阿森纳', source: '波多尔斯基', weight: 1},
                    {target: '拜仁慕尼黑', source: '诺伊尔', weight: 1},
                    {target: '拜仁慕尼黑', source: '博阿滕', weight: 1},
                    {target: '拜仁慕尼黑', source: '施魏因施泰格', weight: 1},
                    {target: '拜仁慕尼黑', source: '拉姆', weight: 1},
                    {target: '拜仁慕尼黑', source: '克罗斯', weight: 1},
                    {target: '拜仁慕尼黑', source: '穆勒', weight: 1},
                    {target: '拜仁慕尼黑', source: '格策', weight: 1},
                    {target: '多特蒙德', source: '胡梅尔斯', weight: 1},
                    {target: '多特蒙德', source: '魏登费勒', weight: 1},
                    {target: '多特蒙德', source: '杜尔姆', weight: 1},
                    {target: '多特蒙德', source: '格罗斯克罗伊茨', weight: 1}
                ]
            }
        ]
    };
    topologyChartTree1.setOption(chartTree1Option);
});