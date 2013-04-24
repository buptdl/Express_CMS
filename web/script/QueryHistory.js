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
           {name: 'ʱ��'},
           {name: 'Ա������'},
           {name: '��������'},
           {name: '����˵���'},
        ]
        });
        var EState_store = new Ext.data.SimpleStore({  
                                    fields: ["status_id","status"],  
                                    data: [["-1","����"],["0","�յ�"],["1","���"],["2","����"],["3","��;"],["4","ǩ��"],["5","����"],
                                            ["6","�˵����"],["7","�˵�����"],["8","���մ��տ�"],["9","���"],["10","�˻�"],
                                            ["11","�쳣"]]                                  
        });  
        var detail3=new Ext.Panel({
			region:'center',
			title:'������ʷ',
			collapsible:false,
			collapsed:false,
            border: false, // already wrapped so don't add another border
            margins: '0 5 0 0',
            layout: 'fit',
            items:[new Ext.grid.GridPanel({
                    store: store,
                    columns: [
                            {
                                header   : 'ʱ��', 
                                width    : 75, 
                                sortable : true, 
                                dataIndex: 'ʱ��'
                            },
                            {
                                header   : 'Ա������', 
                                width    : 75, 
                                sortable : true, 
                                dataIndex: 'Ա������'
                            },
                            {
                                header   : '��������', 
                                width    : 75, 
                                sortable : true, 
                                dataIndex: '��������'
                            },
                            {
                                header   : '����˵���', 
                                width    : 250, 
                                sortable : true,                                 
                                dataIndex: '����˵���'
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
                            "Ա������": "",
                            "��������": "����",
                            "��ʼ����": new Date(),
                            "��������":  new Date(),
                            
                        },
                        customEditors: {  
                            "��������": new Ext.grid.GridEditor(new Ext.form.ComboBox({  
                            editable: false,  
                            displayField: "status",  
                            mode: "local",  
                            triggerAction: "all",  
                            store: EState_store
                            }))
                        },                            
                        buttons:[{
                            //�ύ��ť
                            text:'��ѯ',//��ť�ı�
                            handler:query//�¼�������
                            }
                        ]
                    })]
                });
        function query(){
        };
		var p=new Ext.Panel({
			title:'������ʷ��ѯ',
			id:'QueryHistory',
			layout:'border',
			closable:true,
			items:[detail2,detail,detail3]
		});
		config.add(p);
    };
};

