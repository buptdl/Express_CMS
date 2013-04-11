tedingyonghu=function(){
this.init=function(config){
   var store = new Ext.data.Store({
		url: 'php/specialboard.php',	//本地php文件
        reader: new Ext.data.JsonReader({	
            root: 'data',
			totalProperty: 'total',
            id: 'tedingyonghu', 
			fields: [	//字段定义信息，包含字段与数据对象间的映射关系、类型等
				{name: 'board', type: 'char'}
                
            ]}
		)
    });
	
		
		
	store.load({
		params:{
				start:0,
				limit:30//每页限制30条
			}
	});

       var grid = new Ext.grid.GridPanel({
        width:400,
        height:300,
        frame:true,
        title:'特定版块统计表',
		id:'tedingyonghu',
		closable:true,
		loadMask: true,
        trackMouseOver:true,//当鼠标移过行时，行是否要highlight stripeRows
		autoExpandColumn: 'tedingyonghu',
        store: store,
	listeners:{
			rowclick:function(grid,index,e){
			var params={
				start:0,limit:30
				};
				params['filters[0][field]']='board';//选取board
				params['filters[0][data][type]']='char';//数据类型为
				params['filters[0][data][value]']=grid.store.data.items[index].data.board;//取INDEX所在行的board*/
				grid.destroy();
				createChangeTab('specialusers');
				var chart=Ext.getCmp('specialusers');
				chart.store.load({params:params})//筛选信息(需加入对特定版块的用户的筛选信息~)
				
			},
			scope:this
		},
		
        columns: [new Ext.grid.RowNumberer({width:20}),{
            id: 'tedingyonghu',
            header: "特定版块",
            dataIndex: 'board',
            width:300,
            sortable:true
       
		
		}],

	    bbar: new Ext.PagingToolbar({
		    store: store,	//通过Store参数联系分页及远程排序操作，操作触发更新
		    pageSize: 30,	//每页数据总数
		    displayInfo:true//????
	    }),

	/*items:[{
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
	config.add(grid);
	config.doLayout();
	 grid.on('afterrender',function(grid,event)
	    { 
	    	grid.getBottomToolbar().doRefresh();
		 });//读取中。。。
	};
};