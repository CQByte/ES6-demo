var expect = require('chai').expect;

describe("Symbol", function () {

	it('ES6 引入了一种新的原始数据类型Symbol', function () {
		let s = Symbol();

		expect(typeof s).to.be.equal('symbol')
	});

	it('Symbol函数前不能使用new命令，否则会报错。这是因为生成的 Symbol 是一个原始类型的值，不是对象。', function () {
		let s = Symbol();
		s.a = 0
		expect(s.a).to.be.equal(undefined)

		//类似于

		let x = 'aa'
		x.a = 0;

		expect(x.a).to.be.equal(undefined)
	});

	it('Symbol函数可以接受一个字符串作为参数，表示对 Symbol 实例的描述，主要是为了在控制台显示，或者转为字符串时，比较容易区分。', function () {
		let s1 = Symbol('foo');

		expect(s1.toString()).to.be.equal('Symbol(foo)')
	});

	it('Symbol函数的参数只是表示对当前 Symbol 值的描述，因此相同参数的Symbol函数的返回值是不相等的', function () {
		let s1 = Symbol('foo')
		let s2 = Symbol('foo')

		console.log(s1.toString() == s2.toString())
		console.log(s1 == s2)
		console.log(s1 === s2)

		expect(s1).to.be.equal(s2)

	});

	it('Symbol.for', function () {
		let s1 = Symbol.for('foo');
		let s2 = Symbol.for('foo');

		let s3 = Symbol('baz'); // 不会被登记在全局环境中供搜索，所以无法再通过Symbol.for('baz')拿到
		let s4 = Symbol.for('baz');

		expect(s1).to.be.equal(s2)
		expect(s3).to.be.not.equal(s4)
	});

	it('Symbol.keyFor方法返回一个已登记的 Symbol 类型值的key。', function () {
		let s1 = Symbol.for("foo");
		expect(Symbol.keyFor(s1)).to.be.equal('foo')

		let s2 = Symbol("foo"); // 未登记
		expect(Symbol.keyFor(s2)).to.be.equal(undefined)
	});



	it('Symbol 也有包装对象', function () {
		let s = Symbol('foo')
		let so = Object(s)
		expect(typeof so).to.be.equal('object')
		expect(so.primaryKey)
	});
})