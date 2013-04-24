AbnormalExpress=function(){
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
        
           {name: '运单号'},
           {name: '商家'},
           {name: '客服电话'},
           {name: '买家姓名'},
           {name: '买家联系方式'},
           {name: '买家联系地址'},
           {name: '商品名称'},
           {name: '商品价格'},
           {name: '是否开箱验货'},
           {name: '承运商'},
           {name: '创建时间'},
           {name: '上次更新人员'},
           {name: '上次更新时间', type: 'date', dateFormat: 'n/j h:ia'}
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
			title:'快件信息',
			collapsible:false,
			collapsed:false,
            border: false, // already wrapped so don't add another border
            margins: '0 5 0 0',
            layout: 'fit',
            items:[new Ext.grid.GridPanel({
                    store: store,
                    columns: [
                            {
                                header   : '运单号', 
                                width    : 75, 
                                sortable : true, 
                                dataIndex: '运单号'
                            },
                            {
                                header   : '商家', 
                                width    : 75, 
                                sortable : true, 
                                dataIndex: '商家'
                            },
                            {
                                header   : '客服电话', 
                                width    : 75, 
                                sortable : true, 
                                dataIndex: '商家'
                            },
                            {
                                header   : '买家姓名', 
                                width    : 75, 
                                sortable : true,                                 
                                dataIndex: '买家姓名'
                            },
                            {
                                header   : '买家联系方式', 
                                width    : 75, 
                                sortable : true, 
                                
                                dataIndex: '买家联系方式'
                            },
                            {
                                header   : '商品名称', 
                                width    : 85, 
                                sortable : true, 
         
                                dataIndex: '商品名称'
                            },
                                                        {
                                header   : '商品价格', 
                                width    : 85, 
                                sortable : true, 
         
                                dataIndex: '商品价格'
                            },
                                                        {
                                header   : '是否开箱验货', 
                                width    : 85, 
                                sortable : true, 
         
                                dataIndex: '是否开箱验货'
                            },                            {
                                header   : '承运商', 
                                width    : 85, 
                                sortable : true, 
         
                                dataIndex: '承运商'
                            },
                                                        {
                                header   : '创建时间', 
                                width    : 85, 
                                sortable : true, 
         
                                dataIndex: '创建时间'
                            },
                                                        {
                                header   : '上次更新人员', 
                                width    : 85, 
                                sortable : true, 
         
                                dataIndex: '上次更新人员'
                            },
                            {
                                header   : '上次更新时间', 
                                width    : 85, 
                                sortable : true, 
         
                                dataIndex: '上次更新时间'
                            },
                        ],
                    stripeRows: true,
                    // config options for stateful behavior
                    stateful: true,
                    stateId: 'grid'
                })
            ]
		});
        var detail2=new Ext.Panel({
                    title:'编辑',
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
                             '运单号':'',
                             '商家':'',
                             '客服电话':'',
                             '买家姓名':'',
                             '买家联系方式':'',
                             '买家联系地址':'',
                             '商品名称':'',
                             '商品价格':'',
                             '是否开箱验货':'',
                             '承运商':'',
                             "状态":"",
                        },
                        customEditors: {  
                            "状态": new Ext.grid.GridEditor(new Ext.form.ComboBox({  
                            editable: false,  
                            displayField: "status",  
                            mode: "local",  
                            triggerAction: "all",  
                            store: EState_store
                            }))
                        },                            
                        buttons:[{
                            //提交按钮
                            text:'更新',//按钮文本
                            handler:query//事件处理函数
                            },{
                            //提交按钮
                            text:'删除',//按钮文本
                            handler:query//事件处理函数
                            }
                        ]
                    })]
                });
        function query(){
        };
		var p=new Ext.Panel({
			title:'异常快件处理',
			id:'AbnormalExpress',
			layout:'border',
			closable:true,
			items:[detail2,detail,detail3]
		});
		config.add(p);
    };
};

