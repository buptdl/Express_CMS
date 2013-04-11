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
		url: 'php/zhuzhuangtu.php',	//����php�ļ�
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
		title:'�û�һ�ջ����',
		closable:true,
		layout:'fit',
        //title: '�û�һ�ջ����',
        tbar: [{
            xtype:'button',
			text:'����ѡ��',
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
			yField: 'reply_num'//����������
			}],
			
	
            xField: 'time',
            xAxis: new Ext.chart.CategoryAxis({
                title: 'ʱ��'
				
            }),
            yAxis: new Ext.chart.NumericAxis({
                title: '��������'
			
            }),
            extraStyle: {
               xAxis: {
                    labelRotation: 0 //�����ע��ת�Ķ���
                }
            }
        }
    });
	function refreshChart(field,value)
			{
				var params={
				start:0,limit:30
				};
				params['filters[0][field]']='publish_date';//������date
				params['filters[0][data][type]']='date';//��������Ϊdate
				params['filters[0][data][value]']=field.getValue().format('Y-m-d');//ȡINDEX�����е�ʱ��
				params['filters[1][field]']='author';//������date
				params['filters[1][data][type]']='char';//��������Ϊdate
				
			
				var chart=Ext.getCmp('chart');//��״ͼ
				params['filters[1][data][value]']=chart.author;//ȡINDEX�����е��û�
				chart.store.load({params:params});//ɸѡ��Ϣ(�����û��ĵ���)
				var users=Ext.getCmp('users');//�û���ϸ��Ϣ
				users.store.load({params:params});//ɸѡ��Ϣ(�����û��ĵ���)
			}
	config.add(p);
	config.doLayout();

};
}
