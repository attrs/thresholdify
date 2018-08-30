module.exports = function(fn, delay) {
  delay = +delay || 1;
  var timer, self = this;

  function doit(fn, args, resolve, reject) {
    clearTimeout(timer);
    timer = setTimeout(function() {
      try {
        resolve(fn.apply(self, args));
      } catch(err) {
        reject(err);
      }
    }, delay);
  }

  return function() {
    var args = arguments;

    if( typeof Promise === 'undefined' ) {
      var dones = [],catches = [];
      return {
        then: function(done) {
          dones.push(done);
          doit(fn, args, function() {
            var argr = arguments;
            dones.forEach(function(fn) {
              fn.apply(self, argr);
            });
          }, function(err) {
            catches.forEach(function(fn) {
              fn.call(self, err);
            });
          });
          return this;
        },
        catch: function(fn) {
          catches.push(fn);
          return this;
        }
      }
    }

    return new Promise(function(resolve, reject) {
      doit(fn, args, resolve, reject);
    });
  };
};
