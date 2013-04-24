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
                        fieldLabel: '��ʼ����',
                        name: 'start',
                        allowBlank:false
                    }),new Ext.form.DateField({
                        fieldLabel: '��������',
                        name: 'end',
                        allowBlank:false
                    })],
            buttons: [{
                text: '����',
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
			title:'������ʷ����',
			id:'ExportHistory',
			layout:'border',
			closable:true,
			items:[detail2,detail,detail3]
		});
		config.add(p);
    };
};

