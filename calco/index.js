var curentValue = "";
var result = "";
var sci = true;
var keysymbs = ['+', '*', '/', ')', '(', '-']

function codeinit() {
    var buttons = document.getElementsByClassName("buttons")
    for (var i = 0; i < buttons.length; i++) {
        var button = buttons[i];
        button.setAttribute("onclick", "Maincontroller(event)");
    }
    document.getElementById("key").addEventListener("keyup", function (key) {
        var arg = "";
        if (key.key === "Backspace") {
            arg = "back";
        }
        if (key.key === "Enter") {
            arg = "=";
        }
        else {
            var r = "";
            r = Number(key.key);
            if (isNaN(r)) {
                r = key.key;
            }
            if (typeof r === "number" || keysymbs.includes(r)) {
                arg = r;
            }
        }
        if (arg !== "") {
            Maincontroller(undefined, arg);
        }
    });
}

function Maincontroller(event = undefined, arg = undefined) {
    var targetId = arg ? arg : event.target.id;
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
                    .replace(/ln/gi, "Math.log2")
                    .replace(/log/gi, "Math.log10")
                    .replace(/cos/gi, "Math.cos")
                    .replace(/sin/gi, "Math.cos")
                    .replace(/tan/gi, "Math.cos")
                    .replace(/sqrt/gi, "Math.sqrt")
                    .replace(/pi/gi, "Math.PI");
                console.log(result);
                result = eval(result);
                if (!result) {
                    result = "";
                }
            }
            catch (err) {
                result = "erreur";
            }
            console.log(result);
            document.getElementById("result").value = "";
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