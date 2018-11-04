let after = function (times, callback) {
    let count = 0, results = {};
    return function (key, value) {
        results[key] = value
        count++
        if(count == times){
            callback(results)
        }
    }
}

module.exports = {
    after
}