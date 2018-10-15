var expect = require('chai').expect;

/**
 * Proxy 用于修改某些操作的默认行为，等同于在语言层面做出修改，
 * 所以属于一种“元编程”（meta programming），即对编程语言进行编程。
 */
describe("Proxy", function () {

	it('get/set', function () {
		// obj.foo 或 obj['foo']
		let obj = new Proxy({}, {
			/**
			 * @param target    目标对象
			 * @param key       属性名和
			 * @param receiver  proxy 实例本身（操作行为所针对的对象）
			 * @returns {any}
			 */
			get: function (target, key, receiver) {
				console.log(`getting ${key}:${target[key]}`);
				return Reflect.get(target, key, receiver);
			},

			/**
			 * @param target
			 * @param key
			 * @param value
			 * @param receiver  可选
			 * @returns {boolean}
			 */
			set: function (target, key, value, receiver) {
				console.log(`setting ${key}:${value}`);
				return Reflect.set(target, key, value, receiver);
			}
		});

		obj.pp = 1
		console.log(obj['pp'])

		Object.defineProperty(obj, 'pp', {
			value: 2
		})

		console.log(obj['pp'])
	});

	it('如果一个属性不可配置（configurable）且不可写（writable），则 Proxy 不能修改该属性，否则通过 Proxy 对象访问该属性会报错。', function () {
		const target = Object.defineProperties({}, {
			foo: {
				value: 123,
				writable: false,
				configurable: false
			},
		});

		const proxy = new Proxy(target, {
			get(target, propKey) {
				return 123; // 此处返回的值必须与target.foo相等，否则报错
			}
		});

		proxy.foo
	});

	it('apply', function () {
		// apply方法拦截函数的调用、call和apply操作。
		let func = function () {
			console.log('the func')
		}

		let p = new Proxy(func, {
			apply(...params){
				console.log(params)
				Reflect.apply(...params)
			}
		})

		p.call({env: 'mock'}, 233)
		p.apply({env: 'mock'}, [233])

	});


})