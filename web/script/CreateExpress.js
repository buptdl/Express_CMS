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
                                    data: [["-1","����"],["0","�յ�"],["1","���"],["2","����"],["3","��;"],["4","ǩ��"],["5","����"],
                                            ["6","�˵����"],["7","�˵�����"],["8","���մ��տ�"],["9","���"],["10","�˻�"],
                                            ["11","�쳣"]]                                  
        });
        
        var form=new Ext.FormPanel({
            fileUpload: true,
            width: 500,
            autoHeight: true,
            labelWidth: 100,
            bodyStyle: 'padding: 10px 10px 0 10px;',
            items: [{
                xtype: 'textfield',
                fieldLabel: '�̼�'
            },{
                xtype: 'fileuploadfield',
                id: 'form-file',
                emptyText: 'Select an image',
                fieldLabel: 'Excel�ļ�λ��',
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
                text: '¼��',
                handler: function(){
                    form.getForm().reset();
                }
            },{
                text: '����',
                handler: function(){
                    form.getForm().reset();
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
            items:[form,
                new Ext.grid.GridPanel({
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
        var detail2=new Ext.Panel({
                    title:'��ѯ����',
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
                             '�˵���':'',
                             '�̼�':'',
                             '�ͷ��绰':'',
                             '�������':'',
                             '�����ϵ��ʽ':'',
                             '�����ϵ��ַ':'',
                             '��Ʒ����':'',
                             '��Ʒ�۸�':'',
                             '�Ƿ������':'',
                            
                        },                         
                        buttons:[{
                            //�ύ��ť
                            text:'¼��',//��ť�ı�
                            handler:query//�¼�������
                            }
                        ]
                    })]
                });
        function query(){
        };
		var p=new Ext.Panel({
			title:'���¼��',
			id:'NewExpress',
			layout:'border',
			closable:true,
			items:[detail2,detail,detail3]
		});
		config.add(p);
    };
};

