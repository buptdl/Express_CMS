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
           {name: '�˵���'},
           {name: '�̼�'},
           {name: '�ͷ��绰'},
           {name: '�������'},
           {name: '�����ϵ��ʽ'},
           {name: '�����ϵ��ַ'},
           {name: '��Ʒ����'},
           {name: '��Ʒ�۸�'},
           {name: '�Ƿ������'},
        ]
        });
        var EState_store = new Ext.data.SimpleStore({  
                                    fields: ["status_id","status"],  
                                    data: [["0","�յ�"],["1","���"],["2","����"],["3","��;"],["4","ǩ��"],["5","����"],
                                            ["6","�˵����"],["7","�˵�����"],["8","���մ��տ�"],["9","���"],["10","�˻����"],
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
                fieldLabel: '�˵���excel�ļ�',
                name: 'photo-path',
                buttonText: '����ļ�',
            }],
            buttons: [{
                text: '�ϴ�����',
                handler: function(){
                    if(form.getForm().isValid()){
                        form.getForm().submit({
                            url: 'file-upload.php',
                            waitMsg: '�����ϴ������ļ�...',
                            success: function(form, o){
                            }
                        });
                    }
                }
            },{
                text: '����',
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
                            fieldLabel: '״̬',
                            displayField: "status",  
                            mode: "local",  
                            triggerAction: "all",  
                            store: EState_store,
                            listeners:{
                                "select":function(){
                                            if(Ext.get("combo_status").dom.value=="����")
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
                fieldLabel: '������',
                id:'shipper_id',
                hidden:true,
            
            },],
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
			title:'�����Ϣ',
			collapsible:false,
			collapsed:false,
            border: false, // already wrapped so don't add another border
            margins: '0 5 0 0',
            layout: 'fit',
            items:[form,form2,
                new Ext.grid.GridPanel({
                    title:'�����µ�',
                    store: store,
                    columns: [
                            {
                                header   : '�˵���', 
                                width    : 75, 
                                sortable : true, 
                                dataIndex: '�˵���'
                            },
                            {
                                header   : '�̼�', 
                                width    : 75, 
                                sortable : true, 
                                dataIndex: '�̼�'
                            },
                            {
                                header   : '�ͷ��绰', 
                                width    : 75, 
                                sortable : true, 
                                dataIndex: '�ͷ��绰'
                            },
                            {
                                header   : '�������', 
                                width    : 75, 
                                sortable : true,                                 
                                dataIndex: '�������'
                            },
                            {
                                header   : '�����ϵ��ʽ', 
                                width    : 75, 
                                sortable : true, 
                                
                                dataIndex: '�����ϵ��ʽ'
                            },
                            {
                                header   : '��Ʒ����', 
                                width    : 85, 
                                sortable : true, 
         
                                dataIndex: '��Ʒ����'
                            },
                                                        {
                                header   : '��Ʒ�۸�', 
                                width    : 85, 
                                sortable : true, 
         
                                dataIndex: '��Ʒ�۸�'
                            },
                                                        {
                                header   : '�Ƿ������', 
                                width    : 85, 
                                sortable : true, 
         
                                dataIndex: '�Ƿ������'
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
                            fieldLabel: '�˵���'
                        },],
                        buttons: [{
                            text: '���',
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
                    title:'��ǹɨ��',
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
			title:'�������',
			id:'UpdateExpress',
			layout:'border',
			closable:true,
			items:[detail2,detail,detail3]
		});
		config.add(p);
    };
};

