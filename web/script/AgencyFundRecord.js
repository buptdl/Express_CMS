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
                                    data: [["����","0"],["����","0"],["֧��","1"]]                                  
        });
        var customer_store = new Ext.data.SimpleStore({  
                                    fields: ["type","value"],  
                                    data: [["ȫ��","0"],["˳��","1"]]                                  
        });
        var step_store = new Ext.data.SimpleStore({  
                                    fields: ["type","value"],  
                                    data: [["��","0"],["��","1"]]                                  
        });
        var store = new Ext.data.SimpleStore({  
                                    fields: [
                                       {name: '�̼�'},
                                       {name: '֧��ʱ��'},
                                       {name: '��Ƿ����'},
                                       {name: '��֧����'},
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
                            fieldLabel: '����',
                            displayField: "type",  
                            mode: "local",  
                            triggerAction: "all",  
                            store: FundType_store,
                            }),
            new Ext.form.ComboBox({
                            id:'combo_status2',
                            editable: false,  
                            fieldLabel: '�̼�',
                            displayField: "type",  
                            mode: "local",  
                            triggerAction: "all",  
                            store: customer_store,
                            }),
            new Ext.form.ComboBox({
                            id:'combo_status',
                            editable: false,  
                            fieldLabel: '����',
                            displayField: "type",  
                            mode: "local",  
                            triggerAction: "all",  
                            store: step_store,
                            })],
            buttons: [{
                text: '��ѯ',
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
                text: '����',
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
        title: '����仯����',
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
			/*ɾ��tiprenderer��Զ����ʾ����*/
            //tipRenderer : function(chart, record){
            //    return Ext.util.Format.number(record.data.visits, '0,0') + ' visits in ' + record.data.name;
            //}
        }
    });
        var detail3=new Ext.Panel({
			region:'center',
			title:'��֧��������',
			collapsible:false,
			collapsed:false,
            border: false, // already wrapped so don't add another border
            margins: '0 5 0 0',
            layout: 'fit',
            items:[form2,charts]
		});
        var detail2=new Ext.Panel({
                    title:'��֧��¼',
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
                                header   : '�̼�', 
                                width    : 75, 
                                sortable : true, 
                                dataIndex: '�̼�'
                            },
                            {
                                header   : '��֧����', 
                                width    : 75, 
                                sortable : true,                                 
                                dataIndex: '��֧����'
                            },
                            {
                                header   : '֧��ʱ��', 
                                width    : 75, 
                                sortable : true, 
                                dataIndex: '֧��ʱ��'
                            },
                            {
                                header   : '����', 
                                width    : 75, 
                                sortable : true, 
                                dataIndex: '����'
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
			title:'���տ����',
			id:'AgencyFundRecord',
			layout:'border',
			closable:true,
			items:[detail2,detail,detail3]
		});
		config.add(p);
    };
};

