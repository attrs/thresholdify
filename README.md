# thresholdify

function 을 특정시간(ms) 동안 한번만 호출되도록 해줍니다. 브라우저와 node.js 를 지원합니다.

## 설치하기

```sh
$ npm i thresholdify --save
```

## 사용법
### `thresholdify(fn, [ms])` -> Promise
- 파라미터
  - fn : function
  - ms : 임계시간 millisecond

- 반환값
  - Promise 객체


```javascript
const thresholdify = require('thresholdify');

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
```

```javascript
const fn = (a,b) => {
  console.log('function called(' + a + '/' + b + ')');
};

const wrapfn = thresholdify(fn, 50);

setTimeout(async () => await wrapfn(1,10), 10);
setTimeout(async () => await wrapfn(2,20), 20);
setTimeout(async () => await wrapfn(6,200), 200);
```

```javascript
const fn = async (a,b) => {
  console.log('function called(' + a + '/' + b + ')');
};

const wrapfn = thresholdify(fn, 50);

setTimeout(async () => await wrapfn(1,10), 10);
setTimeout(async () => await wrapfn(2,20), 20);
setTimeout(async () => await wrapfn(6,200), 200);
```


반환된 Promise 를 통해 결과값을 처리할 수 있습니다.

```javascript
const fn = (arg1, arg2) => {
  ...
  return result;
};

const promise = thresholdify(fn);

promise(arg1, arg2)
  .then(result => { ... })
  .catch(err => { ... });
  
혹은
async () => {
  ...
  const result = await promise(arg1, arg2);
  ...
}
```

## Promise 를 지원하지 않는 경우

```
var thresholdify = require('thresholdify/lib/thresholdify-compat');

var fn = (arg1, arg2) => {
  ...
  return result;
};

var wrapfn = thresholdify(fn);

wrapfn(arg1, arg2)
  .then(result => { ... })
  .catch(err => { ... });
```


## License
MIT License. [LICENSE](./LICENSE)
