registerWindow=function(){
	this.init=function(){
		function register(){
			form.getForm().submit({
				url:'php/register.php',//提交的url
				//服务器返回成功时的处理函数，第一个参数是提交的form，第二个参数的result是服务器返回并解码后的json格式的数据
				success:function(form,action){
					Ext.getCmp('registerWindow').destroy();
					Ext.MessageBox.alert('success','注册成功,请等待管理员审核');
				},
				//服务器返回失败后的处理函数
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
				fieldLabel:'*登陆用户名',
				name:'user',
				allowBlank:false,
				blankText:'此项不能为空',
				validationDelay:200,
				validationEvent:'blur',
				validator:function(value){
					if (value=='')
					{
						form.getForm().findField('user').markInvalid('此项不能为空');
						return '此项不能为空';
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
								form.getForm().findField('user').markInvalid('已存在该用户名');
								return '已存在该用户名';
							}
						},
						failure: function(){
							form.getForm().findField('user').markInvalid('无法与服务器建立链接');
							return '无法与服务器建立链接';
						},
						params: {'user':value}
					});
				}
			},{
				fieldLabel:'*密码',
				allowBlank:false,
				blankText:'此项不能为空',
				inputType:'password',
				name:'password'
			},{
				fieldLabel:'*确认密码',
				allowBlank:false,
				blankText:'此项不能为空',
				inputType:'password',
				name:'confirmPassword',
				validationDelay:200,
				validationEvent:'blur',
				validator:function(value){
					if (value=='')
					{
						form.getForm().findField('confirmPassword').markInvalid('此项不能为空');
						return '此项不能为空';
					}
					else if (value!==form.getForm().findField('password').getValue())
					{
						form.getForm().findField('confirmPassword').markInvalid('与密码不相同');
						return '与密码不相同';
					}
				}
			},{
				xtype:'combo',
				fieldLabel:'*权限',
				width:130,
				allowBlank:false,
				blankText:'此项不能为空',
				name:'authority',
				hiddenName:'authority',//post时传递数值
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
					data: [[1, '普通用户'], [2, '管理员'],[4, '超级管理员']]
				}),
				valueField: 'authority',
				displayField: 'displayText'
			},{
				fieldLabel:'*真实姓名',
				name:'real_name',
				allowBlank:false,
				blankText:'此项不能为空'
			},{
				xtype:'combo',
				fieldLabel:'*所属二级单位',
				width:130,
				allowBlank:false,
				blankText:'此项不能为空',
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
					data: [[1, '校务办公室'], [2, '教务处'],[3, '研究生院'],[4, '远程与继续教育处'],[5, '人事处'],[6, '财务处'],[7, '资产管理处'],[8, '科技处'],[9, '学生事务管理处'],[10, '招生就业处'],[11, '国际合作与交流处'],[12, '保卫处'],[13, '保密处'],[14, '基建处'],[15, '后勤处'],[16, '离退休工作处'],[17, '监察处'],[18, '审计处'],[19, '发展战略研究中心'],[20, '宏富校区综合办公室'],[21, '军工科研管理处'],[22, '科研基地办公室'],[23, '工程技术转移中心']]
				}),
				valueField: 'authority',
				displayField: 'displayText'
			},{
				fieldLabel:'邮箱',
				name:'email',
				vtype:'email',
				vtypeText:'邮箱地址格式不正确'
			},{
				fieldLabel:'固定电话',
				name:'telephone'
			},{
				fieldLabel:'移动电话',
				name:'cellphone'
			}],
			buttons:[{
				text:'注册',
				handler:register
			},{
				text:'取消',
				handler:function(){
					Ext.getCmp('registerWindow').destroy();
				}
			}]
		});
		var win=new Ext.Window({
			title:'注册',
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