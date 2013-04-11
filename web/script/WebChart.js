WebChart=function(){
	this.init=function(config){
		var w= "";	//���汻�û�ѡ��Ĵ�
		var store= new Ext.data.JsonStore({
			url:'PHP/WebWord.php',
			// idIndex: 0, // ÿ����¼��id�����ǵ�һ��Ԫ��
			root:'data',
			totalProperty:'total',
			fields:[{ name: 'id'},
					{ name: 'word', type: 'char'}
				]
		});
/*		store.load({
			params:{
				start:0,
				limit:10000	//Ĭ���������дʵ����Ϊ10000
			}
		});
*/		
		var storeList = new Ext.form.ComboBox({    
			//fieldLabel : '���д�',  //UI��ǩ���ƣ�������û����ʾ������������
			name : 'identity',   //��Ϊform�ύʱ���͵Ĳ�����
            allowBlank : false,  //�Ƿ�����Ϊ��
            //readOnly : true,     //�Ƿ�ֻ��,�����У�������������������
            triggerAction : 'all',  //��ʾ����������.����ָ��Ϊ'all'
            anchor : '90%',
            emptyText:'��ѡ��...',   //û��Ĭ��ֵʱ,��ʾ���ַ���
            store: store,	
            valueField:'id',      // option.value
            typeAhead: true,
            displayField: 'word',      // option.text
            mode: 'local',	//!!!!!!!����ʱ�õ��Ǳ������ݿ�
            selectOnFocus:true,
            width: 135,			
			listeners: {
				scope: this,
				select: {
					fn:function(combo,record,index) {
						//alert("��ѡ��ļ��Ӵ��ǣ� "+record.get('word')+"�� ��ѡ��������" );	// w����combo�ж���ı���
						w= record.get('id');	// ȡ���û�ѡ���
						//���Խ���һ��������
					}	}	
			}
        });	
		var kindData= new Ext.data.JsonStore({
			fields: [ 'kid', 'kind' ],		
			totalProperty:'total',
			data:[
				{ kid: '1', kind: '����'},
				{ kid: '2', kind: '�Ƿ�'},
				{ kid: '3', kind: '����'}
			]
		});

		var k= "";	//�����û�ѡ������
		var wordKind= new Ext.form.ComboBox({
			text : '�� ��',  //UI��ǩ���ƣ�������û����ʾ������������
			//name : 'identity',   //��Ϊform�ύʱ���͵Ĳ�����
            allowBlank : false,  //�Ƿ�����Ϊ��
            //readOnly : true,     //�Ƿ�ֻ��,�����У�������������������
            triggerAction : 'all',  //��ʾ����������.����ָ��Ϊ'all'
            emptyText:'��ѡ������...',   //û��Ĭ��ֵʱ,��ʾ���ַ���
            store:  kindData,
            valueField:'kid',      // option.value
            typeAhead: true,
            displayField: 'kind',      // option.text
            mode: 'local',	
            selectOnFocus:true,
            width: 135,	
			listeners: {
				scope: this,
				select: {
					fn:function(combo,record,index) {
						//alert("��ѡ��Ĺ�ע���ǣ� "+record.get('kind')+"�� �����ύ��" );	// w����combo�ж���ı���
						k= record.get('kid');	// ȡ���û�ѡ���
						if(k== "1"){ k= "sensitive";  }
						else if(k== "2") { k= "illegal";  }
						else k="negative";						
						var params={	start:0, limit:5000 };
					//�޸Ĵ��б�ʵ�ָ�������ʱ ���Ӵ� ��������ʾ����	
					storeList.disable();	
						params['filters[0][data][value]']= k;
					store.on('load', function(){
						storeList.enable();
					});
						store.load({ params:params });
					}	
				}	
			}
		});
		var t="";
		var moniTime= {
				xtype:'datefield',
				name:'kind',
				trifferAction:'all',
				fieldLabel:'����',
				emptyText:'��ѡ������...',
				listeners: {
					scope: this,
					select: {
						fn:function(combo,record,index) {
							alert("��ѡ��ļ���ʱ���ǣ� "+record.format('Y-m-d')+"�� �����ύ��" );	// w����combo�ж���ı���
							t= record.format('Y-m-d');	// ȡ���û�ѡ���
						}	
					}	
				},
				width: 120
		}
		var WebData=new Ext.data.JsonStore({	//ͳ�Ʊ������ ????????????����һЩ���ݿ���û�е�ʱ���eg:1�� ����ô�ڱ����ʾ�ﲹ������
			url:'PHP/WebChart.php',
			root:'data',
			totalProperty:'total',
			fields:[
				 {name:'create_time' },
		         {name: 'doc_count' }
				 ],
			sortInfo: {
				field: 'create_time',
				direction: 'ASC' // or 'DESC' (case sensitive for local sorting)
			}
		});
		var header= new Ext.Panel({
			width: 900,
			height: 600,
			//renderTo: document.body,	//~~~~~~~~~�޸�~~~~~~~~~~
			title: '��������',
			id:'WebChart',
			closable:true,
			tbar:[
				{ text: '�������:' },
				wordKind,
				{xtype: 'tbspacer', width: 50},
				{ text: '���Ӵ�:' },		//��������
				storeList,
				{xtype: 'tbspacer', width: 50}, 	//�����������ʾЧ��
				{ text: '��������:' },
				moniTime,
				{xtype: 'tbspacer', width: 50}, 
				{
					xtype: 'button',	//��������������ôʵ�ֵõ��û�ѡ�����дʣ����γ�Mysql��ѯ��䣿����������--------------
					text:'�� ��',
					frame: true,
					width: 100,
					loadMask: true, 	//����������������ʾ ���ݶ�ȡ��...�Ƿ�������ã�������������������
				 	listeners:{
						scope:this,
						click:function(node,e){							
							var params={	start:0, limit:24 };	//��ɸѡ������ݶ�ȡ��	
							params['filters[0][data][value]']= w;	//wΪcombo�еõ������дʵ�ID
							params['filters[1][data][value]']= t;	//tΪɸѡʱ��
							params['filters[2][data][value]']= k;	//kΪ�û���ע������
							WebData.load({params:params});
						}
					}
				}
			],
			items: {
				xtype: 'linechart',	// ��״ͼ��'columnchart',
				store: WebData,
				yField: 'doc_count',
url: 'ext/resources/charts.swf',
				xField: 'create_time',
				xAxis: new Ext.chart.CategoryAxis({
					title: 'ʱ �� / С ʱ'
				}),
				yAxis: new Ext.chart.NumericAxis({
					title: '�� ��/ ƪ'
				})
	/*			extraStyle: {
				   xAxis: {
						labelRotation: -0
					}
				}
	*/		}
		});
		config.add(header);
	};
};