WebBriefMonitor=function(){
this.init=function(config){
	
var sumWeek= new Ext.data.JsonStore({
			url:'PHP/WebBriefWeekSum.php',
			totalProperty:'total',
//autoLoad: true,
			root: 'data',	//�����٣��������ݲ�����ʾ
			fields:[{id:'w_sen_Num' , name: 'w_sen_Num' },
					{ name: 'w_ill_Num' },
					{ name: 'w_neg_Num' },
					{ name: 'm_sen_Num' },
					{ name: 'm_ill_Num' },
					{ name: 'm_neg_Num' }
					]
	});
		sumWeek.load({
			params:{
				start:0, limit: 10
			}
		});	 			
var ws=23, wi, wn, ms=45, mi, mn=0;
wi=wn=mi=mn;			
var grid = new Ext.grid.PropertyGrid({   
    title: "Web��Դ��",   
    //width: 300,   
    height: 200,   
loadMask: true,
store: sumWeek,
    frame: true, 
	source: {   "һ��������ҳ��": 23,//ws,   
        "һ�ܷǷ���ҳ��": wi,   
        "һ�ܲ�����ҳ��": wn, 
		"һ��������ҳ��": ms , //ms,   
		"һ�·Ƿ�ҳ��": mi,   
		"һ�²�����ҳ��": mn 
		} 	
});  
sumWeek.on('load',
	function(sumWeek, event){	
					ws=sumWeek.getAt(0).json.w_sen_Num;
					wi=sumWeek.getAt(0).json.w_ill_Num;
					wn=sumWeek.getAt(0).json.w_neg_Num;
					ms=sumWeek.getAt(0).json.m_sen_Num;
					mi=sumWeek.getAt(0).json.m_ill_Num;
					mn=sumWeek.getAt(0).json.m_neg_Num;
					var source={   "һ��������ҳ��": ws,   
						"һ�·Ƿ���ҳ��": wi,   
						"һ�²�����ҳ��": wn, 
						"һ����������ҳ��": ms , //ms,   
						"һ���ȷǷ�ҳ��": mi,   
						"һ���Ȳ�����ҳ��": mn 
						};
					grid.setSource(source);
		}); 	
  config.add(grid);	
};
}