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
            {id: 'user',  header: '�û���', dataIndex: 'user',sortable:true},
	        {id: 'password',header: '����',dataIndex: 'password',hidden:true},
			{id: 'confirmPassword',dataIndex:'confirmPassword',hidden:true},
			{id: 'authority',header: '�û�Ȩ��',dataIndex: 'authority',sortable:true,
			   renderer:function(value)
			     { if(value==4) return '<span>��������Ա</span>';
			       else if(value==2) return '<span>ϵͳ����Ա</span>';
				   else if(value==1) return'<span>��ͨ�û�</span>';
				   else return null;
				 }
				 
			},
			 {id: 'real_name',  header: '��ʵ����', dataIndex: 'real_name',sortable:true},
			 {id: 'department',  header: '����������λ', dataIndex: 'department',sortable:true,
			 
			  /*[1, 'У��칫��'], [2, '����'],[3, '�о���Ժ'],[4, 'Զ�������������'],[5, '���´�'],[6, '����'],[7, '�ʲ�����'],[8, '�Ƽ���'],[9, 'ѧ���������'],[10, '������ҵ��'],[11, '���ʺ����뽻����'],[12, '������'],[13, '���ܴ�'],[14, '������'],[15, '���ڴ�'],[16, '�����ݹ�����'],[17, '��촦'],[18, '��ƴ�'],[19, '��չս���о�����'],[20, '�긻У���ۺϰ칫��'],[21, '�������й���'],[22, '���л��ذ칫��'],[23, '���̼���ת������']*/
			 renderer:function(value)
			     {switch(value)
				    {case 1:return '<span>У��칫��</span>';
					 case 2:return '<span>����</span>';
					 case 3:return '<span>�о���Ժ</span>';
					 case 4:return '<span>Զ�������������</span>';
					 case 5:return '<span>���´�</span>';
					 case 6:return '<span>����</span>';
					 case 7:return '<span>�ʲ�����</span>';
					 case 8:return '<span>�Ƽ���</span>';
					 case 9:return '<span>ѧ���������</span>';
					 case 10:return '<span>������ҵ��</span>';
					 case 11:return '<span>���ʺ����뽻����</span>';
					 case 12:return '<span>������</span>';
					 case 13:return '<span>���ܴ�</span>';
					 case 14:return '<span>������</span>';
					 case 15:return '<span>���ڴ�</span>';
					 case 16:return '<span>�����ݹ�����</span>';
					 case 17:return '<span>��촦</span>';
					 case 18:return '<span>��ƴ�</span>';
					 case 19:return '<span>��չս���о�����</span>';
					 case 20:return '<span>�긻У���ۺϰ칫��</span>';
					 case 21:return '<span>�������й���</span>';
					 case 22:return '<span>���л��ذ칫��</span>';
					 case 23:return '<span>���̼���ת������</span>';
				  }
				}
			}, 
			 {id: 'email',  header: '����', dataIndex: 'email',sortable:true},
			 {id: 'cellphone',  header: '�ƶ��绰', dataIndex: 'cellphone',sortable:true}, 
			 {id:'telephone',  header: '�̶��绰', dataIndex: 'telephone',sortable:true}, 
			{id: 'activate',header: '�û�״̬',dataIndex: 'activate',sortable:true,
			   renderer:function(value)
			     { if(value==1) return '<span>����</span>';
			       else if(value==0) return '<span>����</span>';
				   else return '��¼���Ϸ�';
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
		 {fieldLabel:'�û���',
		 id :'user1',
		  name: 'user',
		  allowBlank:false
		 },
		 {fieldLabel:'��ʵ����',
		 id:'real_name1',
		    allowBlank:false,
		  name:'real_name'
		 },
		 {fieldLabel:'����',
		  inputType: 'password',
		  id:'password1',
		     allowBlank:false,
		  name:'password' 
		 },
		 {fieldLabel: 'ȷ������',
		  inputType: 'password',
		  id:'confirmPassword1',
		  name:'confirmPassword'
		 },
		 {fieldLabel:'����������λ',
		  xtype:'combo',
		  id:'department1',
		  hiddenName:'department',
		  typeAhead: true,
		  forceSelection:true,
		  selectOnFocus:true,
		  triggerAction: 'all',
		  lazyRender:true,
		  emptyText:'��ѡ��',
		  mode: 'local',
		 store: new Ext.data.SimpleStore
		 ({
		 fields: ['value','text'],
		 data: [['1', 'У��칫��'], 
		        ['2', '����'],
				['3', '�о���Ժ'],
				['4', 'Զ�������������'],
				['5', '���´�'],
				['6', '����'],
				['7', '�ʲ�����'],
				['8', '�Ƽ���'],
				['9', 'ѧ���������'],
				['10', '������ҵ��'],
				['11', '���ʺ����뽻����'],
				['12', '������'],
				['13', '���ܴ�'],
				['14', '������'],
				['15', '���ڴ�'],
				['16', '�����ݹ�����'],
				['17', '��촦'],
				['18', '��ƴ�'],
				['19', '��չս���о�����'],
				['20', '�긻У���ۺϰ칫��'],
				['21', '�������й���'],
                ['22', '���л��ذ칫��'],
                ['23', '���̼���ת������']
              ]
				}),
				valueField: 'value',
				displayField: 'text'
			},
			{   fieldLabel:'����',
			    id:'email1',
				name:'email',
				vtype:'email',
				vtypeText:'�����ַ��ʽ����ȷ'
			},{
				fieldLabel:'�̶��绰',
				id:'telephone1',
				name:'telephone'
			},{
				fieldLabel:'�ƶ��绰',
				id:'cellphone1',
				name:'cellphone'
			},
		 {fieldLabel: '�����û�',
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
		         ['1','�����û�'],
				 ['0','�����û�']
				]
			}
		 ),
		 emptyText:'��ѡ��',
		 mode:'local',
		 triggerAction:'all',
		 valueField:'value',
		 displayField:'text',
		 typeAhead:true,
		 selectOnFocus:true
		 },
		 {fieldLabel: 'ѡ��Ȩ��',
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
		         ['1','��ͨ�û�'],
				 ['2','ϵͳ����Ա'],
				 ['4','��������Ա']
				]
			}
		 ),
		 emptyText:'��ѡ��',
		 mode:'local',
		 triggerAction:'all',
		 valueField:'value',
		 displayField:'text',
		 typeAhead:true,
		 selectOnFocus:true
		 
		 
		 }
		 
		],
		buttons:
		[{text: '�ύ',
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
							    Ext.Msg.alert('��Ϣ','�ύ�ɹ�',function()
								               {
											     win.hide();
								                 grid.getStore().reload();
								               
												
								               }
											  );
							  }
						},
					   failure:function()
					    {
						  Ext.Msg.alert('����',"�ύʧ��");
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
							    Ext.Msg.alert('��Ϣ','�ύ�ɹ�',function()
								               {  
											     win.hide();
								                 grid.getStore().reload();
								               }
											  );
							  }
						},
					   failure:function()
					    {
						  Ext.Msg.alert('����',"�ύʧ��");
						}
					   });
					 }
			 }
		},
		 {text: '���',
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
			title:'�û�����',
			closeAction:'hide',
			items:[form]
		});

    var grid = new Ext.grid.GridPanel
	({
        title:'�û���Ϣ��',
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
		  emptyMsg:'<span>����loading</span>'
		}),
        tbar: [{
            iconCls: 'icon-user-add',
            text: '����û�',
			scope:this,
			handler: reset
          },
		   {
            iconCls: 'icon-user-add',
            text: '�޸��û�',
			scope:this,
			handler: function()
			{ 
			   if(row==-1) Ext.Msg.alert('��ʾ','��ѡ����Ҫ�޸ĵ��û���¼');
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
            text: 'ɾ���û�',
            disabled: false,
			handler:function()
			{

			   if(row==-1)
			      {
				   Ext.Msg.alert('��ʾ','��ѡ����Ҫɾ������Ϣ');
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
							  Ext.Msg.alert('��Ϣ','ɾ���ɹ�');
							}
						 },
				     failure:function()
					   {
					     Ext.Msg.alert('����',"ɾ��ʧ��");
					   },
					  params:"id="+id
					 });
				  }
			 }
		  },
		  {
		    ref: '../removeBtn',
            iconCls: 'icon-user-delete',
            text: '�����û�',
            disabled: false,
			handler:function()
			{
			    if(row==-1)
			      {
				   Ext.Msg.alert('��ʾ','��ѡ����Ҫ������û�');
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
							  Ext.Msg.alert('��Ϣ','�����ɹ�');
							}
						 },
				     failure:function()
					   {
					     Ext.Msg.alert('����',"����ʧ��");
					   },
					  params:"id="+id
					 });
				  }
			 }
		  
		  
		  
		  
		  
		  
		  
		  },
		  
		  
		  
		    {
		    ref: '../removeBtn',
            iconCls: 'icon-user-delete',
            text: '�����û�',
            disabled: false,
			handler:function()
			{
			  if(row==-1)
			      {
				   Ext.Msg.alert('��ʾ','��ѡ����Ҫ������û�');
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
							  Ext.Msg.alert('��Ϣ','����ɹ�');
							}
						 },
				     failure:function()
					   {
					     Ext.Msg.alert('����',"����ʧ��");
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

   
 
   

