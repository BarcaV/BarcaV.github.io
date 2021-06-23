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
        igual(acumulado);
        validacionIgual = true;
        validacionUnToque = true;
    }
});
numbersButton.forEach(boton => {
    boton.addEventListener("click", () => {
        if (operacion === undefined) {
            agregarNumAnterior(boton.innerText);
            if (numAnterior.toString().length === 21) {
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
            if (pantallaAbajo.className === "pequeño" && numActual.toString().length < 21) {
                pantallaAbajo.classList.toggle("pequeño")
            }
            if (numActual.toString().length === 20) {
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
        if (pantallaAbajo.innerText !== "" || pantallaArriba.innerText !== "") {
            selectorOperador(boton.innerText);
            if (validacionSegundoToque === true) {
                numAnterior = acumulado;
                validacionSegundoToque = false;
            }
            if (validacionUnToque === false) {
                i += 1;
                pantallaRegistro(pantallaAbajo.innerText, boton.innerText);
                actualizarDisplay(numAnterior);
                validacionUnToque = true;
                if (pantallaAbajo.className === "pequeño" && numActual !== "") {
                    pantallaAbajo.classList.toggle("pequeño")
                }
            } 
            if (validacionIgual === true) {
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
    if (numAnterior.toString().length < 28) {
        numAnterior += num.toString();
        actualizarDisplay(numAnterior);
        if (num === ".") {
            return;
        }
        if (validacionMenos === true && numAnterior.length === 1) {
            container = numAnterior;
            container = parseFloat(container) * -1;
            actualizarDisplay(container.toString());
            validacionMenos = false;
            return;
        }
    }
};
const agregarNumActual = num => {
    if (numActual.toString().length < 28) {
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
        pantallaArriba.innerText = container.join("") + " " + operacion;
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
    if (numAnterior !== "" && numActual === "" && validacionIgual === false && validacionUnToque === false) {
        container = numAnterior.toString().split("");    
        container.pop()
        container = container.join("");
        container = parseFloat(container);
        numAnterior = container.toString();
        pantallaAbajo.innerText = container;
    } else if (numActual !== "" && validacionIgual === false && validacionUnToque === false){
        container = numActual.toString().split("");
        container.pop()
        container = parseFloat(container);
        numActual = container.toString();
        calcular();
        pantallaAbajo.innerText = container;
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
    if (pantallaAbajo.className === "pequeño") {
        pantallaAbajo.classList.toggle("pequeño");
    }
    pantallaRegistro(numActual, "");
    numAnterior = "";
    numActual = "";
    operacion = undefined;
    actualizarDisplay(final);
} 
const actualizarDisplay = valor => {
    pantallaAbajo.innerText = valor;
};
const pantallaRegistro = (valor, operador) => {
    if (operador === "") {
        pantallaArriba.innerText = pantallaArriba.innerText.toString() + " " + valor.toString();
    }
    if (pantallaArriba.innerText === "") {
        pantallaArriba.innerText = pantallaArriba.innerText.toString() + valor.toString() + " " + operador.toString();
    } else if (pantallaArriba.innerText !== "" && operador !== "") {
        pantallaArriba.innerText = pantallaArriba.innerText.toString() + " " + valor.toString() + " " + operador.toString();
    }
};


