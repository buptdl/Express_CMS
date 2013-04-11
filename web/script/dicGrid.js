dicGrid=function()
 {
    this.init=function(config)
	{
	
	   var store = new Ext.data.Store
	  ({
		url:'php/dicGrid.php',
		reader:new Ext.data.JsonReader
		({
		root: 'dicData',
        totalProperty: 'total',
		idProperty:'id',
        storeId: 'dicStore',
		//sortInfo: {field: 'newsId',direction: 'asc' },
        fields: [
                // {name:'newsId'},
				 {name:'id',mapping:'id'},
				 {name:'word',mapping:'word',allowBlank:false},
				 {name:'type',mapping: 'type',allowBlank:false}
                ]
	   })
    }); 
	  store.load({params:{start:0, limit:16}});
	 var paramColumns = new Ext.grid.ColumnModel(
	      [ 
      		  new Ext.grid.RowNumberer({width:30}),
		    {header:"ID",sortable:true,hidden:true,dataIndex:'id'},
			{header:"词项",sortable:true,dataIndex:'word'},
			{header:"类型",sortable:true,dataIndex:'type',
			 renderer:function(value)
			     { if(value==1) return '<span>敏感词</span>';
			       else if(value==2) return '<span>不良词</span>';
				   else if(value==3) return'<span>非法词</span>';
				   else return null;
				 }}
		  ]
		 );
		 Ext.form.Field.prototype.msgTarget = 'side';
		 var form = new Ext.form.FormPanel
	 ( 
	   { 
	      labelAlign: 'right',
          labelWidth: 80,
          width:  300,
		  autoHeight:true,
		  buttonAlign:'center',
		  bodyStyle: 'padding:1px;',
		  frame: true,
		  defaultType:'textfield',
		  defaults: { width:200},
		  items:
		  [
		   {xtype: 'hidden',
		   id:'id1',
		    name: 'id'
		    },
		  {fieldLabel:'词项',
		   name:'word',
		   id:'word1',
		   allowBlank:false
		   },
		  {fieldLabel:'类型',
		   xtype:'combo',
		   hiddenName:'type',
		   id:'type1',
		   allowBlank:false,
		   forceSelection:true,
		   typeAhead:true,
		   selectOnFocus:true,
		   triggerAction:'all',
		   lazyRender:true,
		   emptyText:'请选择',
		   mode:'local',
		   store:new Ext.data.SimpleStore
		    ({
			   fields: ['value','text'],
			   data:[
			         ['1','敏感词'],
					 ['2','不良词'],
					 ['3','非法词']
					]
			 }
			),
			valueField:'value',
			displayField:'text'
		   }
		   
		  ],
		  buttons:
		[{text: '提交',
		  handler: function()
		      {
			   if(!form.getForm().isValid()){return;}
				if(form.getForm().findField("id").getValue() =="")
				  {
				    form.getForm().submit
					({
					  url:'php/addDic.php',
					   success:function(f,action)
					     {
						   if(action.result.success)
						      {
							    Ext.Msg.alert('消息','提交成功',function()
								               {
											     win.hide();
								                 grid.getStore().reload();								             
												
								               }
											  );
							  }
						},
					   failure:function()
					    {
						  Ext.Msg.alert('错误',"提交失败");
						}
					  });
					}else
					{
					  form.getForm().submit
					  ({
					   url:'php/addDic.php',
					   success:function(f,action)
					     {
						   if(action.result.success)
						      {
							    Ext.Msg.alert('消息','提交成功',function()
								               {  
											     win.hide();
								                 grid.getStore().reload();				
								               }
											  );
							  }
						},
					   failure:function()
					    {
						  Ext.Msg.alert('错误',"提交失败");
						}
					   });
					 }
			 }
		},
		 {text: '清空',
		  handler:reset
		 }
		 ] 
	    }
	 );  
		var win=new Ext.Window({
			id:'configWin',
			width:350,
			autoHeight:true,
			frame: true,			
			modal:true,
			plain:true,
			closable:true,
			resizeable:false,
			border:false,
			layout: 'fit',
			title:'词典管理',
			closeAction:'hide',
			items:[form]
		});	   
	var grid = new Ext.grid.GridPanel(
	   {
		title:'词典配置表',
		height:500,
		width:500,
		id:'dicGrid',
		closable:true,
		store:store,
		trackMouseOver:true,
		disableSelection:true,
		loadMask:true,	
		style:'margin-top: 10px',		
		cm:paramColumns,
		sm:new Ext.grid.RowSelectionModel({singleSelect:true}),
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
		  [{ iconCls:'icon-user-add',
			text:'添加',
			scope:this,
			handler:reset
		  },
		  {
		    iconCls:'icon-user-add',
			text:'修改',
			scope:this,
			handler:function()
			  {
			   if(row==-1) Ext.Msg.alert('提示','请选择需要修改的项');
			  else 
			  {
				 record = grid.getStore().getAt(row);
		         form.getForm().loadRecord(record);
				 win.show();
			  }
			  }
			  
		   },{  
		    iconCls:'icon-user-add',
			text:'删除',
			handler:function()
			  {  
			 if(row==-1)
			      {
				   Ext.Msg.alert('提示','请选择需要删除的信息');
				  }
			else
				  {
				   record = grid.getStore().getAt(row);
				   var id = record.data.id;
				    Ext.Ajax.request
					({
					  url:'php/removeDic.php',
					  success:function(response)
					    {
						 var json = Ext.decode(response.responseText);
						 if(json.success)
						    {
							  Ext.Msg.alert('消息','删除成功',function()
							       {
								     grid.getStore().reload();
									});
							}
						 },
				     failure:function()
					   {
					     Ext.Msg.alert('错误',"删除失败");
					   },
					  params:"id="+id
					 });
				  
			  }			
		     }
			}]		
	    });
		var row=-1;
		grid.on('rowclick',function(grid,rowIndex,event)
		{
			row = rowIndex;
		});
		 grid.on('afterrender',function(grid,event)
	    { 
	    	grid.getBottomToolbar().doRefresh();
		 });
function reset()
   {
     Ext.getCmp('id1').setValue('');
     Ext.getCmp('word1').setValue('');
	 Ext.getCmp('type1').setValue('');
	 form.getForm().reset();
	 win.show();
	 }	
	  config.add(grid);
		  
      
   };
 };