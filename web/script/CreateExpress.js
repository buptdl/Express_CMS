CreateExpress=function(){
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
        ]
        });
        var EState_store = new Ext.data.SimpleStore({  
                                    fields: ["status_id","status"],  
                                    data: [["-1","不限"],["0","收单"],["1","入库"],["2","出库"],["3","在途"],["4","签收"],["5","拒收"],
                                            ["6","退单入库"],["7","退单出库"],["8","已收代收款"],["9","完成"],["10","退货"],
                                            ["11","异常"]]                                  
        });
        
        var form=new Ext.FormPanel({
            fileUpload: true,
            width: 500,
            autoHeight: true,
            labelWidth: 100,
            bodyStyle: 'padding: 10px 10px 0 10px;',
            items: [{
                xtype: 'textfield',
                fieldLabel: '商家'
            },{
                xtype: 'fileuploadfield',
                id: 'form-file',
                emptyText: 'Select an image',
                fieldLabel: 'Excel文件位置',
                name: 'photo-path',
                buttonText: '浏览文件',
            }],
            buttons: [{
                text: '上传分析',
                handler: function(){
                    if(form.getForm().isValid()){
                        form.getForm().submit({
                            url: 'file-upload.php',
                            waitMsg: '正在上传分析文件...',
                            success: function(form, o){
                            }
                        });
                    }
                }
            },{
                text: '录入',
                handler: function(){
                    form.getForm().reset();
                }
            },{
                text: '重置',
                handler: function(){
                    form.getForm().reset();
                }
            }]
        });
        var detail3=new Ext.Panel({
			region:'center',
			title:'快件信息',
			collapsible:false,
			collapsed:false,
            border: false, // already wrapped so don't add another border
            margins: '0 5 0 0',
            layout: 'fit',
            items:[form,
                new Ext.grid.GridPanel({
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
                                dataIndex: '客服电话'
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
                             '运单号':'',
                             '商家':'',
                             '客服电话':'',
                             '买家姓名':'',
                             '买家联系方式':'',
                             '买家联系地址':'',
                             '商品名称':'',
                             '商品价格':'',
                             '是否开箱验货':'',
                            
                        },                         
                        buttons:[{
                            //提交按钮
                            text:'录入',//按钮文本
                            handler:query//事件处理函数
                            }
                        ]
                    })]
                });
        function query(){
        };
		var p=new Ext.Panel({
			title:'快件录入',
			id:'NewExpress',
			layout:'border',
			closable:true,
			items:[detail2,detail,detail3]
		});
		config.add(p);
    };
};

