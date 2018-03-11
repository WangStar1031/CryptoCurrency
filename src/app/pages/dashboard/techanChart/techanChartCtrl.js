/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard.techanChart')
      .controller('techanChartCtrl', techanChartCtrl);

  /** @ngInject */
  function techanChartCtrl($scope, $element, layoutPaths, baConfig, $interval, dashboardService) {
    $scope.service = dashboardService;
    $scope.techanChart = null;
    var layoutColors = baConfig.colors;
    $scope.chartData = [];
    $scope.isShowPrediction = false;
    $scope.id = $element[0].getAttribute('id');

    $scope.$watch('service.getNotify()', function(datas){
      $scope.chartData = [];
      var _newData = $scope.service.getTechanData();
      console.log(_newData[0]);
      for(var i = 0; i < _newData.length; i++){
        var data = _newData[i];
        $scope.chartData.push({
          date: new Date(data.date),
          value: data.val * 1,
          value1: data.predict * 1,
          volume: data.sentiment//(data.sentiment == 0 ? -1 : 1)
        });
      }
      // console.log($scope.chartData.length);
      if( $scope.chartData.length == 0) return;
      console.log($scope.chartData[0]);
      $scope.drawChart();
    });

    $scope.generateChartData = function() {
      console.log($scope.chartData[0]);
      return $scope.chartData;
    }
    $scope.predictionShow = function(){
      $scope.isShowPrediction = !$scope.isShowPrediction;

      if( $scope.isShowPrediction){
        if( $scope.techanChart.panels[0].stockGraphs.length > 1)return;
        var graph = new AmCharts.StockGraph();

        graph.id = "g2";
        graph.valueField = "value1";
        graph.type = "smoothedLine";
        graph.lineThickness = 2;
        graph.bullet = "round";
        graph.bulletBorderColor = "#FFFFFF";
        graph.bulletBorderAlpha = 0.6;
        graph.bulletBorderThickness = 2;
        graph.lineColor = "#FF0000";
        graph.useDataSetColors = false;

        $scope.techanChart.panels[0].stockGraphs.push(graph);
      } else{
        if( $scope.techanChart.panels[0].stockGraphs.length == 1)return;
        var graph = $scope.techanChart.panels[0].stockGraphs.pop();
        // $scope.techanChart.validateData();
        // $scope.techanChart.removeGraph(graph);
      }
      $scope.techanChart.validateData();
    }

    $scope.drawChart = function(){
      if( $scope.techanChart == null){
        console.log("makeChart");
        $scope.techanChart = AmCharts.makeChart("techanChart", {
            type: "stock",
            categoryAxesSettings: {
              minPeriod: "mm"
            },

            dataSets: [{
              color: "#b0de39",
              fieldMappings: [{
                fromField: "value",
                toField: "value"
              }, {
                fromField: "value1",
                toField: "value1"
              }, {
                fromField: "volume",
                toField: "volume"
              }],
              dataProvider: $scope.generateChartData(),
              categoryField: "date"
            }],

            panels: [{

                showCategoryAxis: false,
                title: "Value",
                percentHeight: 70,

                stockGraphs: [{
                  id: "g1",
                  valueField: "value",
                  type: "smoothedLine",
                  lineThickness: 2,
                  bullet: "round",
                  bulletBorderColor: "#FFFFFF",
                  bulletBorderAlpha: 0.6,
                  bulletBorderThickness: 2,
                  balloonText:"[[value]]"
                }/*,{
                  id: "g2",
                  valueField: "value1",
                  type: "smoothedLine",
                  lineThickness: 2,
                  bullet: "round",
                  bulletBorderColor: "#FFFFFF",
                  bulletBorderAlpha: 0.6,
                  bulletBorderThickness: 2,
                  lineColor: "#FF0000",
                  useDataSetColors: false
                }*/],
                stockLegend: {
                  valueTextRegular: "[[value]]",
                  markerType: "none"
                }
              },

              {
                title: "Volume",
                percentHeight: 30,

                stockGraphs: [{
                  valueField: "volume",
                  type: "column",
                  cornerRadiusTop: 2,
                  fillAlphas: 1,
                  negativeLineColor: "#FF0000",
                  negativeFillColors: "#FF0000"
                }],

                stockLegend: {
                  periodValueTextRegular: "[[value]]",
                  markerType: "none"
                }
              }
            ],

            // chartScrollbarSettings: {
            //   graph: "g1",
            //   usePeriod: "10mm",
            //   updateOnReleaseOnly:false
            // },

            // chartCursorSettings: {
            //   valueBalloonsEnabled: true,
            //   valueLineEnabled: true,
            //   valueLineBalloonEnabled: true
            // },

            chartScrollbarSettings: {
              graph: "g1"
            },
            chartCursorSettings: {
              valueBalloonsEnabled: true,
              valueLineEnabled:true,
              valueLineBalloonEnabled:true,
              fullWidth: true,
              cursorAlpha: 0.1,
              valueLineAlpha: 0.5
            },

            periodSelector: {
              dateFormat: "YYYY-MM-DD HH:NN",
              inputFieldWidth: 150,
              periods: [{
                period: "hh",
                count: 1,
                label: "1 hour"
              }, {
                period: "hh",
                count: 2,
                label: "2 hours"
              }, {
                period: "hh",
                count: 5,
                label: "5 hour"
              }, {
                period: "hh",
                count: 12,
                label: "12 hours"
              }, {
                period: "MAX",
                label: "MAX"
              }]
            },

            panelsSettings: {
              usePrefixes: true,
              creditsPosition: "bottom-right"
            },


            // "export": {
            //   "enabled": true,
            //   // override some of the defaults (Stock Chart specific)
            //   "periodSelector": {
            //     "position": "left"
            //   },
            //   "dataSetSelector": {
            //     "position": "left"
            //   }
            // }
        });
      } else{
        console.log("validateData");
        $scope.techanChart.dataProvider = $scope.generateChartData();
        $scope.techanChart.validateData();
      }
    }
    $interval(function(){
      $scope.service.getTechanEntry();
    }, 1000 * 60 * 5);
    $scope.service.getTechanEntry();
  }

})();
