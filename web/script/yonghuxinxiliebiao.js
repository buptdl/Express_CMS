yonghuxinxiliebiao=function(){
this.init=function(config){
   var store = new Ext.data.Store({
		url: 'php/yonghuxinxiliebiao.php',	//����php�ļ�
        reader: new Ext.data.JsonReader({	
            root: 'data',
			totalProperty: 'total',
            id: 'users', 
			fields: [	//�ֶζ�����Ϣ�������ֶ������ݶ�����ӳ���ϵ�����͵�
                {name: 'title', type: 'char'},
				{name: 'post_url',mapping: 'post_url'},	
                {name: 'publish_time', type: 'Y-m-d G:i:s'}
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
	
		
		

	 function renderTopic(value, p, record){
        return String.format(
                '<b><a href="{2}" target="_blank" >{1}</a></b>',
                value, record.data.title, record.data.post_url);
    }
				//������ӵ�ԭ��ҳ
	

       var grid = new Ext.grid.GridPanel({

        width:900,
        height:400,
        frame:true,
		title:'�쳣���б�',
		closable:true,
       // title:'�û���Ϣ�б�',
	    id: 'yonghuxinxiliebiao', 
        trackMouseOver:true,//������ƹ���ʱ�����Ƿ�Ҫhighlight stripeRows
		autoExpandColumn: 'users',
        store: store,
		
		
        columns: [new Ext.grid.RowNumberer({width: 20}),{
            id: 'users',
            header: "��Ŀ",
            dataIndex: 'title',
            width: 150,
			renderer: renderTopic,
            sortable:true
			
        }, {
            header: "ʱ��",
            dataIndex: 'publish_time',
            width: 200,
            sortable:true
		
		}],
		tbar: [{
            xtype:'button',
			text:'������' 
        }],

	    bbar: new Ext.PagingToolbar({
		    store: store,	//ͨ��Store������ϵ��ҳ��Զ�����������������������
		    pageSize:30,	//ÿҳ��������
		    displayInfo:true//????
	    }),

/*	items:[{
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
	config.add(grid);
	config.doLayout();
	};
};