
var map;
require([
        "dojo/dom",
        "dojo/on",
        //"esri/Color",
        //  "esri/config",
        //  "esri/geometry/webMercatorUtils",
        //  "esri/graphic",
        //  "esri/lang",
        "esri/map",
        "esri/geometry/Extent",
        //  "esri/symbols/SimpleFillSymbol",
        //  "esri/symbols/SimpleLineSymbol",
        //  "esri/symbols/SimpleMarkerSymbol",
        "dojo/domReady!"
    ],
    function (  dom, 
                on, 
                Map,
                Extent
                ){

      map = new Map("mapDivId", {
        basemap: "streets",
        extent: new Extent({"xmin": -14208650.20, "ymin": 1869649.55, 
                            "xmax": -5403104.54,  "ymax":  7740013.32,
                            "spatialReference" }),
        zoom: 7
      });

      on(map, "load", function (){
        console.log("Map load event");
        // Hook up jQuery
        //$(document).ready(jQueryReady);
      });
});


/*$(document).ready(function () {
    
    function rgbColorInHex(rgbColor) {
        
        var openingBracket = rgbColor.indexOf('('),
            closingBracket = rgbColor.indexOf(')');
        if (openingBracket > 0 && closingBracket > 0) {
            var hexValue = '#',
                rgbArgs = rgbColor.slice(openingBracket + 1,
                                           closingBracket),
                rgbStringValues = rgbArgs.split(',');
            
            function returnHex(element) {
                var hexVal = Number.parseInt(element, 10).toString(16);
                return (hexVal.length === 1) ? '0' + hexVal : hexVal;
            }
            var rgbHexValues = rgbStringValues.map(returnHex);
            hexValue += rgbHexValues.join('');
            return hexValue;
        }
        
        return 'rgb color not in correct format...';
    }
    
    $('p').click(function (event) {
    //event.preventDefault();
    //$(this).hide("slow");
        var curColor = $(this).css('color'),
            curColorHex = rgbColorInHex(curColor),
            curPcolor = (curColorHex === '#000000') ? '#FF0000' : '#000000';
        $(this).css('color', curPcolor);
        console.log(curPcolor);
    });
});*/

/*
 require([
      "dojo/dom",
    //  "dojo/on",
    //  "esri/Color",
    //  "esri/config",
    //  "esri/geometry/webMercatorUtils",
    //  "esri/graphic",
    //  "esri/lang",
      "esri/map",
    //  "esri/symbols/SimpleFillSymbol",
    //  "esri/symbols/SimpleLineSymbol",
    //  "esri/symbols/SimpleMarkerSymbol",
      "dojo/domReady!"
    ],
    function (  dom, 
                //on, 
                //Color, 
                //esriConfig, 
                //webMercatorUtils, 
                //Graphic, 
                //lang, 
                Map, 
                //SimpleFillSymbol, 
                //SimpleLineSymbol,
                //SimpleMarkerSymbol
                ){

      //var zoomSymbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
      //  new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
      //    new Color([20, 156, 255]), 1), new Color([141, 185, 219, 0.3]));

      //esriConfig.defaults.map.zoomSymbol = zoomSymbol.toJson();

      map = new Map("mapDivId", {
        basemap: "streets",
        center: [2.352, 48.87],
        zoom: 12,
        slider: false
      });

      on(map, "load", function (){
        console.log("Map load event");
        // Hook up jQuery
        //$(document).ready(jQueryReady);
      });

      on(map, "layer-add", function (){
        console.log("Map layer-add event");
      });

      on(map, "extent-change", showExtent);

      map.infoWindow.resize(150, 100);

      function showExtent(event){
        console.log("Map extent-change", JSON.stringify(event.extent));
        var innerContent;
        var extent = webMercatorUtils.webMercatorToGeographic(event.extent);
        innerContent = "XMin: " + extent.xmin.toFixed(2) + "&nbsp;" +
          "YMin: " + extent.ymin.toFixed(2) + "&nbsp;" +
          "XMax: " + extent.xmax.toFixed(2) + "&nbsp;" +
          "YMax: " + extent.ymax.toFixed(2);

        dom.byId("info").innerHTML = innerContent;
      }

      // jQuery stuff
      function jQueryReady(){
        // Create jQuery Slider
        createSlider();

        var markerSymbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_X,
          12, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
            new Color([92, 156, 255, 1]), 4));

        var graphic;

        on(map, "click", function (event){
          console.log("Map click event");
          // Add a graphic at the clicked location
          if (graphic) {
            graphic.setGeometry(event.mapPoint);
          }
          else {
            graphic = new Graphic(event.mapPoint, markerSymbol);
            map.graphics.add(graphic);
          }

          formatNumber = function (value, key, data){
            return value.toFixed(2);
          };

          var infoContent = lang.substitute(
            webMercatorUtils.webMercatorToGeographic(event.mapPoint),
            "Latitude (y): ${y:formatNumber} <br> Longitude (x): ${x:formatNumber}");

          map.infoWindow.setTitle("Location:");
          map.infoWindow.setContent(infoContent);
          map.infoWindow.show(event.mapPoint);
        });
      }

      function createSlider(){
        $("#jqSlider").slider({
          min: 0,
          max: map.getLayer(map.layerIds[0]).tileInfo.lods.length - 1,
          value: map.getLevel(),
          orientation: "vertical",
          range: "min",
          change: function (event, ui){
            map.setLevel(ui.value);
          }
        });

        on(map, "zoom-end", function (){
          $("#jqSlider").slider("value", map.getLevel());
        });
      }
    });*/