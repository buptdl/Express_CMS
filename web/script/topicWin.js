TopicWin=function(){
	this.init=function(config){
	
	    var store = new Ext.data.Store({
			url: './php/topicWin.php',	//����php�ļ�
			reader: new Ext.data.JsonReader({	
				root: 'rows',
				totalProperty: 'results',
				id: 'id', 
				fields: [	//�ֶζ�����Ϣ�������ֶ������ݶ�����ӳ���ϵ�����͵�
					{name: 'id',mapping: 'id', type: 'int'},
				//	{name: 'topic_id',mapping: 'topic_id', type: 'int'},
					{name: 'key_words',mapping: 'key_words'},
				//	{name: 'document_number',mapping: 'document_number', type: 'int'},
				//	{name: 'reply_number',mapping: 'reply_number', type: 'int'},
					{name: 'day_attention',mapping: 'day_attention', type: 'double'},
			        {name: 'time', mapping: 'time', type: 'Y-m-d'},
			    //  {name: 'title', mapping: 'title'}
				]}
			)
		});
		store.load({
			params:{
					start:0,
					limit:25
			}
		});

		var grid = new Ext.grid.GridPanel({
			//frame:true,
			title:'ÿ�����Ż���ͳ��',
			trackMouseOver:false,  //true
			height:200,
			closable:true,
			id:'TopicWin',
			//autoExpandColumn: 'title',
			loadMask: true,
			store: store,
			//stripeRows: true,	//������Ч��

			columns: [//new Ext.grid.RowNumberer({width: 25}),
			{
				header: "����ؼ���",
				dataIndex: 'key_words',
				menuDisabled : true,
				width: 160,
				align: 'left',
				sortable:false
			}/*,{
				header: "�ܷ�����",
				dataIndex: 'document_number',
				width: 70,
				align: 'right',
				sortable:true
			},{
				header: "�ܻ�����",
				dataIndex: 'reply_number',
				width: 70,
				align: 'right',
				sortable:true
			}*/,{
				header: "�չ�ע��",
				dataIndex: 'day_attention',
				width: 70,
				align: 'right',
				sortable:true
			}],
			viewConfig: {
				forceFit:true,
				enableRowBody:true,
				showPreview:false  
			},
			
			bbar: new Ext.PagingToolbar({
				store: store,	//ͨ��Store������ϵ��ҳ��Զ�����������������������
				pageSize: 25,	//ÿҳ��������
				displayInfo:true
			})

		});
		
		grid.on('afterrender',function(grid,event)
	    { 
	    	grid.getBottomToolbar().doRefresh();
		});
		config.add(grid);
	};
};
