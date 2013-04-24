AgencyFund=function(){
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
                                    data: [["收入","0"],["支出","1"]]                                  
        });
        var store = new Ext.data.SimpleStore({  
                                    fields: [
                                       {name: '商家'},
                                       {name: '上次支付时间'},
                                       {name: '所欠货款'},
                                       {name: '收支类型'},
        ]                               
        });
        var form2=new Ext.FormPanel({
            width: 500,
            autoHeight: true,
            labelWidth: 100,
            bodyStyle: 'padding: 10px 10px 0 10px;',
            items: [{
                xtype: 'textfield',
                fieldLabel: '商家名称',
                id:'customer',
            },
            {
                xtype: 'textfield',
                fieldLabel: '金额',
                id:'amount',
            
            },
            new Ext.form.ComboBox({
                            id:'combo_status',
                            editable: false,  
                            fieldLabel: '类型',
                            displayField: "type",  
                            mode: "local",  
                            triggerAction: "all",  
                            store: FundType_store,
                            })],
            buttons: [{
                text: '更新',
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
        var detail3=new Ext.Panel({
			region:'center',
			title:'新建收支记录',
			collapsible:false,
			collapsed:false,
            border: false, // already wrapped so don't add another border
            margins: '0 5 0 0',
            layout: 'fit',
            items:[form2,
                new Ext.grid.GridPanel({
                    title:'代收款欠款列表',
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
                                header   : '上次收款时间', 
                                width    : 75, 
                                sortable : true, 
                                dataIndex: '上次收款时间'
                            },
                            {
                                header   : '所欠货款', 
                                width    : 75, 
                                sortable : true, 
                                dataIndex: '所欠货款'
                            }
                        ],
                    stripeRows: true,
                    // config options for stateful behavior
                    stateful: true,
                    stateId: 'grid'
                })
            ]
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
                                header   : '上次收款时间', 
                                width    : 75, 
                                sortable : true, 
                                dataIndex: '上次收款时间'
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
			id:'AgencyFund',
			layout:'border',
			closable:true,
			items:[detail2,detail,detail3]
		});
		config.add(p);
    };
};

