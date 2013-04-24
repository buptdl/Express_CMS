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
	    
	    var usp_id = '��ѡ��˾';
	    var comboCompany = new Ext.form.ComboBox({    
            allowBlank : false,  //�Ƿ�����Ϊ��
            triggerAction : 'all',  //��ʾ����������.����ָ��Ϊ'all'
            emptyText:'��ѡ������...',   //û��Ĭ��ֵʱ,��ʾ���ַ���
            store: storeCompany,
            anchor : '90%',
            valueField:'usp_id',      // option.value
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
						usp_id = record.get('usp_id');	// ȡ���û�ѡ��ʵ�ID
					}	
				}	
			}
        });
	    
	    var rangeType = '��ѡ��鿴ʱ���ά��'
	    var comboRange = new Ext.form.ComboBox({    
            allowBlank : false,  //�Ƿ�����Ϊ��
            triggerAction : 'all',  //��ʾ����������.����ָ��Ϊ'all'
            emptyText:'��ѡ��ʱ��ά��...',   //û��Ĭ��ֵʱ,��ʾ���ַ���
            anchor : '90%',
            valueField:'kid',      // option.value
            typeAhead: true,
            displayField: 'time',      // option.text
            mode: 'local',	//!!!!!!!����ʱ�õ��Ǳ������ݿ�
            selectOnFocus:true,
            width: 135,	
            store: new Ext.data.JsonStore({
    			fields: [ 'kid', 'time' ],		
//    			totalProperty:'total',
    			data:[
    				{ kid: 'm', kind: '���²鿴'},
    				{ kid: 'w', kind: '���ܲ鿴'}
    			]
    		}),
			//���Լ��� ȡ���û�ѡ��ʲ���
			listeners: {
				scope: this,
				select: {
					fn:function(combo, record, index) {
						//alert("��ѡ��Ĺ�ע���ǣ� "+record.get('time')+"�� �����ύ��" );	// w����combo�ж���ı���
						rangeType = record.get('kid');	// ȡ���û�ѡ���
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
	        title:'�ͻ��˵��ɹ���',
			id:'BusinessUpRatio',
			closable:true,
			loadMask:true,  //loading...
	        trackMouseOver:true,//������ƹ���ʱ�����Ƿ�Ҫhighlight stripeRows
			autoExpandColumn: 'BusinessUpRatio',
	        store: store,
	        columns: [ new Ext.grid.RowNumberer({width: 20}),{
	        	xtype: 'hidden',  // @debug ����ʾ 
	            id: 'BusinessUpRatio',
	            dataIndex: 'usp_id',
	            hidden: true
	        },{
	            header: "��ʷʱ��",
	            dataIndex: 'index',
	            width: 50,
//	            renderer: addSuffix,  // �����ʾ��ʽ��  �� �� ��|�� 
	            sortable:true
	        },{
	            header: "�ɹ��˵���",
	            dataIndex: 'succ_orders',
	            width: 50,
	            sortable:true
	        },{
	            header: "�ɹ��˵���",
	            dataIndex: 'succ_ratio',
	            width: 50,
	            sortable:true
	        }],
			tbar: [ '-',	
				{
					iconCls:'icon-user-add',
					text: 'ѡ��˾' 
				}, '-',	comboCompany, '-', 
				{ 
					iconCls:'icon-user-add',
					text: '�鿴ʱ���ά��' 
				}, '-', comboRange, '-',
				{
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
			grid.setSource({'��ʷʱ��': '2013/4/20', '�ɹ��˵���': 100, '�ɹ��˵���': 0.34});
		});
	    
		config.add(grid);
		config.doLayout();

	};
};
