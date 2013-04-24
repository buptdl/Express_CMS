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
                                    data: [["����","0"],["֧��","1"]]                                  
        });
        var store = new Ext.data.SimpleStore({  
                                    fields: [
                                       {name: '�̼�'},
                                       {name: '�ϴ�֧��ʱ��'},
                                       {name: '��Ƿ����'},
                                       {name: '��֧����'},
        ]                               
        });
        var form2=new Ext.FormPanel({
            width: 500,
            autoHeight: true,
            labelWidth: 100,
            bodyStyle: 'padding: 10px 10px 0 10px;',
            items: [{
                xtype: 'textfield',
                fieldLabel: '�̼�����',
                id:'customer',
            },
            {
                xtype: 'textfield',
                fieldLabel: '���',
                id:'amount',
            
            },
            new Ext.form.ComboBox({
                            id:'combo_status',
                            editable: false,  
                            fieldLabel: '����',
                            displayField: "type",  
                            mode: "local",  
                            triggerAction: "all",  
                            store: FundType_store,
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
			title:'�½���֧��¼',
			collapsible:false,
			collapsed:false,
            border: false, // already wrapped so don't add another border
            margins: '0 5 0 0',
            layout: 'fit',
            items:[form2,
                new Ext.grid.GridPanel({
                    title:'���տ�Ƿ���б�',
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
                                header   : '�ϴ��տ�ʱ��', 
                                width    : 75, 
                                sortable : true, 
                                dataIndex: '�ϴ��տ�ʱ��'
                            },
                            {
                                header   : '��Ƿ����', 
                                width    : 75, 
                                sortable : true, 
                                dataIndex: '��Ƿ����'
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
                                header   : '�ϴ��տ�ʱ��', 
                                width    : 75, 
                                sortable : true, 
                                dataIndex: '�ϴ��տ�ʱ��'
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
			id:'AgencyFund',
			layout:'border',
			closable:true,
			items:[detail2,detail,detail3]
		});
		config.add(p);
    };
};

