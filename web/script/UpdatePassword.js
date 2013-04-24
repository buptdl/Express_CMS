UpdatePassword=function() { // @From dicGrid.js
  this.init=function(config) {
 
	Ext.form.Field.prototype.msgTarget = 'side';

	// ��� ��ע�� �����
	var form = new Ext.form.FormPanel({
			labelAlign : 'right',
			labelWidth : 80,
			width : 300,
			autoHeight : true,
			buttonAlign : 'center',
			bodyStyle : 'padding:1px;',
			frame : true,
			defaultType : 'textfield',
			defaults : {
				width : 200
			},
			items : [{
				xtype : 'hidden',
				id : 'id1',
				name : 'id'
			}, {
				fieldLabel : 'ԭʼ����',
				name : 'word',
				id : 'word1',
				inputType: 'password', // ����������ַ�
				allowBlank : false
//				hidden:true
			}, { 
				id : 'type1',
				fieldLabel : '�µ�����',
				name: 'type1',
				inputType: 'password', // ����������ַ�
				xtype: 'textfield',
//				hidden:true,
				allowBlank: false
			}, { 
				id: 'ctype1',
				name: 'ctype1',
				fieldLabel : 'ȷ������',
				inputType: 'password',
				xtype: 'textfield',
//				hidden:true,
				allowBlank: false,
				validator: function(){
					if (Ext.get('type1').dom.value == Ext.get('ctype1').dom.value){
						return true;
					}
					return false;
				}
			}], 
			buttons : [{
				text : '�ύ',
				handler : function() {
					if (!form.getForm().isValid()) { return; }
					form.getForm().submit({
						url : 'php/UpdatePassword.php',  // TODO
						success : function(f, action) {
							if (action.result.success) {
								Ext.Msg.alert('��Ϣ', '�ύ�ɹ�', function() {
									win.hide();
									grid.getStore().reload();
								});
							}
						},
						failure : function() { Ext.Msg.alert('����', "�ύʧ��"); }
					});
				}
			}, {
				text : '���',
				handler : reset
			} ]
	});
		// ��ӹ�ע�ʵĵ����Ի���
	var win = new Ext.Window({
			id : 'configWin',
			width : 350,
			autoHeight : true,
			frame : true,
			modal : true,
			plain : true,
			closable : true,
			resizeable : false,
			border : false,
			layout : 'fit',
			title : '�޸ĵ�¼����',
			closeAction : 'hide',
			items : [ form ]
	});	   
		
	// �����
	var grid = new Ext.grid.GridPanel ({
		title:'�޸ĵ�¼����',
		height:500,
		width:500,
		id:'UpdatePassword',
		closable:true,
//		store:store,
		trackMouseOver:true,
		disableSelection:true,
		loadMask:true,	
		style:'margin-top: 10px',		

	});
	grid.on('activate', reset);
	grid.on('beforerender', reset);
	// �����������
	function reset() {
		 win.hide();
	     Ext.getCmp('id1').setValue('');
	     Ext.getCmp('word1').setValue('');
		 Ext.getCmp('type1').setValue('');
		 form.getForm().reset();
		 win.show();
	}	
	config.add(grid);
      
   };
 };