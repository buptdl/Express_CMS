tianjishi=function(){
this.init=function(config){
//����VISTS��VIEWSҪ�ֱ�̬�����������������
    var store = new Ext.data.Store({
		url: 'php/online_num.php',	//����php�ļ�
        reader: new Ext.data.JsonReader({	
            root: 'data',
			totalProperty: 'total',
			id: 'tianjishi', 
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
				params['filters[0][field]']='publish_time';//����ʱ��
				params['filters[0][data][type]']='date';//��������Ϊdate
				params['filters[0][data][value]']=field.getValue().format('Y-m-d');//ֵ��ʽ��ΪY-m-d��ʽ
				
				
			
				var x=Ext.getCmp('tianjishi').getTopToolbar();
				var userButton=x.getComponent(1);
				if (userButton!=undefined)
					userButton.destroy();
				x.addButton([{
					text:'���ڣ�'+params['filters[0][data][value]']
				}]);
				x.doLayout();
				
				store.load({params:params});
				
				
				}
  var p=new Ext.Panel({
        width: 800,
        height: 300,
		title:'��ʱ����������ͳ��',
		id:'tianjishi',
		closable:true,
		layout:'fit',
        tbar: [{
            xtype:'button',
			text:'����ѡ��',
           menu:{
				xtype:'datemenu',
				id:'datamenu',
				pickerId:'datepicker',
				listeners:{
					scope:this,
					select:refreshChart
					}
					}
        },{
			xtype:'button',
			//text:Ext.getCmp('datamenu').picker.getValue().format('Y-m-d')//IE����δ��Ⱦ���޷�����
			listeners:{
				afterrender:function(){
					this.setText(Ext.getCmp('datamenu').picker.getValue().format('Y-m-d')); 
				store.load({params:{
						start:0,
						limit:24
					}
				})
				
				
				
				}
			}
		}],
	
        items: {
            xtype: 'stackedcolumnchart',
            store: store,
            series:[{
			type:'column',
			yField: 'user_num'
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
	//Ext.getCmp('datamenu').fireEvent('select',Ext.getCmp('datepicker'),new Date());//Ĭ�ϵ���ʱ��
	config.add(p);
	config.doLayout();
};
}
