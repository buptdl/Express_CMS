//重点关注模块
briefReport=function(){
	this.init=function(config){
		var p=new Ext.Panel({
			title:'重点关注',
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
					title:'今日话题',
					collapsible:true,
					height:200,
					html:'今日话题'
				}*/new newsWidget(),/*{
					title:'领袖用户',
					collapsible:true,
					height:200,
					html:'领袖用户'
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
					title:'异常用户',
					collapsible:true,
					height:200,
					html:'异常用户'
				},{height:20,border:false},{
					title:'北邮新闻摘要',
					collapsible:true,
					height:200,
					html:'北邮新闻摘要'
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
