AgencyFundRecord=function(){
	this.init=function(config){
        var detail=new Ext.Panel({
			region:'west',
			collapsible:true,
			collapsed:false,
            hidden:true,
            html:'<p>north - generally for menus, toolbars and/or advertisements</p>'
		});
        var FundType_store = new Ext.data.SimpleStore({  
                                    fields: ["type","value"],  
                                    data: [["不限","0"],["收入","0"],["支出","1"]]                                  
        });
        var customer_store = new Ext.data.SimpleStore({  
                                    fields: ["type","value"],  
                                    data: [["全部","0"],["顺风","1"]]                                  
        });
        var step_store = new Ext.data.SimpleStore({  
                                    fields: ["type","value"],  
                                    data: [["周","0"],["月","1"]]                                  
        });
        var store = new Ext.data.SimpleStore({  
                                    fields: [
                                       {name: '商家'},
                                       {name: '支付时间'},
                                       {name: '所欠货款'},
                                       {name: '收支类型'},
        ]                               
        });
        var form2=new Ext.FormPanel({
            width: 500,
            autoHeight: true,
            labelWidth: 75,
            bodyStyle: 'padding: 10px 10px 0 10px;',
            items: [new Ext.form.ComboBox({
                            id:'combo_customer',
                            editable: false,  
                            fieldLabel: '类型',
                            displayField: "type",  
                            mode: "local",  
                            triggerAction: "all",  
                            store: FundType_store,
                            }),
            new Ext.form.ComboBox({
                            id:'combo_status2',
                            editable: false,  
                            fieldLabel: '商家',
                            displayField: "type",  
                            mode: "local",  
                            triggerAction: "all",  
                            store: customer_store,
                            }),
            new Ext.form.ComboBox({
                            id:'combo_status',
                            editable: false,  
                            fieldLabel: '周期',
                            displayField: "type",  
                            mode: "local",  
                            triggerAction: "all",  
                            store: step_store,
                            })],
            buttons: [{
                text: '查询',
                handler: function(){
                    if(form2.getForm().isValid()){
                        form2.getForm().submit({
                            url: 'file-upload.php',
                            success: function(form2, o){
                            }
                        });
                    }
                }
            },{
                text: '重置',
                handler: function(){
                    form2.getForm().reset();
                }
            }]
        });
        var chart_store = new Ext.data.JsonStore({
        fields:['name', 'visits', 'views'],
        data: [
            {name:'Jul 07', visits: 245000, views: 3000000},
            {name:'Aug 07', visits: 240000, views: 3500000},
            {name:'Sep 07', visits: 355000, views: 4000000},
            {name:'Oct 07', visits: 375000, views: 4200000},
            {name:'Nov 07', visits: 490000, views: 4500000},
            {name:'Dec 07', visits: 495000, views: 5800000},
            {name:'Jan 08', visits: 520000, views: 6000000},
            {name:'Feb 08', visits: 620000, views: 7500000}
        ]
    });
        var charts = new Ext.Panel({
        title: '收入变化曲线',
        frame:true,
        height: 400,
        items: {
            xtype: 'linechart',
            store: chart_store,
            url: 'ext/resources/charts.swf',
            xField: 'name',
            yField: 'visits',
            yAxis: new Ext.chart.NumericAxis({
                displayName: 'Visits',
                labelRenderer : Ext.util.Format.numberRenderer('0,0')
            }),
			/*删除tiprenderer后远程显示不出*/
            //tipRenderer : function(chart, record){
            //    return Ext.util.Format.number(record.data.visits, '0,0') + ' visits in ' + record.data.name;
            //}
        }
    });
        var detail3=new Ext.Panel({
			region:'center',
			title:'收支曲线条件',
			collapsible:false,
			collapsed:false,
            border: false, // already wrapped so don't add another border
            margins: '0 5 0 0',
            layout: 'fit',
            items:[form2,charts]
		});
        var detail2=new Ext.Panel({
                    title:'收支记录',
                    region:'east',
                    border: false, // already wrapped so don't add another border
                    collapsible: true,
                    split: true,
                    width: 450, // give east and west regions a width
                    margins: '0 5 0 0',
                    layout: 'fit',
                    
                    items:[
                new Ext.grid.GridPanel({
                    store: store,
                    columns: [
                            {
                                header   : '商家', 
                                width    : 75, 
                                sortable : true, 
                                dataIndex: '商家'
                            },
                            {
                                header   : '收支类型', 
                                width    : 75, 
                                sortable : true,                                 
                                dataIndex: '收支类型'
                            },
                            {
                                header   : '支付时间', 
                                width    : 75, 
                                sortable : true, 
                                dataIndex: '支付时间'
                            },
                            {
                                header   : '货款', 
                                width    : 75, 
                                sortable : true, 
                                dataIndex: '货款'
                            }
                        ],
                    stripeRows: true,
                    // config options for stateful behavior
                    stateful: true,
                    stateId: 'grid'
                })
            ]
                });
        function query(){
        };
		var p=new Ext.Panel({
			title:'代收款管理',
			id:'AgencyFundRecord',
			layout:'border',
			closable:true,
			items:[detail2,detail,detail3]
		});
		config.add(p);
    };
};

