/**
 * @author a.demeshko
 * created on 12/18/15
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard.techanChart', [])
    .config(routeConfig).config(techanChartConfig);
    // .service('techanChartService', techanChartService);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('dashboard.techanChart', {
        url: '/techanChart',
        templateUrl: 'app/pages/dashboard/techanChart/techanChart.html'
      });
  }

  function techanChartConfig( baConfigProvider) {
      var layoutColors = baConfigProvider.colors;
  }

  // function techanChartService($rootScope){
  //   this.rootScope = $rootScope;
  //   this.mainType = "BTC";
  //   this.subType = "AMP";
  //   this.techanChartData = [];
  //   this.isChange = false;
  //   this.getTechanChartData = function(_this){
  //     // console.log("getTechanChartData");
  //     $.ajax({
  //         method: 'GET',
  //         data: {},
  //         url: "http://www.icaroai.com/icaroai/rest/charting/chart/"+_this.mainType+"/"+_this.subType+"/12h",
  //         // url: "http://www.icaroai.com/icaroai/rest/charting/chart/BTC/AMP/12h",
  //         dataType: 'json',
  //         success: function(data){
  //           console.log(data);
  //           _this.techanChartData = data;
  //           _this.isChange = !_this.isChange;
  //           _this.rootScope.$apply();
  //         }
  //     });
  //   }
  //   this.getTechanEntry = function(){
  //     this.getTechanChartData(this);
  //   }
  //   this.getNotify = function(){
  //     return this.isChange;
  //   }
  //   this.getTechanData = function(){
  //     return this.techanChartData;
  //   }
  //   this.setChartDataType = function(_mainType, _subType){
  //     console.log("setChartDataType");
  //     this.mainType = _mainType;
  //     this.subType = _subType;
  //     this.getTechanChartData(this);
  //   }
  // }

})();