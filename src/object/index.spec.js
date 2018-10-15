var expect = require('chai').expect;

describe("对象", function () {

	it('super关键字', function () {
		// 指向当前对象的原型对象，只能用在对象的方法中，且不能直接访问？

		const proto = {
			foo: 'hello'
		};

		const obj = {
			foo: 'world',
			find() {
				console.log(super.foo)
			}
		};

		Object.setPrototypeOf(obj, proto);
		obj.find()
	});
})