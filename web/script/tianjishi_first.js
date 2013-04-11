tianjishi_first=function(){
this.init=function(config){
//后期VISTS和VIEWS要分别动态接收收贴与回帖数量
    var store = new Ext.data.Store({
		url: 'php/online_num.php',	//本地php文件
        reader: new Ext.data.JsonReader({	
            root: 'data',
			totalProperty: 'total',
        fields:['time', 'user_num'],
        data: [
            {time:'0'},
            {time:'1'},
            {time:'2'},
			{time:'3'},
			{time:'4'},
			{time:'5'},
			{time:'6'},
			{time:'7'},
			{time:'8'},
			{time:'9'},
			{time:'10'},
			{time:'11'},
			{time:'12'},
            {time:'13'},
            {time:'14'},
            {time:'15'},
            {time:'16'},
			{time:'17'},
            {time:'18'},
            {time:'19'},
            {time:'20'},
			{time:'21'},
			{time:'22'},
            {time:'23'}
       ]}
		)
    });


	function refreshChart(field,value)
			{
				var params={
				start:0,limit:30
				};
				params['filters[0][field]']='publish_time';//过滤名date
				params['filters[0][data][type]']='date';//数据类型为date
				params['filters[0][data][value]']=field.getValue().format('Y-m-d');//值格式化为Y-m-d形式
				store.load({params:params});
				}
  var p=new Ext.Panel({
        height: 200,
		title:'分时段在线人数统计',
		id:'tianjishi_first',
		closable:true,
		collapsible:true,
		layout:'fit',
        /*tbar: [{
            xtype:'button',
			text:'日期选择',
           menu:{
				xtype:'datemenu',
				id:'datamenu',
				pickerId:'datepicker',
				listeners:{
					scope:this,
					select:refreshChart
					}
					}
        }],*/
		listeners:{
				afterrender:function(){
					store.load({params:{
							start:0,
							limit:24
							}
						});
					}
				},
        items: {
            xtype: 'stackedcolumnchart',
            store: store,
            series:[{
			type:'column',
			yField: 'user_num'
			}],
			
	
            xField: 'time',
            xAxis: new Ext.chart.CategoryAxis({
                title: '时间'
				
            }),
            yAxis: new Ext.chart.NumericAxis({
                title: '在线人数'
			
            }),
            extraStyle: {
               xAxis: {
                    labelRotation: 0 //横轴标注旋转的度数
                }
            }
        }
    });
	
	config.add(p);
	config.doLayout();
};
}
