abnormal_first=function(){
this.init=function(config){
    var store = new Ext.data.Store({
		url: 'php/abnormal.php',	//本地php文件
        reader: new Ext.data.JsonReader({	
            root: 'data',
			totalProperty: 'total',
			fields: [	//字段定义信息，包含字段与数据对象间的映射关系、类型等
				{name: 'author', type: 'char'}
            
            ]}
		)
    });
	
	

       var grid = new Ext.grid.GridPanel({

        height:200,
        //frame:true,
        title:'异常用户',
		//id:'abnormal_first',
		//collapsible:true,
       // trackMouseOver:true,//当鼠标移过行时，行是否要highlight stripeRows
		autoExpandColumn: 'abnormal',
        store: store,
		loadMask: true,

        columns: [new Ext.grid.RowNumberer({width: 20}),{
            id: 'abnormal',
            header: "用户",
            dataIndex: 'author',
            width: 100,
            sortable:true
        }],

	    bbar: new Ext.PagingToolbar({
		    store: store,	//通过Store参数联系分页及远程排序操作，操作触发更新
		    pageSize: 30,	//每页数据总数
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
			/*params['filters[0][field]']='publish_time';//过滤名date
			params['filters[0][data][type]']='date';//数据类型为date
			params['filters[0][data][value]']=now.format('Y-m-d');//值格式化为Y-m-d形式*/
			store.load({params:params});
	    	//grid.getBottomToolbar().doRefresh();
		 });//读取中。。。/**/
		config.add(grid);
	};
	
};
