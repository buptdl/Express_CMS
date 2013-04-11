userGrid = function()
{ 
  this.init = function(config)
  { 	
	 var store = new Ext.data.JsonStore
	({
        autoDestroy:true,
		url:'php/displayUser.php',
		root: 'userData',
        totalProperty: 'total',
        idProperty: 'user',
        remoteSort: false,
        storeId: 'userStore',
        fields: [
		         {name:'userId',type:'int'},
		         {name: 'user',type: 'string'},
		         {name: 'password',type: 'string'},
				 {name: 'confirmPassword',type:'string'},
			     {name: 'authority',type: 'int'} ,
				 {name: 'real_name',type: 'string'},
				 {name: 'department',type:'int'},
				 {name: 'email',type:'string'},
				 {name: 'cellphone',type:'string'},
				 {name: 'telephone',type:'string'},
				 {name: 'activate',type:'int'}
                ]
	});  


	var columns = new Ext.grid.ColumnModel
		 (  [
		    new Ext.grid.RowNumberer({width:30}),
            {id: 'user',  header: '用户名', dataIndex: 'user',sortable:true},
	        {id: 'password',header: '密码',dataIndex: 'password',hidden:true},
			{id: 'confirmPassword',dataIndex:'confirmPassword',hidden:true},
			{id: 'authority',header: '用户权限',dataIndex: 'authority',sortable:true,
			   renderer:function(value)
			     { if(value==4) return '<span>超级管理员</span>';
			       else if(value==2) return '<span>系统管理员</span>';
				   else if(value==1) return'<span>普通用户</span>';
				   else return null;
				 }
				 
			},
			 {id: 'real_name',  header: '真实姓名', dataIndex: 'real_name',sortable:true},
			 {id: 'department',  header: '所属二级单位', dataIndex: 'department',sortable:true,
			 
			  /*[1, '校务办公室'], [2, '教务处'],[3, '研究生院'],[4, '远程与继续教育处'],[5, '人事处'],[6, '财务处'],[7, '资产管理处'],[8, '科技处'],[9, '学生事务管理处'],[10, '招生就业处'],[11, '国际合作与交流处'],[12, '保卫处'],[13, '保密处'],[14, '基建处'],[15, '后勤处'],[16, '离退休工作处'],[17, '监察处'],[18, '审计处'],[19, '发展战略研究中心'],[20, '宏富校区综合办公室'],[21, '军工科研管理处'],[22, '科研基地办公室'],[23, '工程技术转移中心']*/
			 renderer:function(value)
			     {switch(value)
				    {case 1:return '<span>校务办公室</span>';
					 case 2:return '<span>教务处</span>';
					 case 3:return '<span>研究生院</span>';
					 case 4:return '<span>远程与继续教育处</span>';
					 case 5:return '<span>人事处</span>';
					 case 6:return '<span>财务处</span>';
					 case 7:return '<span>资产管理处</span>';
					 case 8:return '<span>科技处</span>';
					 case 9:return '<span>学生事务管理处</span>';
					 case 10:return '<span>招生就业处</span>';
					 case 11:return '<span>国际合作与交流处</span>';
					 case 12:return '<span>保卫处</span>';
					 case 13:return '<span>保密处</span>';
					 case 14:return '<span>基建处</span>';
					 case 15:return '<span>后勤处</span>';
					 case 16:return '<span>离退休工作处</span>';
					 case 17:return '<span>监察处</span>';
					 case 18:return '<span>审计处</span>';
					 case 19:return '<span>发展战略研究中心</span>';
					 case 20:return '<span>宏富校区综合办公室</span>';
					 case 21:return '<span>军工科研管理处</span>';
					 case 22:return '<span>科研基地办公室</span>';
					 case 23:return '<span>工程技术转移中心</span>';
				  }
				}
			}, 
			 {id: 'email',  header: '邮箱', dataIndex: 'email',sortable:true},
			 {id: 'cellphone',  header: '移动电话', dataIndex: 'cellphone',sortable:true}, 
			 {id:'telephone',  header: '固定电话', dataIndex: 'telephone',sortable:true}, 
			{id: 'activate',header: '用户状态',dataIndex: 'activate',sortable:true,
			   renderer:function(value)
			     { if(value==1) return '<span>激活</span>';
			       else if(value==0) return '<span>冻结</span>';
				   else return '记录不合法';
				 }
			 }
			]
		  );
	 Ext.form.Field.prototype.msgTarget = 'side';
	 var form = new Ext.FormPanel( { 
		labelAlign: 'right',
        labelWidth: 80,
        width:  300,
		autoHeight:true,
		buttonAlign:'center',
		bodyStyle: 'padding:1px;',
		frame: true,
		defaultType:'textfield',
		defaults:
		{ width:200,
		 allowBlank:false
		},
		
		items:
		[{xtype: 'hidden',
		  id:'userId1',
		  name: 'userId'
		 },
		 {fieldLabel:'用户名',
		 id :'user1',
		  name: 'user',
		  allowBlank:false
		 },
		 {fieldLabel:'真实姓名',
		 id:'real_name1',
		    allowBlank:false,
		  name:'real_name'
		 },
		 {fieldLabel:'密码',
		  inputType: 'password',
		  id:'password1',
		     allowBlank:false,
		  name:'password' 
		 },
		 {fieldLabel: '确认密码',
		  inputType: 'password',
		  id:'confirmPassword1',
		  name:'confirmPassword'
		 },
		 {fieldLabel:'所属二级单位',
		  xtype:'combo',
		  id:'department1',
		  hiddenName:'department',
		  typeAhead: true,
		  forceSelection:true,
		  selectOnFocus:true,
		  triggerAction: 'all',
		  lazyRender:true,
		  emptyText:'请选择',
		  mode: 'local',
		 store: new Ext.data.SimpleStore
		 ({
		 fields: ['value','text'],
		 data: [['1', '校务办公室'], 
		        ['2', '教务处'],
				['3', '研究生院'],
				['4', '远程与继续教育处'],
				['5', '人事处'],
				['6', '财务处'],
				['7', '资产管理处'],
				['8', '科技处'],
				['9', '学生事务管理处'],
				['10', '招生就业处'],
				['11', '国际合作与交流处'],
				['12', '保卫处'],
				['13', '保密处'],
				['14', '基建处'],
				['15', '后勤处'],
				['16', '离退休工作处'],
				['17', '监察处'],
				['18', '审计处'],
				['19', '发展战略研究中心'],
				['20', '宏富校区综合办公室'],
				['21', '军工科研管理处'],
                ['22', '科研基地办公室'],
                ['23', '工程技术转移中心']
              ]
				}),
				valueField: 'value',
				displayField: 'text'
			},
			{   fieldLabel:'邮箱',
			    id:'email1',
				name:'email',
				vtype:'email',
				vtypeText:'邮箱地址格式不正确'
			},{
				fieldLabel:'固定电话',
				id:'telephone1',
				name:'telephone'
			},{
				fieldLabel:'移动电话',
				id:'cellphone1',
				name:'cellphone'
			},
		 {fieldLabel: '激活用户',
		 id:'activate1',
		  name: 'actText',
		  hiddenName:'activate',
		    xtype:'combo',
		  forceSelection:true,
		  store: new Ext.data.SimpleStore
		 (
		  { 
		   fields:['value','text'],
		   data:[
		         ['1','激活用户'],
				 ['0','冻结用户']
				]
			}
		 ),
		 emptyText:'请选择',
		 mode:'local',
		 triggerAction:'all',
		 valueField:'value',
		 displayField:'text',
		 typeAhead:true,
		 selectOnFocus:true
		 },
		 {fieldLabel: '选择权限',
		  name: 'authText',
		  id:'authority1',
		  hiddenName:'authority',
		    xtype:'combo',
			forceSelection:true,
		  store: new Ext.data.SimpleStore
		 (
		  { 
		   fields:['value','text'],
		   data:[
		         ['1','普通用户'],
				 ['2','系统管理员'],
				 ['4','超级管理员']
				]
			}
		 ),
		 emptyText:'请选择',
		 mode:'local',
		 triggerAction:'all',
		 valueField:'value',
		 displayField:'text',
		 typeAhead:true,
		 selectOnFocus:true
		 
		 
		 }
		 
		],
		buttons:
		[{text: '提交',
		  handler: function()
		      {
			   if(!form.getForm().isValid()){return;}
				if(form.getForm().findField("userId").getValue() =="")
				  {
				    form.getForm().submit
					({
					  url:'php/addUser.php',
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
					   url:'php/addUser.php',
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
		  handler: reset 
		 }
		 ]    
	  });


		var win=new Ext.Window({
			id:'userWin',
			width:350,
			autoHeight:true,
			frame: true,			
			modal:true,
			plain:true,
			closable:true,
			resizeable:false,
			border:false,
			layout: 'fit',
			title:'用户管理',
			closeAction:'hide',
			items:[form]
		});

    var grid = new Ext.grid.GridPanel
	({
        title:'用户信息表',
		frame:true,
		height:800,
		id:'userGrid',
		closable:true,
		modal:true,
		loadMask:{msg:'Loading  ...'}, 
		trackMouseOver:true,
		store: store,
        //region:'center',
		cm:columns,
		sm:new Ext.grid.RowSelectionModel({singleSelect:true}),
        //ViewConfig:{forceFit:true},
		bbar: new Ext.PagingToolbar
		({
		  pageSize:16,
		  store:store,
		  displayInfo:true,
		  emptyMsg:'<span>数据loading</span>'
		}),
        tbar: [{
            iconCls: 'icon-user-add',
            text: '添加用户',
			scope:this,
			handler: reset
          },
		   {
            iconCls: 'icon-user-add',
            text: '修改用户',
			scope:this,
			handler: function()
			{ 
			   if(row==-1) Ext.Msg.alert('提示','请选择需要修改的用户记录');
			  else 
			  {
				 record = grid.getStore().getAt(row);
		         form.getForm().loadRecord(record);
				 win.show();
			  }
			} 
          },
		  {
		    ref: '../removeBtn',
            iconCls: 'icon-user-delete',
            text: '删除用户',
            disabled: false,
			handler:function()
			{

			   if(row==-1)
			      {
				   Ext.Msg.alert('提示','请选择需要删除的信息');
				  }else
				  {
				    record = grid.getStore().getAt(row);
					var id = record.data.userId;
				     
				    Ext.Ajax.request
					({
					  url:'php/removeUser.php',
					  success:function(response)
					    {
						 var json = Ext.decode(response.responseText);
						 if(json.success)
						    {
							   grid.getStore().reload();
							  Ext.Msg.alert('消息','删除成功');
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
		  },
		  {
		    ref: '../removeBtn',
            iconCls: 'icon-user-delete',
            text: '激活用户',
            disabled: false,
			handler:function()
			{
			    if(row==-1)
			      {
				   Ext.Msg.alert('提示','请选择需要激活的用户');
				  }else
				  {
				    record = grid.getStore().getAt(row);
					var id = record.data.userId;
				    Ext.Ajax.request
					({
					  url:'php/activateUser.php',
					  success:function(response)
					    {
						 var json = Ext.decode(response.responseText);
						 if(json.success)
						    {
							   grid.getStore().reload();
							  Ext.Msg.alert('消息','操作成功');
							}
						 },
				     failure:function()
					   {
					     Ext.Msg.alert('错误',"激活失败");
					   },
					  params:"id="+id
					 });
				  }
			 }
		  
		  
		  
		  
		  
		  
		  
		  },
		  
		  
		  
		    {
		    ref: '../removeBtn',
            iconCls: 'icon-user-delete',
            text: '冻结用户',
            disabled: false,
			handler:function()
			{
			  if(row==-1)
			      {
				   Ext.Msg.alert('提示','请选择需要冻结的用户');
				  }else
				  {
				    record = grid.getStore().getAt(row);
					var id = record.data.userId;
				    Ext.Ajax.request
					({
					  url:'php/inActivateUser.php',
					  success:function(response)
					    {
						 var json = Ext.decode(response.responseText);
						 if(json.success)
						    {
							  grid.getStore().reload();
							  Ext.Msg.alert('消息','冻结成功');
							}
						 },
				     failure:function()
					   {
					     Ext.Msg.alert('错误',"冻结失败");
					   },
					  params:"id="+id
					 });
				  }
			 }
		  
		  }
		  
		  
		  
		  ]		
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
	
	  // myMask = new Ext.LoadMask(grid.getEl(), {msg:"Please wait..."});
         // myMask.show();
      //    store.load();
   function reset()
   {
     Ext.getCmp('userId1').setValue('');
     Ext.getCmp('user1').setValue('');
	 Ext.getCmp('password1').setValue('');
     Ext.getCmp('confirmPassword1').setValue('');
	 Ext.getCmp('authority1').setValue('');
	 Ext.getCmp('real_name1').setValue('');
	 Ext.getCmp('department1').setValue(''); 
 	 Ext.getCmp('email1').setValue(''); 
     Ext.getCmp('cellphone1').setValue('');
	 Ext.getCmp('telephone1').setValue('');
	 Ext.getCmp('activate1').setValue('');
	 form.getForm().reset();
	 win.show();
	 }	
	   config.add(grid);
  }
  
  
  
};

   
 
   

