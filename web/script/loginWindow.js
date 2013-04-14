loginWindow=function(){
	this.init=function(config){
		if (config.auto)
		{
			Ext.Ajax.request({
				url: 'php/login.php',
				success: function(response){
					var obj = Ext.decode(response.responseText);
					doFrame(obj.authority);
				},
				failure: function(){
					Ext.MessageBox.alert('����','��һ���Զ���½��Ϣ���������µ�½');
				},
				params: {
					'super_auto':true,
					'user':config.user,
					'password':config.psw
				}
			});
		}
		else
		{
			var v_p=new Ext.form.TextField({
				id:'verifyPicture',
				inputType:'image',
				focusClass:'',
				value:'�������룬��Ⱥ򡭡�',
				enableKeyEvents:true,
				listeners:{
					scope:this,
					/*focus:function(){
						v_p.getEl().dom.src='php/Verify.php?'+Math.random();
						v_p.getEl().dom.tag='img';
					},*/
					render: function(p) {  
						p.getEl().on('mouseup', function(e){
							v_p.getEl().dom.src='php/Verify.php?'+Math.random();
							v_p.getEl().dom.tag='img';
						});  
					}
				}
			});//���޸�textfield��domԪ�صķ�����ʾͼƬ��������֤��ͼƬ��field
			Ext.QuickTips.register({
				target:v_p,
				text:'���ˢ��ͼƬ'
			});
			//����form panel
			var fo=new Ext.FormPanel({	
				width:320,//���
				height:190,
				padding:10,
				defaults:{xtype:'textfield'},//Ĭ������Ϊtextfield�����ö���Ϊitems�Լ�add, insert����
				items:[{
					//user�ı���
					fieldLabel:'�û���',//��ǩ��
					allowBlank:false,
					anchor:'90%',//������Ϊ�ܳ���70%
					value:config.save?config.user:'',
					name:'user'//POST��������ʱ��name
				},{
					//�����ı���
					fieldLabel:'����',
					allowBlank:false,
					anchor:'90%',
					value:config.save?config.psw:'',
					inputType:'password',//����ʾ���ı�����
					name:'password'
				},{
					//��֤�������ı���
					fieldLabel:'��֤��',
					allowBlank:false,
					anchor:'90%',
					name:'validater'
				},v_p/*��֤��ͼƬ*/,{
					xtype:'checkboxgroup',
					columns:2,
					items:[{
						boxLabel:'��ס����',
						name:'save',
						checked:config.save
					},{
						boxLabel:'�Զ���¼',
						name:'auto',
						checked:config.auto
					}]				
				},{
					xtype:'combo',
					fieldLabel:'���뱣��ʱ��',
					name:'cookieTime',
					typeAhead: true,
					triggerAction: 'all',
					lazyRender:true,
					mode: 'local',
					hiddenName:'cookieTime',
					value:-1,
					store: new Ext.data.ArrayStore({
						fields: [
							'cookieTime',
							'displayText'
						],
						data: [[-1,'������'],[86400, '1��'], [2592000, '1����'],[31536000, 'һ��']]
					}),
					valueField: 'cookieTime',
					emptyText:'������',
					displayField: 'displayText'
				}],
				buttons:[{
					//�ύ��ť
					text:'��½',//��ť�ı�
					handler:form_sub//�¼�������
				}
                /*,{
					text:'ע��',
					handler:function(){
						//win.();
						var register=new registerWindow();
						register.init().toFront();
					}
				}
                */]
			});
			//�޸�domԪ������ʾ��֤��ͼƬ
			var win=new Ext.Window({
				title:'��ӭʹ�ÿ��Ϳ����Ϣ����ϵͳ',
				id:'loginWindow',
				height:260,
				width:335,
				layout:'fit',
				//modal:true,
				closable:false,
				items:[fo],
				keys:[{
					key:13,
					fn:form_sub
				}]
			});
			fo.getForm().reset();
			win.show();
			v_p.getEl().dom.src='php/Verify.php?'+Math.random();
			v_p.getEl().dom.tag='img';
			return win;
		}
		function form_sub()
		{
			//���formpanel�е�basicform�����÷���submit����formpanel��standardSubmitΪfalseʱ��Ĭ��false����ʹ��ajax�ύ����
			var mask=new Ext.LoadMask(win.getEl(),{msg:'���ڵ�½�����Ժ򡭡�'});
			mask.show();
			fo.getForm().submit({
				url:'php/login.php',//�ύ��url
				//���������سɹ�ʱ�Ĵ���������һ���������ύ��form���ڶ���������result�Ƿ��������ز�������json��ʽ������
				success:function(form,action){
					var user=fo.getForm().findField('user').getValue();
					var log=user+'��½';
					var obj = Ext.decode(action.response.responseText);
					var authority=obj.authority;
                    /*
					Ext.Ajax.request({
						url: 'php/insertLog.php',
						success: function(response){
							
						},
						failure: function(){
							
						},
						params: {'log':log}
					});
                    */
					Ext.getCmp('loginWindow').destroy();
                    authority=1;
					doFrame(authority);
				},
				//����������ʧ�ܺ�Ĵ�����
				failure:function(form,action){
					mask.hide();
					v_p.getEl().dom.src='php/Verify.php?'+Math.random();
					v_p.getEl().dom.tag='img';
					Ext.MessageBox.alert('����',action.result.msg);
                    // Show a dialog using config options:
				}
			});
		}
	};
	this.refresh=function(){
		Ext.getCmp('verifyPicture').fireEvent('mouseup');
	};
};
