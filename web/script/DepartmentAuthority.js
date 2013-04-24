/**
 * @copy  dicGrid.js
 * @function 对部门内各员工的权限进行配置
 * @authority 部门管理人员以上的人看见
 * @desc 后天PHP保证 被设置的员工的权限不超过部门主管的权限
 */
DepartmentAuthority=function() {
    this.init=function(config) {
    	
    	var mydata = [   // @test
    	          	    [1, 'zhou', 1, 1, 1, 6228010, 'dev', 'zhoum']
    	          	];
    	
    	var store = new Ext.data.Store({ // JsonStore({  // @test
//	    	root: 'data',  // @test
//			url:'PHP/DepartmentAuthority.php', TODO
    		proxy: new Ext.data.MemoryProxy(mydata),  // @test local data.
    		
			totalProperty: 'total',
			id: 'Department', 
//			fields:[
			reader: new Ext.data.ArrayReader({}, [
				{name: 'staff_id', type: 'int'},
				{name: 'name', type: 'string'},
				{name: 'aut_express', type: 'int'}, // 分段表示的快递单部分的权限 1 or 5
				{name: 'aut_finance', type: 'int'},
				{name: 'aut_client', type: 'int'},
				{name: 'phone', type: 'int'},
				{name: 'department', type: 'string'},
				{name: 'manager', type: 'string'}
			])
	    });
    	/*  // @test
    	var params={  };
    	params['filters[0][data][name]'] = 'usp_id';
		//params['filters[0][data][type]'] = 'int'; 
		params['filters[0][data][value]'] = usp_id;
    	store.load({params});
    	*/
    	
//    	store.loadData(mydata);
    	store.load();
    	
    	function authority(value){ 
			if(0 < value && value < 5) return '<span>普通</span>';
			else if(4 < value) return '<span>高级</span>';
			else return '<span>无权限</span>';
    	};
    	var cm = new Ext.grid.ColumnModel([
    	    new Ext.grid.RowNumberer({width:30}),
    	    {header:"staff_id",sortable:true,hidden:true,dataIndex:'staff_id'},
 			{header:"姓名",sortable:true,dataIndex:'name'},
 			{header:"快递权限",sortable:true,dataIndex:'aut_express', renderer:authority },
 			{header:"财务权限",sortable:true,dataIndex:'aut_finance', renderer:authority },
 			{header:"公司组织权限",sortable:true,dataIndex:'aut_client', renderer:authority },
 			{header:"电话",sortable:true,dataIndex:'phone'},
 			{header:"所属部门",sortable:true,dataIndex:'department'},
 			{header:"主管",sortable:true,dataIndex:'manager'}
    	]);
    	
    	var aut_combo = new Ext.data.SimpleStore({
			    fields: ['value','text'],
			    data:[
			         ['1','普通'],
					 ['5','高级'],
					 ['0','无权限']
					]
		});
    	Ext.form.Field.prototype.msgTarget = 'side';
    	var form = new Ext.form.FormPanel({
    		labelAlign: 'right',
            labelWidth: 80,
            width:  300,
   		  	autoHeight:true,
   		  	buttonAlign:'center',
   		  	bodyStyle: 'padding:1px;',
   		  	frame: true,
   		  	defaultType:'textfield',
   		  	defaults: { width:200},
   		  	items:[{
   		  		xtype: 'hidden',
   		  		id: 'staff_id',
   		  		name: 'staff_id'
   		  	}, {
   		  		fieldLabel:'姓名',
   		  		name: 'name',
   		  		allowBlank:false
   		  	}, {
   		  		fieldLabel:'快递权限',
   			    xtype:'combo',
   			    hiddenName:'type',
   			    allowBlank:false,
   			    forceSelection:true,
   			    typeAhead:true,
   			    selectOnFocus:true,
   			    triggerAction:'all',
   			    lazyRender:true,
   			    mode:'local',
   			    store:aut_combo,
   				valueField:'value',
   				displayField:'text'
   			}, {
   		  		fieldLabel:'财务权限',
   			    xtype:'combo',
   			    hiddenName:'type',
   			    allowBlank:false,
   			    forceSelection:true,
   			    typeAhead:true,
   			    selectOnFocus:true,
   			    triggerAction:'all',
   			    lazyRender:true,
   			    mode:'local',
   			    store:aut_combo,
   				valueField:'value',
   				displayField:'text'
   			}, {
   		  		fieldLabel:'公司组织权限',
   			    xtype:'combo',
   			    hiddenName:'type',
   			    allowBlank:false,
   			    forceSelection:true,
   			    typeAhead:true,
   			    selectOnFocus:true,
   			    triggerAction:'all',
   			    lazyRender:true,
   			    mode:'local',
   			    store:aut_combo,
   				valueField:'value',
   				displayField:'text'
   			}, {
   		  		fieldLabel:'电话',
   		  		name: 'phone',
   		  		allowBlank:false
   		  	}, {
   		  		fieldLabel:'所属部门',
   			    xtype:'combo',
   			    hiddenName:'type',
   			    allowBlank:false,
   			    forceSelection:true,
   			    typeAhead:true,
   			    selectOnFocus:true,
   			    triggerAction:'all',
   			    lazyRender:true,
   			    mode:'local',
   			    store: new Ext.data.SimpleStore({
   				    fields: ['value','text'],
   				    data:[
   				         ['1','财务部'], ['2', '客服部'], ['3', '库房操作部'], ['0','总经理']
   					]
   			    }),
   				valueField:'value',
   				displayField:'text'
   			}, {
   		  		fieldLabel:'主管',
   		  		name: 'manager',
   		  		allowBlank:false
   		  	}],
   		  	buttons:[{
			  text: '提交',
			  handler: function() {
				  if(!form.getForm().isValid()){ return; }
				  if(form.getForm().findField("id").getValue() =="") {
					  form.getForm().submit ({
						  url:'php/addDic.php',  // TODO
						  success:function(f,action) {
							  if(action.result.success) {
								  Ext.Msg.alert('消息','提交成功',function() {
									  win.hide();
									  grid.getStore().reload();
								  });
							  }
						  },
						  failure:function() { Ext.Msg.alert('错误',"提交失败"); }
					  });
				  } else {
						form.getForm().submit ({
							url:'php/addDic.php', // TODO
							success:function(f,action) {
								if(action.result.success) {
									Ext.Msg.alert('消息','提交成功',function() {  
										win.hide();
								        grid.getStore().reload();				
								    });
								}
							},
							failure:function() { Ext.Msg.alert('错误',"提交失败"); }
						});
				  }
			  }
   		  	}, {
			text: '清空',
			handler:reset
   		  	}] 
    	});
    	
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
			title:'授权管理',
			closeAction:'hide',
			items:[form]
		});	   
    	
    	var grid = new Ext.grid.GridPanel({
			title:'员工授权管理',
			height:500,
			width:500,
			id:'DepartmentAuthority',
			closable:true,
			store:store,
			trackMouseOver:true,
			disableSelection:true,
			loadMask:true,	
			style:'margin-top: 10px',		
			cm:cm,
			sm:new Ext.grid.RowSelectionModel({singleSelect:true}),
			viewConfig: {
			    forceFit:true,
				enableRowBody:true,
				showPreview:false
			},
			bbar:new Ext.PagingToolbar ({
			    pageSize:16,
			    store:store,
			    displayInfo:true,
			    emptyMsg:'<span>数据loading</span>'
			}),
			tbar: [{ 
				iconCls:'icon-user-add',
				text:'添加',
				scope:this,
				handler:reset
			 }, {
			    iconCls:'icon-user-add',
				text:'修改',
				scope:this,
				handler:function() {
					if(row==-1){ Ext.Msg.alert('提示','请选择需要修改的项'); }
					else {
						record = grid.getStore().getAt(row);
						form.getForm().loadRecord(record);
						win.show();
					}
				}
			}, {  
			    iconCls:'icon-user-add',
				text:'删除',
				handler:function() {  
//					Ext.Msg.alert('警告','该员工的所有信息将被清除！');
					Ext.MessageBox.confirm('警告', '该员工的所有信息将被清除！确定删除吗？', 
						function showResult(btn){
				            if (btn == 'no'){ row = -1; }  // 取消删除操作
				            Ext.example.msg('Button Click', 'You clicked the {0} button, row: {1}', btn, row);
				        }
				    );
					
					if(row==-1){ Ext.Msg.alert('提示','请选择需要修改的项'); }
					else {
						record = grid.getStore().getAt(row);
						var id = record.data.id;
					    Ext.Ajax.request ({
						  url:'php/removeDic.php',
						  success:function(response) {
							  var json = Ext.decode(response.responseText);
							  if(json.success) {
								  Ext.Msg.alert('消息','删除成功',function() {
									  grid.getStore().reload();
								  });
							  }
						  },
						  failure:function() { Ext.Msg.alert('错误',"删除失败"); },
						  params:"id="+id
						 });
					}			
			    }
			}]		
	    });
		var row=-1;
		grid.on('rowclick',function(grid,rowIndex,event) {
			row = rowIndex;
		});
		grid.on('afterrender',function(grid,event) { 
	    	grid.getBottomToolbar().doRefresh();
		});
				
		function reset() {
	    	Ext.getCmp('staff_id').setValue('');
	    	Ext.getCmp('name').setValue('');
	    	Ext.getCmp('aut_express').setValue('');
	    	Ext.getCmp('aut_finance').setValue('');
	    	Ext.getCmp('aut_client').setValue('');
	    	Ext.getCmp('phone').setValue('');
	    	Ext.getCmp('department').setValue('');
	    	form.getForm().reset();
	    	win.show();
		};

		config.add(grid);
     
  };
};