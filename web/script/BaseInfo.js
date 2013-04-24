 
// @Mod clusterGrid.js @Brief 配置个人信息,参考 “用户管理”的页面 userGrid.js 与对应的PHP
BaseInfo=function() {
    this.init=function(config) {
    	
    	var pinfo= new Ext.data.JsonStore({
			url:'PHP/BaseInfo.php',  // TODO
			totalProperty:'total',
			//autoLoad: true,
			root: 'data',	//不可少，否则数据不能显示
			fields:[{id:'name' , name: 'name' },
					{ name: 'age' },
					{ name: 'hometown' },
//					{ name: 'salary' },
					'phone', 'email', 'entry_time',
//					'leave_time',
					'IDnumber', 'sex', 'department', 'system_name', 'password' 
					]
    	});
    	// Appends an event handler. 'load':Fires after a new set of Records has been loaded. 
    	pinfo.on('load', function(pinfo, event){	
//			name=pinfo.getAt(0).json.name;
			var source={   
				"姓名": pinfo.getAt(0).json.name, // name   
				"年龄": pinfo.getAt(0).json.age,   
				"籍贯": pinfo.getAt(0).json.hometown,
//				"工资": pinfo.getAt(0).json.salary,
				"电话": pinfo.getAt(0).json.phone,
				"邮箱": pinfo.getAt(0).json.email,
				"入职时间": pinfo.getAt(0).json.entry_time,
//				"离职时间": pinfo.getAt(0).json.leave_time,
				"身份证号": pinfo.getAt(0).json.IDnumber,
				"性别": pinfo.getAt(0).json.sex,
				"部门": pinfo.getAt(0).json.department,
				"系统用户名": pinfo.getAt(0).json.system_name
//				"密码": pinfo.getAt(0).json.password
				};
			grid.setSource(source); // render latter.
    	}); 	
		pinfo.load({params:{start:0, limit: 10}});
		// main panel to display.
		var grid = new Ext.grid.PropertyGrid({   
		    title: "个人信息",   
		    id: 'BaseInfo',
		    closable:true,
		    //width: 300,   
		    height: 200,   
		    autoSort: false,
			loadMask: true,
			clicksToEdit: 2,
			store: pinfo,  // data store.
		    frame: true, 
			source: {   // pinfo为空时，装载的数据
				"姓名": '杨鹏', // name   
				"年龄": 24,   
				"籍贯": '四川成都',
//				"工资": 2000,
				"电话": 62280101,
				"邮箱": 'yang@163.com',
				" 入职时间": new Date(2012, 10, 29),
//				"离职时间": new Date(2013, 10, 29),
				"身份证号": 020133382289234301,
				"性别": '男',
				"部门": '客服部',
				"系统用户名": 'yang24'
//				"密码": 'XXX'
			},
			bbar: [{
				iconCls:'icon-user-add',
				text:'保存个人信息(双击修改)',
				handler:function() {
					grid.stopEditing();
			        var value = record.data.value;
					var id = record.data.id;
					Ext.Ajax.request ({
						 url:'php/BaseInfoUpdate.php',  // TODO department,system_name no-changable.
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
			}]
		});  
		grid.on('rowclick',function(grid,rowIndex,event) { 
			record = grid.getStore().getAt(rowIndex);
		});
		grid.on('afterrender',function(grid,event) { 
//			grid.getBottomToolbar().doRefresh();
		});
		
///////////////////////////////////////////////////////////////////////////////
    	/*
		var cm = new Ext.grid.ColumnModel([
//		    new Ext.grid.RowNumberer({width:30}),   //显示行号
		    { header: 'staff_id', dataIndex: 'staff_id', hidden: true },
		    { header: '姓名', dataIndex: 'name', width:50, sortable: true },
			{ header: '年龄', dataIndex: 'age', width:50, sortable: true },
			{ header: '籍贯', dataIndex: 'hometown', sortable: true },
			{ header: '电话', dataIndex: 'phone', sortable: true },
			{ header: '邮箱', dataIndex: 'email', sortable: true },
			{ header: '入职时间', dataIndex: 'entry_time',sortable: true },
			{ header: '身份证号', dataIndex: 'IDnumber', width:50, sortable: true },
			{ header: '性别', dataIndex: 'sex', width:50, sortable: true, 
				renderer: function(val){ if(val == 'm') return '男'; else return '女';}},
			{ header: '所属部门', dataIndex: 'department', width:100, sortable: true },
			{ header: '系统用户名', dataIndex: 'system_name', width:100, sortable: true }
//			{ header: '登录密码', dataIndex: 'password', width:50, sortable: true }
		]);
		var data = [
		    [1, '杨鹏', 24, '四川', 62280001, 'y@163.com', new Date(2012, 1, 1),
		     0001, 'm', 'dev', 'admin']
		];
		var store = new Ext.data.Store({  // JsonStore({
			totalProperty: 'total',
			id: 'BaseInfo', 
		    proxy: new Ext.data.MemoryProxy(data),// 内存, 本地数据
		    reader: new Ext.data.ArrayReader({}, [
		        {name: 'staff_id'},
		        {name: 'name', 
		        	editor: //new Ext.grid.GridEditor(
		        			new Ext.form.TextField({allowBlank: false}) //不允许输入空值
		        		//)
		        }, // mapping设置列序
		        {name: 'age', type: 'int' }, {name: 'hometown' },
		        {name: 'phone' }, {name: 'email' },
		        {name: 'entry_time', type: 'date', dataFormat: 'Y-m-d' }, 
		        {name: 'IDnumber' },
		        {name: 'sex'}, {name: 'department' },
		        {name: 'system_name' }
		    ]),
		});
		store.load();
		var grid = new Ext.grid.PropertyGrid({ // GridPanel({ //  EditorGridPanel({// 
			title: "个人信息",   
		    id: 'BaseInfo',
		    closable:true,
		    //width: 300,   
		    height: 200,   
		    autoSort: false,
			loadMask: true,
			clicksToEdit: 2,
			store: store,  // data store.
		    frame: true, 
			cm: cm
			/*
			tbar: new Ext.Toolbar(['-', {  //-表示菜单分隔符
		        text: '添加一行',
		        handler: function(){
		            var p = new MyRecord({ role:'', grade:'', createDate:new Date(2013,4,22)});
		            grid.stopEditing();  //关闭表格的编辑状态
		            store.insert(0, p);  //创建的Record插入store的第一行
		            grid.startEditing(0, 0);  //激活第一行第一列的编辑状态
		        }
		      }, '-', {
		        text: '删除一行',
		        handler: function(){
		            Ext.Msg.confirm('信息', '确定要删除？', function(btn){
		                if (btn == 'yes') {
		                    var sm = grid.getSelectionModel();//表格的选择模型
		                    var cell = sm.getSelectedCell();//选中的单元格
		                    var record = store.getAt(cell[0]);  //通过行号得到这一行对应的Record
		                    store.remove(record);   //移除数据
		                }
		            });
		        }
		    }, '-', {
				text: '保存',
				handler: function(){
				    var m = store.modified.slice(0); //获得store中修改过得数据
				    for (var i = 0; i < m.length; i++) {  //验证表格信息是否正确，是否包含空格
				        var record = m[i];
				        var rowIndex = store.indexOfId(record.id);
				        var fields = record.fields.keys;
				        for (var j = 0; j < fields.length; j++) {
				            var name = fields[j];
				            var value = record.data[name];
				            var colIndex = cm.findColumnIndex(name);
				            var editor = cm.getCellEditor(colIndex).field;
				            if (!editor.validateValue(value)) {
				                Ext.Msg.alert('提示', '请检查输入的数据是否正确！', function(){
				                    grid.startEditing(rowIndex, colIndex);
				                });
				                return;
				            }
				        }
				    }
				    var jsonArray = [];
				    Ext.each(m, function(item) {
				        jsonArray.push(item.data);  //把修改过得数据放到jsonArray中
				        Ext.Msg.alert('信息', item.data);
				    });
				    
				}
		    }, '-' ])
		    
		});
		// @test 测试时装载本地的数据
		grid.on('beforerender', function(grid, event) {
//			grid.setSource({'公司':'nuance'});
		});
    	*/
		config.add(grid);	
   };
 };