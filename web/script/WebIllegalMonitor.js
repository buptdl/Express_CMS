WebIllegalMonitor=function(){
	this.init=function(config){
		var store= new Ext.data.JsonStore({
			url:'PHP/WebWordIllegal.php',
			root:'data',
			totalProperty:'total',
			fields:[{ name: 'id'},
					{ name: 'word', type: 'char'}
				]
		});
		store.load({
			params:{
				start:0,
				limit:10000	//Ĭ���������дʵ����Ϊ10000
			}
		});
		var w= "��û��ѡ���ע�ʣ���ѡȡ";	//���汻�û�ѡ��Ĵ�
		var storeList = new Ext.form.ComboBox({    
			fieldLabel : '�Ƿ���',  //UI��ǩ���ƣ�������û����ʾ������������
			name : 'identity',   //��Ϊform�ύʱ���͵Ĳ�����
            allowBlank : false,  //�Ƿ�����Ϊ��
            //readOnly : true,     //�Ƿ�ֻ��,�����У�������������������
            triggerAction : 'all',  //��ʾ����������.����ָ��Ϊ'all'
            anchor : '90%',
            emptyText:'��ѡ��...',   //û��Ĭ��ֵʱ,��ʾ���ַ���
            store: store,	
            valueField:'id',      // option.value
            typeAhead: true,
            displayField: 'word',      // option.text
            mode: 'local',	//!!!!!!!����ʱ�õ��Ǳ������ݿ�
            selectOnFocus:true,
            width: 135,			
			//���Լ��� ȡ���û�ѡ��ʲ���
			listeners: {
				scope: this,
				select: {
					fn:function(combo,record,index) {
						//alert("��ѡ��Ĺ�ע���ǣ� "+record.get('word')+"�� �����ύ��" );	// w����combo�ж���ı���
						w= record.get('id');	// ȡ���û�ѡ���
						//���Խ���һ��������
					}	}	
			}
        });		
	
		var WebData=new Ext.data.JsonStore({
			url:'PHP/WebIllegalWord.php',
			root:'data',
			totalProperty:'total',
			fields:[
				 {name:'title',type:'string'},
		         {name: 'author',type: 'string'},
		         {name: 'posting_time', type: 'Y-m-d  G:i:s' },
				 {name:'url',type:'string'},
			     {name: 'illegal_words',type: 'string'},
				 {name: 'source', type: 'string'}	
				 ]
		});
		WebData.load({	//��������������Զ��������м�������
			params:{
				start:0,
				limit:30	
			}
		});
		function renderTitle(value,p,record)	//���ʱ����url����
		{
			return String.format
			('<b><a href="{1}"  target="_blank">{2}</a></b><br/>',
			value, record.data.url, record.data.title);
		}
		var grid=new Ext.grid.GridPanel({
			title: '�Ƿ���Ϣ',
			id:'WebIllegalMonitor',
			closable:true,
			store:WebData,
			//width:800,
		loadMask: true,
			autoWidth: true,
			autoExpandColumn: 	'title',	//�Զ�������пհ׵���
			region:'center',    
			frame: true,
			//layout: 'fit',
			height:500,
			trackMouseOver: true,
			tbar:[
				{ text: '�Ƿ���' },
				storeList,
				{xtype: 'tbspacer', width: 50}, 
				{
					xtype: 'button',	//��������������ôʵ�ֵõ��û�ѡ�����дʣ����γ�Mysql��ѯ��䣿����������--------------
					text:'�� ��',
					width: 100,
					//columnWidth: .10,	
					loadMask: true, 	//����������������ʾ ���ݶ�ȡ��...�Ƿ�������ã�������������������
				 	listeners:{
						scope:this,
						click:function(node,e){							
							var params={	start:0, limit:30 };	//��ɸѡ������ݶ�ȡ��	
							params['filters[0][data][value]']= w;//grid.store.data.items[index].data.publish_time;//ȡINDEX�����е�ʱ��
							WebData.load({params:params});
						}
					}
				}
			],
			bbar: new Ext.PagingToolbar({  //????????��ҳ���ʹ�б���ʧ
				store: WebData,
				pageSize: 30,
				displayInfo: true,
				displayMsg: 'Displaying topics {0}-{1}of{2}',
				emptyMsg: "No topics to display"	//������ʱ��չʾ����
			}),
			
//����ʵ�ֱ����Զ���������
			columns: [new Ext.grid.RowNumberer({width: 20}),
					{id:'title',header:'����',dataIndex:'title',
					 renderer: renderTitle, 
					width: 250,sortable:true},
					{ header: '����', dataIndex: 'author',width: 100,sortable:true},
					{ header: '����ʱ��',dataIndex: 'posting_time',  width: 200,sortable:true},
					{ header: '�Ƿ���',dataIndex: 'illegal_words',width: 100,sortable:true },
					{ header: '����վ��', dataIndex: 'source', width: 150, sortable: true }					
				]
		/*	cm: new Ext.grid.ColumnModel({
				defaults: {
					//width: 120,
					sortable: true
				},
				columns: [
					{id:'title',header:'����',dataIndex:'title',
					 renderer: renderTitle, 
					 width: 250,sortable:true},
					{ header: '����', dataIndex: 'author',width: 80,sortable:true},
					{ header: '����ʱ��',dataIndex: 'posting_time',width: 80,sortable:true},
					{ header: '���д�',dataIndex: 'illegal_words',width: 150,sortable:true },
					{ header: '����վ��', dataIndex: 'source', width: 100, sortable: true }					
				]
			})
		*/
		});
		WebData.on('load',function(WebData, event){	
			var recordNo=WebData.getCount();
			if(recordNo==0) alert("��ѯ����ɣ�ϵͳ����ʱû��������ݣ�"); 
		});
//���ݿ���û�ж�Ӧ���ݣ���ȡ��"���ݶ�ȡ��"���ɰ�
/*	
		 grid.on('afterrender',function(grid,event){  //ʵ�ּ�������ʱ��ʾ�ȴ�  
			grid.getBottomToolbar().doRefresh();	 
		} );
*/		
		config.add(grid);
	};
};