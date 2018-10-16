var expect = require('chai').expect;

describe("Generator函数", function () {

	/**
	 * 执行 Generator 函数会返回一个遍历器对象，也就是说，Generator 函数除了状态机，
	 * 还是一个遍历器对象生成函数。返回的遍历器对象，可以依次遍历 Generator 函数内部的每一个状态。
	 */
	it('基本操作', function () {
		function* test() {
			console.log('init...')
			yield 'hello';

			console.log('loading...')

			yield 'world';
			yield '!';
			return 'ending';
		}

		//调用 Generator 函数后，该函数并不执行，返回的也不是函数运行结果，而是一个指向内部状态的指针对象
		let result = test();

		console.log('执行next...')

		while (true){
			let item = result.next();
			console.log(item)
			if(item.done){
				break;
			}
		}

	});

	it('返回的iterator状态分离', function () {
		function* test() {
			yield 'hello';
			yield 'world';
			return 'ending';
		}

		let r1 = test();
		r1.next()
		let r2 = test();
		r1.next()
		console.log(r2.next())
	});

	it('yield表达式如果用在另一个表达式之中，必须放在圆括号里面。', function () {
		function* demo() {
			console.log('Hello 1' + (yield)); // OK
			console.log('Hello 2' + (yield 123)); // OK
			let input = yield 23333; // OK
			console.log('input', input)
			return
		}
		let i = demo();
		console.log(i.next());
		console.log(i.next());
		console.log(i.next());
		console.log(i.next());
		console.log(i.next());
	});



})