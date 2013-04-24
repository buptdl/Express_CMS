ExportHistory=function(){
	this.init=function(config){
        var detail=new Ext.Panel({
			region:'west',
			collapsible:true,
			collapsed:false,
            hidden:true,
            html:'<p>north - generally for menus, toolbars and/or advertisements</p>'
		});
        var detail2=new Ext.Panel({
			region:'east',
			collapsible:true,
			collapsed:false,
            hidden:true,
            html:'<p>north - generally for menus, toolbars and/or advertisements</p>'
		});
        var form2=new Ext.FormPanel({
            width: 500,
            autoHeight: true,
            labelWidth: 75,
            bodyStyle: 'padding: 10px 10px 0 10px;',
            items: [new Ext.form.DateField({
                        fieldLabel: '开始日期',
                        name: 'start',
                        allowBlank:false
                    }),new Ext.form.DateField({
                        fieldLabel: '截至日期',
                        name: 'end',
                        allowBlank:false
                    })],
            buttons: [{
                text: '导出',
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
			collapsible:false,
			collapsed:false,
            border: false, // already wrapped so don't add another border
            margins: '0 5 0 0',
            layout: 'fit',
            items:[form2]
		});
		var p=new Ext.Panel({
			title:'导出历史数据',
			id:'ExportHistory',
			layout:'border',
			closable:true,
			items:[detail2,detail,detail3]
		});
		config.add(p);
    };
};

