const thresholdify = require('../');

const fn = (a,b) => {
  return console.log('function called(' + a + '/' + b + ')');
};

const wrapfn = thresholdify(fn, 50);

wrapfn(1,0); // 무시됨
wrapfn(2,0); // 무시됨
wrapfn(3,0); // 실행됨 (정해진 임계시간동안 마지막 호출만 실행)

setTimeout(() => wrapfn(7, 100), 100); // 무시됨
setTimeout(() => wrapfn(8, 120), 120); // 실행됨 
setTimeout(() => wrapfn(9, 200), 200); // 실행됨