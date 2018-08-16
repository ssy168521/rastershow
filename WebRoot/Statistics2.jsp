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
<script src="./lib/jquery-3.2.0.js"></script>
<script src="./lib/jquery-3.2.0.min.js"></script>
<script src="./lib/bootstrap/js/bootstrap.js"></script>
<script src="./lib/bootstrap.offcanvas/js/bootstrap.offcanvas.js"></script>
</head>

<body>

	<div id="query-panel">
		<a class="accordion-toggle" data-toggle="collapse"
			data-parent="#query-panel" href="#zy3panel">资源三号卫星数据 </>
			<div id="zy3panel" class="collapse">
				<div id="zy3sat" class="form-group">
					<span>卫星：</span> <label class="checkbox-inline"> <input
						type="checkbox" value="option1">ZY3-01
					</label> <label class="checkbox-inline"> <inpu type="checkbox"
							value="option2">ZY3-02 </label>
				</div>

				<div id="zy3-sensor" class="form-group">
					<span>传感器：</span> <label class="checkbox-inline"> <input
						type="checkbox" value="option1">NAD
					</label> <label class="checkbox-inline"> <input type="checkbox"
						value="option2">MUX
					</label> <label class="checkbox-inline"> <input type="checkbox"
						value="option3">FWD
					</label> <label class="checkbox-inline"> <input type="checkbox"
						value="option4">BWD
					</label> <label class="checkbox-inline"> <input type="checkbox"
						value="option5">DLC
					</label> <label class="checkbox-inline"> <input type="checkbox"
						value="option6">NAD+MUX
					</label> <label class="checkbox-inline"> <input type="checkbox"
						value="option7">四视配套
					</label>
				</div>
			</div> 
		<a class="accordion-toggle" data-toggle="collapse"
			data-parent="#query-panel" href="#GF1panel">高分一号卫星数据 </> </a>
			<div id="GF1panel" class="collapse">
				<div id="GF1-sensor" class="form-group">
					<span>传感器：</span> <label class="checkbox-inline"> <input
						type="checkbox" value="option1">PMS1
					</label> <label class="checkbox-inline"> <input type="checkbox"
						value="option2">PMS2
					</label>
				</div>
			</div>
		<a class="accordion-toggle" data-toggle="collapse"
			data-parent="#query-panel" href="#GF2panel">高分二号卫星数据</>

				<div id="GF2panel" class="collapse">
					<div id="GF2-sensor" class="form-group">
						<span>传感器：</span> <label class="checkbox-inline"> <input
							type="checkbox" value="option1">PMS1
						</label> <label class="checkbox-inline"> <input type="checkbox"
							value="option2">PMS2
						</label>
					</div>
				</div>
	</div>
	
</body>