<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ page isELIgnored="true"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">

<title>Statistics.jsp</title>

<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
<link href="./lib/bootstrap/css/bootstrap.min.css" rel="stylesheet">
<link href="./lib/bootstrap/css//bootstrap.css" rel="stylesheet"
	type="text/css" />
<link rel="stylesheet"
	href="./lib/bootstrap.offcanvas/css/bootstrap.offcanvas.min.css" />
<link rel="StyleSheet" type="text/css"
	href="./lib/jquery-ui-1.12.1/jquery-ui.min.css" />


<style>
@import url(./lib/Cesium-1.4.8/Widgets/widgets.css);

html, body, #cesiumContainer {
	width: 100%;
	height: 100%;
	margin: 0;
	padding: 0;
	overflow: hidden;
}
</style>

<!-- <script src="./lib/requirejs-2.1.20/require.js" data-main="./cesium-sasmac-startup.js"></script> -->
<script src="./lib/requirejs-2.1.20/require.js"></script>
<script src="./lib/jquery-3.2.0.js"></script>
<script src="./lib/jquery-3.2.0.min.js"></script>
<!-- <script src="./lib/bootstrap/js/bootstrap.js"></script>
<script src="./lib/bootstrap.offcanvas/js/bootstrap.offcanvas.js"></script>
<script src="./lib/jquery-ui-1.12.1/jquery-ui.min.js"></script>
<script type="text/javascript" src="./lib/My97DatePicker/WdatePicker.js"></script>
<script src="./lib/Cesium-1.4.8/Cesium.js"></script> -->
</head>

<body>

	<div class="container-fluid" style="padding:0px;height:100%">
		<div class="row-fluid clearfix">
			<div class="col-md-10 column" style="height:100%;padding:0px">
				<div id="cesiumContainer"></div>
			</div>
			<div class="col-md-2 column" style="height:100%;padding:0px">
				<div id="query-panel" style="width:100%;">
					<div>
						<form id="qureyform" style="width: 100%;">
							<table style="width:100%;height:350px">
								<tr height="10%">
									<td width="30%" style="text-align:right; padding-right:0px;">
										采集日期</td>
									<td width="70%" style="text-align:center; padding-right:0px;">
										<input id="acquiredate1" name="acquiredate1" class="Wdate"
										type="text" style="width:40%;font-size:13px"
										onFocus="WdatePicker({dateFmt:'yyyy-MM-dd',minDate:'2012-01-01 00:00:00',maxDate:'#F{$dp.$D(\'acquiredate2\')||\'new Date()\'}'})" />
										至 <input id="acquiredate2" name="acquiredate2" class="Wdate"
										type="text" style="width:40%;font-size:13px"
										onFocus="WdatePicker({dateFmt:'yyyy-MM-dd',minDate:'#F{$dp.$D(\'acquiredate1\')}',maxDate:'%y-%M-%d'})" />
									</td>
								</tr>
								<tr height="10%">
									<td width="30%" style="text-align:right; padding-right:0px;">
										云量</td>
									<td width="70%" style="text-align:center; padding-left:15px;">
										<div style="float:left;padding-right:15px;">
											<label id="couldmin">0</label>
										</div>
										<div style="padding-top:8px;width:60%;float:left;">
											<div id="slider" style=""></div>
										</div>
										<div style="float:left;padding-left:10px;">
											<label id="couldmax">100</label>
										</div> <input type="hidden" id="minCloud" name="minCloud"> <input
										type="hidden" id="maxCloud" name="maxCloud"> <script>
											$("#slider").slider({
												range : true,
												values : [ 0, 20 ],
												slide : function(event, ui) {
													$("#couldmin").text(ui.values[0]);
													$("#couldmax").text(ui.values[1]);
													$("#minCloud").val(ui.values[0]);
													$("#maxCloud").val(ui.values[1]);
												}
											});
											$("#couldmin").text($("#slider").slider("values", 0));
											$("#couldmax").text($("#slider").slider("values", 1));
											$("#minCloud").val($("#slider").slider("values", 0));
											$("#maxCloud").val($("#slider").slider("values", 1));
										</script>
									</td>

								</tr>
							</table>

						</form>
					</div>
					<div style="width: 100%">
						<a class="btn btn-primary" role="button" data-toggle="collapse"
							href="#zy3panel"> 资源三号卫星数据 </a>
					</div>
					<div id="zy3panel" class="collapse">
						<div id="zy3sat" class="form-group" style="width: 100%; ">
							<span>卫星：</span> <label class="checkbox-inline"> <input
								type="checkbox" value="option1">ZY3-01
							</label> <label class="checkbox-inline"> <input type="checkbox"
								value="option2">ZY3-02
							</label>
						</div>
						<div id="zy3-sensor" class="form-group">
							<span>传感器：</span>
							<div style="width: 100%; ">
								<label class="checkbox-inline"> <input type="checkbox"
									value="option1">NAD
								</label> <label class="checkbox-inline"> <input type="checkbox"
									value="option2">MUX
								</label> <label class="checkbox-inline"> <input type="checkbox"
									value="option3">FWD
								</label> <label class="checkbox-inline"> <input type="checkbox"
									value="option4">BWD
								</label>
							</div>
							<div></div>
							<label class="checkbox-inline"> <input type="checkbox"
								value="option5">DLC
							</label> <label class="checkbox-inline"> <input type="checkbox"
								value="option6">NAD+MUX
							</label> <label class="checkbox-inline"> <input type="checkbox"
								value="option7">四视配套
							</label>
						</div>
					</div>
					<div>
						<a class="btn btn-primary" role="button" data-toggle="collapse"
							href="#GF1panel"> 高分一号卫星数据 </a>
					</div>
					<div id="GF1panel" class="collapse">
						<div id="GF1-sensor" class="form-group">
							<span>传感器：</span> <label class="checkbox-inline"> <input
								type="checkbox" value="option1">PMS1
							</label> <label class="checkbox-inline"> <input type="checkbox"
								value="option2">PMS2
							</label>
						</div>
					</div>
					<div>
						<a class="btn btn-primary" role="button" data-toggle="collapse"
							href="#GF2panel"> 高分二号卫星数据 </a>
					</div>
					<div id="GF2panel" class="collapse">
						<div id="GF2-sensor" class="form-group">
							<span>传感器：</span> <label class="checkbox-inline"> <input
								type="checkbox" value="option1">PMS1
							</label> <label class="checkbox-inline"> <input type="checkbox"
								value="option2">PMS2
							</label>
						</div>
					</div>
					<button id="QueryDataid" class="btn btn-primary btn-sm"
						style="width:80px">数据查询</button>
				</div>

			</div>
		</div>

	</div>


<script>
	require(["./lib/Cesium-1.4.8/Cesium","./js/cesium-sasmac/viewerCesiumQueryMixin"],function(Cesium,viewerCesiumQueryMixin){
	
		var viewer = new Cesium.Viewer('cesiumContainer',{
		//geocoder:false,
		//homeButton:false,
		//sceneModePicker:false,
	   // baseLayerPicker:false,
		animation:false,
		//creditContainer:"credit",
		timeline:false,
		//fullscreenButton:false,
		vrButton:false
		});
		viewer._cesiumWidget._creditContainer.style.display="none";
	    viewer.extend(QueryMixin,{});
	
	});


		
	</script>
	<script type="text/javascript">
		$("#QueryDataid").click(function() {})
	</script>
</body>