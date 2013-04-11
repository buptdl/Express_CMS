WebBriefMonitor=function(){
this.init=function(config){
	
var sumWeek= new Ext.data.JsonStore({
			url:'PHP/WebBriefWeekSum.php',
			totalProperty:'total',
//autoLoad: true,
			root: 'data',	//不可少，否则数据不能显示
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
    title: "Web资源简报",   
    //width: 300,   
    height: 200,   
loadMask: true,
store: sumWeek,
    frame: true, 
	source: {   "一周敏感网页数": 23,//ws,   
        "一周非法网页数": wi,   
        "一周不良网页数": wn, 
		"一月敏感网页数": ms , //ms,   
		"一月非法页数": mi,   
		"一月不良网页数": mn 
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
					var source={   "一月敏感网页数": ws,   
						"一月非法网页数": wi,   
						"一月不良网页数": wn, 
						"一季度敏感网页数": ms , //ms,   
						"一季度非法页数": mi,   
						"一季度不良网页数": mn 
						};
					grid.setSource(source);
		}); 	
  config.add(grid);	
};
}