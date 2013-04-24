/*
 * @Copy BaseInfo.js
 * 
 */
BusinessDownInfo=function() {
this.init=function(config) {
    	
    	var storeCompany = new Ext.data.ArrayStore({ // JsonStore({  // @test
//	    	root: 'data',  // @test
//			url:'PHP/BusinessUp.php', TODO
			totalProperty: 'total',
			fields: [
			     {name: 'dsp_id', type: 'int'},
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
            valueField:'dsp_id',      // option.value
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
						usp_id = record.get('dsp_id');	// 取被用户选择词的ID
					}	
				}	
			}
        });
	    
    	var store = new Ext.data.ArrayStore({ // JsonStore({  // @test
//	    	root: 'data',  // @test
//			url:'PHP/BusinessDown.php', TODO
			totalProperty: 'total',
			id: 'BusinessDownInfo', 
			fields:[
				{name: 'dsp_id', type: 'int'},
				{name: 'name', type: 'string'},
				{name: 'site', type: 'string'},
				{name: 'phone', type: 'int'},
				{name: 'fax', type: 'int'},
				{name: 'email', type: 'string'},
				{name: 'contact', type: 'string'},
				{name: 'cphone', type: 'int'},
				{name: 'manager', type: 'string'},
				{name: 'mphone', type: 'int'}
			]
    	});
    	var mydata = [   // @test
    	   	[1, 'nuance', 'beijing', 15211121222, 101, 'zhou@163.com', 'zhou', 102, 'li', 103]
    	];
    	store.loadData(mydata);
    	
		// main panel to display.
		var grid = new Ext.grid.PropertyGrid({   
		    title: '下游承运商信息明细',   
		    id: 'BusinessDownInfo',
		    closable:true,
		    //width: 300,   
		    height: 200,   
		    autoSort: false,
			loadMask: true,
			clicksToEdit: 2,
			frame: true,
			store: store,  // data store.
//		    columns: [ new Ext.grid.RowNumberer({width: 20}),
			cm: new Ext.grid.ColumnModel([
		    {
	            id: 'BusinessDownInfo',
	            header: "公司名",
	            dataIndex: 'name',
	            width: 50,
	            sortable:false,
	            editor:new Ext.form.TextField({allowBlank: false})
	        }, {
	        	header: "地址",
	            dataIndex: 'site'
	        }, {
	        	header: "电话",
	            dataIndex: 'phone'
	        }, {
	        	header: "传真",
	            dataIndex: 'fax'
	        }, {
	        	header: "邮箱",
	            dataIndex: 'email'
	        }, {
	        	header: "联系人",
	            dataIndex: 'contact'
	        }, {
	        	header: "联系电话",
	            dataIndex: 'cphone'
	        }, {
	        	header: "负责人",
	            dataIndex: 'manager'
	        }, {
	        	header: "负责人联系电话",
	            dataIndex: 'mphone'
	        }]),
	        // view: new Ext.ux.grid.BufferView({}),  // 影响展示效果
		    tbar: [
		    {
				iconCls:'icon-user-add',
				text: '公司' 
			}, '-',	comboCompany, '-', {
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
							store.load({params:params});
						}
					}
			}, '-'],
			bbar: [
			{
				iconCls:'icon-user-add',
				text:'保存客户信息(双击修改)',
				handler:function() {
					grid.stopEditing();
			        var value = record.data.value;
					var id = record.data.id;
					Ext.Ajax.request ({
						 url:'php/BusinessUpInfo.php',  // TODO BaseInfoUpdate.php
						 success:function(response) {
						 var json = Ext.decode(response.responseText);
						 if(json.success) {
								  Ext.Msg.alert('消息','修改成功',function() {
									     grid.getStore().reload();
								  });
						 }},
					     failure:function(){ Ext.Msg.alert('错误',"修改失败"); },
						 params:{id:id,value:value}
					});
			        grid.startEditing(0, 0);
				},
				scope:this
			}, '-']
		});  
		
		grid.on('rowclick', function(grid,rowIndex,event) { 
			record = grid.getStore().getAt(rowIndex);
		});
		grid.on('afterrender', function(grid,event) { 
//			grid.getBottomToolbar().doRefresh();
		});
		// @test 测试时装载本地的数据
		grid.on('beforerender', function(grid, event) {
			grid.setSource({'公司名': 'nuance', '地址': 'beijing', '电话': 15211121222,
		    	'传真':101 , '联系人': 'zhou', '联系电话': 102, '负责人': 'li', '负责人联系电话':103});
		});
		// 基于事件beforeedit 设置Grid为只读
//		grid.on("beforeedit", function(e){  
//		    e.cancel = true;  
//		    return false;  
//		}); 
		
		config.add(grid);	
		config.doLayout();
    };
    
 };