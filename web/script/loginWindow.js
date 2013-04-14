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
					Ext.MessageBox.alert('错误','上一次自动登陆信息有误，请重新登陆');
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
				value:'正在载入，请等候……',
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
			});//以修改textfield的dom元素的方法显示图片。创建验证码图片的field
			Ext.QuickTips.register({
				target:v_p,
				text:'点击刷新图片'
			});
			//创建form panel
			var fo=new Ext.FormPanel({	
				width:320,//宽度
				height:190,
				padding:10,
				defaults:{xtype:'textfield'},//默认属性为textfield。作用对象为items以及add, insert方法
				items:[{
					//user文本框
					fieldLabel:'用户名',//标签名
					allowBlank:false,
					anchor:'90%',//域宽度设为总长的70%
					value:config.save?config.user:'',
					name:'user'//POST给服务器时的name
				},{
					//密码文本框
					fieldLabel:'密码',
					allowBlank:false,
					anchor:'90%',
					value:config.save?config.psw:'',
					inputType:'password',//不显示出文本内容
					name:'password'
				},{
					//验证码输入文本框
					fieldLabel:'验证码',
					allowBlank:false,
					anchor:'90%',
					name:'validater'
				},v_p/*验证码图片*/,{
					xtype:'checkboxgroup',
					columns:2,
					items:[{
						boxLabel:'记住密码',
						name:'save',
						checked:config.save
					},{
						boxLabel:'自动登录',
						name:'auto',
						checked:config.auto
					}]				
				},{
					xtype:'combo',
					fieldLabel:'密码保存时间',
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
						data: [[-1,'不保存'],[86400, '1天'], [2592000, '1个月'],[31536000, '一年']]
					}),
					valueField: 'cookieTime',
					emptyText:'不保存',
					displayField: 'displayText'
				}],
				buttons:[{
					//提交按钮
					text:'登陆',//按钮文本
					handler:form_sub//事件处理函数
				}
                /*,{
					text:'注册',
					handler:function(){
						//win.();
						var register=new registerWindow();
						register.init().toFront();
					}
				}
                */]
			});
			//修改dom元素以显示验证码图片
			var win=new Ext.Window({
				title:'欢迎使用盔客快递信息管理系统',
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
			//获得formpanel中的basicform，调用方法submit。当formpanel中standardSubmit为false时（默认false），使用ajax提交数据
			var mask=new Ext.LoadMask(win.getEl(),{msg:'正在登陆，请稍候……'});
			mask.show();
			fo.getForm().submit({
				url:'php/login.php',//提交的url
				//服务器返回成功时的处理函数，第一个参数是提交的form，第二个参数的result是服务器返回并解码后的json格式的数据
				success:function(form,action){
					var user=fo.getForm().findField('user').getValue();
					var log=user+'登陆';
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
				//服务器返回失败后的处理函数
				failure:function(form,action){
					mask.hide();
					v_p.getEl().dom.src='php/Verify.php?'+Math.random();
					v_p.getEl().dom.tag='img';
					Ext.MessageBox.alert('错误',action.result.msg);
                    // Show a dialog using config options:
				}
			});
		}
	};
	this.refresh=function(){
		Ext.getCmp('verifyPicture').fireEvent('mouseup');
	};
};
