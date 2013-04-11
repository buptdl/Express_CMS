/*!
/*!
 * Ext JS Library 3.3.0
 * Copyright(c) 2006-2010 Ext JS, Inc.
 * licensing@extjs.com
 * http://www.extjs.com/license
 */
Ext.QuickTips.init();

TopicHours=function(){
	this.init=function(config){
		// Create the Data Store
	    var store = new Ext.data.Store({
			url: 'php/topic-hours.php', //local php file
			// Data reader
			reader: new Ext.data.JsonReader({	
				root: 'rows',
				totalProperty: 'results',
				id: 'id', 
				remoteSort: true,
				fields: [	// Data structure from pris_topic_hours
					{name: 'id',mapping: 'id', type: 'int'},
					{name: 'topic_id',mapping: 'topic_id', type: 'int'},
					{name: 'key_words',mapping: 'key_words'},
					{name: 'document_number',mapping: 'document_number', type: 'int'},
					{name: 'reply_number',mapping: 'reply_number', type: 'int'},
					{name: 'hour_attention',mapping: 'hour_attention', type: 'double'},
			        {name: 'time', mapping: 'time', type: 'datetime'},
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
			title:'小时热门话题统计',
			trackMouseOver:true,
			closable:true,
			id:'TopicHours',
			//autoExpandColumn: 'title',
			loadMask: true,
			//disableSelection:true,
			store: store,
			stripeRows: true,

			// Grid columns
			columns: [new Ext.grid.RowNumberer({width: 25}),{
				header: "话题关键词",
				dataIndex: 'key_words',
				menuDisabled: true,
				width: 170,
				align: 'left',
				sortable:false
			},{
				header: "总发帖数",
				dataIndex: 'document_number',
				width: 60,
				align: 'right',
				sortable:true
			},{
				header: "总回帖数",
				dataIndex: 'reply_number',
				width: 60,
				align: 'right',
				sortable:true
			},{
				header: "小时关注度",
				dataIndex: 'hour_attention',
				width: 60,
				align: 'right',
				sortable:true
			},{
				header: "话题建立时间",
				dataIndex: 'time',
				renderer:function(value){// Pick up hour string
					return value.substring(11,19);
				},
				width: 70,
				align: 'right',
				sortable:true
			},{
				id: 'topic_id',
				header: "相关话题",
				dataIndex: 'title',
				width: 215,
				menuDisabled : true,
				sortable:false
			},{
			    xtype: 'actioncolumn',
				width: 30,
				fixed: true,
				menuDisabled: true,
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
							plugins:[new TopicHWin()]
						});
					}
					win.show(this);
                }
			}],
			
			// Customize view config
			viewConfig:{
				forceFit:true,
				enableRowBody:true,
				showPreview:false  
			},
			
			// Top bar for date selecting
			tbar: [{
				xtype: 'tbfill'
			},{
				xtype: 'tbtext',
				id: 'datetextField',
				//overCls:'x-btn button',
				text: new Date().format('Y-m-d')
			},'-',{// Date menu
				icon:'images/icons/clock.png',
				text:'选择时间',
				id:'topic-hoursMenu',
				menu: {items:[{// Date menu
					xtype:'datepicker',
					hidelabel:true,
					//labelSeparator:
					//clearCls:'',
					id:'datepicker',
					handler:refreshChart},{// Hour menu
					xtype:'timefield',
					format:'H:i',
					increment: 60,
					emptyText:'--小时段选择--',
					id:'timefield',
					listeners:{// Passing date&hour data to php&sql
						scope:this,
						select:function(field,record,index){
							var date=Ext.getCmp('datepicker').getValue().format('Y-m-d');
							var params={
								start:0,limit:25
							};
							params['filters[0][picker]']='time';// Date
							params['filters[0][data][type]']='date';// Type:date
							params['filters[0][data][value]']=date;// Format:Y-m-d
							params['filters[1][picker]']='time';// Hour
							params['filters[1][data][type]']='date';// Type:string
							params['filters[1][data][value]']=field.getValue().substring(0,2);// Format:H(:i)					
							store.load({params:params});
							// Show the date on tbar
							Ext.getCmp('datetextField').setText(params['filters[0][data][value]']);
						}
					}}]
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
		function refreshChart(picker,value){
			var params={
				start:0,limit:25
			};
			// Passing date params to php&sql for data selecting	
			params['filters[0][picker]']='time';// Date
			params['filters[0][data][type]']='date';// Type:date
			params['filters[0][data][value]']=picker.getValue().format('Y-m-d');// Format:Y-m-d
			store.load({params:params});
			Ext.getCmp('datetextField').setText(params['filters[0][data][value]']);
			Ext.getCmp('topic-hoursMenu').hideMenu();
		}
		
		// Load mask
		grid.on('afterrender',function(grid,event){ 
			grid.getBottomToolbar().doRefresh();
		});
		config.add(grid);
	};
};
