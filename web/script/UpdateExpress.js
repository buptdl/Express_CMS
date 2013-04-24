UpdateExpress=function(){
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
                                    data: [["0","收单"],["1","入库"],["2","出库"],["3","在途"],["4","签收"],["5","拒收"],
                                            ["6","退单入库"],["7","退单出库"],["8","已收代收款"],["9","完成"],["10","退货完成"],
                                            ]                                  
        });
        
        var form=new Ext.FormPanel({
            fileUpload: true,
            width: 500,
            autoHeight: true,
            labelWidth: 100,
            bodyStyle: 'padding: 10px 10px 0 10px;',
            items: [{
                xtype: 'fileuploadfield',
                emptyText: '',
                fieldLabel: '运单号excel文件',
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
                text: '重置',
                handler: function(){
                    form.getForm().reset();
                }
            }]
        });
        var form2=new Ext.FormPanel({
            width: 500,
            autoHeight: true,
            labelWidth: 100,
            bodyStyle: 'padding: 10px 10px 0 10px;',
            items: [new Ext.form.ComboBox({
                            id:'combo_status',
                            editable: false,  
                            fieldLabel: '状态',
                            displayField: "status",  
                            mode: "local",  
                            triggerAction: "all",  
                            store: EState_store,
                            listeners:{
                                "select":function(){
                                            if(Ext.get("combo_status").dom.value=="出库")
                                            {
                                                Ext.getCmp("shipper_id").setVisible(true);
                                                }
                                            else
                                            {
                                                Ext.getCmp("shipper_id").hide();
                                                }
                                                
                                         }
                                }
                            }),{
                xtype: 'textfield',
                fieldLabel: '承运商',
                id:'shipper_id',
                hidden:true,
            
            },],
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
			title:'快件信息',
			collapsible:false,
			collapsed:false,
            border: false, // already wrapped so don't add another border
            margins: '0 5 0 0',
            layout: 'fit',
            items:[form,form2,
                new Ext.grid.GridPanel({
                    title:'待更新单',
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
        var form3=new Ext.FormPanel({
                        width: 500,
                        autoHeight: true,
                        labelWidth: 40,
                        bodyStyle: 'padding: 10px 10px 0 10px;',
                        items: [{
                            xtype: 'textfield',
                            fieldLabel: '运单号'
                        },],
                        buttons: [{
                            text: '添加',
                            handler: function(){
                                if(form3.getForm().isValid()){
                                    form3.getForm().submit({
                                        url: 'file-upload.php',
                                        success: function(form3, o){
                                        }
                                    });
                                }
                            }
                        }]
                    })
        var detail2=new Ext.Panel({
                    title:'巴枪扫描',
                    region:'east',
                    border: false, // already wrapped so don't add another border
                    collapsible: true,
                    split: true,
                    width: 225, // give east and west regions a width
                    margins: '0 5 0 0',
                    layout: 'fit',
                    
                    items: [form3]
                });
        function query(){
        };
		var p=new Ext.Panel({
			title:'快件更新',
			id:'UpdateExpress',
			layout:'border',
			closable:true,
			items:[detail2,detail,detail3]
		});
		config.add(p);
    };
};

