const helpers = {
    randomString: (len = 100) => {
        let char = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWZ"
        let strLength = char.length
        let randomStr = "";
        for(let i = 0; i < len; i++)
        {
            let posn = Math.floor(Math.random() * strLength)
            randomStr += char[posn]
        }
        return randomStr
    }
}


module.exports = helpers