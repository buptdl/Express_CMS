homePage=function(){
	var authority=Ext.getCmp('mainView').authority;
	var data=[{
		title:'快件信息管理',
		hidden:false,
		nodes:[{
			text:'快件查询',
			id:'QueryExpress',
			icon:'images/thumb/briefReportThumb.gif',
			hidden:false,
			detail:'按运单号、客户名、时间、运单状态等运单属性相关的条件查询'
		},{
			text:'运单录入',
			id:'NewExpress',
			icon:'images/thumb/newsGridThumb.gif',
			hidden:false,
			detail:'提供客户发货清单录入包括人工手功录入和EXCEL表格批量录入'
		},{
			text:'快件状态更新',
			id:'UpdateExpress',
			icon:'images/thumb/newsGridThumb.gif',
			hidden:false,
			detail:'包括快件收取、入库、出库、送达等处理快件的操作信息更新提供两种操作接口在界面人工点击相应按键更新、通过巴枪扫描生成运单号列表批量更新'
		},{
			text:'异常快件处理',
			id:'newsGrid',
			icon:'images/thumb/newsGridThumb.gif',
			hidden:false,
			detail:'异常运单指批量更新运单状态时输入不存在的运单号，用于异常快件的预警。'
		}]
	},{
		title:'财务信息管理',
		hidden:false,
		nodes:[{
			text:'代收款收支记录',
			id:'AgencyFund',
			icon:'images/thumb/WebIllegalMonitorThumb.gif',
			hidden:false,
			detail:'包括从快递商收取的代收款、支付给商家的代收款。'
		},{
			text:'收入统计',
			id:'AgencyFundRecord',
			icon:'images/thumb/WebNegativeMonitorThumb.gif',
			hidden:false,
			detail:'按一定时间段给出公司运营收支总额的变化情况。提供统计结果的导出接口'
		}]
	},{
		title:'客户信息管理',
		hidden:false,
		nodes:[{
			text:'上流运单发送方',
			id:'TopicHours',
			icon:'images/thumb/TopicHoursThumb.gif',
			hidden:false,
			detail:'上流运单发送方的信息'
		},{
			text:'下流物流承运方',
			id:'TopicDaily',
			icon:'images/thumb/TopicDailyThumb.gif',
			hidden:false,
			detail:'下流物流承运方的网点信息'
		}]
	},{
		title:'公司组织结构管理',
		hidden:false,
		nodes:[{
			text:'部门管理',
			id:'huoyueyonghu',
			icon:'images/thumb/huoyueyonghuThumb.gif',
			hidden:false,
			detail:'提供各部门权限、经理的设置。'
		},{
			text:'职员管理',
			id:'abnormal',
			icon:'images/thumb/abnormalThumb.gif',
			hidden:false,
			detail:'为部门经理提供部门职员的设定管理。'
		}]
	},{
		title:'个人信息管理',
		hidden:false,
		nodes:[{
			text:'个人信息管理',
			id:'clusterGrid',
			icon:'images/thumb/clusterGridThumb.gif',
			hidden:false,
			detail:'登录密码'
		},{
			text:'修改登录密码',
			id:'dicGrid',
			icon:'images/thumb/dicGridThumb.gif',
			hidden:false,
			detail:'登录密码'
		}]
	},{
		title:'历史数据管理',
		hidden:false,
		nodes:[{
			text:'导出历史数据',
			id:'ExportHistory',
			icon:'images/thumb/briefReportThumb.gif',
			hidden:false,
			detail:'导出系统历史数据存档'
		},{
			text:'操作历史查询',
			id:'QueryHistory',
			icon:'images/thumb/newsGridThumb.gif',
			hidden:false,
			detail:'查询员工操作历史'
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