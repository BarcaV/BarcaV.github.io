((d) => {
    const theme = d.querySelector("body");
    const toggle = d.querySelector(".toggle");
    
    toggle.addEventListener("click", () => {
        switchThemes(toggle);
    })

    const switchThemes = (t) => {

        if (!t.classList.contains("toggle-2") && !t.classList.contains("toggle-3")) {
            t.classList.add("toggle-2");
            theme.classList.remove("theme-1");
            theme.classList.add("theme-2");
        } else if (t.classList.contains("toggle-2")) {
            t.classList.remove("toggle-2");
            t.classList.add("toggle-3");
            theme.classList.remove("theme-2");
            theme.classList.add("theme-3");
        } else if (t.classList.contains("toggle-3")) {
            t.classList.remove("toggle-3");
            theme.classList.remove("theme-3");
            theme.classList.add("theme-1");
        }
    }

})(document);

((d, w) => {
    const display1 = d.querySelector(".display_1");
    const display2 = d.querySelector(".display_2");
    const belowH3 = d.querySelector(".display_2 h3");
    const numbers = d.querySelectorAll(".number");
    const operators = d.querySelectorAll(".operator");
    const menus = d.querySelector(".menus");
    const dot = d.querySelector(".dot");
    const dlt = d.querySelector(".delete");
    const erase = d.querySelector(".erase");
    const equal = d.querySelector(".equal");
    var printedOper;
    var belowNum = "";
    var howMany = 0;
    var firstNum = "";
    var operator = undefined;
    var acumulado = "";
    var conterDot = 0;

    
    numbers.forEach(n => n.addEventListener("click", (e, i) => createNum(n.textContent)));
    
    operators.forEach(o => {o.addEventListener("click", (e, i) => {
        
        moreOper(o.textContent);
        operator = o.textContent;
        operatorActive(operator);
        conterDot = 0;
    })})
    
    dot.addEventListener("click", () => {
        if (conterDot === 0) {
            createNum(dot.textContent);
            conterDot = 1;
        }
    })
    
    menus.addEventListener("click", () => toNegative())

    dlt.addEventListener("click", () => {
        borrar();
    })
    
    erase.addEventListener("click", e => {
        eraseAll();
        conterDot = 0;
    })

    equal.addEventListener("click", e => {
        finish();
        conterDot = 0;
    })
    
    

    const calculo = (num1, num2 = 0) => {
        let resultado;
        num1 = parseFloat(num1);
        num2 = parseFloat(num2);
        
        
        switch (operator) {
            case "+":
                resultado = num1 + num2;
                break;
            case "-":
                resultado = num1 - num2;
                break;
            case "x":
                resultado = num1 * num2;
                break;
            case "/":
                resultado = num1 / num2;
                break;
        }
        return resultado.toString();
    }
                    
    const createNum = n => {
        if (acumulado && !firstNum && operator === undefined) {
            cleanDisplay1();
            acumulado = "";
        }
        
        if (!belowNum && n === ".") {
            belowNum = "0.";
            display2Print(belowNum);
            return;
        }

        if ((!belowNum && n > 0) || belowNum) {
            belowNum += n;
            if (relativeWidth(display2.clientWidth, belowH3.clientWidth)) {
                borrar();
                return;
            }
            display2Print(belowNum);
        }
    }

    const relativeWidth = (f, s) => {
        rw = (s * 100) / f;

        if (rw < 95) return false;
        
        return true;
    }
                    
    const toNegative = () => {

        if (acumulado && !firstNum && operator === undefined) {
            cleanDisplay1();
            acumulado = "";
        }
                        
        if (!belowNum) {
            belowNum = "-";
            display2Print(belowNum);
        } else {
            belowNum = parseFloat(belowNum);
            belowNum *= -1;
            belowNum = belowNum.toString();
            display2Print(belowNum);
        }
    }

    const operatorActive = o => {
        
        if (firstNum === "" && acumulado === "") {
            display1Print(belowNum, "");
            display2Print("");
            firstNum = belowNum;
        } 
        if (o !== undefined && acumulado === "") {
            display1Print("", o);
            belowNum = "";
        }
        
        if (acumulado !== "" && firstNum === "") {
            if (!belowNum) {
                cleanDisplay1();
                belowNum = acumulado;
                display1Print(acumulado, o);
                display2Print("");
                belowNum = "";
            } else {
                display1Print(belowNum, o);
                acumulado = calculo(acumulado, belowNum);
                display2Print(acumulado);
                belowNum = "";
            }
        }
        
        printedOper = d.querySelectorAll(".oper");
    }
    
    const moreOper = o => {

        if (firstNum !== "" && belowNum !== "" && operator !== undefined) {
            display1Print(belowNum);
            firstNum = calculo(firstNum, belowNum);
            display2Print(firstNum);
            /* if (o === "+" || o === "*") {
            } else {
                cleanDisplay1();
                firstNum = calculo(firstNum, belowNum);
                display1Print(firstNum);
                display2Print(firstNum);
            } */
        }
    }

    const cleanDisplay1 = (many = "") => {
        let eliminar = d.querySelectorAll(".display_1 h4");

        if (!many) {
            eliminar.forEach(e => e.remove());
        } else {
            eliminar[0].remove();
        }
    }

    const borrar = () => {
        if (belowNum) {
            belowNum = belowNum.substr(0, (belowNum.length - 1))
            display2Print(belowNum);
        }
    }

    const eraseAll = () => {
        
        cleanDisplay1();
        display2Print("");
        firstNum = "";
        belowNum = "";
        acumulado = "";
        operator = undefined;
    }

    const finish = () => {
        
        if ((firstNum && belowNum && !acumulado && operator !== undefined) || (firstNum && !belowNum && !acumulado && operator !== undefined) || (!firstNum && belowNum && acumulado && operator !== undefined) || (!firstNum && !belowNum && acumulado && operator !== undefined)) {
            
            if (acumulado) {
                firstNum = acumulado;
            }
            if (firstNum) {
                if (belowNum) {
                    acumulado = calculo(firstNum, belowNum);
                    display1Print(belowNum);
                    display2Print(acumulado);
                } else if (firstNum){
                    cleanDisplay1(1);
                    acumulado = firstNum;
                }
                operator = undefined;
                belowNum = "";
                firstNum = "";
                howMany = 0;
            }
        }
    }
    
    const display2Print = print => {
        belowH3.textContent = print;
    }
    
    const display1Print = (num, oper = "", c) => {
        if (num !== "") {
            if (num < 0) {
                display1.insertAdjacentHTML("afterbegin", `<h4>(${num})</h4>`)
            } else {
                display1.insertAdjacentHTML("afterbegin", `<h4>${num}</h4>`)
            }
        } 

        if (oper !== "" && belowNum !== "") {
            display1.insertAdjacentHTML("afterbegin", `<h4 class="oper">${oper}</h4>`);
        } else if (oper !== "" && belowNum === "") {
            printedOper[0].textContent = oper;
        }
    }
})(document, window);