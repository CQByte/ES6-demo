var expect = require('chai').expect;

describe("Generator函数", function () {

	/**
	 * 执行 Generator 函数会返回一个遍历器对象，也就是说，Generator 函数除了状态机，
	 * 还是一个遍历器对象生成函数。返回的遍历器对象，可以依次遍历 Generator 函数内部的每一个状态。
   *
   * 调用next方法会运行到下一个yield表达式。
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
			console.log('input', input) // undefined
			return
		}
		let i = demo();
		console.log(i.next());
		console.log(i.next());
		console.log(i.next());
		console.log(i.next());
		console.log(i.next());
	});

});

describe('Generator 函数进阶套路', function () {

  it('Gnerator函数执行流程', function () {
    function* f() {
      console.log('generator:start');
      let y1 = yield 'yield one';
      console.log('y1:', y1)
      let y2 = yield 'yield two';
      console.log('y2:', y2)
    }

    let i = f();

    console.log('------next:start-------')
    console.log('next:1', i.next('param1'))
    console.log('-------------')
    // yield语句优先执行完
    console.log('next:2', i.next())
    console.log('-------------')
    console.log('next:3', i.next('param3'))
    console.log('-------END-------')

  });

  /**
   * next方法返回的是 yield 后的表达式的值，next方法的参数是
   * yield语句(下一个）的返回值，下轮语句就可以获取到这个值
   */
  it('next方法的参数', function () {
    function* f() {
      console.log('yield1', yield 1);
      console.log('yield2', yield 2);
      console.log('yield3', yield 3);
    }

    let i = f();
    console.log('loading...')
    console.log('next1: ', i.next()) // 第一个yield接不到
    console.log('loading...')
    console.log('next3: ', i.next())
    console.log('next4: ', i.next())
  });

	it('Generator 函数嵌套', function () {
		function* f() {
			yield 'a'
			yield 'b'
		}

		function* f1() {
			yield 'c'
			for(let i of f()){
				console.log(i)
			}
			yield 'd'
		}

		for(let i of f1()){
			console.log(i)
		}
	});

	it('yield* 在Generator函数里遍历iterator', function () {
		function* f() {
			yield 'a'
			yield 'b'
		}

		function* f1() {
			yield 'c'
			yield* f() // 同上例，等同于在Generator内部部署一个for...of循环，区别在于return
			yield 'd'
		}

		for(let i of f1()){
			console.log(i)
		}
	});

	it('yield* 相关', function () {
		function* f() {
			yield* ['a', 'b']
		}
		console.log(...f())
	});

	it('作为对象属性', function () {
		let obj = {
			* MG(){
				yield '666'
			}
		}
		console.log(...obj.MG())
	});

	it('this', function () {
		function* f() {
			this.a = 'a'
			yield 'a1'
		}
		f.prototype.b = 'b'
		let i = f(); // i 是 f 的实例，继承f的原型。但是f()返回的是遍历器对象而不是this，所以i无法访问a

		expect(i.b).to.be.equal(f.prototype.b)
	});

	it('函数访问原型上的属性', function () {
		function f() {}
		f.prototype.a = 'a'
		console.log(f)
		console.log(f.a)
		console.log(f.prototype.a)

		console.log(f.__proto__ == Function.prototype)
		console.log(Function.prototype.__proto__ == Object.prototype)
		console.log('原型链的终点', Object.prototype.__proto__)
	});


  it('should ', function () {
    var gen = function* gen(){
      try {
        yield console.log('a');
        console.log('/////')
        yield console.log('b'); // 没有输出
        console.log('/////')
      } catch (e) {
        console.log('/////')
        console.log('error')
        console.log('/////')
      }
      console.log('/////')
      yield console.log('c');
      console.log('/////')
      yield console.log('d');
    }

    var g = gen();
    console.log('-----')
    g.next() // a
    console.log('-----')
    g.throw() // b
    console.log('-----')
    g.next() // c
    console.log('-----')
  });

});
})
