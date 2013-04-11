yonghuxinxiliebiao=function(){
this.init=function(config){
   var store = new Ext.data.Store({
		url: 'php/yonghuxinxiliebiao.php',	//本地php文件
        reader: new Ext.data.JsonReader({	
            root: 'data',
			totalProperty: 'total',
            id: 'users', 
			fields: [	//字段定义信息，包含字段与数据对象间的映射关系、类型等
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
    });//网络数据读取*/
	
		
		

	 function renderTopic(value, p, record){
        return String.format(
                '<b><a href="{2}" target="_blank" >{1}</a></b>',
                value, record.data.title, record.data.post_url);
    }
				//点击链接到原网页
	

       var grid = new Ext.grid.GridPanel({

        width:900,
        height:400,
        frame:true,
		title:'异常帖列表',
		closable:true,
       // title:'用户信息列表',
	    id: 'yonghuxinxiliebiao', 
        trackMouseOver:true,//当鼠标移过行时，行是否要highlight stripeRows
		autoExpandColumn: 'users',
        store: store,
		
		
        columns: [new Ext.grid.RowNumberer({width: 20}),{
            id: 'users',
            header: "题目",
            dataIndex: 'title',
            width: 150,
			renderer: renderTopic,
            sortable:true
			
        }, {
            header: "时间",
            dataIndex: 'publish_time',
            width: 200,
            sortable:true
		
		}],
		tbar: [{
            xtype:'button',
			text:'加载中' 
        }],

	    bbar: new Ext.PagingToolbar({
		    store: store,	//通过Store参数联系分页及远程排序操作，操作触发更新
		    pageSize:30,	//每页数据总数
		    displayInfo:true//????
	    }),

/*	items:[{
			xtype:'button',
			text:'日期选择',
			menu:{
						xtype:'datemenu',
						id:'datamenu'
					}
		}], //日期*/
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
	config.add(grid);
	config.doLayout();
	};
};