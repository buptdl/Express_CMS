specialusers=function(){
this.init=function(config){
    var store = new Ext.data.Store({
		url: 'php/special_users.php',	//本地php文件
        reader: new Ext.data.JsonReader({	
            root: 'data',
			totalProperty: 'total',
            id: 'specialusers', 
			fields: [	//字段定义信息，包含字段与数据对象间的映射关系、类型等
				{name: 'author', type: 'char'},
				{name: 'publish_num', type: 'int'},
				{name: 'publish_floor', type: 'int'},
				{name: 'reply_num', type: 'int'},
				{name: 'reply_floor', type: 'int'},
				{name: 'emotion_tendy', type: 'int'},
				{name: 'activeness', type: 'double'}, 
				{name: 'publish_date', type: 'Y-m-d  G:i:s'}
            ]}
		)
    });
	
	
	
		
		
	/*store.load({
		params:{
				start:0,
				limit:30//每页限制30条
			}
	});*/

       var grid = new Ext.grid.GridPanel({
        width:900,
        height:300,
        frame:true,
        title:'特定版块用户行为分析',
		id:'specialusers',
		closable:true,
		loadMask: true,
        trackMouseOver:true,//当鼠标移过行时，行是否要highlight stripeRows
		autoExpandColumn: 'specialusers',
        store: store,
		listeners:{
			rowclick:function(grid,index,e){
				var params={
				start:0,limit:30
				};
				params['filters[0][field]']='publish_date';//过滤名date
				params['filters[0][data][type]']='date';//数据类型为date
				params['filters[0][data][value]']=grid.store.data.items[index].data.publish_date;//取INDEX所在行的时间
				params['filters[1][field]']='author';//过滤名date
				params['filters[1][data][type]']='char';//数据类型为date
				params['filters[1][data][value]']=grid.store.data.items[index].data.author;//取INDEX所在行的用户
			
				
				grid.destroy();
				createChangeTab('zhuzhuangtu');
				
				var chart=Ext.getCmp('chart');//柱状图
				chart.author=params['filters[1][data][value]']
				chart.store.load({params:params});//筛选信息(单个用户的单日)
				//var users=Ext.getCmp('users');//用户详细信息
				//users.store.load({params:params});//筛选信息(单个用户的单日)
				
				var x=Ext.getCmp('zhuzhuangtu').getTopToolbar();
				var userButton=x.getComponent(1);
				if (userButton!=undefined)
					userButton.destroy();
				x.addButton([{
					text:'日期：'+params['filters[0][data][value]']+'    用户名:'+params['filters[1][data][value]']
				}]);
				x.doLayout();
				
			},
			scope:this
		},
	
		
        columns: [new Ext.grid.RowNumberer({width: 20}),{
            id: 'specialusers',
            header: "用户名",
            dataIndex: 'author',
            width: 300,
            sortable:true
        }, {
            header: "活跃度",
            dataIndex: 'activeness',
            width: 50,
            sortable:true
				}, {
            header: "倾向性",
            dataIndex: 'emotion_tendy',
            width: 50,
            sortable:true
				}, {
            header: "所发帖总数",
            dataIndex: 'publish_num',
            width: 50,
            sortable:true
				}, {
            header: "所发帖总楼数",
            dataIndex: 'publish_floor',
            width: 50,
            sortable:true
				}, {
            header: "所回帖总数",
            dataIndex: 'reply_num',
            width: 50,
            sortable:true
				}, {
            header: "回帖总楼数",
            dataIndex: 'reply_floor',
            width: 50,
            sortable:true
				},{
            header: "日期",
            dataIndex: 'publish_date',
            width: 100,
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
			hidden:true,
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
	config.add(grid);
	config.doLayout();
	 grid.on('afterrender',function(grid,event)
	    { 
	    	grid.getBottomToolbar().doRefresh();
		 });//读取中。。。
	};
};