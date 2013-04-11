/*!
 * Ext JS Library 3.3.0
 * Copyright(c) 2006-2010 Ext JS, Inc.
 * licensing@extjs.com
 * http://www.extjs.com/license
 */
Ext.QuickTips.init();

TopicDaily=function(){
	this.init=function(config){
		// Create the Data Store
	    var store = new Ext.data.Store({
			url: 'php/topic-daily.php',	//local php file
			// Data reader
			reader: new Ext.data.JsonReader({	
				root: 'rows',
				totalProperty: 'results',
				id: 'id', 
				fields: [	// Data structure from pris_topic_daily
					{name: 'id',mapping: 'id', type: 'int'},
					{name: 'topic_id',mapping: 'topic_id', type: 'int'},
					{name: 'key_words',mapping: 'key_words'},
					{name: 'document_number',mapping: 'document_number', type: 'int'},
					{name: 'reply_number',mapping: 'reply_number', type: 'int'},
					{name: 'day_attention',mapping: 'day_attention', type: 'double'},
			        {name: 'time', mapping: 'time', type: 'Y-m-d'},
			        {name: 'title', mapping: 'title'}
				]}
			)
		});
		store.load({
			params:{
					start:0,
					limit:25
				}
		});// data load passing 2 params

		// Main grid panel
		var grid = new Ext.grid.GridPanel({
			//frame:true,
			title:'每日热门话题统计',
			trackMouseOver:true,
			closable:true,
			id:'TopicDaily',
			//autoExpandColumn: 'title',
			loadMask: true,
			store: store,
			stripeRows: true,

			// Grid columns
			columns: [new Ext.grid.RowNumberer({width: 25}),{
				header: "话题关键词",
				dataIndex: 'key_words',
				menuDisabled : true,
				width: 200,
				align: 'left',
				sortable:false
			},{
				header: "总发帖数",
				dataIndex: 'document_number',
				width: 70,
				align: 'right',
				sortable:true
			},{
				header: "总回帖数",
				dataIndex: 'reply_number',
				width: 70,
				align: 'right',
				sortable:true
			},{
				header: "日关注度",
				dataIndex: 'day_attention',
				width: 70,
				align: 'right',
				sortable:true
			},{
				id: 'topic_id',
				header: "相关话题",
				dataIndex: 'title',
				width: 230,
				menuDisabled : true,
				sortable:false
			},{
			    xtype: 'actioncolumn',
				width: 30,
				fixed: true,
				menuDisabled : true,
				dataIndex: 'more',
                icon: 'images/icons/information.png',  // Use a URL in the icon config
                tooltip: '话题明细',
                handler: function(grid, rowIndex, colIndex) {
					var win;
					if(!win){
						win = new Ext.Window({						
							layout:'fit',
							width:650,
							height:500,
							tid:grid.store.data.items[rowIndex].data.topic_id,
							closeAction:'hide',
							plain: true,	//透明窗体
							plugins:[new TopicDWin()]
						});
					}
					win.show(this);                  
                }
			}],
			
			// Customize view config
			viewConfig: {
				forceFit:true,
				enableRowBody:true,
				showPreview:false  
			},
			
			// Top bar for date selecting
			tbar: [{
				xtype: 'tbfill'
			},{
				xtype: 'tbtext',
				id: 'datetext-field',
				//overCls:'x-btn button',
				text: new Date().format('Y-m-d')
			},'-',{// Date menu
				icon:'images/icons/calendar_view_day.png',
				text:'选择日期',
				menu:{
					xtype:'datemenu',
					id:'datamenu',
					handler:refreshChart
					}
			}],
			
			// Paging bar on the bottom
			bbar: new Ext.PagingToolbar({
				store: store,	//通过Store参数联系分页及远程排序操作，操作触发更新
				pageSize: 25,	//每页数据总数
				displayInfo:true
			})

		});
		
		// Refresh date
		function refreshChart(field,value){
			var params={
				start:0,limit:25
			};
			// Passing date params to php&sql for data selecting	
			params['filters[0][field]']='time';//过滤名
			params['filters[0][data][type]']='date';//数据类型为date
			params['filters[0][data][value]']=field.getValue().format('Y-m-d');//值格式化为Y-m-d形式
			store.load({params:params});
			// Show the date on tbar
			Ext.getCmp('datetext-field').setText(params['filters[0][data][value]']);
		}
		
		// Load mask
		grid.on('afterrender',function(grid,event){ 
	    	grid.getBottomToolbar().doRefresh();
		});
		config.add(grid);
	};
};
