let expect = require('chai').expect;
let {after} = require('../util')

/**
 * 事件发射器
 * @constructor
 */
function  MyEvents(){
    let _events = {}
    this._setEvents = function(eventName, ...callback){
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

    this._execute = function (eventName, err, data) {
        if(_events[eventName] && _events[eventName].count > 0){
            _events[eventName].callbacks.forEach(function (cb) {
                cb(err, data)
            })
        }
    }

}
MyEvents.prototype.on = function(eventName, ...callback){
    this._setEvents(eventName, ...callback)
}
MyEvents.prototype.emit = function(eventName, data){
    this._execute(eventName, data)
}
/**
 * 绑定的事件全部触发后才会执行回调函数
 * @param params
 */
MyEvents.prototype.all = function (...params) {
    for(let i = 0; i < params.length; i++){
        if((typeof  params[i] != 'string' && i + 1 < params.length) || (typeof  params[i] != 'function' && i + 1 == params.length)){
            throw new Error('参数错误')
        }
    }
    let handler = after(params.length-1, params[params.length-1])
    for(let i = 0; i < params.length -1; i++){
        this._setEvents(params[i],  function (...data) {
            handler(params[i], data)
        })
    }
}

module.exports = {
    MyEvents
}