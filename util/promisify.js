export function promisify(paramFn) {

    const checkCallback = (...param) => {
        let fn = [...param].pop();
        if(typeof fn !== 'function') return false;
        return true
    }

    return function (...args) {
        console.log('Args : ', args);
        return new Promise((resolve, reject) => {
            let fn = paramFn;

            if(checkCallback(...args)) reject(new Error('Invalid Argument.'));

            fn(...args, (err, result) => {

                if(err) reject(err);
                resolve(result);
            })
        })
    }
}

