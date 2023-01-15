function createToken() {
    let result = '';
    const items = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const itemsLength = items.length;
    for (let i = 0; i < 16; i += 1) {
        result += items.charAt(Math.floor(Math.random() * itemsLength));
    }
    return result;
}

module.exports = createToken;
