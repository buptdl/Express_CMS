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
        
           {name: '�˵���'},
           {name: '�̼�'},
           {name: '�ͷ��绰'},
           {name: '�������'},
           {name: '�����ϵ��ʽ'},
           {name: '�����ϵ��ַ'},
           {name: '��Ʒ����'},
           {name: '��Ʒ�۸�'},
           {name: '�Ƿ������'},
           {name: '������'},
           {name: '����ʱ��'},
           {name: '�ϴθ�����Ա'},
           {name: '�ϴθ���ʱ��', type: 'date', dateFormat: 'n/j h:ia'}
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
			title:'�����Ϣ',
			collapsible:false,
			collapsed:false,
            border: false, // already wrapped so don't add another border
            margins: '0 5 0 0',
            layout: 'fit',
            items:[new Ext.grid.GridPanel({
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
                                dataIndex: '�̼�'
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
                            },                            {
                                header   : '������', 
                                width    : 85, 
                                sortable : true, 
         
                                dataIndex: '������'
                            },
                                                        {
                                header   : '����ʱ��', 
                                width    : 85, 
                                sortable : true, 
         
                                dataIndex: '����ʱ��'
                            },
                                                        {
                                header   : '�ϴθ�����Ա', 
                                width    : 85, 
                                sortable : true, 
         
                                dataIndex: '�ϴθ�����Ա'
                            },
                            {
                                header   : '�ϴθ���ʱ��', 
                                width    : 85, 
                                sortable : true, 
         
                                dataIndex: '�ϴθ���ʱ��'
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
                    title:'�༭',
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
                             '������':'',
                             "״̬":"",
                        },
                        customEditors: {  
                            "״̬": new Ext.grid.GridEditor(new Ext.form.ComboBox({  
                            editable: false,  
                            displayField: "status",  
                            mode: "local",  
                            triggerAction: "all",  
                            store: EState_store
                            }))
                        },                            
                        buttons:[{
                            //�ύ��ť
                            text:'����',//��ť�ı�
                            handler:query//�¼�������
                            },{
                            //�ύ��ť
                            text:'ɾ��',//��ť�ı�
                            handler:query//�¼�������
                            }
                        ]
                    })]
                });
        function query(){
        };
		var p=new Ext.Panel({
			title:'�쳣�������',
			id:'AbnormalExpress',
			layout:'border',
			closable:true,
			items:[detail2,detail,detail3]
		});
		config.add(p);
    };
};

