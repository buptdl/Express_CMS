 
// @Mod clusterGrid.js @Brief ���ø�����Ϣ,�ο� ���û�������ҳ�� userGrid.js ���Ӧ��PHP
BaseInfo=function() {
    this.init=function(config) {
    	
    	var pinfo= new Ext.data.JsonStore({
			url:'PHP/BaseInfo.php',  // TODO
			totalProperty:'total',
			//autoLoad: true,
			root: 'data',	//�����٣��������ݲ�����ʾ
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
				"����": pinfo.getAt(0).json.name, // name   
				"����": pinfo.getAt(0).json.age,   
				"����": pinfo.getAt(0).json.hometown,
//				"����": pinfo.getAt(0).json.salary,
				"�绰": pinfo.getAt(0).json.phone,
				"����": pinfo.getAt(0).json.email,
				"��ְʱ��": pinfo.getAt(0).json.entry_time,
//				"��ְʱ��": pinfo.getAt(0).json.leave_time,
				"���֤��": pinfo.getAt(0).json.IDnumber,
				"�Ա�": pinfo.getAt(0).json.sex,
				"����": pinfo.getAt(0).json.department,
				"ϵͳ�û���": pinfo.getAt(0).json.system_name
//				"����": pinfo.getAt(0).json.password
				};
			grid.setSource(source); // render latter.
    	}); 	
		pinfo.load({params:{start:0, limit: 10}});
		// main panel to display.
		var grid = new Ext.grid.PropertyGrid({   
		    title: "������Ϣ",   
		    id: 'BaseInfo',
		    closable:true,
		    //width: 300,   
		    height: 200,   
		    autoSort: false,
			loadMask: true,
			clicksToEdit: 2,
			store: pinfo,  // data store.
		    frame: true, 
			source: {   // pinfoΪ��ʱ��װ�ص�����
				"����": '����', // name   
				"����": 24,   
				"����": '�Ĵ��ɶ�',
//				"����": 2000,
				"�绰": 62280101,
				"����": 'yang@163.com',
				" ��ְʱ��": new Date(2012, 10, 29),
//				"��ְʱ��": new Date(2013, 10, 29),
				"���֤��": 020133382289234301,
				"�Ա�": '��',
				"����": '�ͷ���',
				"ϵͳ�û���": 'yang24'
//				"����": 'XXX'
			},
			bbar: [{
				iconCls:'icon-user-add',
				text:'���������Ϣ(˫���޸�)',
				handler:function() {
					grid.stopEditing();
			        var value = record.data.value;
					var id = record.data.id;
					Ext.Ajax.request ({
						 url:'php/BaseInfoUpdate.php',  // TODO department,system_name no-changable.
						 success:function(response) {
						 var json = Ext.decode(response.responseText);
						 if(json.success) {
								  Ext.Msg.alert('��Ϣ','�޸ĳɹ�',function() {
									     grid.getStore().reload();
								  });
						 }},
					     failure:function(){ Ext.Msg.alert('����',"�޸�ʧ��"); },
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
//		    new Ext.grid.RowNumberer({width:30}),   //��ʾ�к�
		    { header: 'staff_id', dataIndex: 'staff_id', hidden: true },
		    { header: '����', dataIndex: 'name', width:50, sortable: true },
			{ header: '����', dataIndex: 'age', width:50, sortable: true },
			{ header: '����', dataIndex: 'hometown', sortable: true },
			{ header: '�绰', dataIndex: 'phone', sortable: true },
			{ header: '����', dataIndex: 'email', sortable: true },
			{ header: '��ְʱ��', dataIndex: 'entry_time',sortable: true },
			{ header: '���֤��', dataIndex: 'IDnumber', width:50, sortable: true },
			{ header: '�Ա�', dataIndex: 'sex', width:50, sortable: true, 
				renderer: function(val){ if(val == 'm') return '��'; else return 'Ů';}},
			{ header: '��������', dataIndex: 'department', width:100, sortable: true },
			{ header: 'ϵͳ�û���', dataIndex: 'system_name', width:100, sortable: true }
//			{ header: '��¼����', dataIndex: 'password', width:50, sortable: true }
		]);
		var data = [
		    [1, '����', 24, '�Ĵ�', 62280001, 'y@163.com', new Date(2012, 1, 1),
		     0001, 'm', 'dev', 'admin']
		];
		var store = new Ext.data.Store({  // JsonStore({
			totalProperty: 'total',
			id: 'BaseInfo', 
		    proxy: new Ext.data.MemoryProxy(data),// �ڴ�, ��������
		    reader: new Ext.data.ArrayReader({}, [
		        {name: 'staff_id'},
		        {name: 'name', 
		        	editor: //new Ext.grid.GridEditor(
		        			new Ext.form.TextField({allowBlank: false}) //�����������ֵ
		        		//)
		        }, // mapping��������
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
			title: "������Ϣ",   
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
			tbar: new Ext.Toolbar(['-', {  //-��ʾ�˵��ָ���
		        text: '���һ��',
		        handler: function(){
		            var p = new MyRecord({ role:'', grade:'', createDate:new Date(2013,4,22)});
		            grid.stopEditing();  //�رձ��ı༭״̬
		            store.insert(0, p);  //������Record����store�ĵ�һ��
		            grid.startEditing(0, 0);  //�����һ�е�һ�еı༭״̬
		        }
		      }, '-', {
		        text: 'ɾ��һ��',
		        handler: function(){
		            Ext.Msg.confirm('��Ϣ', 'ȷ��Ҫɾ����', function(btn){
		                if (btn == 'yes') {
		                    var sm = grid.getSelectionModel();//����ѡ��ģ��
		                    var cell = sm.getSelectedCell();//ѡ�еĵ�Ԫ��
		                    var record = store.getAt(cell[0]);  //ͨ���кŵõ���һ�ж�Ӧ��Record
		                    store.remove(record);   //�Ƴ�����
		                }
		            });
		        }
		    }, '-', {
				text: '����',
				handler: function(){
				    var m = store.modified.slice(0); //���store���޸Ĺ�������
				    for (var i = 0; i < m.length; i++) {  //��֤�����Ϣ�Ƿ���ȷ���Ƿ�����ո�
				        var record = m[i];
				        var rowIndex = store.indexOfId(record.id);
				        var fields = record.fields.keys;
				        for (var j = 0; j < fields.length; j++) {
				            var name = fields[j];
				            var value = record.data[name];
				            var colIndex = cm.findColumnIndex(name);
				            var editor = cm.getCellEditor(colIndex).field;
				            if (!editor.validateValue(value)) {
				                Ext.Msg.alert('��ʾ', '��������������Ƿ���ȷ��', function(){
				                    grid.startEditing(rowIndex, colIndex);
				                });
				                return;
				            }
				        }
				    }
				    var jsonArray = [];
				    Ext.each(m, function(item) {
				        jsonArray.push(item.data);  //���޸Ĺ������ݷŵ�jsonArray��
				        Ext.Msg.alert('��Ϣ', item.data);
				    });
				    
				}
		    }, '-' ])
		    
		});
		// @test ����ʱװ�ر��ص�����
		grid.on('beforerender', function(grid, event) {
//			grid.setSource({'��˾':'nuance'});
		});
    	*/
		config.add(grid);	
   };
 };