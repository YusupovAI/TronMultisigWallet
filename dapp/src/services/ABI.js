(
  function () {
    angular
    .module("multiSigWeb")
    .service("ABI", function (Web3Service) {
      var factory = {
        saved: JSON.parse(localStorage.getItem("abis")) || {},
      };

      factory.get = function () {
        return JSON.parse(localStorage.getItem("abis")) || {};
      };

      factory.update = function (abi, to, name) {
        console.log('updating');
        console.log('updated');
        factory.saved[to] = { abi: abi, name: name};

        localStorage.setItem("abis", JSON.stringify(factory.saved));
      };

      factory.remove = function (to) {
        delete factory.saved[to];
        localStorage.setItem("abis", JSON.stringify(factory.saved));
      };

      factory.getMethod = function (abi, data) {
        console.log(abi);
        for (let i = 0; i < abi.length; ++i) {
          if (!abi[i].type || abi[i].type.toLowerCase() != 'function' || abi[i].constant) {
            continue;
          }
          console.log('lul');
          var types = abi[i].inputs.map((x) => x.type);
          var bytes = Web3Service.tronWeb.utils.ethersUtils.toUtf8Bytes(
            abi[i].name + '(' + types.join(',') + ')'
          );
          var selector = Web3Service.tronWeb.utils.ethersUtils.keccak256(bytes).slice(2, 10);
          if (selector == data.slice(2, 10)) {
            return abi[i];
          }
        }
      }

      factory.decode = function (to, data) {
        var abi = factory.saved[to];
        if (!abi) {
          if (data.length > 20) {
            return {
              title: data.slice(0, 20) + "...",
              notDecoded: true
            };
          }
          else {
            return {
              title: data.slice(0, 20),
              notDecoded: true
            };
          }
        } else {
          var method = factory.getMethod(abi.abi, data);
          method.outputs = method.inputs;
          var decoded = Web3Service.tronWeb.utils.abi.decodeParamsV2ByABI(method, '0x' + data.slice(10));
          var params = []
          for (let i = 0; i < method.outputs.length; ++i) {
            params.push({
              name: method.outputs[i].name,
              value: decoded[i].toString(),
            });
          };
          return {
            title: method.name,
            notDecoded: false,
            params: params,
          }
        }
      };

      return factory;
    });
  }
)();
