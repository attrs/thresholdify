const thresholdify = require('../');

const fn = async (a,b) => {
  console.log('function called(' + a + '/' + b + ')');
};

const wrapfn = thresholdify(fn, 50);

setTimeout(async () => await wrapfn(1,10), 10);
setTimeout(async () => await wrapfn(2,20), 20);
setTimeout(async () => await wrapfn(6,200), 200);