QueryHistory=function(){
	this.init=function(config){
        var detail=new Ext.Panel({
			region:'west',
			collapsible:true,
			collapsed:false,
            hidden:true,
            html:'<p>north - generally for menus, toolbars and/or advertisements</p>'
		});
        var store = new Ext.data.ArrayStore({
        fields: [
           {name: '时间'},
           {name: '员工名称'},
           {name: '操作类型'},
           {name: '相关运单号'},
        ]
        });
        var EState_store = new Ext.data.SimpleStore({  
                                    fields: ["status_id","status"],  
                                    data: [["-1","不限"],["0","收单"],["1","入库"],["2","出库"],["3","在途"],["4","签收"],["5","拒收"],
                                            ["6","退单入库"],["7","退单出库"],["8","已收代收款"],["9","完成"],["10","退货"],
                                            ["11","异常"]]                                  
        });  
        var detail3=new Ext.Panel({
			region:'center',
			title:'操作历史',
			collapsible:false,
			collapsed:false,
            border: false, // already wrapped so don't add another border
            margins: '0 5 0 0',
            layout: 'fit',
            items:[new Ext.grid.GridPanel({
                    store: store,
                    columns: [
                            {
                                header   : '时间', 
                                width    : 75, 
                                sortable : true, 
                                dataIndex: '时间'
                            },
                            {
                                header   : '员工名称', 
                                width    : 75, 
                                sortable : true, 
                                dataIndex: '员工名称'
                            },
                            {
                                header   : '操作类型', 
                                width    : 75, 
                                sortable : true, 
                                dataIndex: '操作类型'
                            },
                            {
                                header   : '相关运单号', 
                                width    : 250, 
                                sortable : true,                                 
                                dataIndex: '相关运单号'
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
                    title:'查询条件',
                    region:'east',
                    border: false, // already wrapped so don't add another border
                    collapsible: true,
                    split: true,
                    width: 225, // give east and west regions a width
                    margins: '0 5 0 0',
                    layout: 'fit',
                    
                    items: [new Ext.grid.PropertyGrid({
                        autoSort:false,
                        source: {
                            "员工名称": "",
                            "操作类型": "不限",
                            "起始日期": new Date(),
                            "截至日期":  new Date(),
                            
                        },
                        customEditors: {  
                            "操作类型": new Ext.grid.GridEditor(new Ext.form.ComboBox({  
                            editable: false,  
                            displayField: "status",  
                            mode: "local",  
                            triggerAction: "all",  
                            store: EState_store
                            }))
                        },                            
                        buttons:[{
                            //提交按钮
                            text:'查询',//按钮文本
                            handler:query//事件处理函数
                            }
                        ]
                    })]
                });
        function query(){
        };
		var p=new Ext.Panel({
			title:'操作历史查询',
			id:'QueryHistory',
			layout:'border',
			closable:true,
			items:[detail2,detail,detail3]
		});
		config.add(p);
    };
};

