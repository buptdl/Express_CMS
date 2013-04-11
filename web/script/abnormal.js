abnormal=function(){
this.init=function(config){
    var store = new Ext.data.Store({
		url: 'php/abnormal.php',	//����php�ļ�
		sortInfo: {
				field: 'publish_date',
				direction: 'DESC' // or 'DESC' (case sensitive for local sorting)
				},
        reader: new Ext.data.JsonReader({	
            root: 'data',
			totalProperty: 'total',
            id: 'abnormal', 
			fields: [	//�ֶζ�����Ϣ�������ֶ������ݶ�����ӳ���ϵ�����͵�
				{name: 'author', type: 'char'},
                {name: 'sensitive_words', type: 'char'},
				{name: 'publish_date', type: 'Y-m-d  G:i:s'},
				{name: 'post_id'}
            ]}
		)
    });
	
	/*var store = new Ext.data.Store({
        remoteSort: true,
        baseParams: {lightWeight:true,ext: 'js'},
        sortInfo: {field:'lastpost', direction:'DESC'},
       

        proxy: new Ext.data.ScriptTagProxy({
            url: 'http://extjs.com/forum/topics-browse-remote.php'
        }),
		reader: new Ext.data.JsonReader({
            root: 'topics',
            totalProperty: 'totalCount',
            idProperty: 'threadid',
            fields: [
                'title', 'forumtitle', 'forumid', 'author',
                {name: 'replycount', type: 'int'},
                {name: 'lastpost', mapping: 'lastpost', type: 'date', dateFormat: 'timestamp'},
                'lastposter', 'excerpt'
            ]
        })
    });//�������ݶ�ȡ*/
	
		
		
	/*store.load({
		params:{
				start:0,
				limit:30//ÿҳ����30��
			}
	});*/

       var grid = new Ext.grid.GridPanel({

        width:1000,
        height:300,
        frame:true,
        title:'�쳣�û�',
		id:'abnormal',
		closable:true,
        trackMouseOver:true,//������ƹ���ʱ�����Ƿ�Ҫhighlight stripeRows
		autoExpandColumn: 'abnormal',
        store: store,
		loadMask: true,
		listeners:{
			rowclick:function(grid,index,e){
				var params={
				start:0,limit:30
				};
				/*params['filters[0][field]']='publish_date';//������date
				params['filters[0][data][type]']='date';//��������Ϊdate
				params['filters[0][data][value]']=grid.store.data.items[index].data.publish_date;//ȡINDEX�����е�ʱ��
				params['filters[1][field]']='author';//������date
				params['filters[1][data][type]']='char';//��������Ϊdate
				params['filters[1][data][value]']=grid.store.data.items[index].data.author;//ȡINDEX�����е��û�*/
				params['filters[0][field]']='post_id';//������date
				params['filters[0][data][type]']='int';//��������Ϊdate
				params['filters[0][data][value]']=grid.store.data.items[index].data.post_id;//ȡINDEX�����е��û�
			
				var publish_date=grid.store.data.items[index].data.publish_date;
				var author=grid.store.data.items[index].data.author;
				grid.destroy();
				createChangeTab('yonghuxinxiliebiao');
				
				/*var chart=Ext.getCmp('chart');//��״ͼ
				chart.author=params['filters[1][data][value]'];
				chart.store.load({params:params});//ɸѡ��Ϣ(�����û��ĵ���)*/
				var users=Ext.getCmp('yonghuxinxiliebiao');//�û���ϸ��Ϣ
				users.store.load({params:params});//ɸѡ��Ϣ(�����û��ĵ���)
				
				var x=Ext.getCmp('yonghuxinxiliebiao').getTopToolbar();
				var userButton=x.getComponent(0);
				if (userButton!=undefined)
					userButton.destroy();
				x.addButton([{
					text:'���ڣ�'+publish_date+'    �û���:'+author
				}]);
				x.doLayout();
				
			},
			scope:this
		},
	
		
        columns: [new Ext.grid.RowNumberer({width: 20}),{
            id: 'abnormal',
            header: "�쳣�û�",
            dataIndex: 'author',
            width: 100,
            sortable:true
        }, {
            header: "���д�",
            dataIndex: 'sensitive_words',
            width: 100,
            sortable:true
		},{
            header: "����",
            dataIndex: 'publish_date',
            width: 200,
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
	var picker=Ext.getCmp('datamenu').picker;
	//refreshChart(picker,0);//Ĭ�ϵ���
	config.add(grid);
	config.doLayout();
	  
	  grid.on('afterrender',function(grid,event)
	    { 
	    	grid.getBottomToolbar().doRefresh();
		 });//��ȡ�С�����

	};
};
