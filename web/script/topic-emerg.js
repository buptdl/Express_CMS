/*!
 * Ext JS Library 3.3.0
 * Copyright(c) 2006-2010 Ext JS, Inc.
 * licensing@extjs.com
 * http://www.extjs.com/license
 */
Ext.QuickTips.init();

TopicEmerg=function(){
	this.init=function(config){
		// Create the Data Store
	    var store = new Ext.data.Store({
			url: 'php/topic-emerg.php',	//local php file
			// Data reader
			reader: new Ext.data.JsonReader({	
				root: 'rows',
				totalProperty: 'results',
				id: 'id', 
				fields: [	// Data structure from pris_topic_emergency
					{name: 'id',mapping: 'id', type: 'int'},
					{name: 'topic_id',mapping: 'topic_id', type: 'int'},
					{name: 'key_words',mapping: 'key_words'},
			        {name: 'topic_start_time', mapping: 'topic_start_time', type: 'datetime'},
					{name: 'document_number',mapping: 'document_number', type: 'int'},
					{name: 'reply_number',mapping: 'reply_number', type: 'int'},
					{name: 'attention',mapping: 'attention', type: 'double'},
			        {name: 'time', mapping: 'time', type: 'datetime'},
					{name: 'title', mapping: 'title'},
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
			title:'ͻ���¼�ͳ��',
			trackMouseOver:true,
			closable:true,
			id:'TopicEmerg',
			//autoExpandColumn: 'title',
			loadMask: true,
			store: store,
			stripeRows: true,

			// Grid columns
			columns: [new Ext.grid.RowNumberer({width: 25}),{
				header: "����ؼ���",
				dataIndex: 'key_words',
				menuDisabled : true,
				width: 150,
				align: 'left',
				sortable:false
			},{
				header: "�ܷ�����",
				dataIndex: 'document_number',
				width: 60,
				align: 'right',
				sortable:true
			},{
				header: "�ܻ�����",
				dataIndex: 'reply_number',
				width: 60,
				align: 'right',
				sortable:true
			},{
				header: "�ۼƹ�ע��",
				dataIndex: 'attention',
				width: 60,
				align: 'right',
				sortable:true
			},{
				header: "���⽨��ʱ��",
				dataIndex: 'topic_start_time',
				width: 90,
				align: 'right',
				sortable:true
			},{
				//id: 'topic_id',
				header: "��ػ���",
				dataIndex: 'title',
				width: 215,
				menuDisabled : true,
				sortable:false
			},{
			    xtype: 'actioncolumn',
				width: 30,
				fixed: true,
				menuDisabled : true,
				dataIndex: 'more',
                icon: 'images/icons/information.png',  // Use a URL in the icon config
                tooltip: '������ϸ',
                handler: function(grid, rowIndex, colIndex) {
					var win;
					if(!win){
						win = new Ext.Window({
							layout:'fit',
							width:650,
							height:500,
							tid:grid.store.data.items[rowIndex].data.topic_id,
							closeAction:'hide',
							plain: true,	//͸������
							plugins:[new TopicEWin()]
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
				id: 'date-text-field',
				//overCls:'x-btn button',
				text: new Date().format('Y-m-d')
			},'-',{// Date menu
				icon:'images/icons/calendar_view_day.png',
				text:'ѡ������',
				menu:{
					xtype:'datemenu',
					id:'datamenu',
					handler:refreshChart
				}
			}],
			
			// Paging bar on the bottom
			bbar: new Ext.PagingToolbar({
				store: store,	//ͨ��Store������ϵ��ҳ��Զ�����������������������
				pageSize: 25,	//ÿҳ��������
				displayInfo:true
			})

		});
		
		// Refresh date
		function refreshChart(field,value){
			var params={
				start:0,limit:25
			};
			// Passing params to php&sql for data selecting	
			params['filters[0][field]']='time';// Date
			params['filters[0][data][type]']='date';// Type:date
			params['filters[0][data][value]']=field.getValue().format('Y-m-d');// Format:Y-m-d
			store.load({params:params});
				
			Ext.getCmp('date-text-field').setText(params['filters[0][data][value]']);// Set date to textfield
		}
		
		// Load mask
		grid.on('afterrender',function(grid,event){ 
	    	grid.getBottomToolbar().doRefresh();
		});
		config.add(grid);
	};
};
