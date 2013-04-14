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
			case 'briefReport':
				p=new briefReport();
				break;
			case 'exBriefReport':
				p=new exBriefReport();
				break;
			case 'systemLog':
				p=new logGrid();
				break;
			case 'userGrid':
				p=new userGrid();
				break;
			case 'newsGrid':
				p=new newsGrid();
				break;
			case 'paramGrid':
				p=new paramGrid();
				break;
			case 'clusterGrid':
				p=new clusterGrid();
				break;
			case 'behaveGrid':
				p=new behaveGrid();
				break;
			case 'dicGrid':
				p=new dicGrid();
				break;	
			case 'top10':
				p=new top10();
				break;
			case 'microBlog':
				p=new microBlog();
				break;
			case 'abnormal':
				p=new abnormal();
				break;
			case 'huoyueyonghu':
				p=new huoyueyonghu();
				break;
			case 'dangeyonghu':
				p=new dangeyonghu();
				break;
			case 'leader':
				p=new leader();
				break;
			case 'tianjishi':
				p=new tianjishi();
				break;
			case 'tedingyonghu':
				p=new tedingyonghu();
				break;
			case 'zhuzhuangtu':
				p=new zhuzhuangtu();
				break;
			case 'yonghuxinxiliebiao':
				p=new yonghuxinxiliebiao();
				break;				
			case 'specialusers':
				p=new specialusers();
				break;
			case 'TopicDaily':
				p=new TopicDaily();
				break;
			case 'TopicHours':
				p=new TopicHours();
				break;
			case 'TopicEmerg':
				p=new TopicEmerg();
				break;
			case 'TopTen':
				p=new TopTen();
				break;
			case 'WebIllegalMonitor':
				p=new WebIllegalMonitor();
				break;
			case 'WebNegativeMonitor':
				p=new WebNegativeMonitor();
				break;
			case 'WebSensitiveMonitor':
				p=new WebSensitiveMonitor();
				break;
			case 'WebChart':
				p=new WebChart();
				break;
			
			default:
				break;
		};
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
		var mask=new Ext.LoadMask(view.getEl(),{msg:'����ע�������Ժ򡭡�'})
		mask.show();
		map.disable();
		var user='';
		Ext.Ajax.request({
			url: 'php/getClientInfo.php',
			success: function(response){
				var obj=Ext.decode(response.responseText);
				user=obj.user;
				var log=user+'ע��';
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
						Ext.MessageBox.alert('����','ע��ʧ��');
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
			title:'������',
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
				title:'�����Ϣ����',
				id:'treePanel1',
				lines:false,
				rootVisible:false,
				root: new Ext.tree.AsyncTreeNode({
					expanded: true,
					children: [{
						text: '�����ѯ',
						icon:'images/icons/article.gif',
						leaf: true,
						listeners:{
							scope:this,
							click:function(node,e){
								createChangeTab('briefReport');
							}
						}
					},{
						text: '�˵�¼��',
						icon:'images/icons/article.gif',
						leaf: true,
						listeners:{
							scope:this,
							click:function(node,e){
								createChangeTab('exBriefReport');
							}
						}
					},{
						text: '���״̬����',
						icon:'images/icons/rss.gif',
						leaf: true,
						listeners:{
							scope:this,
							click:function(node,e){
								createChangeTab('newsGrid');
							}
						}
					},{
						text: '�쳣�������',
						icon:'images/icons/calendar-sprites.gif',
						leaf: true,
						listeners:{
							scope:this,
							click:function(node,e){
								createChangeTab('top10');
							}
						}
					}]
				})
				//html:'test1'
			},{
				xtype:'treepanel',
				title:'������Ϣ����',
				id:'treePanel2',
				lines:false,
				rootVisible:false,
				root:new Ext.tree.AsyncTreeNode({
					expanded:true,
					children:[{
						text:'�˷��趨',
						icon:'images/icons/album.gif',
						leaf: true,
						listeners:{
							scope:this,
							click:function(node,e){
								createChangeTab('WebIllegalMonitor');
							}
						}
					},{
						text:'��֧��¼',
						icon:'images/icons/exclamation.gif',
						leaf: true,
						listeners:{
							scope:this,
							click:function(node,e){
								createChangeTab('WebNegativeMonitor');
							}
						}
					},{
						text:'����ͳ��',
						icon:'images/icons/warning.gif',
						leaf: true,
						listeners:{
							scope:this,
							click:function(node,e){
								createChangeTab('WebSensitiveMonitor');
							}
						}
					}]
				})
			},{
				xtype:'treepanel',
				title:'�ͻ���Ϣ����',
				id:'treePanel3',
				lines:false,
				rootVisible:false,
				root:new Ext.tree.AsyncTreeNode({
					expanded:true,
					children:[{
						text:'�˵����ͷ�',
						icon:'images/icons/icon-by-category.gif',
						leaf: true,
						listeners:{
							scope:this,
							click:function(node,e){
								createChangeTab('TopicHours');
							}
						}
					},{
						text:'�������˷�',
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
				title:'��˾��֯�ṹ����',
				id:'treePanel4',
				lines:false,
				rootVisible:false,
				root:new Ext.tree.AsyncTreeNode({
					expanded:true,
					children:[{
						text:'���Ź���',
						icon:'images/icons/album.gif',
						leaf: true,
						listeners:{
							scope:this,
							click:function(node,e){
								createChangeTab('huoyueyonghu');
							}
						}
					},{
						text:'ְԱ����',
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
				title:'������Ϣ����',
				id:'treePanel5',
				hidden:false,
				lines:false,
				rootVisible:false,
				root:new Ext.tree.AsyncTreeNode({
					expanded:true,
					children:[{
						text:'���˻�����Ϣ',
						icon:'images/icons/example.gif',
						leaf: true,
						listeners:{
							scope:this,
							click:function(node,e){
								createChangeTab('clusterGrid');
							}
						}
					},{
						text:'�޸ĵ�¼����',
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
			}]
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
					text:'����ҳ(<U>h</U>)',
					id:'bHomePage',
					icon:'images/icons/fav.gif',
					handler:function(b,e){
						createChangeTab('homePage');
					}
				},'-',{
					text:'�����Ϣ����(<U>i</U>)',
					id:'bIntegration',
					listeners:{
						menushow:function(){
							new Ext.KeyMap('bIntergrationMenu',[{
								key:'b',
								alt:true,
								stopEvent:true,
								fn:function(){
									keyPressMenu('exBriefReport','bIntegration');
								}
							},{
								key:'f',
								alt:true,
								stopEvent:true,
								fn:function(){
									keyPressMenu('briefReport','bIntegration');
								}
							},{
								key:'n',
								alt:true,
								stopEvent:true,
								fn:function(){
									keyPressMenu('newsGrid','bIntegration');
								}
							},/*{
								key:'t',
								alt:true,
								stopEvent:true,
								fn:function(){
									keyPressMenu('top10','bIntegration');
								}
							},*/{
								key:'m',
								alt:true,
								stopEvent:true,
								fn:function(){
									keyPressMenu('microBlog','bIntegration');
								}
							}])
						}
					},
					menu:{
						id:'bIntergrationMenu',
						items:[{
							text:'�����ѯ(<U>f</U>)',
							icon:'images/icons/article.gif',
							handler:function(b,e){
								createChangeTab('briefReport');
							}
						},{
							text:'�˵�¼��(<U>b</U>)',
							icon:'images/icons/article.gif',
							handler:function(b,e){
								createChangeTab('exBriefReport');
							}
						},{
							text:'���״̬����(<U>n</U>)',
							icon:'images/icons/rss.gif',
							handler:function(b,e){
								createChangeTab('newsGrid');
							}
						},{
							text:'�쳣�������(<U>n</U>)',
							hidden:true,
							icon:'images/icons/calendar-sprites.gif',
							handler:function(b,e){
								createChangeTab('top10');
							}
						}]
					}
				},{
					text:'������Ϣ����(<U>w</U>)',
					id:'bWeb',
					listeners:{
						menushow:function(){
							new Ext.KeyMap('bWebMenu',[{
								key:'l',
								alt:true,
								stopEvent:true,
								fn:function(){
									keyPressMenu('WebIllegalMonitor','bWeb');
								}
							},{
								key:'n',
								alt:true,
								stopEvent:true,
								fn:function(){
									keyPressMenu('WebNegativeMonitor','bWeb');
								}
							},{
								key:'s',
								alt:true,
								stopEvent:true,
								fn:function(){
									keyPressMenu('WebSensitiveMonitor','bWeb');
								}
							},{
								key:'c',
								alt:true,
								stopEvent:true,
								fn:function(){
									keyPressMenu('WebChart','bWeb');
								}
							}])
						}
					},
					menu:{
						id:'bWebMenu',
						items:[{
							text:'�˷��趨(<U>s</U>)',
							icon:'images/icons/icon-by-category.gif',
							handler:function(b,e){
								createChangeTab('WebSensitiveMonitor');
							}											
						},{
							text:'��֧��¼(<U>l</U>)',
							icon:'images/icons/icon-by-date.gif',
							handler:function(b,e){
								createChangeTab('WebIllegalMonitor');
							}						
						},{
							text:'����ͳ��(<U>n</U>)',
							icon:'images/icons/event.gif',
							handler:function(b,e){
								createChangeTab('WebNegativeMonitor');
							}
						}]
					}
				},{
					text:'�ͻ���Ϣ����(<U>a</U>)',
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
							text:'�˵����ͷ�(<U>o</U>)',
							icon:'images/icons/icon-by-category.gif',
							handler:function(b,e){
								createChangeTab('TopicHours');
							}											
						},{
							text:'������������(<U>d</U>)',
							icon:'images/icons/icon-by-date.gif',
							handler:function(b,e){
								createChangeTab('TopicDaily');
							}						
						}]
					}
				},{
					text:'��˾��֯����(<U>u</U>)',
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
							text:'���Ź���(<U>b</U>)',
							icon:'images/icons/album.gif',
							handler:function(b,e){
								createChangeTab('huoyueyonghu');
							}
						},{
							text:'ְԱ����(<U>n</U>)',
							icon:'images/icons/exclamation.gif',
							handler:function(b,e){
								createChangeTab('abnormal');
							}
						}]
					}
				},'-',{
					text:'������Ϣ����(<U>p</U>)',
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
							text:'���˻�����Ϣ(<U>c</U>)',
							icon:'images/icons/example.gif',
							handler:function(b,e){
								createChangeTab('clusterGrid');
							}
						},{
							text:'�޸ĵ�¼����(<U>d</U>)',
							icon:'images/icons/docs.gif',
							handler:function(b,e){
								createChangeTab('dicGrid');
							}
						}]
					}
				},'->',{
					xtype:'button',
					icon:'images/icons/logout.gif',
					text:'ע��(<U>z</U>)',
					handler:logout
				}				
			]
		}]
	});
	createChangeTab('briefReport');
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
