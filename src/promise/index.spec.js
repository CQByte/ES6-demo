var expect = require('chai').expect;

/**
 * 事件の封装，将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数
 */
describe("promise", function () {

	it('基本操作', function () {
		const promise = new Promise(function(resolve, reject) {
			let result = Math.random()>0.5
			//throw new Error('throw error')// 这个错误可以抛出去
			setTimeout(() => {
				//throw new Error('throw error')// 这个异步错误是抛不出去的
				if (result){
					resolve('success');
				} else {
					reject('error msg');
				}
			}, 1500)
		});

		console.log('loading...')

		promise.then(res => {
			console.log(res) // success
		}, err => {
			console.log('then: error', err)   // error msg
		}).catch(e => {
			console.log('catch: error', e)    // error msg
		})
	});

	it('promise对象嵌套', function () {
		const p1 = new Promise(function (resolve, reject) {
			setTimeout(() => {
				console.log('resolve: p1')
				resolve('P1');
			}, 1000)
		});

		const p2 = new Promise(function (resolve, reject) {
			setTimeout(() => {
				console.log('resolve: p2')
				resolve(p1);
			}, 2000)

		})

		p2.then(data => {
			console.log('then', data)
		})
	});

	it('立即 resolved 的 Promise 是在本轮事件循环的末尾执行，总是晚于本轮循环的同步任务。', function () {
		new Promise((resolve, reject) => {
			resolve(1);
			console.log(2);  //先
		}).then(r => {
			console.log(r);  //后
		});
	});

	it('then方法返回的是一个新的Promise实例', function () {
		new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(1)
			}, 1000)
		}).then(data => {
			console.log('then 1:', data)

			// 也可以 return 一个非Promise对象，将被包装成立即 resolve 的 Promise 对象返回
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve(data+ ' copy')
				}, 1000)
			})
		}).then(data => {
			console.log('then 2:', data)
		});
	});

	it('错误总是会被下一个catch语句捕获。', function () {
		new Promise((resolve, reject) => {
			reject('error')
		}).then(data => {
			console.log('then1', data)
		}).then(data => {
			console.log('then2', error)
		}).catch(error => {
			console.log('catch2', error)
		})
		// .finally(res => {
		// 	console.log('finally:' + res)
		// })
	});

	it('Promise.resolve', function () {
		// tips: 立即resolve的 Promise 对象，是在本轮“事件循环”（event loop）的结束时，而不是在下一轮“事件循环”的开始时。
		//    setTimeout(fn, 0)在下一轮“事件循环”开始时执行

		// 1. 参数是一个Promise对象，Promise.resolve将不做任何修改、原封不动地返回这个实例。
		// 2. 参数是一个 thenable 对象，thenable 对象指的是具有then方法的对象，比如下面这个对象。
		let thenable = {
			then: function(resolve, reject) {
				resolve(42);
			}
		};
		// Promise.resolve方法会将这个对象转为 Promise 对象，然后就立即执行thenable对象的then方法。
		let p1 = Promise.resolve(thenable);
		/**
		 * 立即resolve
		 */
		p1.then(function(value) {
			console.log('p1', value);  // 42
		});

		// 3. 参数不是具有then方法的对象，或根本就不是对象

		// 如果参数是一个原始值，或者是一个不具有then方法的对象，则Promise.resolve方法返回一个新的 Promise 对象，
		// 状态为resolved。
		const p2 = Promise.resolve('Hello');

		/**
		 * 状态固定
		 */
		p2.then(function (s){
			console.log('p2', s)
		});

		// 4. 不带有任何参数
		// Promise.resolve方法允许调用时不带参数，直接返回一个resolved状态的 Promise 对象。
		const p3 = Promise.resolve();

		/**
		 * 状态固定
		 */
		p3.then(function (data) {
			console.log('p3', data)
		});

		//所以执行顺序是 2 3 1
	});

	it('Promise.reject', function () {
		// Promise.reject(reason)方法也会返回一个新的 Promise 实例，该实例的状态为rejected。
		// Promise.reject()方法的参数，会原封不动地作为reject的理由，
		// 变成后续方法的参数。这一点与Promise.resolve方法不一致。
		const p = Promise.reject('出错了');

		p.then(null, function (s) {
			console.log(s)
		});
	});
})