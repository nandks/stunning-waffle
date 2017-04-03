
module.exports = function (input) {
    return input
        .toLowerCase()
        .replace(/[^a-z0-9á-úñäâàéèëêïîöôùüûœç\-\' ]+/g, '')
        .replace('/ {2,}/',' ')
        .split(' ');
};
