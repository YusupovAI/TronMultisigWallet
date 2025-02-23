(
  function () {
    angular
    .module("multiSigWeb")
    .controller("depositCtrl", function ($scope, Transaction, $uibModalInstance, Wallet, Utils, wallet, Web3Service) {
      $scope.wallet = wallet;
      $scope.amount = 10;
      $scope.deposit = function () {        
        Transaction.sendTrx(
          {
            to: $scope.wallet.address,
            from: Web3Service.coinbase,
            value: new Web3().toBigNumber($scope.amount).mul('1e6'),
          },
          function (e, tx) {
            if (e) {
              Utils.dangerAlert(e);
            }
            else if (tx.blockNumber) {
              Utils.success("Deposit transaction was mined.");
            }
            else {
              Utils.notification("Deposit transaction was sent.");
              $uibModalInstance.close();
            }
          }
        );
      };

      $scope.sign = function () {
        Transaction.signOffline(
          {
            to: $scope.wallet.address,
            value: new ethereumjs.BN(new Web3().toWei($scope.amount))
          },
          function (e, signed) {
            if (e) {
              Utils.dangerAlert(e);
            }
            else {
              $uibModalInstance.close();
              Utils.signed(signed);
            }
          });
        };

        $scope.cancel = function () {
          $uibModalInstance.dismiss();
        };
    });
  }
)();
