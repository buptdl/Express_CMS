top10 = function()
{
  this.init = function(config)
  {
    // create the Data Store
    var store = new Ext.data.Store
	({
       // autoDestroy:true,
		url:'php/top10.php',
		reader:new Ext.data.JsonReader
		({
		root: 'top10Data',
        totalProperty: 'total',
        idProperty: 'TITLE2323232',
        remoteSort: true,
        storeId: 'top10Store',
		//sortInfo: {field: 'top10Id',direction: 'asc' },
        fields: [
                // {name:'top10Id'},
				 {name:'title',mapping:'title'},
				 {name:'reply_num',mapping:'reply_num'},
				 {name: 'post_url',mapping: 'post_url'},
				 {name: 'post_content',mapping: 'post_content'},
				 {name:'collect_time',mapping:'collect_time',type:'Y-m-d H:i:s'}
                ]
	   })
  });  
        store.load({params:{start:0, limit:10}});
		
				
	function renderTitle(value,p,record)
	  {
	    return String.format
	     ('<b><a href="{1}"  target="_blank">{2}</a></b><br/>',
	     value, record.data.post_url,record.data.title);
	   }
    var grid = new Ext.grid.GridPanel({
		width:700,
        height:500,
		id:'top10',
		closable:true,
        title:'论坛十大',
        store: store,
        trackMouseOver:true,
        disableSelection:true,
        loadMask: true,
        autoExpandColumn: 'title',
        // grid columns
        columns:
		[
		  new Ext.grid.RowNumberer({width:30}),
	    { 
		    id:     'title',
            header: "标题",
            dataIndex: 'title',
			renderer:renderTitle,
            width: 500,
            sortable: true
        },{
		    id:'reply_num',
            header: "回复帖子数",
            dataIndex: 'reply_num',
            width: 100,
            sortable: true
        },{
            id: 'collect_time',
            header: "发布时间",
            dataIndex: 'collect_time',
            width: 100,
            sortable: true
        }],
       viewConfig:
	     {
	      forceFit:true,
		  enableRowBody:true,
		  showPreview:false  
		  },
        // paging bar on the bottom
        bbar: new Ext.PagingToolbar
		({
            pageSize: 10,
            store: store,
            displayInfo: true,
            emptyMsg: "请等待 loading......"

			
        })
    });
   	 grid.on('afterrender',function(grid,event)
	    { 
	    	grid.getBottomToolbar().doRefresh();
		 });
   config.add(grid);
    // trigger the data store load
   
 
 };
};