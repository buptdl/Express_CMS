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
								createChangeTab('QueryExpress');
							}
						}
					},{
						text: '�˵�¼��',
						icon:'images/icons/article.gif',
						leaf: true,
						listeners:{
							scope:this,
							click:function(node,e){
								createChangeTab('NewExpress');
							}
						}
					},{
						text: '���״̬����',
						icon:'images/icons/rss.gif',
						leaf: true,
						listeners:{
							scope:this,
							click:function(node,e){
								createChangeTab('UpdateExpress');
							}
						}
					},{
						text: '�쳣�������',
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
				title:'������Ϣ����',
				id:'treePanel2',
				lines:false,
				rootVisible:false,
				root:new Ext.tree.AsyncTreeNode({
					expanded:true,
					children:[{
						text:'���տ���֧��¼',
						icon:'images/icons/exclamation.gif',
						leaf: true,
						listeners:{
							scope:this,
							click:function(node,e){
								createChangeTab('AgencyFund');
							}
						}
					},{
						text:'����ͳ��',
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
			},{
				xtype:'treepanel',
				title:'��ʷ���ݹ���',
				id:'treePanel6',
				lines:false,
				rootVisible:false,
				root: new Ext.tree.AsyncTreeNode({
					expanded: true,
					children: [{
						text: '������ʷ����',
						icon:'images/icons/article.gif',
						leaf: true,
						listeners:{
							scope:this,
							click:function(node,e){
								createChangeTab('ExportHistory');
							}
						}
					},{
						text: '������ʷ���ݲ�ѯ',
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
					text:'����ҳ(<U>h</U>)',
					id:'bHomePage',
					icon:'images/icons/fav.gif',
					handler:function(b,e){
						createChangeTab('homePage');
					}
				},'-',{
					text:'�����Ϣ����(<U>i</U>)',
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
							text:'�����ѯ(<U>f</U>)',
							icon:'images/icons/article.gif',
							handler:function(b,e){
								createChangeTab('QueryExpress');
							}
						},{
							text:'�˵�¼��(<U>b</U>)',
							icon:'images/icons/article.gif',
							handler:function(b,e){
								createChangeTab('NewExpress');
							}
						},{
							text:'���״̬����(<U>n</U>)',
							icon:'images/icons/rss.gif',
							handler:function(b,e){
								createChangeTab('UpdateExpress');
							}
						},{
							text:'�쳣�������(<U>m</U>)',
							icon:'images/icons/calendar-sprites.gif',
							handler:function(b,e){
								createChangeTab('AbnormalExpress');
							}
						}]
					}
				},{
					text:'������Ϣ����(<U>w</U>)',
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
							text:'���տ���֧��¼(<U>l</U>)',
							icon:'images/icons/icon-by-date.gif',
							handler:function(b,e){
								createChangeTab('AgencyFund');
							}						
						},{
							text:'����ͳ��(<U>n</U>)',
							icon:'images/icons/event.gif',
							handler:function(b,e){
								createChangeTab('AgencyFundRecord');
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
				},{
					text:'��ʷ���ݹ���(<U>h</U>)',
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
							text:'������ʷ����(<U>z</U>)',
							icon:'images/icons/article.gif',
							handler:function(b,e){
								createChangeTab('ExportHistory');
							}
						},{
							text:'�鿴��ʷ��������(<U>x</U>)',
							icon:'images/icons/article.gif',
							handler:function(b,e){
								createChangeTab('QueryHistory');
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
