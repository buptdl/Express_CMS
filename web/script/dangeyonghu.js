dangeyonghu=function(){
	this.init=function(config){
		var p=new Ext.Panel({
			id:'dangeyonghu',
			title:'用户详细信息',
			closable:true,
			autoScroll:true,
			plugins:[new zhuzhuangtu(),new yonghuxinxiliebiao()]
		});
		config.add(p);
		config.doLayout();
	};
}