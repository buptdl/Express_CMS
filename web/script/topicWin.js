TopicWin=function(){
	this.init=function(config){
	
	    var store = new Ext.data.Store({
			url: './php/topicWin.php',	//本地php文件
			reader: new Ext.data.JsonReader({	
				root: 'rows',
				totalProperty: 'results',
				id: 'id', 
				fields: [	//字段定义信息，包含字段与数据对象间的映射关系、类型等
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
			title:'每日热门话题统计',
			trackMouseOver:false,  //true
			height:200,
			closable:true,
			id:'TopicWin',
			//autoExpandColumn: 'title',
			loadMask: true,
			store: store,
			//stripeRows: true,	//斑马线效果

			columns: [//new Ext.grid.RowNumberer({width: 25}),
			{
				header: "话题关键词",
				dataIndex: 'key_words',
				menuDisabled : true,
				width: 160,
				align: 'left',
				sortable:false
			}/*,{
				header: "总发帖数",
				dataIndex: 'document_number',
				width: 70,
				align: 'right',
				sortable:true
			},{
				header: "总回帖数",
				dataIndex: 'reply_number',
				width: 70,
				align: 'right',
				sortable:true
			}*/,{
				header: "日关注度",
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
				store: store,	//通过Store参数联系分页及远程排序操作，操作触发更新
				pageSize: 25,	//每页数据总数
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
