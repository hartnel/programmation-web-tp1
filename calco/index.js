var curentValue = "";
var result = "";
var sci = true;
var keysymbs = ['+', '*', '/', ')', '(', '-']

function codeinit() {
    var buttons = document.getElementsByClassName("buttons");
    for (var i = 0; i < buttons.length; i++) {
        var button = buttons[i];
        button.setAttribute("onclick", "Maincontroller(event)");
    }
    document.getElementById("keyEventConsumer").addEventListener("keyup", function (key) {
        var keyarg = "";
        if (key.key === "Backspace") {
            keyarg = "back";
        }
        if (key.key === "Enter") {
            keyarg = "=";
        }
        else {
            let converted = Number(key.key);
            if (isNaN(converted)) {
                converted = key.key;
            }
            if (typeof converted === "number" || keysymbs.includes(converted)) {
                keyarg = converted;
            }
        }
        if (keyarg !== "") {
            Maincontroller(undefined, keyarg);
        }
    });
}

function Maincontroller(event = undefined, arg = undefined) {
    var targetId = arg !== undefined ? arg : event.target.id;
    switch (targetId) {
        case "back":
            curentValue = String(curentValue);
            curentValue = curentValue === "" ? curentValue : curentValue.replace(curentValue[curentValue.length - 1], "");
            document.getElementById('result').value = curentValue;
            break;
        case "sci":
            scientific();
            break;
        case "=":
            try {
                result = curentValue.replace(/cos/gi, "Math.cos")
                    .replace(/log/gi, "Math.log10")
                    .replace(/ln/gi, "Math.log2")
                    .replace(/sin/gi, "Math.cos")
                    .replace(/tan/gi, "Math.cos")
                    .replace(/sqrt/gi, "Math.sqrt")
                    .replace(/pi/gi, "Math.PI");
                result = eval(result);
                if (!result) {
                    result = "";
                }
            }
            catch (err) {
                result = "erreur";
            }
            document.getElementById("result").value = result;
            if (result === "erreur") {
                reset();
            }
            curentValue = result;
            //reset();
            break;
        default:
            curentValue = curentValue + targetId;
            document.getElementById("result").value = curentValue;
            break;
    }
}

reset = () => {
    curentValue = "";
    result = "";
}

scientific = () => {
    if (sci) {
        var elts = document.getElementsByClassName("variable");
        Array.from(elts).forEach(element => {
            element.setAttribute('style', 'display:none;')
        });
    }
    else {
        var elts = document.getElementsByClassName("variable");
        Array.from(elts).forEach(element => {
            element.setAttribute('style', '');
        });
    }
    sci = !sci;
}