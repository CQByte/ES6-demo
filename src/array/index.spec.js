var expect = require('chai').expect;

describe("数组的扩展", function () {

	it('扩展运算符', function () {
		//扩展运算符（spread）是三个点（...）。它好比 rest 参数的逆运算，将一个数组转为用逗号分隔的参数序列。
		console.log(...[1, 2, 3])
	});

	it('扩展运算符后面还可以放置表达式', function () {
		let x = true
		console.log([...x?[1, 2, 3]:[4, 5, 6], 7, 8, 9])
	});

	it('克隆数组', function () {
		let a1 = [1, 2, 3]
		let a2 = a1
		let a3 = [...a1]

		expect(a2).to.be.equal(a1)
		expect(a3).to.be.not.equal(a1)
	});

	it('扩展运算符还可以将字符串拆开，而且最重要的是能够正确识别四个字节的 Unicode 字符', function () {
		let a = '\u{20bb7}'
		console.log(a.length, [...a].length)
	});

	it('任何 Iterator 接口的对象都可以用扩展运算符转为真正的数组。', function () {
		let map = new Map([
			[1, 'one'],
			[2, 'two'],
			[3, 'three'],
		]);

		console.log([...map.keys()])

		const go = function*(){
			yield 1;
			yield 2;
			yield 3;
		};

		console.log([...go()])
	});

	it('Array.from方法用于将两类对象转为真正的数组', function () {
		// 类似数组的对象（array-like object）和可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map）。
		// array-like object 本质特征只有一点，即必须有length属性。因此，任何有length属性的对象，都可以通过Array.from方法转为数组，而此时扩展运算符就无法转换。

		// array-like object
		let arrayLike = {
			'0': 'a',
			'1': 'b',
			'3': 'c',
			length: 3
		};
		// ES5的写法
		let arr1 = [].slice.call(arrayLike); //[ 'a', 'b', <1 empty item> ]

		// ES6的写法
		let arr2 = Array.from(arrayLike); //[ 'a', 'b', undefined ]

		console.log(arr1, arr2)
	});

	it('Array.from の 第二个参数', function () {
		let a = Array.from([1, 2, 3], (x) => {
			console.log(x)
			return x*2
		})
		console.log(a)
	});

	it('Array.of总是返回参数值组成的数组。如果没有参数，就返回一个空数组。', function () {
		console.log(Array.of(), Array())
		console.log(Array.of(3), Array(3))
		console.log(Array.of(undefined), Array(undefined))
		console.log(Array.of(1, 2), Array(1, 2))
	});

	it('遍历数组', function () {
		// ES6 提供三个新的方法——entries()，keys()和values()——用于遍历数组。它们都返回一个遍历器对象
		for (let index of ['a', 'b'].keys()) {
			console.log(index);
		}
		// 0
		// 1

		// for (let elem of ['a', 'b'].values()) { node8好像不支持
		// 	console.log(elem);
		// }
		// 'a'
		// 'b'

		for (let [index, elem] of ['a', 'b'].entries()) {
			console.log(index, elem);
		}
		// 0 "a"
		// 1 "b"
	});

	it('includes', function () {
		// 第二个参数是搜索起始位置默认为0。如果第二个参数为负数，则表示倒数的位置，
		// 如果这时它大于数组长度（比如第二个参数为-4，但数组长度为3），则会重置为从0开始。

		expect([1, 2, 3].includes(1, 0)).to.be.equal(true)
		expect([NaN].includes(NaN)).to.be.equal(true)
		expect([NaN].indexOf(NaN)).to.be.equal(-1)
	});
})