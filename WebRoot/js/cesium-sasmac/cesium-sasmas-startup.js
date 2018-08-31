/**
 * 
 */
/*global require*/
/*eslint-disable strict*/
require({
    baseUrl : '.',
    paths : {
   /*     domReady : '../../ThirdParty/requirejs-2.1.20/domReady',*/
    	KnockOut:'../lib/knockout-3.4.2/knockout-3.4.2',
        Cesium : '../lib/Cesium-1.4.8/Cesium',
        sasmactools:'../js/cesium-sasmac/Cesium-sasmac'
    }
}, [
	    'KnockOut',
        'Cesium'
    ], function() {
});
