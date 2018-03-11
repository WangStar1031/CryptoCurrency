/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .controller('dashboardTopScrollCtrl', dashboardTopScrollCtrl);

  /** @ngInject */
  function dashboardTopScrollCtrl($scope, $timeout, baConfig, dashboardService) {
    $scope.service = dashboardService;
    $scope.MainCurrency = "BTC : ";
    $scope.MainCurrencyPrice = "";
    $scope.mainCurrencyType = 0;
    $scope.CurrencyBTC = [];
    $scope.CurrencyETH = [];
    $scope.CurrencyXMR = [];
    $scope.CurrencyUSDT = [];
    $scope.$watch('service.getBTCData()', function(_newsData){
      $scope.CurrencyBTC = _newsData;
      $scope.makeMarqueeString();
    });
    $scope.$watch('service.getETHData()', function(_newsData){
      $scope.CurrencyETH = _newsData;
    });
    $scope.$watch('service.getXMRData()', function(_newsData){
      $scope.CurrencyXMR = _newsData;
    });
    $scope.$watch('service.getUSDTData()', function(_newsData){
      $scope.CurrencyUSDT = _newsData;
    });
    $scope.makeMarqueeString = function(){
      var currencyForMarquee = [];
      switch($scope.mainCurrencyType){
        case 0: currencyForMarquee = $scope.CurrencyBTC; break;
        case 1: currencyForMarquee = $scope.CurrencyETH; break;
        case 2: currencyForMarquee = $scope.CurrencyXMR; break;
        case 3: currencyForMarquee = $scope.CurrencyUSDT; break;
      }
      $scope.MainCurrencyPrice = "";
      for( var i = 0; i < currencyForMarquee.length; i++){
        $scope.MainCurrencyPrice += currencyForMarquee[i].coin + ": " + currencyForMarquee[i].price + " ";
      }
    }
    $scope.$watch('service.getCurrencyType()', function(_newsData){
      $scope.mainCurrencyType = _newsData;
      $scope.makeMarqueeString();
    })
  }
})();