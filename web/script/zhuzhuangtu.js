/*function generateData(){
    var data = [];
    for(var i = 0; i < 12; ++i){
        data.push([Date.monthNames[i], (Math.floor(Math.random() *  11) + 1) * 100]);
    }
    return data;
}*/


zhuzhuangtu=function(){
this.init=function(config){
	
	 var store = new Ext.data.Store({
		url: 'php/zhuzhuangtu.php',	//本地php文件
        reader: new Ext.data.JsonReader({	
            root: 'data',
			totalProperty: 'total',
            id: 'users', 
			  fields:[{name: 'time', type: 'int'},
				{name: 'publish_num',type: 'int'},	
                {name: 'reply_num', type: 'int'}],
				// data: generateData()
        data: [
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
			{time:'23'},
            {time:'24'}
        ]}
		)
    });


    var p=new Ext.Panel({
        width: 900,
        height: 400,
		id:'zhuzhuangtu',
		title:'用户一日活动总览',
		closable:true,
		layout:'fit',
        //title: '用户一日活动总览',
        tbar: [{
            xtype:'button',
			text:'日期选择',
           menu:{
				xtype:'datemenu',
				id:'datamenu',
				handler:refreshChart
					}
        }],
	
        items: {
            xtype: 'stackedcolumnchart',
			id:'chart',
			author:'none',
            store: store,
            series:[{
			type:'column',
			
			yField: 'publish_num'
			},{
			type:'column',
			yField: 'reply_num'//总帖子数量
			}],
			
	
            xField: 'time',
            xAxis: new Ext.chart.CategoryAxis({
                title: '时间'
				
            }),
            yAxis: new Ext.chart.NumericAxis({
                title: '帖子数量'
			
            }),
            extraStyle: {
               xAxis: {
                    labelRotation: 0 //横轴标注旋转的度数
                }
            }
        }
    });
	function refreshChart(field,value)
			{
				var params={
				start:0,limit:30
				};
				params['filters[0][field]']='publish_date';//过滤名date
				params['filters[0][data][type]']='date';//数据类型为date
				params['filters[0][data][value]']=field.getValue().format('Y-m-d');//取INDEX所在行的时间
				params['filters[1][field]']='author';//过滤名date
				params['filters[1][data][type]']='char';//数据类型为date
				
			
				var chart=Ext.getCmp('chart');//柱状图
				params['filters[1][data][value]']=chart.author;//取INDEX所在行的用户
				chart.store.load({params:params});//筛选信息(单个用户的单日)
				var users=Ext.getCmp('users');//用户详细信息
				users.store.load({params:params});//筛选信息(单个用户的单日)
			}
	config.add(p);
	config.doLayout();

};
}
