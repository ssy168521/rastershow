/**
 * 
 */
define('sasmactools',[
	'Cesium/Core/defined',
    'Cesium/Core/defineProperties',
//    'Cesium/Core/defaultValue',
    'Cesium/Core/Event',
    'Knockout',
    'Core/registerKnockoutBindings'
], function (
        defined,
        defineProperties,
//    defaultValue,
        CesiumEvent,
        Knockout,
        registerKnockoutBindings
       )
        {
	  'use strict';

	    /**
	     * @alias CesiumNavigation
	     * @constructor
	     *
	     * @param {Viewer|CesiumWidget} viewerCesiumWidget The Viewer or CesiumWidget instance
	     */
	    var sasmactools = function (viewerCesiumWidget) {
	        initialize.apply(this, arguments);

	        this._onDestroyListeners = [];
	    };

	 
	    sasmactools.prototype._onDestroyListeners = undefined;
	    sasmactools.prototype.QueryControlViewModel = undefined;
	    sasmactools.prototype.QueryDiv= undefined;
	    sasmactools.prototype.container = undefined;
	    sasmactools.prototype.terria = undefined;
	    sasmactools.prototype._onDestroyListeners = undefined;

	    sasmactools.prototype.destroy = function ()
	    {

	        if (defined(this.QueryControlViewModel))
	        {
	            this.QueryControlViewModel.destroy();
	        }

	        if (defined(this.container))
	        {
	            this.container.parentNode.removeChild(this.container);
	        }
	        delete this.container;

	        for (var i = 0; i < this._onDestroyListeners.length; i++)
	        {
	            this._onDestroyListeners[i]();
	        }
	    };

	    sasmactools.prototype.addOnDestroyListener = function (callback)
	    {
	        if (typeof callback === "function")
	        {
	            this._onDestroyListeners.push(callback);
	        }
	    };

	    /**
	     * @param {Viewer|CesiumWidget} viewerCesiumWidget The Viewer or CesiumWidget instance
	     * @param options
	     */
	    function initialize(viewerCesiumWidget, options) {
	        if (!defined(viewerCesiumWidget)) {
	            throw new DeveloperError('CesiumWidget or Viewer is required.');
	        }

//	        options = defaultValue(options, defaultValue.EMPTY_OBJECT);

	        var cesiumWidget = defined(viewerCesiumWidget.cesiumWidget) ? viewerCesiumWidget.cesiumWidget : viewerCesiumWidget;

	        var container = document.createElement('div');
	        container.className = 'cesium-widget-cesiumQueryContainer';
	        cesiumWidget.container.appendChild(container);

	        this.terria = viewerCesiumWidget;
	        this.terria.options = (defined(options))?options :{};
	        this.terria.afterWidgetChanged = new CesiumEvent();
	        this.terria.beforeWidgetChanged = new CesiumEvent();
	        this.container = container;
	        
	   
	        
	           
	          // Register custom Knockout.js bindings.  If you're not using the TerriaJS user interface, you can remove this.
	       // registerKnockoutBindings();

	        if (defined(this.terria.options.enableQuery) || this.terria.options.enableQuery)
	        {
	            this.QueryDiv = document.createElement('div');
	             container.appendChild(this.QueryDiv);
	            this.QueryDiv.setAttribute("id", "QueryDiv");
	            this.QueryViewModel = QueryViewModel.create({
	                container: this.QueryDiv,
	                terria: this.terria,
	                mapElement: container,
	                enableQuery: true
	            });
	           
	        }
	     
	    }

	    return sasmactools;
});