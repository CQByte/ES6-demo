let Event = require('./event').MyEvents

let Promise = function(asyncFunc){
    if(!(this instanceof  Promise)){
        return new Promise(asyncFunc)
    }

    this.deferred = new Deferred(this)
    asyncFunc( data => this.deferred.resolve(data) , data => this.deferred.reject(data))
}
Promise.prototype.then = function(resolve, reject){
    if(typeof resolve == 'function'){
        this.deferred.event.on('success', resolve)
    }
    if(typeof reject == 'function'){
        this.deferred.event.on('failed', reject)
    }
    return this
}

let Deferred = function(){
    this.event = new Event()
}
Deferred.prototype.resolve = function(data){
    this.event.emit('success', data)
}
Deferred.prototype.reject = function(err){
    this.event.emit('failed', err)
}

Promise(function (resolve, reject) {
    setTimeout(function () {
        resolve('resolve:success')
    }, 5000)
}).then(function (data) {
    console.log(data)
})