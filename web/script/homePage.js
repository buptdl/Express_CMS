homePage=function(){
	var authority=Ext.getCmp('mainView').authority;
	var data=[{
		title:'�ۺϹ���',
		hidden:false,
		nodes:[{
			text:'�����',
			id:'briefReport',
			icon:'images/thumb/briefReportThumb.gif',
			hidden:false,
			detail:'<h1><center>�����</center></h1><br>&nbsp;&nbsp;&nbsp;&nbsp;ͳһ����ϵͳ���Ѹ������ܵĽ��������Ҫ�س�������������У����������ٵ�ʱ���ڰ�������Ҫ���鱨��<br>&nbsp;&nbsp;&nbsp;&nbsp;���а��������ջ��⣬���ջ�Ծ�û����쳣�û��������û���������������ͳ�ƺͱ�������ժҪ��'
		},{
			text:'��������',
			id:'newsGrid',
			icon:'images/thumb/newsGridThumb.gif',
			hidden:false,
			detail:'<h1><center>��������</center></h1><br>&nbsp;&nbsp;&nbsp;&nbsp;��ʾ�ӻ������ϻ�ȡ���йر��ʵ�������Ѷ��'
		}]
	},{
		title:'Web��Դ����',
		hidden:false,
		nodes:[{
			text:'������Ϣ',
			id:'WebSensitiveMonitor',
			icon:'images/thumb/WebSensitiveMonitorThumb.gif',
			hidden:false,
			detail:'������Ϣ'
		},{
			text:'�Ƿ���Ϣ',
			id:'WebIllegalMonitor',
			icon:'images/thumb/WebIllegalMonitorThumb.gif',
			hidden:false,
			detail:'�Ƿ���Ϣ'
		},{
			text:'������Ϣ',
			id:'WebNegativeMonitor',
			icon:'images/thumb/WebNegativeMonitorThumb.gif',
			hidden:false,
			detail:'������Ϣ'
		},{
			text:'�߼���Ϣ',
			id:'WebChart',
			icon:'images/thumb/WebChartThumb.gif',
			hidden:false,
			detail:'�߼���Ϣ'
		}]
	},{
		title:'�ȵ�ͻ�����',
		hidden:false,
		nodes:[{
			text:'Сʱ���Ż���',
			id:'TopicHours',
			icon:'images/thumb/TopicHoursThumb.gif',
			hidden:false,
			detail:'Сʱ���Ż���'
		},{
			text:'ÿ�����Ż���',
			id:'TopicDaily',
			icon:'images/thumb/TopicDailyThumb.gif',
			hidden:false,
			detail:'ÿ�����Ż���'
		},{
			text:'ͻ���¼����',
			id:'TopicEmerg',
			icon:'images/thumb/TopicEmergThumb.gif',
			hidden:false,
			detail:'ͻ���¼����'
		}]
	},{
		title:'�û���Ϊ����',
		hidden:false,
		nodes:[{
			text:'��Ծ�û�',
			id:'huoyueyonghu',
			icon:'images/thumb/huoyueyonghuThumb.gif',
			hidden:false,
			detail:'<h1><center>Сʱ���Ż���</h1></center><br>&nbsp;&nbsp;&nbsp;&nbsp;��ӳ����ͳ�ƵĵĻ�Ծ�û������Ծ��'
		},{
			text:'�쳣�û�',
			id:'abnormal',
			icon:'images/thumb/abnormalThumb.gif',
			hidden:false,
			detail:'<h1><center>ÿ�����Ż���</h1></center><br>&nbsp;&nbsp;&nbsp;&nbsp;��ӳ����ͳ�Ƶĵ��쳣�û������Ӧ�����д�'
		},{
			text:'�쵼�û�',
			id:'leader',
			icon:'images/thumb/leaderThumb.gif',
			hidden:false,
			detail:'<h1><center>ͻ���¼����</h1></center><br>&nbsp;&nbsp;&nbsp;&nbsp;��ӳ����ͳ�Ƶĵ����������û������쵼��'
		},{
			text:'��ʱ����������ͳ��',
			id:'tianjishi',
			icon:'images/thumb/tianjishiThumb.png',
			hidden:false,
			detail:'<h1><center>��ʱ����������ͳ��</h1></center><br>&nbsp;&nbsp;&nbsp;&nbsp;��ӳ�����ض�ʱ�����������'
		},{
			text:'�ض����',
			id:'tedingyonghu',
			icon:'images/thumb/tedingyonghuThumb.gif',
			hidden:false,
			detail:'<h1><center>ͻ���¼����</h1></center><br>&nbsp;&nbsp;&nbsp;&nbsp;��ӳ�ض������û���Ծ��'
		}]
	},{
		title:'�û�������Ϣ',
		hidden:(authority==='2'||authority==='4')?false:true,
		nodes:[{
			text:'���������ͻ�����',
			id:'clusterGrid',
			icon:'images/thumb/clusterGridThumb.gif',
			hidden:false,
			detail:'<h1><center>���������ͻ�����</center></h1><br>&nbsp;&nbsp;&nbsp;&nbsp;�û������ֶ�'
		},{
			text:'web��Դ����',
			id:'dicGrid',
			icon:'images/thumb/dicGridThumb.gif',
			hidden:false,
			detail:'<h1><center>web��Դ����</h1></center><br>&nbsp;&nbsp;&nbsp;&nbsp;�û������ֶ�'
		},{
			text:'�û���Ϊģ������',
			id:'behaveGrid',
			icon:'images/thumb/behaveGridThumb.gif',
			hidden:false,
			detail:'<h1><center>�û���Ϊģ������</h1></center><br>&nbsp;&nbsp;&nbsp;&nbsp;�û������ֶ�'
		}]
	},{
		title:'ϵͳ����',
		hidden:(authority==='2'||authority==='4')?false:true,
		nodes:[{
			text:'�û�Ȩ�޹���',
			id:'userGrid',
			icon:'images/thumb/userGridThumb.gif',
			hidden:authority==='4'?false:true,
			detail:'<h1><center>�û�Ȩ�޹���</center></h1><br>&nbsp;&nbsp;&nbsp;&nbsp;��Ҫʵ�ֶԲ�ͬȨ���û���ɾ������ӡ���ʾ�Ȳ�����'
		},{
			text:'ϵͳ��־',
			id:'systemLog',
			icon:'images/thumb/systemLogThumb.gif',
			hidden:false,
			detail:'<h1><center>ϵͳ��־</center></h1><br>&nbsp;&nbsp;&nbsp;&nbsp;ͳһ����ϵͳ��������Ҫϵͳ��Ϊ�����¼�ڴˣ�������ͨ���鿴�����ʱ�˽�ϵͳ������״̬���Ա㼰ʱ���й���<br>&nbsp;&nbsp;&nbsp;&nbsp;ϵͳ����¼����̨������Ϣ���û���½��ע����Ϣ���û������޸���Ϣ��'
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