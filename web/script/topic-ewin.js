/*!
 * Ext JS Library 3.3.0
 * Copyright(c) 2006-2010 Ext JS, Inc.
 * licensing@extjs.com
 * http://www.extjs.com/license
 */
Ext.QuickTips.init();

TopicEWin=function(){
	this.init=function(config){
    // Create the Data Store
    var store = new Ext.data.Store({
		url: 'php/topic-ewin.php',
		// Data reader
		reader: new Ext.data.JsonReader({
			root: 'rows',
			totalProperty: 'results',
			id: 'pid',
			remoteSort: true,
			fields: [// Data structure from pris_posts_main
				{name: 'pid',mapping: 'pid', type: 'int'},
			//	{name: 'md5',mapping: 'md5'},
				{name: 'post_url',mapping: 'post_url'},			
			//	{name: 'post_source',mapping: 'post_source', type: 'int'},
				{name: 'title',mapping: 'title'},
				{name: 'author',mapping: 'author'},
				{name: 'board_cname',mapping: 'board_cname'},
			//	'board_ename',
				{name: 'site_name',mapping: 'site_name'},
				{name: 'publish_time', mapping: 'publish_time', type: 'Y-m-d  G:i:s'},
				{name: 'reply_time', mapping: 'reply_time', type: 'Y-m-d  G:i:s'},
			//	{name: 'collect_time', mapping: 'collect_time', type: 'Y-m-d  G:i:s'},
			//	{name: 'click_num',mapping: 'click_num', type: 'int'},
				{name: 'reply_num',mapping: 'reply_num', type: 'int'},
			//	{name: 'reply_num_add',mapping: 'reply_num_add', type: 'int'},
			//	{name: 'seed_id',mapping: 'seed_id', type: 'int'},
				{name: 'post_content',mapping: 'post_content'}
			//	'seg_title',
			//	'seg_content',
			//  {name: 'post_trend',mapping: 'post_trend', type: 'int'},
			//  {name: 'trend_flag',mapping: 'trend_flag', type: 'int'},
			//  {name: 'cluster_flag',mapping: 'cluster_flag', type: 'int'},
			//  {name: 'user_flag',mapping: 'user_flag', type: 'int'}
			//  {name: 'reply_num_add_user',mapping: 'reply_num_add_user', type: 'int'}
			]})
	});
    store.load({params:{start:0, limit:25, tid:config.tid}});// data load passing 3 params

    // URL title renders
    function renderTitle(value, p, record){
        return String.format(
            '<b><a href="{1}" target="_blank">{2}</a></b><br/>{3}',
            value, record.data.post_url, record.data.title, record.data.board_cname);
    }
	// Time title renders
	function renderTime(value, p, r){
        return String.format('{0}<br/>by {1}', value, r.data['author']);
    }

	// Window grid panel
    var grid = new Ext.grid.GridPanel({
        title:'突发事件详细信息',
        store: store,
        trackMouseOver:true,
        disableSelection:true,
        loadMask: true,
        // Grid columns
        columns:[//new Ext.grid.RowNumberer({width: 30}),
		{
            id: 'pid', 
            header: "标题",
            dataIndex: 'title',
            width: 420,
            renderer: renderTitle,
			menuDisabled : true,
            sortable: false
        },{
            header: "总回复数",
            dataIndex: 'reply_num',
            width: 70,
            align: 'right',
            sortable: true
        },{
            id: 'publish_time',
            header: "发帖时间",
            dataIndex: 'publish_time',
            width: 150,
            renderer: renderTime,
			menuDisabled : true,
            sortable: true
        }],
		
        // Customize view config
        viewConfig: {
            forceFit:true,
            enableRowBody:true,
            showPreview:true,
			// Select preview show
            getRowClass : function(record, rowIndex, p, store){
                if(this.showPreview){
                    p.body = '<br><p>'+record.data.post_content+'</p><br>';
                    return 'x-grid3-row-expanded';
                }
                return 'x-grid3-row-collapsed';
            }
        },

        // Paging bar on the bottom
        bbar: new Ext.PagingToolbar({
            pageSize: 25,
            store: store,
            displayInfo: true,
            items:['-', {
                pressed: true,
                enableToggle:true,
                text: '显示摘要',
				// cls: 'x-btn-text-icon details',
                toggleHandler: function(btn, pressed){
                    var view = grid.getView();
                    view.showPreview = pressed;
                    view.refresh();
                }
            }]
        })
    });
	
	// Load mask
	grid.on('afterrender',function(grid,event){ 
	    grid.getBottomToolbar().doRefresh();
	});

    // trigger the data store load
	config.add(grid);
};
};
