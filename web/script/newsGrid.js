newsGrid = function()
{
  this.init = function(config)
  {
    // create the Data Store
    var store = new Ext.data.Store
	({
       // autoDestroy:true,
		url:'php/news.php',
		reader:new Ext.data.JsonReader
		({
		root: 'newsData',
        totalProperty: 'total',
        idProperty: 'TITLE',
        remoteSort: true,
        storeId: 'newsStore',
		//sortInfo: {field: 'newsId',direction: 'asc' },
        fields: [
                // {name:'newsId'},
				 {name:'title',mapping:'title'},
				 {name:'author',mapping:'author'},
				 {name: 'post_url',mapping: 'post_url'},
				 {name: 'post_content',mapping: 'post_content'},
				 {name:'publish_time',mapping:'publish_time',type:'Y-m-d H:i:s'}
                ]
	   })
  });  
        store.load({params:{start:0, limit:25}});
		
				
	function renderTitle(value,p,record)
	  {
	    return String.format
	     ('<b><a href="{1}"  target="_blank">{2}</a></b><br/>',
	     value, record.data.post_url,record.data.title);
	   }
    var grid = new Ext.grid.GridPanel({
		width:700,
        height:500,
		id:'newsGrid',
		closable:true,
        title:'北邮新闻',
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
		    id:'author',
            header: "来源",
            dataIndex: 'author',
            width: 100,
            sortable: true
        },{
            id: 'publish_time',
            header: "发布时间",
            dataIndex: 'publish_time',
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
            pageSize: 25,
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