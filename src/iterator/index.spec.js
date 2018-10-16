var expect = require('chai').expect;

describe("遍历器", function () {

	it('部署遍历器', function () {
		function MyIterator(obj) {
			return {
				[Symbol.iterator]() {

					return {
						__keys: Reflect.ownKeys(obj),
						next() {
							if(this.__keys.length == 0) {
								return { done: true };
							}else{
								return { value: obj[this.__keys.shift()], done: false };
							}
						},
						return() {
							// 如果for...of循环提前退出（通常是因为出错，或者有break语句），就会调用return方法。
							console.log('return...')
							return { done: true };
						}
					};
				}

			};
		}

		let a = MyIterator({
			a: 'aa', b: 'bb', c: 'cc', d: 'dd'
		})

		for(let value of a){
			console.log(value)
			if(value == 'cc'){
				break
			}
		}

	});
})