//�ص��עģ��
briefReport=function(){
	this.init=function(config){
		var p=new Ext.Panel({
			title:'�ص��ע',
			id:'briefReport',
			closable:true,
			autoScroll:true,
			layout:'column',
			/*layoutConfig:{
				columns:3
			},*/
			defaults: {
				bodyStyle:'padding:10px 10px'
			}, 
			items:[{
				columnWidth:.5,
				border:false,
				plugins:[/*{
					title:'���ջ���',
					collapsible:true,
					height:200,
					html:'���ջ���'
				}*/new newsWidget(),/*{
					title:'�����û�',
					collapsible:true,
					height:200,
					html:'�����û�'
				}*/new paddingPanel(),
				new WebBriefMonitor()]
			},{
				columnWidth:.5,
				border:false,
				plugins:[new tianjishi_first(),new paddingPanel(),new TopicWin()]
			}/*,{
				columnWidth:.33,
				border:false,
				items:[{
					title:'�쳣�û�',
					collapsible:true,
					height:200,
					html:'�쳣�û�'
				},{height:20,border:false},{
					title:'��������ժҪ',
					collapsible:true,
					height:200,
					html:'��������ժҪ'
				}]
			}*/]
		});
		config.add(p);
	};
};
paddingPanel=function(){
	this.init=function(config){
		var p=new Ext.Panel({
			height:20,
			border:false
		});
		config.add(p);
	};
};
