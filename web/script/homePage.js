homePage=function(){
	var authority=Ext.getCmp('mainView').authority;
	var data=[{
		title:'综合功能',
		hidden:false,
		nodes:[{
			text:'舆情简报',
			id:'briefReport',
			icon:'images/thumb/briefReportThumb.gif',
			hidden:false,
			detail:'<h1><center>舆情简报</center></h1><br>&nbsp;&nbsp;&nbsp;&nbsp;统一舆情系统将把各个功能的结果简明扼要地呈现在六个表格中，让您在最少的时间内把握最重要的情报。<br>&nbsp;&nbsp;&nbsp;&nbsp;其中包括：今日话题，今日活跃用户，异常用户，领袖用户，今日在线人数统计和北邮新闻摘要。'
		},{
			text:'北邮新闻',
			id:'newsGrid',
			icon:'images/thumb/newsGridThumb.gif',
			hidden:false,
			detail:'<h1><center>北邮新闻</center></h1><br>&nbsp;&nbsp;&nbsp;&nbsp;显示从互联网上获取的有关北邮的新闻资讯。'
		}]
	},{
		title:'Web资源监视',
		hidden:false,
		nodes:[{
			text:'敏感信息',
			id:'WebSensitiveMonitor',
			icon:'images/thumb/WebSensitiveMonitorThumb.gif',
			hidden:false,
			detail:'敏感信息'
		},{
			text:'非法信息',
			id:'WebIllegalMonitor',
			icon:'images/thumb/WebIllegalMonitorThumb.gif',
			hidden:false,
			detail:'非法信息'
		},{
			text:'不良信息',
			id:'WebNegativeMonitor',
			icon:'images/thumb/WebNegativeMonitorThumb.gif',
			hidden:false,
			detail:'不良信息'
		},{
			text:'高级信息',
			id:'WebChart',
			icon:'images/thumb/WebChartThumb.gif',
			hidden:false,
			detail:'高级信息'
		}]
	},{
		title:'热点突发检测',
		hidden:false,
		nodes:[{
			text:'小时热门话题',
			id:'TopicHours',
			icon:'images/thumb/TopicHoursThumb.gif',
			hidden:false,
			detail:'小时热门话题'
		},{
			text:'每天热门话题',
			id:'TopicDaily',
			icon:'images/thumb/TopicDailyThumb.gif',
			hidden:false,
			detail:'每天热门话题'
		},{
			text:'突发事件检测',
			id:'TopicEmerg',
			icon:'images/thumb/TopicEmergThumb.gif',
			hidden:false,
			detail:'突发事件检测'
		}]
	},{
		title:'用户行为分析',
		hidden:false,
		nodes:[{
			text:'活跃用户',
			id:'huoyueyonghu',
			icon:'images/thumb/huoyueyonghuThumb.gif',
			hidden:false,
			detail:'<h1><center>小时热门话题</h1></center><br>&nbsp;&nbsp;&nbsp;&nbsp;反映各日统计的的活跃用户及其活跃度'
		},{
			text:'异常用户',
			id:'abnormal',
			icon:'images/thumb/abnormalThumb.gif',
			hidden:false,
			detail:'<h1><center>每天热门话题</h1></center><br>&nbsp;&nbsp;&nbsp;&nbsp;反映各日统计的的异常用户及相对应的敏感词'
		},{
			text:'领导用户',
			id:'leader',
			icon:'images/thumb/leaderThumb.gif',
			hidden:false,
			detail:'<h1><center>突发事件检测</h1></center><br>&nbsp;&nbsp;&nbsp;&nbsp;反映各日统计的的舆论领袖用户及其领导度'
		},{
			text:'分时段在线人数统计',
			id:'tianjishi',
			icon:'images/thumb/tianjishiThumb.png',
			hidden:false,
			detail:'<h1><center>分时段在线人数统计</h1></center><br>&nbsp;&nbsp;&nbsp;&nbsp;反映各日特定时间段在线人数'
		},{
			text:'特定板块',
			id:'tedingyonghu',
			icon:'images/thumb/tedingyonghuThumb.gif',
			hidden:false,
			detail:'<h1><center>突发事件检测</h1></center><br>&nbsp;&nbsp;&nbsp;&nbsp;反映特定版块的用户活跃度'
		}]
	},{
		title:'用户配置信息',
		hidden:(authority==='2'||authority==='4')?false:true,
		nodes:[{
			text:'话题聚类与突发检测',
			id:'clusterGrid',
			icon:'images/thumb/clusterGridThumb.gif',
			hidden:false,
			detail:'<h1><center>话题聚类与突发检测</center></h1><br>&nbsp;&nbsp;&nbsp;&nbsp;用户配置字段'
		},{
			text:'web资源配置',
			id:'dicGrid',
			icon:'images/thumb/dicGridThumb.gif',
			hidden:false,
			detail:'<h1><center>web资源配置</h1></center><br>&nbsp;&nbsp;&nbsp;&nbsp;用户配置字段'
		},{
			text:'用户行为模块配置',
			id:'behaveGrid',
			icon:'images/thumb/behaveGridThumb.gif',
			hidden:false,
			detail:'<h1><center>用户行为模块配置</h1></center><br>&nbsp;&nbsp;&nbsp;&nbsp;用户配置字段'
		}]
	},{
		title:'系统管理',
		hidden:(authority==='2'||authority==='4')?false:true,
		nodes:[{
			text:'用户权限管理',
			id:'userGrid',
			icon:'images/thumb/userGridThumb.gif',
			hidden:authority==='4'?false:true,
			detail:'<h1><center>用户权限管理</center></h1><br>&nbsp;&nbsp;&nbsp;&nbsp;主要实现对不同权限用户的删除、添加、显示等操作。'
		},{
			text:'系统日志',
			id:'systemLog',
			icon:'images/thumb/systemLogThumb.gif',
			hidden:false,
			detail:'<h1><center>系统日志</center></h1><br>&nbsp;&nbsp;&nbsp;&nbsp;统一舆情系统的所有重要系统行为将会记录于此，您可以通过查看表格随时了解系统的运行状态，以便及时进行管理。<br>&nbsp;&nbsp;&nbsp;&nbsp;系统将记录：后台错误信息，用户登陆、注销信息，用户配置修改信息。'
		}]
	}];
	this.store=new Ext.data.JsonStore({
		idProperty:'id',
		fields:['id','title','hidden','nodes'],
		data:data
	});
	this.init=function(config){
		view=new Ext.DataView({
			region:'center',
			autoScroll:true,
			//autoHeight   : true,
			frame        : true,
			itemSelector : 'div.thumb-wrap',
			overClass    : 'x-view-over',
			tpl          : new Ext.XTemplate(
					'<tpl for=".">',
						'<tpl if="hidden==false">',
							'<div class="cat-wrap"><h2><div>{title}</div></h2><dl>',
								'<tpl for="nodes">',
									'<tpl if="hidden==false">',
										'<div class="thumb-wrap" id="{id}" intro="{detail}">',
										'<div class="thumb"><img src="{icon}" title="{text}"/></div>',
											'<div class="thumb-title">{text}',									
											'</div>',
										'</div>',
									'</tpl>',
								'</tpl>',
							'</dl></div>',
						'</tpl>',
					'</tpl>'
			),
			store:this.store,
			listeners:{
				scope:this,
				click:function(view,index,node,e){
					var id=node.attributes.getNamedItem('id').value;
					createChangeTab(id);
				},
				mouseenter:function(view,index,node,e){
					detail.expand(true);
					var bd = detail.body;
					bd.hide().update(node.attributes.getNamedItem('intro').value).slideIn('l', {stopFx:true,duration:.2}); 
				}		
			}
		});
		var detail=new Ext.Panel({
			region:'east',
			title:'详细介绍',
			width:200,
			collapsible:true,
			collapsed:true
		});
		var p=new Ext.Panel({
			title:'导航页',
			id:'homePage',
			layout:'border',
			closable:true,
			items:[view,detail]
		});
		config.add(p);
	};
	
};