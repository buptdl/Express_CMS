WebChart=function(){
	this.init=function(config){
		var w= "";	//保存被用户选择的词
		var store= new Ext.data.JsonStore({
			url:'PHP/WebWord.php',
			// idIndex: 0, // 每条记录的id将会是第一个元素
			root:'data',
			totalProperty:'total',
			fields:[{ name: 'id'},
					{ name: 'word', type: 'char'}
				]
		});
/*		store.load({
			params:{
				start:0,
				limit:10000	//默认设置敏感词典最大为10000
			}
		});
*/		
		var storeList = new Ext.form.ComboBox({    
			//fieldLabel : '敏感词',  //UI标签名称？？？？没有显示出来？？？？
			name : 'identity',   //作为form提交时传送的参数名
            allowBlank : false,  //是否允许为空
            //readOnly : true,     //是否只读,不能有！！！！！！！！！！
            triggerAction : 'all',  //显示所有下列数.必须指定为'all'
            anchor : '90%',
            emptyText:'请选择...',   //没有默认值时,显示的字符串
            store: store,	
            valueField:'id',      // option.value
            typeAhead: true,
            displayField: 'word',      // option.text
            mode: 'local',	//!!!!!!!测试时用的是本地数据库
            selectOnFocus:true,
            width: 135,			
			listeners: {
				scope: this,
				select: {
					fn:function(combo,record,index) {
						//alert("您选择的监视词是： "+record.get('word')+"， 请选择监视类别！" );	// w是在combo中定义的变量
						w= record.get('id');	// 取被用户选择词
						//测试建立一个过滤项
					}	}	
			}
        });	
		var kindData= new Ext.data.JsonStore({
			fields: [ 'kid', 'kind' ],		
			totalProperty:'total',
			data:[
				{ kid: '1', kind: '敏感'},
				{ kid: '2', kind: '非法'},
				{ kid: '3', kind: '不良'}
			]
		});

		var k= "";	//保存用户选择的类别
		var wordKind= new Ext.form.ComboBox({
			text : '类 型',  //UI标签名称？？？？没有显示出来？？？？
			//name : 'identity',   //作为form提交时传送的参数名
            allowBlank : false,  //是否允许为空
            //readOnly : true,     //是否只读,不能有！！！！！！！！！！
            triggerAction : 'all',  //显示所有下列数.必须指定为'all'
            emptyText:'请选择类型...',   //没有默认值时,显示的字符串
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
						//alert("您选择的关注词是： "+record.get('kind')+"， 请点击提交！" );	// w是在combo中定义的变量
						k= record.get('kid');	// 取被用户选择词
						if(k== "1"){ k= "sensitive";  }
						else if(k== "2") { k= "illegal";  }
						else k="negative";						
						var params={	start:0, limit:5000 };
					//修改词列表，实现更换类型时 监视词 下拉框显示锁定	
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
				fieldLabel:'性质',
				emptyText:'请选择日期...',
				listeners: {
					scope: this,
					select: {
						fn:function(combo,record,index) {
							alert("您选择的监视时间是： "+record.format('Y-m-d')+"， 请点击提交！" );	// w是在combo中定义的变量
							t= record.format('Y-m-d');	// 取被用户选择词
						}	
					}	
				},
				width: 120
		}
		var WebData=new Ext.data.JsonStore({	//统计表的数据 ????????????对于一些数据库中没有的时间点eg:1点 ，怎么在表格显示里补充上来
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
			//renderTo: document.body,	//~~~~~~~~~修改~~~~~~~~~~
			title: '词重现率',
			id:'WebChart',
			closable:true,
			tbar:[
				{ text: '监视类别:' },
				wordKind,
				{xtype: 'tbspacer', width: 50},
				{ text: '监视词:' },		//插入文字
				storeList,
				{xtype: 'tbspacer', width: 50}, 	//引入间格改善显示效果
				{ text: '监视日期:' },
				moniTime,
				{xtype: 'tbspacer', width: 50}, 
				{
					xtype: 'button',	//！？？？？？怎么实现得到用户选的敏感词，并形成Mysql查询语句？？？？？？--------------
					text:'提 交',
					frame: true,
					width: 100,
					loadMask: true, 	//！！！！！！！显示 数据读取中...是否可这样用？？？？？？？？？、
				 	listeners:{
						scope:this,
						click:function(node,e){							
							var params={	start:0, limit:24 };	//被筛选表的数据读取量	
							params['filters[0][data][value]']= w;	//w为combo中得到的敏感词的ID
							params['filters[1][data][value]']= t;	//t为筛选时间
							params['filters[2][data][value]']= k;	//k为用户关注的类型
							WebData.load({params:params});
						}
					}
				}
			],
			items: {
				xtype: 'linechart',	// 柱状图：'columnchart',
				store: WebData,
				yField: 'doc_count',
url: 'ext/resources/charts.swf',
				xField: 'create_time',
				xAxis: new Ext.chart.CategoryAxis({
					title: '时 间 / 小 时'
				}),
				yAxis: new Ext.chart.NumericAxis({
					title: '数 量/ 篇'
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