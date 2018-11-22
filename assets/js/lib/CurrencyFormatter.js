CurrencyFormatter.debug = true;

function CurrencyFormatter() {
}

CurrencyFormatter.currencyToFloat = function (value) {
    var sNumber = value.replace("R$ ", "").replace(/\./g, "").replace(",", ".");
    var floatValue = parseFloat(sNumber);
    return floatValue;
}

CurrencyFormatter.floatToCurrency = function(value, c, d, t){
    var n = value,
        c = isNaN(c = Math.abs(c)) ? 2 : c,
        d = d == undefined ? "," : d,
        t = t == undefined ? "." : t,
        s = n < 0 ? "-" : "",
        i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
        j = (j = i.length) > 3 ? j % 3 : 0;
       return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
 }

module.exports = CurrencyFormatter;