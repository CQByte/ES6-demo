var expect = require('chai').expect;

describe("我的发布/订阅模式实现", function () {

    /**
     * 事件发射器
     * @constructor
     */
    function  MyEvents(){
        let _events = {}
        this._setEvents = function(eventName, callback){
            if(_events[eventName]){
                _events[eventName].count + callback.length;
                _events[eventName].callbacks.push(...callback)
            }else{
                _events[eventName] = {
                    count: callback.length,
                    callbacks: []
                }
                _events[eventName].callbacks.push(...callback)
            }
        }

        this._execute = function (eventName, data) {
            if(_events[eventName] && _events[eventName].count > 0){
                _events[eventName].callbacks.forEach(function (cb) {
                    cb(...data)
                })
            }
        }

    }
    MyEvents.prototype.on = function(eventName, ...callback){
        this._setEvents(eventName, callback)
    }
    MyEvents.prototype.emit = function(eventName, ...data){
        this._execute(eventName, data)
    }


    it('基本操作', function () {
        let emitter = new MyEvents();
        emitter.on('hello', function (data) {
            console.log('handle:', data)
        })
        emitter.emit('hello', 23333)
    })
})