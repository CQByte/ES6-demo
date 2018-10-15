var expect = require('chai').expect;

describe("解构赋值", function () {

	it("对已声明变量进行赋值", function () {
		let a, b, c, d;

		({a, b} = {a:1, b:2});
		[c, d] = [3,4]

		expect(a).to.be.equal(1)
		expect(b).to.be.equal(2)
		expect(c).to.be.equal(3)
		expect(d).to.be.equal(4)

		//因为 JavaScript 引擎会将{x}理解成一个代码块，从而发生语法错误。
		// 只有不将大括号写在行首，避免 JavaScript 将其解释为代码块，才能解决这个问题。
	})

	it('声明时赋值', function () {

		let [bar, foo] = [1];

		expect(bar).to.be.equal(1)
		expect(foo).to.be.equal(undefined)

	});

	it('只要某种数据结构具有 Iterator 接口，都可以采用数组形式的解构赋值。', function () {
		function* fibs() {
			let a = 0;
			let b = 1;
			while (true) {
				yield a;
				[a, b] = [b, a + b];
			}
		}

		let [first, second] = fibs();
		expect(first).to.be.equal(0)
		expect(second).to.be.equal(1)
	});

	it('对象解构赋值：变量名与属性名不一致', function () {
		let foo;

		({baz:foo} = {baz: 1});
		expect(foo).to.be.equal(1)

		//这实际上说明，对象的解构赋值是下面形式的简写
		// let { foo: foo, bar: bar } = { foo: "aaa", bar: "bbb" };
		// 也就是说，对象的解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变量。
		// 真正被赋值的是后者，而不是前者。
	});

	it('数值和布尔值的解构赋值', function () {
		//解构赋值时，如果等号右边是数值和布尔值，则会先转为对象。

		let {toString: s} = 123;
		expect(s).to.be.equal(Number.prototype.toString)

		let {toString: x} = true;
		expect(x).to.be.equal(Boolean.prototype.toString)

		//上面代码中，数值和布尔值的包装对象都有toString属性，因此变量s都能取到值。

		// 解构赋值的规则是，只要等号右边的值不是对象或数组，就先将其转为对象。
		// 由于undefined和null无法转为对象，所以对它们进行解构赋值，都会报错。
		// let { prop: x } = undefined; // TypeError
		// let { prop: y } = null; // TypeError
		//
	});

	it('不能使用圆括号的情况', function () {
		//声明语句
		// let [(a)] = [1]; //SyntaxError: Unexpected token (

		//函数参数 函数参数也属于变量声明，因此不能带有圆括号。
		// function f([(z)]) { return z; } //SyntaxError: Unexpected token (

		//赋值语句的模式
		// ([a]) = [5];
		// [({ p: a }), { x: c }] = [{}, {}];

	});

})