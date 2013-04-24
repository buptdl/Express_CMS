homePage=function(){
	var authority=Ext.getCmp('mainView').authority;
	var data=[{
		title:'�����Ϣ����',
		hidden:false,
		nodes:[{
			text:'�����ѯ',
			id:'QueryExpress',
			icon:'images/thumb/briefReportThumb.gif',
			hidden:false,
			detail:'���˵��š��ͻ�����ʱ�䡢�˵�״̬���˵�������ص�������ѯ'
		},{
			text:'�˵�¼��',
			id:'NewExpress',
			icon:'images/thumb/newsGridThumb.gif',
			hidden:false,
			detail:'�ṩ�ͻ������嵥¼������˹��ֹ�¼���EXCEL�������¼��'
		},{
			text:'���״̬����',
			id:'UpdateExpress',
			icon:'images/thumb/newsGridThumb.gif',
			hidden:false,
			detail:'���������ȡ����⡢���⡢�ʹ�ȴ������Ĳ�����Ϣ�����ṩ���ֲ����ӿ��ڽ����˹������Ӧ�������¡�ͨ����ǹɨ�������˵����б���������'
		},{
			text:'�쳣�������',
			id:'newsGrid',
			icon:'images/thumb/newsGridThumb.gif',
			hidden:false,
			detail:'�쳣�˵�ָ���������˵�״̬ʱ���벻���ڵ��˵��ţ������쳣�����Ԥ����'
		}]
	},{
		title:'������Ϣ����',
		hidden:false,
		nodes:[{
			text:'���տ���֧��¼',
			id:'AgencyFund',
			icon:'images/thumb/WebIllegalMonitorThumb.gif',
			hidden:false,
			detail:'�����ӿ������ȡ�Ĵ��տ֧�����̼ҵĴ��տ'
		},{
			text:'����ͳ��',
			id:'AgencyFundRecord',
			icon:'images/thumb/WebNegativeMonitorThumb.gif',
			hidden:false,
			detail:'��һ��ʱ��θ�����˾��Ӫ��֧�ܶ�ı仯������ṩͳ�ƽ���ĵ����ӿ�'
		}]
	},{
		title:'�ͻ���Ϣ����',
		hidden:false,
		nodes:[{
			text:'�����˵����ͷ�',
			id:'TopicHours',
			icon:'images/thumb/TopicHoursThumb.gif',
			hidden:false,
			detail:'�����˵����ͷ�����Ϣ'
		},{
			text:'�����������˷�',
			id:'TopicDaily',
			icon:'images/thumb/TopicDailyThumb.gif',
			hidden:false,
			detail:'�����������˷���������Ϣ'
		}]
	},{
		title:'��˾��֯�ṹ����',
		hidden:false,
		nodes:[{
			text:'���Ź���',
			id:'huoyueyonghu',
			icon:'images/thumb/huoyueyonghuThumb.gif',
			hidden:false,
			detail:'�ṩ������Ȩ�ޡ���������á�'
		},{
			text:'ְԱ����',
			id:'abnormal',
			icon:'images/thumb/abnormalThumb.gif',
			hidden:false,
			detail:'Ϊ���ž����ṩ����ְԱ���趨����'
		}]
	},{
		title:'������Ϣ����',
		hidden:false,
		nodes:[{
			text:'������Ϣ����',
			id:'clusterGrid',
			icon:'images/thumb/clusterGridThumb.gif',
			hidden:false,
			detail:'��¼����'
		},{
			text:'�޸ĵ�¼����',
			id:'dicGrid',
			icon:'images/thumb/dicGridThumb.gif',
			hidden:false,
			detail:'��¼����'
		}]
	},{
		title:'��ʷ���ݹ���',
		hidden:false,
		nodes:[{
			text:'������ʷ����',
			id:'ExportHistory',
			icon:'images/thumb/briefReportThumb.gif',
			hidden:false,
			detail:'����ϵͳ��ʷ���ݴ浵'
		},{
			text:'������ʷ��ѯ',
			id:'QueryHistory',
			icon:'images/thumb/newsGridThumb.gif',
			hidden:false,
			detail:'��ѯԱ��������ʷ'
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
			title:'��ϸ����',
			width:200,
			collapsible:true,
			collapsed:true
		});
		var p=new Ext.Panel({
			title:'����ҳ',
			id:'homePage',
			layout:'border',
			closable:true,
			items:[view,detail]
		});
		config.add(p);
	};
	
};