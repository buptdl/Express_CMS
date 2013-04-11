exBriefReport=function(){
	this.init=function(config){
		function gridTemplate(config){//config parameter:url,doFilter,doPaging,header,height,renderer
			Ext.apply(this,config);
			this.store=new Ext.data.JsonStore({
				// store configs
				autoDestroy: true,
				url:this.url,
				remoteSort: true,
							
				// reader configs
				root: 'data',
				totalProperty: 'total',
				fields: [{
					name: 'path'
				},{
					name:'date',
					type: 'date',
					dateFormat: 'Y-m-d'
				}]
			});
			this.filters = this.doFilter?new Ext.ux.grid.GridFilters({
			// encode and local configuration options defined previously for easier reuse
				encode: true, // json encode the filter query
				local: false,   // defaults to false (remote filtering)
				filters: [{
					type: 'string',
					dataIndex: 'path'
				},{
					type: 'date',
					dataIndex: 'date'
				}]
			}):null;
			this.pagingBar=this.doPaging?new Ext.PagingToolbar({
				store: this.store,
				pageSize: 20,
				plugins: [this.filters]
			}):null;
			this.defaultConfig={
				height:this.height,
				border:true,
				store:this.store,
				columns:[{
					id:'report',
					header:this.header,
					sortable:true,
					dataIndex:'path',
					renderer:this.renderer
				}],
				loadMask: true,
				//plugins: [this.filters],
				autoExpandColumn: 'report',
				//bbar:this.pagingBar,
				listeners:{
					scope:this,
					rowclick:function(grid,row,e){
						//
					},
					afterrender:function(){
						this.store.load({
							params:{
								start:0,
								limit:1000
							}
						})
					}
				}
			};
			if(this.doFilter)
				Ext.apply(this.defaultConfig,{plugins: [this.filters]});
			if(this.doPaging)
				Ext.apply(this.defaultConfig,{bbar:this.pagingBar});
			this.getInstance=function(){
				return new Ext.grid.GridPanel(this.defaultConfig);
			};
		}
		
		var dayPanel=new gridTemplate({
			url:'php/dayBriefReport.php',
			doFilter:false,
			doPaging:false,
			height:480,
			header:'日报',
			renderer:function(value,metadata,record){
				var rec=record.get('date');
				return '<a href="'+value+'" target="_blank">'+record.get('date').format('Y/m/d')+'</a>';
			}
		});
		var weekPanel=new gridTemplate({
			url:'php/weekBriefReport.php',
			doFilter:false,
			doPaging:false,
			height:300,
			header:'周报',
			renderer:function(value,metadata,record){
				var rec=record.get('date');
				return '<a href="'+value+'" target="_blank">'+record.get('date').format('Y/m/d')+'</a>';
			}
		});
		var monthPanel=new gridTemplate({
			url:'php/monthBriefReport.php',
			doFilter:false,
			doPaging:false,
			height:160,
			header:'月报',
			renderer:function(value,metadata,record){
				var rec=record.get('date');
				return '<a href="'+value+'" target="_blank">'+record.get('date').format('Y/m')+'</a>';
			}
		});
		var p=new Ext.Panel({
			title:'舆情简报',
			id:'exBriefReport',
			closable:true,
			autoScroll:true,
			layout:'column',
			/*layoutConfig:{
				columns:3
			},*/
			defaults: {
				bodyStyle:'padding:10px 10px'
			}, 
			items:[{
				columnWidth:.5,
				border:false,
				items:[dayPanel.getInstance()]
			},{
				columnWidth:.5,
				border:false,
				items:[weekPanel.getInstance(),
					{height:20,border:false},
					monthPanel.getInstance()]
			}]
		});
		config.add(p);
	};
};