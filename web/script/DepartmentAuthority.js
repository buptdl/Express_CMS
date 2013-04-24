/**
 * @copy  dicGrid.js
 * @function �Բ����ڸ�Ա����Ȩ�޽�������
 * @authority ���Ź�����Ա���ϵ��˿���
 * @desc ����PHP��֤ �����õ�Ա����Ȩ�޲������������ܵ�Ȩ��
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
				{name: 'aut_express', type: 'int'}, // �ֶα�ʾ�Ŀ�ݵ����ֵ�Ȩ�� 1 or 5
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
			if(0 < value && value < 5) return '<span>��ͨ</span>';
			else if(4 < value) return '<span>�߼�</span>';
			else return '<span>��Ȩ��</span>';
    	};
    	var cm = new Ext.grid.ColumnModel([
    	    new Ext.grid.RowNumberer({width:30}),
    	    {header:"staff_id",sortable:true,hidden:true,dataIndex:'staff_id'},
 			{header:"����",sortable:true,dataIndex:'name'},
 			{header:"���Ȩ��",sortable:true,dataIndex:'aut_express', renderer:authority },
 			{header:"����Ȩ��",sortable:true,dataIndex:'aut_finance', renderer:authority },
 			{header:"��˾��֯Ȩ��",sortable:true,dataIndex:'aut_client', renderer:authority },
 			{header:"�绰",sortable:true,dataIndex:'phone'},
 			{header:"��������",sortable:true,dataIndex:'department'},
 			{header:"����",sortable:true,dataIndex:'manager'}
    	]);
    	
    	var aut_combo = new Ext.data.SimpleStore({
			    fields: ['value','text'],
			    data:[
			         ['1','��ͨ'],
					 ['5','�߼�'],
					 ['0','��Ȩ��']
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
   		  		fieldLabel:'����',
   		  		name: 'name',
   		  		allowBlank:false
   		  	}, {
   		  		fieldLabel:'���Ȩ��',
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
   		  		fieldLabel:'����Ȩ��',
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
   		  		fieldLabel:'��˾��֯Ȩ��',
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
   		  		fieldLabel:'�绰',
   		  		name: 'phone',
   		  		allowBlank:false
   		  	}, {
   		  		fieldLabel:'��������',
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
   				         ['1','����'], ['2', '�ͷ���'], ['3', '�ⷿ������'], ['0','�ܾ���']
   					]
   			    }),
   				valueField:'value',
   				displayField:'text'
   			}, {
   		  		fieldLabel:'����',
   		  		name: 'manager',
   		  		allowBlank:false
   		  	}],
   		  	buttons:[{
			  text: '�ύ',
			  handler: function() {
				  if(!form.getForm().isValid()){ return; }
				  if(form.getForm().findField("id").getValue() =="") {
					  form.getForm().submit ({
						  url:'php/addDic.php',  // TODO
						  success:function(f,action) {
							  if(action.result.success) {
								  Ext.Msg.alert('��Ϣ','�ύ�ɹ�',function() {
									  win.hide();
									  grid.getStore().reload();
								  });
							  }
						  },
						  failure:function() { Ext.Msg.alert('����',"�ύʧ��"); }
					  });
				  } else {
						form.getForm().submit ({
							url:'php/addDic.php', // TODO
							success:function(f,action) {
								if(action.result.success) {
									Ext.Msg.alert('��Ϣ','�ύ�ɹ�',function() {  
										win.hide();
								        grid.getStore().reload();				
								    });
								}
							},
							failure:function() { Ext.Msg.alert('����',"�ύʧ��"); }
						});
				  }
			  }
   		  	}, {
			text: '���',
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
			title:'��Ȩ����',
			closeAction:'hide',
			items:[form]
		});	   
    	
    	var grid = new Ext.grid.GridPanel({
			title:'Ա����Ȩ����',
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
			    emptyMsg:'<span>����loading</span>'
			}),
			tbar: [{ 
				iconCls:'icon-user-add',
				text:'���',
				scope:this,
				handler:reset
			 }, {
			    iconCls:'icon-user-add',
				text:'�޸�',
				scope:this,
				handler:function() {
					if(row==-1){ Ext.Msg.alert('��ʾ','��ѡ����Ҫ�޸ĵ���'); }
					else {
						record = grid.getStore().getAt(row);
						form.getForm().loadRecord(record);
						win.show();
					}
				}
			}, {  
			    iconCls:'icon-user-add',
				text:'ɾ��',
				handler:function() {  
//					Ext.Msg.alert('����','��Ա����������Ϣ���������');
					Ext.MessageBox.confirm('����', '��Ա����������Ϣ���������ȷ��ɾ����', 
						function showResult(btn){
				            if (btn == 'no'){ row = -1; }  // ȡ��ɾ������
				            Ext.example.msg('Button Click', 'You clicked the {0} button, row: {1}', btn, row);
				        }
				    );
					
					if(row==-1){ Ext.Msg.alert('��ʾ','��ѡ����Ҫ�޸ĵ���'); }
					else {
						record = grid.getStore().getAt(row);
						var id = record.data.id;
					    Ext.Ajax.request ({
						  url:'php/removeDic.php',
						  success:function(response) {
							  var json = Ext.decode(response.responseText);
							  if(json.success) {
								  Ext.Msg.alert('��Ϣ','ɾ���ɹ�',function() {
									  grid.getStore().reload();
								  });
							  }
						  },
						  failure:function() { Ext.Msg.alert('����',"ɾ��ʧ��"); },
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