/**
 * @copy BusinessUpInfo.js & frame.js@L-127
 * @func display all worker&manager of this department. �ܾ���鿴ʱ��ʾ������˾��Ա����
 * @authority ���Ź�����Ա���ϵ��˿���
 */ 
Department=function() {
    this.init=function(config) {
    	
    	var staff_id = '';
    	var store = new Ext.data.ArrayStore({ // JsonStore({  // @test
//	    	root: 'data',  // @test
//			url:'PHP/BusinessDown.php', TODO
			totalProperty: 'total',
			id: 'Department', 
			fields:[
				{name: 'staff_id', type: 'int'},
				{name: 'name', type: 'string'},
				{name: 'phone', type: 'int'},
				{name: 'department', type: 'string'},
				{name: 'manager', type: 'string'},
				{name: 'desc', type: 'string'},
			],
			listeners: {
		        beforeload: function(store, operation, options){ 
		        	Ext.Ajax.request({
		    			url: 'php/getClientInfo.php',
		    			success: function(response){
		    				var obj=Ext.decode(response.responseText);
		    				staff_id=obj.userId;
		    				/*var log=obj.user+'ע��';
		    				Ext.Ajax.request({
		    					url: 'php/insertLog.php',
		    					params: {'log':log}
		    				});*/
		    			}
		        	})
		        }
			}
    	});
    	/*
    	var params={  };
    	params['filters[0][data][name]'] = 'usp_id';
		//params['filters[0][data][type]'] = 'int'; 
		params['filters[0][data][value]'] = usp_id;
    	store.load({params});
    	*/
    	var mydata = [   // @test
    	   	[1, 'zhou', 6228010, 'dev', 'zhoum', 'ȫ��ҳ��ɼ�']
    	];
    	store.loadData(mydata);
    	
		// main panel to display.
		var grid = new Ext.grid.GridPanel({   
		    title: '������Ϣ��ϸ',   
		    id: 'Department',
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
	            id: 'Department',
	            header: "����",
	            dataIndex: 'name',
	            width: 50,
	            sortable:false,
	            editor:new Ext.form.TextField({allowBlank: false})
	        }, {
	        	header: "�绰",
	            dataIndex: 'phone'
	        }, {
	        	header: "����",
	            dataIndex: 'department'
	        }, {
	        	header: "���Ų���Ȩ��",
	            dataIndex: 'desc'
	        }, {
	        	header: "����",
	            dataIndex: 'manager'
	        }])
	        // view: new Ext.ux.grid.BufferView({}),  // Ӱ��չʾЧ��
		    
		});  
		
		grid.on('rowclick', function(grid,rowIndex,event) { 
			record = grid.getStore().getAt(rowIndex);
		});

		// �����¼�beforeedit ����GridΪֻ��
//		grid.on("beforeedit", function(e){  
//		    e.cancel = true;  
//		    return false;  
//		}); 
		
		config.add(grid);	
		config.doLayout();
		
   };
 };