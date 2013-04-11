WebIllegalMonitor=function(){
	this.init=function(config){
		var store= new Ext.data.JsonStore({
			url:'PHP/WebWordIllegal.php',
			root:'data',
			totalProperty:'total',
			fields:[{ name: 'id'},
					{ name: 'word', type: 'char'}
				]
		});
		store.load({
			params:{
				start:0,
				limit:10000	//默认设置敏感词典最大为10000
			}
		});
		var w= "您没有选择关注词，请选取";	//保存被用户选择的词
		var storeList = new Ext.form.ComboBox({    
			fieldLabel : '非法词',  //UI标签名称？？？？没有显示出来？？？？
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
			//测试加入 取被用户选择词操作
			listeners: {
				scope: this,
				select: {
					fn:function(combo,record,index) {
						//alert("您选择的关注词是： "+record.get('word')+"， 请点击提交！" );	// w是在combo中定义的变量
						w= record.get('id');	// 取被用户选择词
						//测试建立一个过滤项
					}	}	
			}
        });		
	
		var WebData=new Ext.data.JsonStore({
			url:'PHP/WebIllegalWord.php',
			root:'data',
			totalProperty:'total',
			fields:[
				 {name:'title',type:'string'},
		         {name: 'author',type: 'string'},
		         {name: 'posting_time', type: 'Y-m-d  G:i:s' },
				 {name:'url',type:'string'},
			     {name: 'illegal_words',type: 'string'},
				 {name: 'source', type: 'string'}	
				 ]
		});
		WebData.load({	//当点击改主题是自动加载所有监视内容
			params:{
				start:0,
				limit:30	
			}
		});
		function renderTitle(value,p,record)	//点击时跳到url链接
		{
			return String.format
			('<b><a href="{1}"  target="_blank">{2}</a></b><br/>',
			value, record.data.url, record.data.title);
		}
		var grid=new Ext.grid.GridPanel({
			title: '非法信息',
			id:'WebIllegalMonitor',
			closable:true,
			store:WebData,
			//width:800,
		loadMask: true,
			autoWidth: true,
			autoExpandColumn: 	'title',	//自动填充表格中空白的列
			region:'center',    
			frame: true,
			//layout: 'fit',
			height:500,
			trackMouseOver: true,
			tbar:[
				{ text: '非法词' },
				storeList,
				{xtype: 'tbspacer', width: 50}, 
				{
					xtype: 'button',	//！？？？？？怎么实现得到用户选的敏感词，并形成Mysql查询语句？？？？？？--------------
					text:'提 交',
					width: 100,
					//columnWidth: .10,	
					loadMask: true, 	//！！！！！！！显示 数据读取中...是否可这样用？？？？？？？？？、
				 	listeners:{
						scope:this,
						click:function(node,e){							
							var params={	start:0, limit:30 };	//被筛选表的数据读取量	
							params['filters[0][data][value]']= w;//grid.store.data.items[index].data.publish_time;//取INDEX所在行的时间
							WebData.load({params:params});
						}
					}
				}
			],
			bbar: new Ext.PagingToolbar({  //????????分页组件使列表消失
				store: WebData,
				pageSize: 30,
				displayInfo: true,
				displayMsg: 'Displaying topics {0}-{1}of{2}',
				emptyMsg: "No topics to display"	//无数据时的展示内容
			}),
			
//测试实现表格的自动伸缩功能
			columns: [new Ext.grid.RowNumberer({width: 20}),
					{id:'title',header:'标题',dataIndex:'title',
					 renderer: renderTitle, 
					width: 250,sortable:true},
					{ header: '作者', dataIndex: 'author',width: 100,sortable:true},
					{ header: '发布时间',dataIndex: 'posting_time',  width: 200,sortable:true},
					{ header: '非法词',dataIndex: 'illegal_words',width: 100,sortable:true },
					{ header: '发布站点', dataIndex: 'source', width: 150, sortable: true }					
				]
		/*	cm: new Ext.grid.ColumnModel({
				defaults: {
					//width: 120,
					sortable: true
				},
				columns: [
					{id:'title',header:'标题',dataIndex:'title',
					 renderer: renderTitle, 
					 width: 250,sortable:true},
					{ header: '作者', dataIndex: 'author',width: 80,sortable:true},
					{ header: '发布时间',dataIndex: 'posting_time',width: 80,sortable:true},
					{ header: '敏感词',dataIndex: 'illegal_words',width: 150,sortable:true },
					{ header: '发布站点', dataIndex: 'source', width: 100, sortable: true }					
				]
			})
		*/
		});
		WebData.on('load',function(WebData, event){	
			var recordNo=WebData.getCount();
			if(recordNo==0) alert("查询已完成，系统中暂时没有相关数据！"); 
		});
//数据库中没有对应数据，故取消"数据读取中"的蒙版
/*	
		 grid.on('afterrender',function(grid,event){  //实现加载数据时显示等待  
			grid.getBottomToolbar().doRefresh();	 
		} );
*/		
		config.add(grid);
	};
};