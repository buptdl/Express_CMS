registerWindow=function(){
	this.init=function(){
		function register(){
			form.getForm().submit({
				url:'php/register.php',//�ύ��url
				//���������سɹ�ʱ�Ĵ���������һ���������ύ��form���ڶ���������result�Ƿ��������ز�������json��ʽ������
				success:function(form,action){
					Ext.getCmp('registerWindow').destroy();
					Ext.MessageBox.alert('success','ע��ɹ�,��ȴ�����Ա���');
				},
				//����������ʧ�ܺ�Ĵ�����
				failure:function(form,action){
					Ext.MessageBox.alert('failure',action.result.msg);
				}
			});
		}
		var form=new Ext.form.FormPanel({
			padding:10,
			defaults:{
				xtype:'textfield'
			},
			items:[{
				fieldLabel:'*��½�û���',
				name:'user',
				allowBlank:false,
				blankText:'�����Ϊ��',
				validationDelay:200,
				validationEvent:'blur',
				validator:function(value){
					if (value=='')
					{
						form.getForm().findField('user').markInvalid('�����Ϊ��');
						return '�����Ϊ��';
					}
					Ext.Ajax.request({
						url: 'php/userTest.php',
						success: function(response){
							var obj=Ext.decode(response.responseText);
							if (obj.success)
							{
								return true;
							}
							else
							{
								form.getForm().findField('user').markInvalid('�Ѵ��ڸ��û���');
								return '�Ѵ��ڸ��û���';
							}
						},
						failure: function(){
							form.getForm().findField('user').markInvalid('�޷����������������');
							return '�޷����������������';
						},
						params: {'user':value}
					});
				}
			},{
				fieldLabel:'*����',
				allowBlank:false,
				blankText:'�����Ϊ��',
				inputType:'password',
				name:'password'
			},{
				fieldLabel:'*ȷ������',
				allowBlank:false,
				blankText:'�����Ϊ��',
				inputType:'password',
				name:'confirmPassword',
				validationDelay:200,
				validationEvent:'blur',
				validator:function(value){
					if (value=='')
					{
						form.getForm().findField('confirmPassword').markInvalid('�����Ϊ��');
						return '�����Ϊ��';
					}
					else if (value!==form.getForm().findField('password').getValue())
					{
						form.getForm().findField('confirmPassword').markInvalid('�����벻��ͬ');
						return '�����벻��ͬ';
					}
				}
			},{
				xtype:'combo',
				fieldLabel:'*Ȩ��',
				width:130,
				allowBlank:false,
				blankText:'�����Ϊ��',
				name:'authority',
				hiddenName:'authority',//postʱ������ֵ
				typeAhead: true,
				triggerAction: 'all',
				lazyRender:true,
				mode: 'local',
				store: new Ext.data.ArrayStore({
					id: 0,
					fields: [
						'authority',
						'displayText'
					],
					data: [[1, '��ͨ�û�'], [2, '����Ա'],[4, '��������Ա']]
				}),
				valueField: 'authority',
				displayField: 'displayText'
			},{
				fieldLabel:'*��ʵ����',
				name:'real_name',
				allowBlank:false,
				blankText:'�����Ϊ��'
			},{
				xtype:'combo',
				fieldLabel:'*����������λ',
				width:130,
				allowBlank:false,
				blankText:'�����Ϊ��',
				name:'department',
				typeAhead: true,
				triggerAction: 'all',
				lazyRender:true,
				mode: 'local',
				store: new Ext.data.ArrayStore({
					id: 0,
					fields: [
						'authority',
						'displayText'
					],
					data: [[1, 'У��칫��'], [2, '����'],[3, '�о���Ժ'],[4, 'Զ�������������'],[5, '���´�'],[6, '����'],[7, '�ʲ�����'],[8, '�Ƽ���'],[9, 'ѧ���������'],[10, '������ҵ��'],[11, '���ʺ����뽻����'],[12, '������'],[13, '���ܴ�'],[14, '������'],[15, '���ڴ�'],[16, '�����ݹ�����'],[17, '��촦'],[18, '��ƴ�'],[19, '��չս���о�����'],[20, '�긻У���ۺϰ칫��'],[21, '�������й���'],[22, '���л��ذ칫��'],[23, '���̼���ת������']]
				}),
				valueField: 'authority',
				displayField: 'displayText'
			},{
				fieldLabel:'����',
				name:'email',
				vtype:'email',
				vtypeText:'�����ַ��ʽ����ȷ'
			},{
				fieldLabel:'�̶��绰',
				name:'telephone'
			},{
				fieldLabel:'�ƶ��绰',
				name:'cellphone'
			}],
			buttons:[{
				text:'ע��',
				handler:register
			},{
				text:'ȡ��',
				handler:function(){
					Ext.getCmp('registerWindow').destroy();
				}
			}]
		});
		var win=new Ext.Window({
			title:'ע��',
			id:'registerWindow',
			layout:'fit',
			width:320,
			height:340,
			modal:true,
			items:[form],
			keys:[{
				key:27,
				fn:function(){
					Ext.getCmp('registerWindow').destroy();
				}
			},{
				key:13,
				fn:register
			}]
		});
		win.show();
		return win;
	};
};