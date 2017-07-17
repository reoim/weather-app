let asyncAdd = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof a === 'number' && typeof b === 'number') {
                resolve(a + b)
            } else { 
                reject('Arguments must be numbers')
            }
        }, 1500)
    })
}

asyncAdd(1,3).then((res) => {
    console.log('Results: ', res)
    return asyncAdd(res, 10)
}).then((res) => {
    console.log('Second result: ', res)
}).catch((errorMessage) => {
    console.log(errorMessage)
})

