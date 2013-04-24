<head>
    <meta http-equiv="Content-Type" content="text/html; charset=GBK" />
    <title>盔客快递信息管理系统</title>

    <!-- ** CSS ** -->
    <!-- base library -->
    <link rel="stylesheet" type="text/css" href="ext/resources/css/ext-all.css" />
    <link rel="stylesheet" type="text/css" href="ext/examples/ux/fileuploadfield/css/fileuploadfield.css"/>
    <link rel="stylesheet" type="text/css" href="ext/examples/shared/examples.css" />
    <!-- page specific -->
	<link rel="stylesheet" type="text/css" href="css/custom.css" />
	<style type="text/css">
	.mainBG{
		background-image: url(images/mainBG.jpg);
		background-color: black;
		background-repeat:no-repeat;
		background-position:top center;
	}
	.x-view-over{
		border:1px solid #dddddd;
		background: #efefef url(ext/resources/images/default/grid/row-over.gif) repeat-x left top;
		padding: 4px;
	}
	.thumb{
		background: #dddddd;
		padding: 3px;
	}
	.thumb img{
		height: 90px;
		width: 120px;
	}
	.thumb-wrap{
		float: left;
		margin: 4px;
		clear:right;
		margin-right: 0;
		padding: 5px;
		text-align:center;
	}
	.thumb-wrap span{
		display: block;
		overflow: hidden;
		text-align: center;
	}
	.thumb-title{
		clear:none;
		overflow: hidden;
		word-wrap:break-word;
		width: 100px;
	}
	.cat-wrap{
		border:1px solid #dddddd;
		float: left;
		clear:both;
		margin: 10px;
		margin-right: 0;
		padding: 5px;
	}
	.cat-wrap span{
		display: block;
		overflow: hidden;
		text-align: center;
	}
	.icon-user-add {
		background-image: url(ext/examples/shared/icons/fam/user_add.gif) !important;
    }
    .icon-user-delete {
        background-image: url(ext/examples/shared/icons/fam/user_delete.gif) !important;
    }
    </style>

    <!-- ** Javascript ** -->
    <!-- ExtJS library: base/adapter -->
    <script type="text/javascript" src="ext/adapter/ext/ext-base.js"></script>

    <!-- ExtJS library: all widgets -->
    <script type="text/javascript" src="ext/ext-all.js"></script>

    <!-- overrides to base library -->
	<script type="text/javascript" src="ext/src/locale/ext-lang-zh_CN.js"></script>
    <!-- extensions -->
	<script src="ext/examples/ux/TabCloseMenu.js"></script>
	<script type="text/javascript" src="ext/examples/ux/gridfilters/GridFilters.js"></script>
	<script type="text/javascript" src="ext/examples/ux/gridfilters/menu/RangeMenu.js"></script>
	<script type="text/javascript" src="ext/examples/ux/gridfilters/menu/ListMenu.js"></script>
	<script type="text/javascript" src="ext/examples/ux/gridfilters/filter/Filter.js"></script>
	<script type="text/javascript" src="ext/examples/ux/gridfilters/filter/StringFilter.js"></script>
	<script type="text/javascript" src="ext/examples/ux/gridfilters/filter/DateFilter.js"></script>
	<script type="text/javascript" src="ext/examples/ux/gridfilters/filter/ListFilter.js"></script>
	<script type="text/javascript" src="ext/examples/ux/gridfilters/filter/NumericFilter.js"></script>
	<script type="text/javascript" src="ext/examples/ux/gridfilters/filter/BooleanFilter.js"></script>
    <script type="text/javascript" src="ext/examples/ux/RowEditor.js"></script>
    <script type="text/javascript" src="ext/examples/ux/fileuploadfield/FileUploadField.js"></script>
	<!-- page specific -->
	<script src="script/frame.js"></script>
    <script src="script/homePage.js"></script>
	<script src="script/loginWindow.js"></script>
    <script src="script/QueryExpress.js"></script>
    <script src="script/CreateExpress.js"></script>
    <script src="script/UpdateExpress.js"></script>
    <script src="script/AbnormalExpress.js"></script>
    <script src="script/AgencyFund.js"></script>
    <script src="script/AgencyFundRecord.js"></script>
    <script src="script/ExportHistory.js"></script>
    <script src="script/QueryHistory.js"></script>

	<script src="script/logGrid.js"></script>
	<script src="script/briefReport.js"></script>
	<script src="script/exBriefReport.js"></script>

	<script src="script/register.js"></script>
	
	<script src="script/newsGrid.js"></script>
	<script src="script/microBlog.js"></script>
	<script src="script/top10.js"></script>
	<script src="script/newsWidget.js"></script>
	<script src="script/clusterGrid.js"></script>
	<script src="script/behaveGrid.js"></script>
	<script src="script/userGrid.js"></script>
	<script src="script/dicGrid.js"></script>
	<script src="script/abnormal.js"></script>
	<script src="script/huoyueyonghu.js"></script>
	<script src="script/huoyueyonghuView.js"></script>
	<script src="script/leader.js"></script>
	<script src="script/tedingyonghu.js"></script>
	<script src="script/tianjishi.js"></script>
	<script src="script/dangeyonghu.js"></script>
	<script src="script/zhuzhuangtu.js"></script>
	<script src="script/yonghuxinxiliebiao.js"></script>
	<script src="script/specialusers.js"></script>
	<script src="script/tianjishi_first.js"></script>
	<script src="script/abnormal_first.js"></script>

	<script src="script/topic-daily.js"></script>
	<script src="script/topic-dwin.js"></script>
	<script src="script/topic-hours.js"></script>
	<script src="script/topic-hwin.js"></script>
	<script src="script/topic-emerg.js"></script>
	<script src="script/topic-ewin.js"></script>
	<script src="script/top-ten.js"></script>
	<script src="script/top-ten.js"></script>
	<script src="script/topicWin.js"></script>

	<script src="script/WebNegativeMonitor.js"></script>
	<script src="script/WebIllegalMonitor.js"></script>
	<script src="script/WebSensitiveMonitor.js"></script>
	<script src="script/WebChart.js"></script>
	<script src="script/WebBriefReport.js"></script>
</head>
<body id="container" class="mainBG">
	<!--hidden field for Extt.History-->
	<form id="history-form" class="x-hidden">
		<input type="hidden" id="x-history-field" />
		<iframe id="x-history-frame"></iframe>
	</form>
</body>
