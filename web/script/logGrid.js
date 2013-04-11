/*!
 * Ext JS Library 3.3.0
 * Copyright(c) 2006-2010 Ext JS, Inc.
 * licensing@extjs.com
 * http://www.extjs.com/license
 */
logGrid=function(){
	this.init=function(config){
		//Ext.QuickTips.init();
		
		// for this demo configure local and remote urls for demo purposes
		
		//新增方法
		Ext.ux.grid.GridFilters.prototype.getFilterMenu=function (index) {
			return this.filters.items[index].menu;
		};
		var url = {
			local:  'grid-filter.json',  // static data file
			remote: 'php/getLog.php'
		};

		// configure whether filter query is encoded or not (initially)
		var encode = false;
		
		// configure whether filtering is performed locally or remotely (initially)
		var local = false;

		store = new Ext.data.JsonStore({
			// store configs
			autoDestroy: true,
			url: (local ? url.local : url.remote),
			remoteSort: false,
			sortInfo: {
				field: 'create_time',
				direction: 'DESC'
			},
			storeId: 'logStore',
			
			// reader configs
			idProperty: 'id',
			root: 'data',
			totalProperty: 'total',
			fields: [{
				name: 'id'
			}, {
				name: 'log'
			}, {
				name: 'create_time',
				type: 'date',
				dateFormat: 'Y-m-d H:i:s'
			}, {
				name: 'process_num'
			}]
		});

		var filters = new Ext.ux.grid.GridFilters({
			// encode and local configuration options defined previously for easier reuse
			encode: encode, // json encode the filter query
			local: local,   // defaults to false (remote filtering)
			filters: [{
				type: 'numeric',
				dataIndex: 'id'
			}, {
				type: 'string',
				dataIndex: 'log',
				disabled: true
			}, {
				type: 'date',
				dataIndex: 'create_time'
			}, {
				type: 'numeric',
				dataIndex: 'process_num'
			}]
		});    
		// use a factory method to reduce code while demonstrating
		// that the GridFilter plugin may be configured with or without
		// the filter types (the filters may be specified on the column model
		var createColModel = function (finish, start) {

			var columns = [new Ext.grid.RowNumberer({width: 30}),/*{
				dataIndex: 'id',
				header: 'ID',
				// instead of specifying filter config just specify filterable=true
				// to use store's field's type property (if type property not
				// explicitly specified in store config it will be 'auto' which
				// GridFilters will assume to be 'StringFilter'
				filterable: true
				//,filter: {type: 'numeric'}
			},*/ {
				dataIndex: 'log',
				header: '日志',
				id: 'company',
				filter: {
					type: 'string'
					// specify disabled to disable the filter menu
					//, disabled: true
				}
			}, {
				dataIndex: 'create_time',
				header: '创建日期',
				width: 200,
				renderer: Ext.util.Format.dateRenderer('m/d/Y H:i:s'),
				filter: {
					//type: 'date'     // specify type here or in store fields config
				}            
			}, {
				dataIndex: 'process_num',
				header: 'PID',
				filter: {
					type:'numeric'
					//type: 'boolean'  // specify type here or in store fields config
				}
			}];

			return new Ext.grid.ColumnModel({
				columns: columns.slice(start || 0, finish),
				defaults: {
					sortable: true
				}
			});
		};
		
		var grid = new Ext.grid.GridPanel({
			border: false,
			store: store,
			colModel: createColModel(4),
			loadMask: true,
			//enableHdMenu:false,
			//header:false,
			plugins: [filters],
			autoExpandColumn: 'company',
			/*viewConfig:{
				headersDisabled:true
			},*/
			bbar: new Ext.PagingToolbar({
				store: store,
				id:'pagingToolBar',
				pageSize: 20,
				plugins: [filters]
			}),
			listeners:{
				scope:this,
				rowclick:function(grid,row,e){
					var p=e.getPoint();
					var record=grid.getStore().getAt(row);
					if (Ext.getCmp('logDetailWindow')!=undefined)
						Ext.getCmp('logDetailWindow').destroy();
					new Ext.Window({
						title:'详细',
						id:'logDetailWindow',
						html:record.data.log,
						resizable:false,
						x:p.x,
						y:p.y
					}).show();
				},
				afterrender:function(){
					grid.getBottomToolbar().doRefresh();
				}
			}
		});
		
		grid.on('headercontextmenu',headerRClick);
		function headerRClick(grid,index,e){
			e.preventDefault();
			var menu=filters.getFilterMenu(index);
			menu.showAt(e.getXY());
		}

		// add some buttons to bottom toolbar just for demonstration purposes
		/*grid.getBottomToolbar().add([
			'-',{
				html:'每页显示'
			},' ',{
				xtype:'textfield',
				width:30,
				listeners:{
					afterrender:function(com){
						com.setValue(Ext.getCmp('pagingToolBar').pageSize);
					},
					change:function(com,newV,oldV){
						Ext.getCmp('pagingToolBar').pageSize=newV;
						Ext.getCmp('pagingToolBar').doRefresh();
					},
					scope:this
				}
			},{
				html:'项'
			},'->',
			{
				text: '清除筛选条件',
				icon:'images/refresh.gif',
				handler: function () {
					grid.filters.clearFilters();
				} 
			}
		]);*/

		var win = new Ext.Panel({
			title: '系统日志',
			id:'systemLog',
			//draggable:true,
			layout: 'fit',
			closable:true,
			items: grid
		});
		config.add(win);
	};
};