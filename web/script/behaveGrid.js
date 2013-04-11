 
 
behaveGrid=function()
 {
    this.init=function(config)
	{
	
	   var store = new Ext.data.Store
	  ({
		url:'php/behave.php',
		reader:new Ext.data.JsonReader
		({
		root: 'behaveData',
        totalProperty: 'total',
		idProperty:'id',
        storeId: 'behaveStore',
		//sortInfo: {field: 'newsId',direction: 'asc' },
        fields: [
                // {name:'newsId'},
				 {name:'id',mapping:'id'},
				 {name:'config_name',mapping:'config_name',allowBlank:false},
				 {name:'default_value',mapping: 'default_value',allowBlank:false},
				 {name:'value',mapping: 'value',allowBlank:false}
                ]
	   })
    }); 
	  store.load();
	 var textField = new Ext.form.TextField();
	 var paramColumns = 
	      [ 
		      new Ext.grid.RowNumberer({width:30}),
		    {header:"序号",hidden:true,dataIndex:'id'},
			{header:"配置项名称",sortable:true,dataIndex:'config_name',
			  renderer:function(value)
				    {
					 if(value=='user_active') return '<span>活跃用户</span>';
					 else if(value=='user_leader') return '<span>领袖用户</span>';
					 else return null;
					 }
			},
			{header:"值",sortable:true,dataIndex:'value', editor:textField},
			{header:"默认值",hidden:true,dataIndex:'default_value'}
			
		  ];
	var grid = new Ext.grid.EditorGridPanel(
	   {
		title:'参数配置表',
		height:500,
		width:500,
		id:'behaveGrid',
		closable:true,
		store:store,
		trackMouseOver:true,
		disableSelection:true,
		loadMask:true,	
		style:'margin-top: 10px',		
		columns:paramColumns,
		viewConfig:
		  {
		    forceFit:true,
			enableRowBody:true,
			showPreview:false
		  },
		    bbar:new Ext.PagingToolbar
		  ({
		    pageSize:16,
		    store:store,
		    displayInfo:true,
		    emptyMsg:'<span>数据loading</span>'
			}),
		 tbar:
		  [{
		    iconCls:'icon-user-add',
			text:'修改',
			handler:function()
			  {
			     grid.stopEditing();
                 var value = record.data.value;
				 var id = record.data.id;
				  Ext.Ajax.request
					({
					  url:'php/addParam.php',
					  success:function(response)
					    {
						 var json = Ext.decode(response.responseText);
						 if(json.success)
						    {
							  Ext.Msg.alert('消息','修改成功',function()
							       {
								     grid.getStore().reload();
									});
							}
						 },
				     failure:function()
					   {
					     Ext.Msg.alert('错误',"修改失败");
					   },
					  params:{id:id,value:value}
					 });
				
                grid.startEditing(0, 0);
			   
			  },
			  scope:this
		   },{  
		    iconCls:'icon-user-add',
			text:'默认',
			handler:function()
			  {
			      grid.stopEditing();
				 var id = record.data.id;
				  Ext.Ajax.request
					({
					  url:'php/paramDefault.php',
					  success:function(response)
					    {
						 var json = Ext.decode(response.responseText);
						 if(json.success)
						    {
							  Ext.Msg.alert('消息','恢复默认成功',function()
							       {
								     grid.getStore().reload();
									});
							}
						 },
				     failure:function()
					   {
					     Ext.Msg.alert('错误',"修改失败");
					   },
					  params:{id:id}
					 });
				
                grid.startEditing(0, 0);
			  }			
		     }]		
	    });
		grid.on('rowclick',function(grid,rowIndex,event)
	    { 
		 record = grid.getStore().getAt(rowIndex);
		 });
		 	 grid.on('afterrender',function(grid,event)
	    { 
	    	grid.getBottomToolbar().doRefresh();
		 });
	  config.add(grid);
		  
      
   };
 };