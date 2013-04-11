abnormal_first=function(){
this.init=function(config){
    var store = new Ext.data.Store({
		url: 'php/abnormal.php',	//����php�ļ�
        reader: new Ext.data.JsonReader({	
            root: 'data',
			totalProperty: 'total',
			fields: [	//�ֶζ�����Ϣ�������ֶ������ݶ�����ӳ���ϵ�����͵�
				{name: 'author', type: 'char'}
            
            ]}
		)
    });
	
	

       var grid = new Ext.grid.GridPanel({

        height:200,
        //frame:true,
        title:'�쳣�û�',
		//id:'abnormal_first',
		//collapsible:true,
       // trackMouseOver:true,//������ƹ���ʱ�����Ƿ�Ҫhighlight stripeRows
		autoExpandColumn: 'abnormal',
        store: store,
		loadMask: true,

        columns: [new Ext.grid.RowNumberer({width: 20}),{
            id: 'abnormal',
            header: "�û�",
            dataIndex: 'author',
            width: 100,
            sortable:true
        }],

	    bbar: new Ext.PagingToolbar({
		    store: store,	//ͨ��Store������ϵ��ҳ��Զ�����������������������
		    pageSize: 30,	//ÿҳ��������
		    displayInfo:true//????
	    }),
	
		 view: new Ext.ux.grid.BufferView({
				// custom row height
				rowHeight: 34,
				// render rows as they come into viewable area.
				scrollDelay: false
			})/**/
		});
  
	
	  
	  grid.on('afterrender',function(grid,event)
	    { 
			//var now=new Date();
			var params={
				start:0,limit:30
			};
			/*params['filters[0][field]']='publish_time';//������date
			params['filters[0][data][type]']='date';//��������Ϊdate
			params['filters[0][data][value]']=now.format('Y-m-d');//ֵ��ʽ��ΪY-m-d��ʽ*/
			store.load({params:params});
	    	//grid.getBottomToolbar().doRefresh();
		 });//��ȡ�С�����/**/
		config.add(grid);
	};
	
};
