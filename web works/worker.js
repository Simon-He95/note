function fibonaccin(n) {
    return n <= 2 ? 1 : fibonaccin(n - 1) + fibonaccin(n - 2)
}

var onmessage = function(event) {
    var value = event.data
    let result = fibonaccin(value)
    console.log('接收到主工程传来的数据', result)
    postMessage(result)
}