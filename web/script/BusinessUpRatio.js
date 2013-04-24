//Ext.QuickTips.init();  // @Mod
/**
 * @Copy BusinessUp.js
 */
BusinessUpRatio = function(){ 
	this.init=function(config){
		
	    var storeCompany = new Ext.data.ArrayStore({ // JsonStore({  // @test
//	    	root: 'data',  // @test
//			url:'PHP/BusinessUp.php', TODO
			totalProperty: 'total',
			fields: [
			     {name: 'usp_id', type: 'int'},
			     {name: 'name', type: 'string'}
			]
		});
	    var myDataCompany = [   // @test
	        [1, 'nuance'],
	        [2, 'ms']
	    ];
	    storeCompany.loadData(myDataCompany);
	    
	    var usp_id = '请选择公司';
	    var comboCompany = new Ext.form.ComboBox({    
            allowBlank : false,  //是否允许为空
            triggerAction : 'all',  //显示所有下列数.必须指定为'all'
            emptyText:'请选择类型...',   //没有默认值时,显示的字符串
            store: storeCompany,
            anchor : '90%',
            valueField:'usp_id',      // option.value
            typeAhead: true,
            displayField: 'name',      // option.text
            mode: 'local',	//!!!!!!!测试时用的是本地数据库
            selectOnFocus:true,
            width: 100,		
			//测试加入 取被用户选择词操作
			listeners: {
				scope: this,
				select: {
					fn:function(combo, record, index) {
						//alert("您选择的关注词是： "+record.get('name')+"， 请点击提交！" );	// w是在combo中定义的变量
						usp_id = record.get('usp_id');	// 取被用户选择词的ID
					}	
				}	
			}
        });
	    
	    var rangeType = '请选择查看时间的维度'
	    var comboRange = new Ext.form.ComboBox({    
            allowBlank : false,  //是否允许为空
            triggerAction : 'all',  //显示所有下列数.必须指定为'all'
            emptyText:'请选择时间维度...',   //没有默认值时,显示的字符串
            anchor : '90%',
            valueField:'kid',      // option.value
            typeAhead: true,
            displayField: 'time',      // option.text
            mode: 'local',	//!!!!!!!测试时用的是本地数据库
            selectOnFocus:true,
            width: 135,	
            store: new Ext.data.JsonStore({
    			fields: [ 'kid', 'time' ],		
//    			totalProperty:'total',
    			data:[
    				{ kid: 'm', kind: '按月查看'},
    				{ kid: 'w', kind: '按周查看'}
    			]
    		}),
			//测试加入 取被用户选择词操作
			listeners: {
				scope: this,
				select: {
					fn:function(combo, record, index) {
						//alert("您选择的关注词是： "+record.get('time')+"， 请点击提交！" );	// w是在combo中定义的变量
						rangeType = record.get('kid');	// 取被用户选择词
					}	
				}	
			}
        });	
	    // @data: one company's info.
	    var store = new Ext.data.ArrayStore({ // JsonStore({  // @test
//	    	root: 'data',  // @test
//			url:'PHP/BusinessUp.php', TODO
			totalProperty: 'total',
			fields: [
			     {name: 'usp_id', type: 'int'},
			     {name: 'index', type: 'date'},
			     {name: 'succ_orders', type: 'int'},
			     {name: 'succ_ratio', type: 'float'}
			]
		});
	    var mydata = [   // @test
	        [1, new Date(2013, 4, 21), 10, 0.8],
	        [2, new Date(2013, 4, 22), 20, 0.6]
	    ];
	    store.loadData(mydata);
	    
	    var grid = new Ext.grid.GridPanel({
	        width:600,
	        height:300,
	        frame:true,
	        title:'客户运单成功率',
			id:'BusinessUpRatio',
			closable:true,
			loadMask:true,  //loading...
	        trackMouseOver:true,//当鼠标移过行时，行是否要highlight stripeRows
			autoExpandColumn: 'BusinessUpRatio',
	        store: store,
	        columns: [ new Ext.grid.RowNumberer({width: 20}),{
	        	xtype: 'hidden',  // @debug 不显示 
	            id: 'BusinessUpRatio',
	            dataIndex: 'usp_id',
	            hidden: true
	        },{
	            header: "历史时间",
	            dataIndex: 'index',
	            width: 50,
//	            renderer: addSuffix,  // 添加显示方式：  第 几 周|月 
	            sortable:true
	        },{
	            header: "成功运单数",
	            dataIndex: 'succ_orders',
	            width: 50,
	            sortable:true
	        },{
	            header: "成功运单率",
	            dataIndex: 'succ_ratio',
	            width: 50,
	            sortable:true
	        }],
			tbar: [ '-',	
				{
					iconCls:'icon-user-add',
					text: '选择公司' 
				}, '-',	comboCompany, '-', 
				{ 
					iconCls:'icon-user-add',
					text: '查看时间的维度' 
				}, '-', comboRange, '-',
				{
					xtype: 'button',
					text:'提 交',
					width: 100,
					//columnWidth: .10,	
					loadMask: true, 	
				 	listeners:{
						scope:this,
						click:function(node,e){							
							var params={	start:0, limit:15 };	//被筛选表的数据读取量
							//params['filters[0][data][name]'] = 'usp_id';
							//params['filters[0][data][type]'] = 'int'; 
							params['filters[0][data][value]'] = usp_id;//grid.store.data.items[index].data.publish_time;//取INDEX所在行的时间
							params['filters[1][data][value]'] = rangeType;
							store.load({params:params});
						}
					}
				}, '-']
	    });
	
	    grid.on('rowclick', function(grid,rowIndex,event) { 
			record = grid.getStore().getAt(rowIndex);
		});
	    // @test
	    grid.on('beforerender', function(grid, event) {
			grid.setSource({'历史时间': '2013/4/20', '成功运单数': 100, '成功运单率': 0.34});
		});
	    
		config.add(grid);
		config.doLayout();

	};
};
