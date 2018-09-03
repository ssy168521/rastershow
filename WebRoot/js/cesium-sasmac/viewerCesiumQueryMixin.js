/**
 * Created by ssy on 2018.08.31.
 */
/*global define*/
define([
    '../../lib/Cesium-1.4.8/Cesium',
    './cesiumQueryControl'
], function(
	Cesium,
    cesiumQueryControl) {
    'use strict';

    /**
     * A mixin which adds the Compass/Navigation widget to the Viewer widget.
     * Rather than being called directly, this function is normally passed as
     * a parameter to {@link Viewer#extend}, as shown in the example below.
     * @exports viewerCesiumNavigationMixin
     *
     * @param {Viewer} viewer The viewer instance.
     * @param {{}} options The options.
     *
     * @exception {DeveloperError} viewer is required.
     *
     * @demo {@link http://localhost:8080/index.html|run local server with examples}
     *
     * @example
     * var viewer = new Cesium.Viewer('cesiumContainer');
     * viewer.extend(viewerCesiumNavigationMixin);
     */
    function viewerCesiumQueryMixin(viewer, options) {
        if (!Cesium.defined(viewer)) {
            throw new Cesium.DeveloperError('viewer is required.');
        }

        var cesiumQueryControl = init(viewer, options);

        cesiumQueryControl.addOnDestroyListener((function (viewer) {
            return function () {
                delete viewer.cesiumQueryControl;
            };
        })(viewer));

        Cesium.defineProperties(viewer, {
        	cesiumQueryControl: {
                configurable: true,
                get: function () {
                    return viewer.cesiumWidget.cesiumQueryControl;
                }
            }
        });
    }

    /**
     *
     * @param {CesiumWidget} cesiumWidget The cesium widget instance.
     * @param {{}} options The options.
     */
    viewerCesiumQueryMixin.mixinWidget = function (cesiumWidget, options) {
        return init.apply(undefined, arguments);
    };

    /**
     * @param {Viewer|CesiumWidget} viewerCesiumWidget The Viewer or CesiumWidget instance
     * @param {{}} options the options
     */
    var init = function (viewerCesiumWidget, options) {
        var cesiumQueryControl = new cesiumQueryControl(viewerCesiumWidget, options);

        var cesiumWidget = defined(viewerCesiumWidget.cesiumWidget) ? viewerCesiumWidget.cesiumWidget : viewerCesiumWidget;

        defineProperties(cesiumWidget, {
        	cesiumQueryControl: {
                configurable: true,
                get: function () {
                    return cesiumQueryControl;
                }
            }
        });

        cesiumQueryControl.addOnDestroyListener((function (cesiumWidget) {
            return function () {
                delete cesiumWidget.cesiumQueryControl;
            };
        })(cesiumWidget));

        return cesiumQueryControl;
    };

    return viewerCesiumQueryMixin;
});