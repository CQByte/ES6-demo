var expect = require('chai').expect;

describe("promise", function () {
    /**
     * 把函数作为参数或返回值的函数
     */
    it('高阶函数', function () {
        //典型：数组的sort方法(原地算法，修改的是原数组)
        let arrayA = [2,4,2,3,1,4,3,8,5]
        arrayA.sort(function (a, b) {
            return a - b;
        })
        console.log(arrayA)
    });

    it('订阅事件就是一个高阶函数的应用', function () {

    });

    /**
     * 创建一个函数，用来调用另一个[参数或变量已经预置的函数] 的 函数用法
     */
    it('偏函数', function () {
        // 著名类库 Underscore提供的after()方法
        // 需要调用times次after返回的函数才会执行func
        let after = function (times, func) {
            if(times <= 0) return func();
            return function () {
                if(--times < 1) {return func.apply(this, arguments)}
            }
        }
        let test = after(3, (...p) => console.log(p))
        test(1); test(2); test(1, 2, 3); // 3
    });
});