UpdatePassword=function() { // @From dicGrid.js
  this.init=function(config) {
 
	Ext.form.Field.prototype.msgTarget = 'side';

	// 添加 关注词 的面板
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
				fieldLabel : '原始密码',
				name : 'word',
				id : 'word1',
				inputType: 'password', // 隐藏输入的字符
				allowBlank : false
//				hidden:true
			}, { 
				id : 'type1',
				fieldLabel : '新的秘密',
				name: 'type1',
				inputType: 'password', // 隐藏输入的字符
				xtype: 'textfield',
//				hidden:true,
				allowBlank: false
			}, { 
				id: 'ctype1',
				name: 'ctype1',
				fieldLabel : '确认秘密',
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
				text : '提交',
				handler : function() {
					if (!form.getForm().isValid()) { return; }
					form.getForm().submit({
						url : 'php/UpdatePassword.php',  // TODO
						success : function(f, action) {
							if (action.result.success) {
								Ext.Msg.alert('消息', '提交成功', function() {
									win.hide();
									grid.getStore().reload();
								});
							}
						},
						failure : function() { Ext.Msg.alert('错误', "提交失败"); }
					});
				}
			}, {
				text : '清空',
				handler : reset
			} ]
	});
		// 添加关注词的弹出对话框
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
			title : '修改登录密码',
			closeAction : 'hide',
			items : [ form ]
	});	   
		
	// 主面板
	var grid = new Ext.grid.GridPanel ({
		title:'修改登录密码',
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
	// 清空填充的内容
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