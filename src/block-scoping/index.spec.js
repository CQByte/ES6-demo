var expect = require('chai').expect;

describe("let、const & 块级作用域", function () {

	it('块级作用域', function () {
		let a = 1
		{
			let b = 1;
			var c = 1
		}
		console.debug('块级作用域:', typeof a,typeof b,typeof c)
	})

	it('经典作用域问题', function () {
		var a = [];
		for (var i = 0; i < 10; i++) {
			a[i] = function () {
				return i;
			};
		}
		//i是全局变量，内部函数里输出的是同一个变量i
		expect(a[9]()).to.equal(10)
	})

	it('解决经典作用域问题', function () {
		var a = [];
		for (var i = 0; i < 10; i++) {
			(function() {
				var _i = i
				a[_i] = function () {
					return _i;
				};
			}())
		}
		//i作用域仅限于某次循环
		expect(a[9]()).to.equal(9)
	})

	it('let 解决经典作用域问题', function () {
		var a = [];
		for (let i = 0; i < 10; i++) {
			a[i] = function () {
				return i;
			};
		}
		//当前的i只在本轮循环有效，所以每一次循环的i其实都是一个新的变量，
		expect(a[9]()).to.equal(9)
	})

	it('暂时性死区,不存在变量提升', function () {
		// 暂时性死区的本质就是，只要一进入当前作用域，所要使用的变量就已经存在了，
		// 但是不可获取，只有等到声明变量的那一行代码出现，才可以获取和使用该变量。

		try {
			let t = typeof a;
			let a = 1;
		}catch (e) {
			//typeof 不再安全，这种情况总是报错
			expect(e.message).equal('a is not defined')
		}

		function tdz(x = y, y = 1) {}
		try {
			tdz()
		}catch (e) {
			expect(e.message).equal('y is not defined')
		}

	})
	
	it('let不允许在相同作用域内，重复声明同一个变量', function () {
		// 编译都无法通过
		// SyntaxError: Identifier 'a' has already been declared
		// let a = 1;
		// let a = 2
	})

	it('let重复声明实参', function () {
		function tmp(b) {
			let b = 1
		}
		//tmp(2) //SyntaxError: Identifier 'b' has already been declared
	})

	it('块级作用域 ', function () {
		//let实际上为 JavaScript 新增了块级作用域。
		var a = 1
		{
			var a = 2
		}
		expect(a).to.equal(2)

		let b = 1
		{
			let b = 2
		}
		expect(b).to.equal(1)
	});

	it('顶层变量', function () {
		//var命令和function命令声明的全局变量，依旧是顶层对象的属性(node中不是)；另一方面规定，let命令、const命令、class命令声明的全局变量，不属于顶层对象的属性。
		a = 10
		var b = 10
		let c = 10

		expect(global.a).to.equal(10)
		expect(global.b).to.equal(undefined)
		expect(global.c).to.equal(undefined)

	});

})