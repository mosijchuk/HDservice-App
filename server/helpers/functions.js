
//random number between two numbers
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}
module.exports = getRandomInt

function getRandomFullInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return (Math.random() * (max - min) + min);
}
module.exports = getRandomFullInt

//random boolean
function getRandomBool() {
    const rand = Math.random() * (10 - 1) + 1
    if(rand > 3) return true
    return false
}
module.exports = {
    getRandomInt,
    getRandomFullInt,
    getRandomBool
}