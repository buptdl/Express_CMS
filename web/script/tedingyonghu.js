tedingyonghu=function(){
this.init=function(config){
   var store = new Ext.data.Store({
		url: 'php/specialboard.php',	//����php�ļ�
        reader: new Ext.data.JsonReader({	
            root: 'data',
			totalProperty: 'total',
            id: 'tedingyonghu', 
			fields: [	//�ֶζ�����Ϣ�������ֶ������ݶ�����ӳ���ϵ�����͵�
				{name: 'board', type: 'char'}
                
            ]}
		)
    });
	
		
		
	store.load({
		params:{
				start:0,
				limit:30//ÿҳ����30��
			}
	});

       var grid = new Ext.grid.GridPanel({
        width:400,
        height:300,
        frame:true,
        title:'�ض����ͳ�Ʊ�',
		id:'tedingyonghu',
		closable:true,
		loadMask: true,
        trackMouseOver:true,//������ƹ���ʱ�����Ƿ�Ҫhighlight stripeRows
		autoExpandColumn: 'tedingyonghu',
        store: store,
	listeners:{
			rowclick:function(grid,index,e){
			var params={
				start:0,limit:30
				};
				params['filters[0][field]']='board';//ѡȡboard
				params['filters[0][data][type]']='char';//��������Ϊ
				params['filters[0][data][value]']=grid.store.data.items[index].data.board;//ȡINDEX�����е�board*/
				grid.destroy();
				createChangeTab('specialusers');
				var chart=Ext.getCmp('specialusers');
				chart.store.load({params:params})//ɸѡ��Ϣ(�������ض������û���ɸѡ��Ϣ~)
				
			},
			scope:this
		},
		
        columns: [new Ext.grid.RowNumberer({width:20}),{
            id: 'tedingyonghu',
            header: "�ض����",
            dataIndex: 'board',
            width:300,
            sortable:true
       
		
		}],

	    bbar: new Ext.PagingToolbar({
		    store: store,	//ͨ��Store������ϵ��ҳ��Զ�����������������������
		    pageSize: 30,	//ÿҳ��������
		    displayInfo:true//????
	    }),

	/*items:[{
			xtype:'button',
			text:'����ѡ��',
			menu:{
						xtype:'datemenu',
						id:'datamenu'
					}
		}], //����*/
	    view: new Ext.ux.grid.BufferView({
		    // custom row height
		    rowHeight: 34,
		    // render rows as they come into viewable area.
		    scrollDelay: false
	    })
    });
	config.add(grid);
	config.doLayout();
	 grid.on('afterrender',function(grid,event)
	    { 
	    	grid.getBottomToolbar().doRefresh();
		 });//��ȡ�С�����
	};
};