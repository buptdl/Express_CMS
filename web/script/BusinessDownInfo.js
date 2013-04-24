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
	    
	    var usp_id = '��ѡ��˾';
	    var comboCompany = new Ext.form.ComboBox({    
            allowBlank : false,  //�Ƿ�����Ϊ��
            triggerAction : 'all',  //��ʾ����������.����ָ��Ϊ'all'
            emptyText:'��ѡ������...',   //û��Ĭ��ֵʱ,��ʾ���ַ���
            store: storeCompany,
            anchor : '90%',
            valueField:'dsp_id',      // option.value
            typeAhead: true,
            displayField: 'name',      // option.text
            mode: 'local',	//!!!!!!!����ʱ�õ��Ǳ������ݿ�
            selectOnFocus:true,
            width: 100,		
			//���Լ��� ȡ���û�ѡ��ʲ���
			listeners: {
				scope: this,
				select: {
					fn:function(combo, record, index) {
						//alert("��ѡ��Ĺ�ע���ǣ� "+record.get('name')+"�� �����ύ��" );	// w����combo�ж���ı���
						usp_id = record.get('dsp_id');	// ȡ���û�ѡ��ʵ�ID
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
		    title: '���γ�������Ϣ��ϸ',   
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
	            header: "��˾��",
	            dataIndex: 'name',
	            width: 50,
	            sortable:false,
	            editor:new Ext.form.TextField({allowBlank: false})
	        }, {
	        	header: "��ַ",
	            dataIndex: 'site'
	        }, {
	        	header: "�绰",
	            dataIndex: 'phone'
	        }, {
	        	header: "����",
	            dataIndex: 'fax'
	        }, {
	        	header: "����",
	            dataIndex: 'email'
	        }, {
	        	header: "��ϵ��",
	            dataIndex: 'contact'
	        }, {
	        	header: "��ϵ�绰",
	            dataIndex: 'cphone'
	        }, {
	        	header: "������",
	            dataIndex: 'manager'
	        }, {
	        	header: "��������ϵ�绰",
	            dataIndex: 'mphone'
	        }]),
	        // view: new Ext.ux.grid.BufferView({}),  // Ӱ��չʾЧ��
		    tbar: [
		    {
				iconCls:'icon-user-add',
				text: '��˾' 
			}, '-',	comboCompany, '-', {
					xtype: 'button',
					text:'�� ��',
					width: 100,
					//columnWidth: .10,	
					loadMask: true, 	
				 	listeners:{
						scope:this,
						click:function(node,e){							
							var params={	start:0, limit:15 };	//��ɸѡ������ݶ�ȡ��
							//params['filters[0][data][name]'] = 'usp_id';
							//params['filters[0][data][type]'] = 'int'; 
							params['filters[0][data][value]'] = usp_id;//grid.store.data.items[index].data.publish_time;//ȡINDEX�����е�ʱ��
							store.load({params:params});
						}
					}
			}, '-'],
			bbar: [
			{
				iconCls:'icon-user-add',
				text:'����ͻ���Ϣ(˫���޸�)',
				handler:function() {
					grid.stopEditing();
			        var value = record.data.value;
					var id = record.data.id;
					Ext.Ajax.request ({
						 url:'php/BusinessUpInfo.php',  // TODO BaseInfoUpdate.php
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
			}, '-']
		});  
		
		grid.on('rowclick', function(grid,rowIndex,event) { 
			record = grid.getStore().getAt(rowIndex);
		});
		grid.on('afterrender', function(grid,event) { 
//			grid.getBottomToolbar().doRefresh();
		});
		// @test ����ʱװ�ر��ص�����
		grid.on('beforerender', function(grid, event) {
			grid.setSource({'��˾��': 'nuance', '��ַ': 'beijing', '�绰': 15211121222,
		    	'����':101 , '��ϵ��': 'zhou', '��ϵ�绰': 102, '������': 'li', '��������ϵ�绰':103});
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