/*!
/*!
 * Ext JS Library 3.3.0
 * Copyright(c) 2006-2010 Ext JS, Inc.
 * licensing@extjs.com
 * http://www.extjs.com/license
 */
Ext.QuickTips.init();

TopTen=function(){
	this.init=function(config){
		// Create the Data Store
	    var store = new Ext.data.Store({
			url: 'php/top-ten.php',	//local php file
			// Data reader
			reader: new Ext.data.JsonReader({	
				root: 'rows',
				totalProperty: 'results',
				id: 'pid', 
				remoteSort: true,
				fields: [	// Data structure from pris_posts_topten
					{name: 'pid',mapping: 'pid', type: 'int'},
					{name: 'post_url', mapping: 'post_url'},
					{name: 'title', mapping: 'title'},
					{name: 'collect_time', mapping: 'collect_time', type: 'datetime'},
					{name: 'reply_num',mapping: 'reply_num', type: 'int'}
				]}
			)
		});
		store.load({
			params:{
					start:0,
					limit:25
			}
		});// data load passing 2 params

		// URL title renders
		function renderTitle(value,p,record){
			return String.format(
				'<b><a href="{1}"  target="_blank">{2}</a></b><br/>',
				value, record.data.post_url,record.data.title);
		}
	   
	    // Main grid panel
		var grid = new Ext.grid.GridPanel({
			//frame:true,
			title:'论坛十大热帖',
			trackMouseOver:true,
			closable:true,
			id:'TopTen',
			//autoExpandColumn: 'title',
			loadMask: true,
			//disableSelection:true,
			store: store,
			stripeRows: true,
			
			// Grid columns
			columns: [new Ext.grid.RowNumberer({width: 25}),{
				header: "标题",
				dataIndex: 'title',
				renderer:renderTitle,
				menuDisabled: true,
				width: 300,
				//align: 'left',
				sortable:false
			},{
				header: "回帖数",
				dataIndex: 'reply_num',
				width: 80,
				align: 'right',
				sortable:true
			},{
				header: "十大建立时间",
				dataIndex: 'collect_time',
				format: 'Y-m-d H:i:s',
				width: 150,
				align: 'center',
				sortable:true
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
				id: 'date_textField',
				//overCls:'x-btn button',
				text: new Date().format('Y-m-d')
			},'-',{// Date menu
				icon:'images/icons/clock.png',
				text:'选择时间',
				id:'top-tenMenu',
				menu: {items:[{
					xtype:'datepicker',// Date
					hidelabel:true,
					//labelSeparator:
					//clearCls:'',
					id:'date_picker',
					handler:refreshChart},{
					xtype:'timefield',// Time
					format:'H:i',
					increment: 60,
					emptyText:'---小时段选择---',
					id:'time_field',
					listeners:{
						scope:this,
						select:function(field,record,index){
							var date=Ext.getCmp('date_picker').getValue().format('Y-m-d');
							var params={
								start:0,limit:25
							};
							// Passing params to php&sql for time selecting
							params['filters[0][picker]']='time';// Date
							params['filters[0][data][type]']='date';// Type:date
							params['filters[0][data][value]']=date;// Format:Y-m-d
							params['filters[1][picker]']='time';// Time
							params['filters[1][data][type]']='date';// Type:hour
							params['filters[1][data][value]']=field.getValue().substring(0,2);// Format:H:i
							store.load({params:params});// Data load
							// Show the date on tbar
							Ext.getCmp('date_textField').setText(params['filters[0][data][value]']);
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
			// Passing params to php&sql for data selecting
			params['filters[0][picker]']='time';// Date
			params['filters[0][data][type]']='date';// Type:date
			params['filters[0][data][value]']=picker.getValue().format('Y-m-d');// Format:Y-m-d
			store.load({params:params});
			// Show the date on tbar
			Ext.getCmp('date_textField').setText(params['filters[0][data][value]']);
			Ext.getCmp('top-tenMenu').hideMenu();// Load date or time for each time by hidemenu
		}
		
		// Load mask
		grid.on('afterrender',function(grid,event){ 
				grid.getBottomToolbar().doRefresh();
		});
		config.add(grid);
	};
};
