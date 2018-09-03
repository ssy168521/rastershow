/**
 * 
 */
/*global require*/
/*eslint-disable strict*/
require({
    baseUrl : '.',
    paths : {
   /*     domReady : '../../ThirdParty/requirejs-2.1.20/domReady',*/
    	KnockOut:'./lib/knockout-3.4.2/knockout-3.4.2',
        Cesium : './lib/Cesium-1.4.8/Cesium',
        sasmactools:'./js/Cesium-sasmac/cesium-sasmac',
        viewerCesiumQueryMixin:	'./js/cesium-sasmac/viewerCesiumQueryMixin.js'
    }
}, [
	    'KnockOut',
        'Cesium',
        sasmactools,
        viewerCesiumQueryMixin
    ], function() {
});
