abnormal=function(){
this.init=function(config){
    var store = new Ext.data.Store({
		url: 'php/abnormal.php',	//本地php文件
		sortInfo: {
				field: 'publish_date',
				direction: 'DESC' // or 'DESC' (case sensitive for local sorting)
				},
        reader: new Ext.data.JsonReader({	
            root: 'data',
			totalProperty: 'total',
            id: 'abnormal', 
			fields: [	//字段定义信息，包含字段与数据对象间的映射关系、类型等
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
    });//网络数据读取*/
	
		
		
	/*store.load({
		params:{
				start:0,
				limit:30//每页限制30条
			}
	});*/

       var grid = new Ext.grid.GridPanel({

        width:1000,
        height:300,
        frame:true,
        title:'异常用户',
		id:'abnormal',
		closable:true,
        trackMouseOver:true,//当鼠标移过行时，行是否要highlight stripeRows
		autoExpandColumn: 'abnormal',
        store: store,
		loadMask: true,
		listeners:{
			rowclick:function(grid,index,e){
				var params={
				start:0,limit:30
				};
				/*params['filters[0][field]']='publish_date';//过滤名date
				params['filters[0][data][type]']='date';//数据类型为date
				params['filters[0][data][value]']=grid.store.data.items[index].data.publish_date;//取INDEX所在行的时间
				params['filters[1][field]']='author';//过滤名date
				params['filters[1][data][type]']='char';//数据类型为date
				params['filters[1][data][value]']=grid.store.data.items[index].data.author;//取INDEX所在行的用户*/
				params['filters[0][field]']='post_id';//过滤名date
				params['filters[0][data][type]']='int';//数据类型为date
				params['filters[0][data][value]']=grid.store.data.items[index].data.post_id;//取INDEX所在行的用户
			
				var publish_date=grid.store.data.items[index].data.publish_date;
				var author=grid.store.data.items[index].data.author;
				grid.destroy();
				createChangeTab('yonghuxinxiliebiao');
				
				/*var chart=Ext.getCmp('chart');//柱状图
				chart.author=params['filters[1][data][value]'];
				chart.store.load({params:params});//筛选信息(单个用户的单日)*/
				var users=Ext.getCmp('yonghuxinxiliebiao');//用户详细信息
				users.store.load({params:params});//筛选信息(单个用户的单日)
				
				var x=Ext.getCmp('yonghuxinxiliebiao').getTopToolbar();
				var userButton=x.getComponent(0);
				if (userButton!=undefined)
					userButton.destroy();
				x.addButton([{
					text:'日期：'+publish_date+'    用户名:'+author
				}]);
				x.doLayout();
				
			},
			scope:this
		},
	
		
        columns: [new Ext.grid.RowNumberer({width: 20}),{
            id: 'abnormal',
            header: "异常用户",
            dataIndex: 'author',
            width: 100,
            sortable:true
        }, {
            header: "敏感词",
            dataIndex: 'sensitive_words',
            width: 100,
            sortable:true
		},{
            header: "日期",
            dataIndex: 'publish_date',
            width: 200,
		    sortable:true
		}],

	    bbar: new Ext.PagingToolbar({
		    store: store,	//通过Store参数联系分页及远程排序操作，操作触发更新
		    pageSize: 30,	//每页数据总数
		    displayInfo:true//????
	    }),

		items:[{
			xtype:'button',
			text:'日期选择',
			menu:{
						xtype:'datemenu',
						id:'datamenu',
						handler:refreshChart
					}
		}], //日期
		
		
		
			
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
				params['filters[0][data][value]']=field.getValue().format('Y-m-d');//值格式化为Y-m-d形式
				store.load({params:params});

			}
	var picker=Ext.getCmp('datamenu').picker;
	//refreshChart(picker,0);//默认当天
	config.add(grid);
	config.doLayout();
	  
	  grid.on('afterrender',function(grid,event)
	    { 
	    	grid.getBottomToolbar().doRefresh();
		 });//读取中。。。

	};
};
