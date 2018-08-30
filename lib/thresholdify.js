module.exports = function(fn, delay) {
  delay = +delay || 1;
  var timer, self = this;

  return function() {
    var args = arguments;
    return new Promise(function(resolve, reject) {
      clearTimeout(timer);
      timer = setTimeout(function() {
        try {
          resolve(fn.apply(self, args));
        } catch(err) {
          reject(err);
        }
      }, delay);
    });
  };
};
