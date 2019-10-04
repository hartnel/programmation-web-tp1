var matchTable = {
    "sin" : "Math.sin",
}

function parse(val = "") {
    Object.keys(matchTable).forEach(key => {
        if (val.includes(key)) {
            val = val.replace(key, matchTable[key]);
        }
    })

    return val;

}

console.log(parse("sin(5)"));