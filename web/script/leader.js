leader=function(){
this.init=function(config){
	
	var store = new Ext.data.Store({
		url: 'php/users_leader.php',	//����php�ļ�
        reader: new Ext.data.JsonReader({	
            root: 'data',
			totalProperty: 'total',
            id: 'leader', 
			fields: [	//�ֶζ�����Ϣ�������ֶ������ݶ�����ӳ���ϵ�����͵�
				{name: 'author', type: 'char'},
                {name: 'leaderness', type: 'double'},
				{name: 'publish_num', type: 'int'},
				{name: 'publish_floor', type: 'int'},
				{name: 'publish_date', type: 'Y-m-d  G:i:s'}
            ]}
		)
    });
	
		
		
	/*store.load({
		params:{
				start:0,
				limit:30//ÿҳ����30��
			}
	});*/

       var grid = new Ext.grid.GridPanel({
        width:600,
        height:300,
        frame:true,
        title:'��������',
		id:'leader',
		closable:true,
		loadMask:true,//loading...
        trackMouseOver:true,//������ƹ���ʱ�����Ƿ�Ҫhighlight stripeRows
		autoExpandColumn: 'leader',
        store: store,
		listeners:{
			rowclick:function(grid,index,e){
				var params={
				start:0,limit:30
				};
				params['filters[0][field]']='publish_date';//������date
				params['filters[0][data][type]']='date';//��������Ϊdate
				params['filters[0][data][value]']=grid.store.data.items[index].data.publish_date;//ȡINDEX�����е�ʱ��
				params['filters[1][field]']='author';//������date
				params['filters[1][data][type]']='char';//��������Ϊdate
				params['filters[1][data][value]']=grid.store.data.items[index].data.author;//ȡINDEX�����е��û�
			
				
				grid.destroy();
				createChangeTab('zhuzhuangtu');
				
				var x=Ext.getCmp('zhuzhuangtu').getTopToolbar();
				var userButton=x.getComponent(1);
				if (userButton!=undefined)
					userButton.destroy();
				x.addButton([{
					text:'���ڣ�'+params['filters[0][data][value]']+'    �û���:'+params['filters[1][data][value]']
				}]);
				x.doLayout();
				
				var chart=Ext.getCmp('chart');//��״ͼ
				chart.author=params['filters[1][data][value]']
				chart.store.load({params:params});//ɸѡ��Ϣ(�����û��ĵ���)
				var users=Ext.getCmp('users');//�û���ϸ��Ϣ
				users.store.load({params:params});//ɸѡ��Ϣ(�����û��ĵ���)
				
				
			},
			scope:this
		},
	
	
		
        columns: [new Ext.grid.RowNumberer({width: 20}),{
            id: 'leader',
            header: "��������",
            dataIndex: 'author',
            width: 150,
            sortable:true
            }, {
            header: "�쵼��",
            dataIndex: 'leaderness',
            width: 80,
            sortable:true
			},{
            header: "������",
            dataIndex: 'publish_num',
            width: 80,
            sortable:true
			},{
            header: "����¥��",
            dataIndex: 'publish_floor',
            width: 80,
            sortable:true
			},{
            header: "����",
            dataIndex: 'publish_date',
            width: 300,
		    sortable:true
		}],

	    bbar: new Ext.PagingToolbar({
		    store: store,	//ͨ��Store������ϵ��ҳ��Զ�����������������������
		    pageSize: 30,	//ÿҳ��������
		    displayInfo:true//????
	    }),
		
		items:[{
			xtype:'button',
			text:'����ѡ��',
			menu:{
						xtype:'datemenu',
						id:'datamenu',
						handler:refreshChart
					}
		}], //����
	
	    view: new Ext.ux.grid.BufferView({
		    // custom row height
		    rowHeight: 34,
		    // render rows as they come into viewable area.
		   scrollDelay: false
	    })
    });
	function refreshChart(field,value)
			{
				var params={
				start:0,limit:30
				};
				params['filters[0][field]']='publish_date';//������date
				params['filters[0][data][type]']='date';//��������Ϊdate
				params['filters[0][data][value]']=field.getValue().format('Y-m-d');//ֵ��ʽ��ΪY-m-d��ʽ
				store.load({params:params});

			}
	
	config.add(grid);
	config.doLayout();
	 grid.on('afterrender',function(grid,event)
	    { 
	    	grid.getBottomToolbar().doRefresh();
		 });//��ȡ�С�����
	};
};

