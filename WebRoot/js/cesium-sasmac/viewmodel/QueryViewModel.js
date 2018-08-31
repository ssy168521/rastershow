/*global define*/
define([
    'Cesium/Core/defined',
    'Cesium/Core/Math',
    'Cesium/Core/getTimestamp',
    'Cesium/Core/EventHelper',
    'Cesium/Core/Transforms',
    'Cesium/Scene/SceneMode',
    'Cesium/Core/Cartesian2',
    'Cesium/Core/Cartesian3',
    'Cesium/Core/Matrix4',
    'Cesium/Core/BoundingSphere',
    'Cesium/Core/HeadingPitchRange',
    'Knockout',
], function (
        defined,
        CesiumMath,
        getTimestamp,
        EventHelper,
        Transforms,
        SceneMode,
        Cartesian2,
        Cartesian3,
        Matrix4,
        BoundingSphere,
        HeadingPitchRange,
        Knockout
       )
{
    'use strict';

    var QueryViewModel = function (options)
    {

        this.terria = options.terria;
        this.eventHelper = new EventHelper();
        this.enableZoomControls =  (defined(options.enableZoomControls))?options.enableZoomControls:true;   
        this.enableCompass = (defined(options.enableCompass))?options.enableCompass:true; 

       // if (this.showZoomControls)
     //   {
            this.controls = options.controls;
            if (!defined(this.controls))
            {
                this.controls = [
                    new ZoomNavigationControl(this.terria, true),
                    new ResetViewNavigationControl(this.terria),
                    new ZoomNavigationControl(this.terria, false)
                ];
            }
        //}

  

        this.showCompass = defined(this.terria) && this.enableCompass;
        this.heading = this.showCompass ? this.terria.scene.camera.heading : 0.0;

        this.isOrbiting = false;
        this.orbitCursorAngle = 0;
        this.orbitCursorOpacity = 0.0;
        this.orbitLastTimestamp = 0;
        this.orbitFrame = undefined;
        this.orbitIsLook = false;
        this.orbitMouseMoveFunction = undefined;
        this.orbitMouseUpFunction = undefined;

        this.isRotating = false;
        this.rotateInitialCursorAngle = undefined;
        this.rotateFrame = undefined;
        this.rotateIsLook = false;
        this.rotateMouseMoveFunction = undefined;
        this.rotateMouseUpFunction = undefined;

        this._unsubcribeFromPostRender = undefined;

        Knockout.track(this, ['controls', 'showCompass', 'heading', 'isOrbiting', 'orbitCursorAngle', 'isRotating']);

        var that = this;

        function widgetChange()
        {
            if (defined(that.terria))
            {
                if (that._unsubcribeFromPostRender)
                {
                    that._unsubcribeFromPostRender();
                    that._unsubcribeFromPostRender = undefined;
                }

                that.showCompass = true && that.enableCompass;

                that._unsubcribeFromPostRender = that.terria.scene.postRender.addEventListener(function ()
                {
                    that.heading = that.terria.scene.camera.heading;
                });
            }
            else
            {
                if (that._unsubcribeFromPostRender)
                {
                    that._unsubcribeFromPostRender();
                    that._unsubcribeFromPostRender = undefined;
                }
                that.showCompass = false;
            }
        }

        this.eventHelper.add(this.terria.afterWidgetChanged, widgetChange, this);
        //this.terria.afterWidgetChanged.addEventListener(widgetChange);

        widgetChange();
    };


    QueryViewModel.prototype.destroy = function ()
    {

        this.eventHelper.removeAll();

        //loadView(require('fs').readFileSync(baseURLEmpCesium + 'js-lib/terrajs/lib/Views/Navigation.html', 'utf8'), container, this);

    };

    QueryViewModel.prototype.show = function (container)
    {
        var testing;
         if (this.enableZoomControls && this.enableCompass)
        {
             testing = '<div class="compass" title="Drag outer ring: rotate view. ' +
                'Drag inner gyroscope: free orbit.' +
                'Double-click: reset view.' +
                'TIP: You can also free orbit by holding the CTRL key and dragging the map." data-bind="visible: showCompass, event: { mousedown: handleMouseDown, dblclick: handleDoubleClick }">' +
                '<div class="compass-outer-ring-background"></div>' +
                ' <div class="compass-rotation-marker" data-bind="visible: isOrbiting, style: { transform: \'rotate(-\' + orbitCursorAngle + \'rad)\', \'-webkit-transform\': \'rotate(-\' + orbitCursorAngle + \'rad)\', opacity: orbitCursorOpacity }, cesiumSvgPath: { path: svgCompassRotationMarker, width: 145, height: 145 }"></div>' +
                ' <div class="compass-outer-ring" title="Click and drag to rotate the camera" data-bind="style: { transform: \'rotate(-\' + heading + \'rad)\', \'-webkit-transform\': \'rotate(-\' + heading + \'rad)\' }, cesiumSvgPath: { path: svgCompassOuterRing, width: 145, height: 145 }"></div>' +
                ' <div class="compass-gyro-background"></div>' +
                ' <div class="compass-gyro" data-bind="cesiumSvgPath: { path: svgCompassGyro, width: 145, height: 145 }, css: { \'compass-gyro-active\': isOrbiting }"></div>' +
                '</div>' +
                '<div class="navigation-controls">' +
                '<!-- ko foreach: controls -->' +
                '<div data-bind="click: activate, attr: { title: $data.name }, css: $root.isLastControl($data) ? \'navigation-control-last\' : \'navigation-control\' ">' +
                '   <!-- ko if: $data.hasText -->' +
                '   <div data-bind="text: $data.text, css: $data.isActive ?  \'navigation-control-icon-active \' + $data.cssClass : $data.cssClass"></div>' +
                '   <!-- /ko -->' +
                '  <!-- ko ifnot: $data.hasText -->' +
                '  <div data-bind="cesiumSvgPath: { path: $data.svgIcon, width: $data.svgWidth, height: $data.svgHeight }, css: $data.isActive ?  \'navigation-control-icon-active \' + $data.cssClass : $data.cssClass"></div>' +
                '  <!-- /ko -->' +
                ' </div>' +
                ' <!-- /ko -->' +
                '</div>';
    }

        loadView(testing, container, this);
   
    };

    /**
     * Adds a control to this toolbar.
     * @param {NavControl} control The control to add.
     */
    QueryViewModel.prototype.add = function (control)
    {
        this.controls.push(control);
    };

    /**
     * Removes a control from this toolbar.
     * @param {NavControl} control The control to remove.
     */
    QueryViewModel.prototype.remove = function (control)
    {
        this.controls.remove(control);
    };

    /**
     * Checks if the control given is the last control in the control array.
     * @param {NavControl} control The control to remove.
     */
    QueryViewModel.prototype.isLastControl = function (control)
    {
        return (control === this.controls[this.controls.length - 1]);
    };

    var vectorScratch = new Cartesian2();

    QueryViewModel.prototype.handleMouseDown = function (viewModel, e)
    {
        var scene = this.terria.scene;
        if (scene.mode === SceneMode.MORPHING)
        {
            return true;
        }


    };


    QueryViewModel.create = function (options)
    {
        //options.enableZoomControls = this.enableZoomControls;
        //options.enableCompass = this.enableCompass;
        var result = new NavigationViewModel(options);
        result.show(options.container);
        return result;
    };



 

    return QueryViewModel;
});
