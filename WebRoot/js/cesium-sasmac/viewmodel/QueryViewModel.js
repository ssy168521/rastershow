/*global define*/
define([
    'Cesium/Core/defined',
    'Cesium/Core/EventHelper',
    'Knockout'
], function (
        defined,
        EventHelper,
        Knockout
       )
{
    'use strict';

    var QueryViewModel = function (options)
    {

        this.terria = options.terria;
        this.eventHelper = new EventHelper();
        this.enableQuery = (defined(options.enableQuery))?options.enableQuery:true; 

            this.controls = options.controls;
            if (!defined(this.controls))
            {
                this.controls = [
                    new sasmacQueryControl(this.terria, true),
                   
                ];
            }


 

        Knockout.track(this, ['controls', enableQuery]);

        var that = this;

        function widgetChange()
        {
            if (defined(that.terria))
            {
               
            }
            else
            {
                if (that._unsubcribeFromPostRender)
                {
                    that._unsubcribeFromPostRender();
                    that._unsubcribeFromPostRender = undefined;
                }
             
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



    QueryViewModel.prototype.handleMouseDown = function (viewModel, e)
    {
       

    };


    QueryViewModel.create = function (options)
    {
        var result = new QueryViewModel(options);
        result.show(options.container);
        return result;
    };



 

    return QueryViewModel;
});
