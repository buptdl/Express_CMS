function createChangeTab(id)//if tab is not existed, create it, else change it to the current tab 
{
	var main=Ext.getCmp('mainPanel');
	if (Ext.getCmp(id)==undefined)									
	{
		var p=null;
		switch(id)
		{
			case 'homePage':
				p=new homePage();
				break;
			case 'QueryExpress':
				p=new QueryExpress();
				break;
			case 'NewExpress':
				p=new CreateExpress();
				break;
            case 'UpdateExpress':
				p=new UpdateExpress();
				break;
			case 'AbnormalExpress':
				p=new AbnormalExpress();
				break;
			case 'AgencyFund':
				p=new AgencyFund();
				break;
			case 'AgencyFundRecord':
				p=new AgencyFundRecord();
				break;
            case 'ExportHistory':
               
                p=new ExportHistory();
                break;
            case 'QueryHistory':
             alert(id);
                p= new QueryHistory();
                break;
			default:
				break;
		};
        alert(id);
		if (p!=null)
		{
			p.init(main);
		}
	}
	main.setActiveTab(id);
}
function doFrame(authority)
{
	function keyPressMenu(tabId,menuBut)//a key is pressed when a menu is shown, hide the menu and open or change the tab
	{
		createChangeTab(tabId);
		var bb=Ext.getCmp('logoPanel').getBottomToolbar();
		bb.getComponent(menuBut).hideMenu();
	}
	function logout()
	{
		var mask=new Ext.LoadMask(view.getEl(),{msg:'正在注销，请稍候……'})
		mask.show();
		map.disable();
		var user='';
		Ext.Ajax.request({
			url: 'php/getClientInfo.php',
			success: function(response){
				var obj=Ext.decode(response.responseText);
				user=obj.user;
				var log=user+'注销';
				Ext.Ajax.request({
					url: 'php/insertLog.php',
					params: {'log':log}
				});
				Ext.Ajax.request({
					url: 'php/logout.php',
					success:function(response){
						var login=new loginWindow();
						var config=new Object();
						config.save=false;
						config.auto=false;
						loginWin=login.init(config);
						mask.hide();
						map.enable();
						view.destroy();
					},
					failure:function(){
						mask.hide();
						map.enable();
						Ext.MessageBox.alert('错误','注销失败');
					}
				});
			},
			failure: function(){
			}
		});
	}
	var view=new Ext.Viewport({
		layout:'border',
		id:'mainView',
		authority:authority,
		items:[{
			title:'导航栏',
			region:'west',
			collapsible:true,
			width:'15%',
			layout:'accordion',
			layoutConfig:{
				animate:true,
				autoWidth:true
			},
			items:[{
				xtype:'treepanel',
				title:'快件信息管理',
				id:'treePanel1',
				lines:false,
				rootVisible:false,
				root: new Ext.tree.AsyncTreeNode({
					expanded: true,
					children: [{
						text: '快件查询',
						icon:'images/icons/article.gif',
						leaf: true,
						listeners:{
							scope:this,
							click:function(node,e){
								createChangeTab('QueryExpress');
							}
						}
					},{
						text: '运单录入',
						icon:'images/icons/article.gif',
						leaf: true,
						listeners:{
							scope:this,
							click:function(node,e){
								createChangeTab('NewExpress');
							}
						}
					},{
						text: '快件状态更新',
						icon:'images/icons/rss.gif',
						leaf: true,
						listeners:{
							scope:this,
							click:function(node,e){
								createChangeTab('UpdateExpress');
							}
						}
					},{
						text: '异常快件处理',
						icon:'images/icons/calendar-sprites.gif',
						leaf: true,
						listeners:{
							scope:this,
							click:function(node,e){
								createChangeTab('AbnormalExpress');
							}
						}
					}]
				})
				//html:'test1'
			},{
				xtype:'treepanel',
				title:'财务信息管理',
				id:'treePanel2',
				lines:false,
				rootVisible:false,
				root:new Ext.tree.AsyncTreeNode({
					expanded:true,
					children:[{
						text:'代收款收支记录',
						icon:'images/icons/exclamation.gif',
						leaf: true,
						listeners:{
							scope:this,
							click:function(node,e){
								createChangeTab('AgencyFund');
							}
						}
					},{
						text:'收入统计',
						icon:'images/icons/warning.gif',
						leaf: true,
						listeners:{
							scope:this,
							click:function(node,e){
								createChangeTab('AgencyFundRecord');
							}
						}
					}]
				})
			},{
				xtype:'treepanel',
				title:'客户信息管理',
				id:'treePanel3',
				lines:false,
				rootVisible:false,
				root:new Ext.tree.AsyncTreeNode({
					expanded:true,
					children:[{
						text:'运单发送方',
						icon:'images/icons/icon-by-category.gif',
						leaf: true,
						listeners:{
							scope:this,
							click:function(node,e){
								createChangeTab('TopicHours');
							}
						}
					},{
						text:'物流承运方',
						icon:'images/icons/icon-by-date.gif',
						leaf: true,
						listeners:{
							scope:this,
							click:function(node,e){
								createChangeTab('TopicDaily');
							}
						}
					}]
				})
			},{
				xtype:'treepanel',
				title:'公司组织结构管理',
				id:'treePanel4',
				lines:false,
				rootVisible:false,
				root:new Ext.tree.AsyncTreeNode({
					expanded:true,
					children:[{
						text:'部门管理',
						icon:'images/icons/album.gif',
						leaf: true,
						listeners:{
							scope:this,
							click:function(node,e){
								createChangeTab('huoyueyonghu');
							}
						}
					},{
						text:'职员管理',
						icon:'images/icons/exclamation.gif',
						leaf: true,
						listeners:{
							scope:this,
							click:function(node,e){
								createChangeTab('abnormal');
							}
						}
					}]
				})
			},{
				xtype:'treepanel',
				title:'个人信息管理',
				id:'treePanel5',
				hidden:false,
				lines:false,
				rootVisible:false,
				root:new Ext.tree.AsyncTreeNode({
					expanded:true,
					children:[{
						text:'个人基本信息',
						icon:'images/icons/example.gif',
						leaf: true,
						listeners:{
							scope:this,
							click:function(node,e){
								createChangeTab('clusterGrid');
							}
						}
					},{
						text:'修改登录密码',
						icon:'images/icons/docs.gif',
						leaf: true,
						listeners:{
							scope:this,
							click:function(node,e){
								createChangeTab('dicGrid');
							}
						}
					}]				
				})
			},{
				xtype:'treepanel',
				title:'历史数据管理',
				id:'treePanel6',
				lines:false,
				rootVisible:false,
				root: new Ext.tree.AsyncTreeNode({
					expanded: true,
					children: [{
						text: '导出历史数据',
						icon:'images/icons/article.gif',
						leaf: true,
						listeners:{
							scope:this,
							click:function(node,e){
								createChangeTab('ExportHistory');
							}
						}
					},{
						text: '操作历史数据查询',
						icon:'images/icons/article.gif',
						leaf: true,
						listeners:{
							scope:this,
							click:function(node,e){
								createChangeTab('QueryHistory');
							}
						}
					}]
				})
				//html:'test1'
			},]
		},{
			xtype:'tabpanel',
			//title:'Detail',
			id:'mainPanel',
			region:'center',
			resizeTabs:true,
			enableTabScroll:true,
			activeTab:0,
			plugins:[new Ext.ux.TabCloseMenu()],
			listeners:{
				scope:this,
				tabchange:function(panel,tab){
					Ext.History.add(tab.id);
					Ext.Ajax.request({
						url:'php/history.php',
						success:function(response){
							
						},
						failure:function(){},
						params:{'id':tab.id,'action':'push'}
					});
				},
				remove:function(container,tab){
					Ext.Ajax.request({
						url:'php/history.php',
						success:function(response){
							
						},
						failure:function(){},
						params:{'id':tab.id,'action':'pop'}
					});
				}
			}
		},{
			xtype:'panel',
			layout:'fit',
			id:'logoPanel',
			region:'north',
			height:110,
			cls:'headLogo',
			html:'<div class="headLogo"><img src="images/logo_simple.png" titel="LOGO"></div>',
			buttonAlign:'left',
			bbar:[{
					text:'导航页(<U>h</U>)',
					id:'bHomePage',
					icon:'images/icons/fav.gif',
					handler:function(b,e){
						createChangeTab('homePage');
					}
				},'-',{
					text:'快件信息管理(<U>i</U>)',
					id:'Express',
					listeners:{
						menushow:function(){
							new Ext.KeyMap('bIntergrationMenu',[{
								key:'b',
								alt:true,
								stopEvent:true,
								fn:function(){
									keyPressMenu('QueryExpress','Express');
								}
							},{
								key:'f',
								alt:true,
								stopEvent:true,
								fn:function(){
									keyPressMenu('NewExpress','Express');
								}
							},{
								key:'n',
								alt:true,
								stopEvent:true,
								fn:function(){
									keyPressMenu('UpdateExpress','Express');
								}
							},{
								key:'m',
								alt:true,
								stopEvent:true,
								fn:function(){
									keyPressMenu('AbnormalExpress','Express');
								}
							}])
						}
					},
					menu:{
						id:'ExpressMenu',
						items:[{
							text:'快件查询(<U>f</U>)',
							icon:'images/icons/article.gif',
							handler:function(b,e){
								createChangeTab('QueryExpress');
							}
						},{
							text:'运单录入(<U>b</U>)',
							icon:'images/icons/article.gif',
							handler:function(b,e){
								createChangeTab('NewExpress');
							}
						},{
							text:'快件状态更新(<U>n</U>)',
							icon:'images/icons/rss.gif',
							handler:function(b,e){
								createChangeTab('UpdateExpress');
							}
						},{
							text:'异常快件处理(<U>m</U>)',
							icon:'images/icons/calendar-sprites.gif',
							handler:function(b,e){
								createChangeTab('AbnormalExpress');
							}
						}]
					}
				},{
					text:'财务信息管理(<U>w</U>)',
					id:'Finance',
					listeners:{
						menushow:function(){
							new Ext.KeyMap('bWebMenu',[{
								key:'l',
								alt:true,
								stopEvent:true,
								fn:function(){
									keyPressMenu('AgencyFund','Finance');
								}
							},{
								key:'n',
								alt:true,
								stopEvent:true,
								fn:function(){
									keyPressMenu('AgencyFundRecord','Finance');
								}
							}])
						}
					},
					menu:{
						id:'FinanceMenu',
						items:[{
							text:'代收款收支记录(<U>l</U>)',
							icon:'images/icons/icon-by-date.gif',
							handler:function(b,e){
								createChangeTab('AgencyFund');
							}						
						},{
							text:'收入统计(<U>n</U>)',
							icon:'images/icons/event.gif',
							handler:function(b,e){
								createChangeTab('AgencyFundRecord');
							}
						}]
					}
				},{
					text:'客户信息管理(<U>a</U>)',
					id:'bAcute',
					listeners:{
						menushow:function(){
							new Ext.KeyMap('bAcuteMenu',[{
								key:'d',
								alt:true,
								stopEvent:true,
								fn:function(){
									keyPressMenu('TopicDaily','bAcute');
								}
							},{
								key:'o',
								alt:true,
								stopEvent:true,
								fn:function(){
									keyPressMenu('TopicHours','bAcute');
								}
							},{
								key:'e',
								alt:true,
								stopEvent:true,
								fn:function(){
									keyPressMenu('TopicEmerg','bAcute');
								}
							},{
								key:'t',
								alt:true,
								stopEvent:true,
								fn:function(){
									keyPressMenu('TopTen','bAcute');
								}
							}])
						}
					},
					menu:{
						id:'bAcuteMenu',
						items:[{
							text:'运单发送方(<U>o</U>)',
							icon:'images/icons/icon-by-category.gif',
							handler:function(b,e){
								createChangeTab('TopicHours');
							}											
						},{
							text:'物流承运网点(<U>d</U>)',
							icon:'images/icons/icon-by-date.gif',
							handler:function(b,e){
								createChangeTab('TopicDaily');
							}						
						}]
					}
				},{
					text:'公司组织管理(<U>u</U>)',
					id:'bUser',
					listeners:{
						menushow:function(){
							new Ext.KeyMap('bUserMenu',[{
								key:'b',
								alt:true,
								stopEvent:true,
								fn:function(){
									keyPressMenu('huoyueyonghu','bUser');
								}
							},{
								key:'n',
								alt:true,
								stopEvent:true,
								fn:function(){
									keyPressMenu('abnormal','bUser');
								}
							},{
								key:'l',
								alt:true,
								stopEvent:true,
								fn:function(){
									keyPressMenu('leader','bUser');
								}
							},{
								key:'t',
								alt:true,
								stopEvent:true,
								fn:function(){
									keyPressMenu('tianjishi','bUser');
								}
							},{
								key:'c',
								alt:true,
								stopEvent:true,
								fn:function(){
									keyPressMenu('tedingyonghu','bUser');
								}
							}])
						}
					},
					menu:{
						id:'bUserMenu',
						items:[{
							text:'部门管理(<U>b</U>)',
							icon:'images/icons/album.gif',
							handler:function(b,e){
								createChangeTab('huoyueyonghu');
							}
						},{
							text:'职员管理(<U>n</U>)',
							icon:'images/icons/exclamation.gif',
							handler:function(b,e){
								createChangeTab('abnormal');
							}
						}]
					}
				},'-',{
					text:'个人信息管理(<U>p</U>)',
					id:'bPreference',
					hidden:(authority==='2'||authority==='4')?false:true,
					listeners:{
						menushow:function(){
							new Ext.KeyMap('bPreferenceMenu',[{
								key:'c',
								alt:true,
								stopEvent:true,
								fn:function(){
									keyPressMenu('clusterGrid','bPreference');
								}
							},{
								key:'d',
								alt:true,
								stopEvent:true,
								fn:function(){
									keyPressMenu('dicGrid','bPreference');
								}
							},{
								key:'b',
								alt:true,
								stopEvent:true,
								fn:function(){
									keyPressMenu('behaveGrid','bPreference');
								}
							}])
						}
					},
					menu:{
						id:'bPreferenceMenu',
						items:[{
							text:'个人基本信息(<U>c</U>)',
							icon:'images/icons/example.gif',
							handler:function(b,e){
								createChangeTab('clusterGrid');
							}
						},{
							text:'修改登录密码(<U>d</U>)',
							icon:'images/icons/docs.gif',
							handler:function(b,e){
								createChangeTab('dicGrid');
							}
						}]
					}
				},{
					text:'历史数据管理(<U>h</U>)',
					id:'History',
					listeners:{
						menushow:function(){
							new Ext.KeyMap('bIntergrationMenu',[{
								key:'z',
								alt:true,
								stopEvent:true,
								fn:function(){
									keyPressMenu('ExportHistory','History');
								}
							},{
								key:'x',
								alt:true,
								stopEvent:true,
								fn:function(){
									keyPressMenu('QueryHistory','History');
								}
							}])
						}
					},
					menu:{
						id:'ExpressMenu',
						items:[{
							text:'导出历史数据(<U>z</U>)',
							icon:'images/icons/article.gif',
							handler:function(b,e){
								createChangeTab('ExportHistory');
							}
						},{
							text:'查看历史操作数据(<U>x</U>)',
							icon:'images/icons/article.gif',
							handler:function(b,e){
								createChangeTab('QueryHistory');
							}
						}]
					}
				},'->',{
					xtype:'button',
					icon:'images/icons/logout.gif',
					text:'注销(<U>z</U>)',
					handler:logout
				}				
			]
		}]
	});
	createChangeTab('homePage');
	var map=new Ext.KeyMap(Ext.getDoc(),[{
		key:'h',
		alt:true,
		stopEvent:true,
		fn:function(){
			createChangeTab('homePage');
		}
	},{
		key:'i',
		alt:true,
		stopEvent:true,
		fn:function(){
			var bb=Ext.getCmp('logoPanel').getBottomToolbar();
			bb.getComponent('bIntegration').showMenu();
		}
	},{
		key:'w',
		alt:true,
		stopEvent:true,
		fn:function(){
			var bb=Ext.getCmp('logoPanel').getBottomToolbar();
			bb.getComponent('bWeb').showMenu();
		}
	},{
		key:'a',
		alt:true,
		stopEvent:true,
		fn:function(){
			var bb=Ext.getCmp('logoPanel').getBottomToolbar();
			bb.getComponent('bAcute').showMenu();
		}
	},{
		key:'u',
		alt:true,
		stopEvent:true,
		fn:function(){
			var bb=Ext.getCmp('logoPanel').getBottomToolbar();
			bb.getComponent('bUser').showMenu();
		}
	},{
		key:'p',
		alt:true,
		stopEvent:true,
		fn:function(){
			var bb=Ext.getCmp('logoPanel').getBottomToolbar();
			bb.getComponent('bPreference').showMenu();
		}
	},{
		key:'s',
		alt:true,
		stopEvent:true,
		fn:function(){
			var bb=Ext.getCmp('logoPanel').getBottomToolbar();
			bb.getComponent('bSystem').showMenu();
		}
	},{
		key:'z',
		alt:true,
		stopEvent:true,
		fn:logout
	}]);
}
Ext.onReady(function(){
	Ext.BLANK_IMAGE_URL='ext/resources/images/default/s.gif';
	Ext.QuickTips.init();
	Ext.History.init();
	Ext.History.on('change',function(token){
		if (token)
			createChangeTab(token);
		else
			createChangeTab('homePage');
	});
	Ext.Ajax.request({
		url:'php/cookie.php',
		success:function(response){
			var obj = Ext.decode(response.responseText);
			if (obj.access)
			{
				doFrame(obj.authority);
				if (obj.history!=undefined)
				{
					for (var tab in obj.history)
						createChangeTab(tab);
				}
				if (obj.currentTab!=undefined)
					createChangeTab(obj.currentTab);
			}
			else
			{
				var login=new loginWindow();
				loginWin=login.init(obj);
				//doFrame(2);
			}
		},
		failure:function(){}
	});
});
