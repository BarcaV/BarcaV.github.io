const pantallaArriba = document.getElementById("pantallaArriba");
const pantallaAbajo = document.getElementById("pantallaAbajo");
const numbersButton = document.querySelectorAll(".number");
const operatorsButton = document.querySelectorAll(".operator");
const eraseButton = document.querySelector(".erase");
const partialButton = document.querySelector(".partial");
const deleteButton = document.querySelector(".delete");
const menusButton = document.querySelector(".menus");
const iqualButton = document.querySelector(".iqual");
var numAnterior = "";
var numActual = "";
var resultadoPantalla = "";
var acumulado = "";
var resultado = "";
var operacion = undefined;
var validacionIgual = false;
var validacionUnToque = false;
var validacionSegundoToque = false;
var validacionMenos = false;
var i = 0;

const numeros = {
    numAnterior: "",
    numActual: "",
} 
const calculadora = {
    suma(num1, num2) {
        if (i <= 1) {
            resultado = num1 + num2;
        } else {
            resultado = num1 + num2;
        }
        return resultado;
    },
    resta(num1, num2) {
        if (i <= 1) {
            resultado = num1 - num2;
        } else {
            resultado = num1 - num2;
        }
        return resultado;
    },
    multiplicacion(num1, num2) {
        if (i <= 1) {
            resultado = num1 * num2;
        } else {
            resultado = num1 * num2;
        }
        return resultado;
    },
    division(num1, num2) {
        if (i <= 1) {
            resultado = num1 / num2;
        } else {
            resultado = num1 / num2;
        }
        return resultado;
    },
};

eraseButton.addEventListener("click", () => {borrar()});
partialButton.addEventListener("click", () => {parcial()});
deleteButton.addEventListener("click", () => {eliminar()});
menusButton.addEventListener("click", () => {
    validacionMenos = true
});
iqualButton.addEventListener("click", () => {
    if (validacionIgual === false) {
        igual(acumulado.toString());
        validacionIgual = true;
        validacionUnToque = true;
    }
});
numbersButton.forEach(boton => {
    boton.addEventListener("click", () => {
        if (operacion === undefined) {
            agregarNumAnterior(boton.innerText);
            if (numAnterior.toString().length === 13) {
                pantallaAbajo.classList.toggle("pequeño")
            }
            if (validacionIgual = true) {
                pantallaArriba.innerText = "";
                acumulado = "";
                validacionIgual = false;
            }
            validacionSegundoToque = false;
            validacionUnToque = false;
        } else {
            if (pantallaAbajo.className === "pequeño" && numActual.toString().length < 13) {
                pantallaAbajo.classList.toggle("pequeño")
            }
            if (numActual.toString().length === 12) {
                pantallaAbajo.classList.toggle("pequeño")
            }
            agregarNumActual(boton.innerText);
            calcular();
            validacionUnToque = false;
            validacionSegundoToque = true;
        };
    })
});
operatorsButton.forEach(boton => {
    boton.addEventListener("click", () => {
        let container;
        if (pantallaAbajo.innerText !== "" || pantallaArriba.innerText !== "") {
            selectorOperador(boton.innerText);
            if (validacionUnToque === false) {
                i += 1;
                container = numAnterior
                if (acumulado.toString() !== "") {
                    container = acumulado;
                    if (container.toString().includes("e")) {
                        container = exponenciales(container);
                    }
                }
                pantallaRegistro(pantallaAbajo.innerHTML, boton.innerText);
                actualizarDisplay(container);
                validacionUnToque = true;
                if (pantallaAbajo.className === "pequeño" && numActual !== "") {
                    pantallaAbajo.classList.toggle("pequeño")
                }
            } 
            if (validacionSegundoToque === true) {
                numAnterior = acumulado;
                validacionSegundoToque = false;
            }
            if (validacionIgual === true) {
                numAnterior = acumulado;
                pantallaArriba.innerText = "";
                pantallaRegistro(acumulado, boton.innerText);
                validacionIgual = false;
            }
            numActual = "";
        }
    })
});


const agregarNumAnterior = num => {
    var container;
    if (numAnterior.toString().length < 18) {
        numAnterior += num.toString();
        actualizarDisplay(numAnterior);
        if (num === ".") {
            return;
        }
        if (validacionMenos === true && numAnterior.length === 1) {
            container = numAnterior;
            container = parseFloat(container) * -1;
            numAnterior = container.toString();
            actualizarDisplay(numAnterior);
            validacionMenos = false;
            return;
        }
    }
};
const agregarNumActual = num => {
    if (numActual.toString().length < 18) {
        numActual += num.toString();
        actualizarDisplay(numActual);
        if (num === ".") {
            return;
        }
    }
};
const selectorOperador = op => {
    let container;
    if (operacion !== undefined && numActual === "") {
        operacion = op.toString();
        container = pantallaArriba.innerText.split("");
        container.pop();
        container.pop();
        container = container.join("");
        pantallaRegistro(container, operacion);
        return
    }
    operacion = op.toString();
}
const calcular = () => {
    var container1 = parseFloat(numAnterior);
    var container2 = parseFloat(numActual); 
    switch(operacion) {
        case "+" :
            calculadora.suma(container1, container2);
        break;
        case "-" :
            calculadora.resta(container1, container2);
        break;
        case "x" :
            calculadora.multiplicacion(container1, container2);
        break;
        case "/" :
            calculadora.division(container1, container2);
        break;
        default :
        break;
    }
    acumulado = resultado;
    return;
}
const borrar = () => {
    let container;
    if (numAnterior !== "" && numActual === "" && operacion === undefined && validacionIgual === false && validacionUnToque === false) {
        if (numAnterior.length > 1) {
            if (numAnterior.length === 13) {
                pantallaAbajo.classList.toggle("pequeño")
            }
            container = numAnterior.toString().split("");
            container.pop()
            container = container.join("");
            container = parseFloat(container);
            numAnterior = container.toString();
            actualizarDisplay(numAnterior);
        } else if (numAnterior.length === 1) {
            numAnterior = "";
            actualizarDisplay(numAnterior);
        }
    } else if (numActual !== "" && validacionIgual === false && validacionUnToque === false){
        if (numActual.length > 1) {
            if (numActual.length === 13) {
                pantallaAbajo.classList.toggle("pequeño")
            }
            container = numActual.toString().split("");
            container.pop()
            container = container.join("");
            container = parseFloat(container);
            numActual = container.toString();
            calcular();
            actualizarDisplay(numActual);
        } else if (numActual.length === 1) {
            numActual = "";
            actualizarDisplay(numActual);
        }
    }
}
const parcial = () =>{
    if (numActual === "" && acumulado === "" && operacion === undefined) {
        numAnterior = "";
    }
    validacionUnToque = true;
    acumulado = numAnterior
    numActual = "";
    pantallaAbajo.innerText = "";
    actualizarDisplay(numActual);
}
const eliminar = () => {
    if (pantallaAbajo.className === "pequeño") {
        pantallaAbajo.classList.toggle("pequeño");
    }
    acumulado = "";
    numAnterior = "";
    numActual = "";
    operacion = undefined;
    pantallaArriba.innerText = "";
    actualizarDisplay("");
}
const igual = final => {
    let container = numActual;
    
    if (pantallaAbajo.className === "pequeño") {
        pantallaAbajo.classList.toggle("pequeño");
    }
    if (final.length > 12 && final.includes("e") !== true) {
        final = exponenciales(final);
        container = final;
    } else if (final.includes("e")) {
        final = exponenciales(final);
        container = final;
    }
    
    pantallaRegistro(container, "");
    numAnterior = "";
    numActual = "";
    operacion = undefined;
    actualizarDisplay(final);
} 
const actualizarDisplay = valor => {
    pantallaAbajo.innerHTML = `<p>${valor}</p>`;
};
const pantallaRegistro = (valor, operador) => {
    let container;
    if (pantallaArriba.innerText === "") {
        pantallaArriba.innerHTML = `<p>${valor} ${operador}</p>`
    } else if (pantallaArriba.Text !== "" && valor !== "" && operador !== "") {
        if (operador === "/" || operador === "-" && acumulado !== "") {
            pantallaArriba.innerHTML = `<p>${acumulado.toString()} ${operador}</p>`
            return;
        }
        pantallaArriba.innerHTML = `${pantallaArriba.innerHTML} <p>${valor} ${operador}</p>`
    } else if (pantallaArriba.Text !== "" && valor !== "" && operador === "") {
        pantallaArriba.innerHTML = `${pantallaArriba.innerHTML} <p>${valor}</p>`
    } else if (pantallaArriba.Text !== "" && valor === "" && operador === "") {
        container = pantallaArriba.innerHTML.toString();
        container = container.split("");
        for (i = 0; i <= 9; i++) {
            container.pop();
        }
        container = container.join("");
        pantallaArriba.innerHTML = `<p>${container}</p>`;
    }
};
const exponenciales = (final) => {
    let container;
    let exp;
    final = final.toString();
    
    if (final.length > 12 && final.includes("e") !== true) {
        if (acumulado > 0) {
            exp = "+" + final.length.toString();
        } else if (acumulado < 0) {
            exp = "-" + final.length.toString();
        }
        if (final.length < 100) {
            final = final.substr(0, 8);
            final = final.split("");
            final.splice(1, 0, ".");
            final = final.join("");
            final = `${final}E<span>${exp}</span>`;
        } else {
            final = final.substr(0, 7);
            final = final.split("");
            final.splice(1, 0, ".");
            final = final.join("");
            final = `${final}E<span>${exp}</span>`;
        }
    } else {
        container = final.length - final.indexOf("e");
        if (final.includes("+")) {
            exp = "+";
            if (container === 3) {
                exp = exp + final.substr(final.indexOf("+") + 1, 1)
            }
            if (container === 4) {
                exp = exp + final.substr(final.indexOf("+") + 1, 2)
            }
            if (container === 5) {
                exp = exp + final.substr(final.indexOf("+") + 1, 3)
            }
            if (container === 6) {
                exp = exp + final.substr(final.indexOf("+") + 1, 4)
            }
            if (container === 7) {
                exp = exp + final.substr(final.indexOf("+") + 1, 5)
            }
        } else if (final.includes("-")){
            exp = "-";
            if (container === 3) {
                exp = exp + final.substr(final.indexOf("-") + 1, 1)
            }
            if (container === 4) {
                exp = exp + final.substr(final.indexOf("-") + 1, 2)
            }
            if (container === 5) {
                exp = exp + final.substr(final.indexOf("-") + 1, 3)
            }
            if (container === 6) {
                exp = exp + final.substr(final.indexOf("-") + 1, 4)
            }
            if (container === 7) {
                exp = exp + final.substr(final.indexOf("-") + 1, 5)
            }
        }
        if (final.length > 12) {
            final = final.substr(0, 8);
        } else {
            final = final.substr(0, final.indexOf("e"))
        }
        final = `${final}E<span>${exp}</span>`;
    }
    return final;
}

