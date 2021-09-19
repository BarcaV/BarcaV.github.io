const input = document.querySelectorAll(".form__input");
const submit = document.querySelector("#form__btn-submit");
const label = document.getElementsByTagName("label");
const emptyAlert = document.querySelectorAll(".form__empty-text");
const errorAlert = document.querySelectorAll(".form__error-text");
const invalid = document.querySelectorAll(".form__invalid");
const error = document.querySelectorAll(".form__error");
const check = document.querySelectorAll(".form__check");
var validaciones = [false, false, false, false];

const expresiones = {
    nombreApellido: /^[a-zA-Z-\s]+$/,
    email: /^[a-zA-Z0-9-_.+]+\@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    password: /^[a-zA-Z0-9-_./$#@%&\s]{4,16}$/,
} 


input.forEach(texto => {
    texto.addEventListener("focus", () => {labelAction(texto);})
    texto.addEventListener("blur", () => {
        labelAction(texto);
        if (texto.value !== "") {
            if (texto.id === "firstName") {
                index = 0;
                validaciones[index] = true;
                nameTest(texto, index);
            } else if (texto.id === "lastName") {
                index = 1;
                validaciones[index] = true;
                nameTest(texto, index);
            } else if (texto.id === "email") {
                index = 2;
                validaciones[index] = true;
                emailTest(texto, index);
            } else if (texto.id === "password") {
                index = 3;
                validaciones[index] = true;
                passwordTest(texto, index);
            }
        }
    })
    texto.addEventListener("keyup", () => {
        if (texto.id === "firstName") {
            index = 0;
            nameTest(texto, index);
        } else if (texto.id === "lastName") {
            index = 1;
            nameTest(texto, index);
        } else if (texto.id === "email") {
            index = 2;
            emailTest(texto, index);
        } else if (texto.id === "password") {
            index = 3;
            passwordTest(texto, index);
        }
    })
});

submit.addEventListener("click", boton => {
    boton.preventDefault();
    if (input[0].value === "") {
        input[0].classList.add("border-red");
        label[0].classList.add("color-red");
        emptyAlert[0].classList.add("active-block");
        invalid[0].classList.add("active-flex");
    }
    if (input[1].value === "") {
        input[1].classList.add("border-red");
        label[1].classList.add("color-red");
        emptyAlert[1].classList.add("active-block");
        invalid[1].classList.add("active-flex");
    }
    if (input[2].value === "") {
        input[2].classList.add("border-red");
        label[2].classList.add("color-red");
        emptyAlert[2].classList.add("active-block");
        invalid[2].classList.add("active-flex");
    }
    if (input[3].value === "") {
        input[3].classList.add("border-red");
        label[3].classList.add("color-red");
        emptyAlert[3].classList.add("active-block");
        invalid[3].classList.add("active-flex");
    }
})


const labelAction = text => {
    let container = text.id;

    if (container === "firstName") {
        index = 0;
    } else if (container === "lastName") {
        index = 1;
    } else if (container === "email") {
        index = 2;
    } else if (container === "password") {
        index = 3;
    }

    input[index].classList.toggle("border-purple");

    if (text.value === "") {
        label[index].classList.toggle("label-focus");
        label[index].classList.toggle("label");
        input[index].classList.toggle("input-focus");
        invalid[index].classList.toggle("upper");
        error[index].classList.toggle("upper");
        check[index].classList.toggle("upper");
    }
}
const nameTest = (text, index) => {
    if (expresiones.nombreApellido.test(text.value)) {
        label[index].classList.remove("color-red");
        input[index].classList.remove("border-red");
        emptyAlert[index].classList.remove("active-block");
        invalid[index].classList.remove("active-flex");
        errorAlert[index].classList.remove("active-block");
        error[index].classList.remove("active-flex");
        if (validaciones[index] === true) {
            input[index].classList.add("border-green");
            label[index].classList.add("color-green");
            check[index].classList.add("active-flex");
            validaciones[index] = false;
        }
    } else {
        label[index].classList.add("color-red");
        input[index].classList.add("border-red");
        input[index].classList.remove("border-green");
        label[index].classList.remove("color-green");
        check[index].classList.remove("active-flex");
        if (text.value === "") {
            emptyAlert[index].classList.add("active-block");
            invalid[index].classList.add("active-flex");
            errorAlert[index].classList.remove("active-block");
            error[index].classList.remove("active-flex");
        } else {
            errorAlert[index].classList.add("active-block");
            error[index].classList.add("active-flex");
            emptyAlert[index].classList.remove("active-block");
            invalid[index].classList.remove("active-flex");
        }
    }
}

const emailTest = (text, index) => {
    if (expresiones.email.test(text.value)) {
        label[index].classList.remove("color-red");
        input[index].classList.remove("border-red");
        emptyAlert[index].classList.remove("active-block");
        invalid[index].classList.remove("active-flex");
        errorAlert[index].classList.remove("active-block");
        error[index].classList.remove("active-flex");
        if (validaciones[index] === true) {
            input[index].classList.add("border-green");
            label[index].classList.add("color-green");
            check[index].classList.add("active-flex");
            validaciones[index] = false;
        }
    } else {
        label[index].classList.add("color-red");
        input[index].classList.add("border-red");
        input[index].classList.remove("border-green");
        label[index].classList.remove("color-green");
        check[index].classList.remove("active-flex");
        if (text.value === "") {
            emptyAlert[index].classList.add("active-block");
            invalid[index].classList.add("active-flex");
            errorAlert[index].classList.remove("active-block");
            error[index].classList.remove("active-flex");
        } else {
            errorAlert[index].classList.add("active-block");
            error[index].classList.add("active-flex");
            emptyAlert[index].classList.remove("active-block");
            invalid[index].classList.remove("active-flex");
        }
    }
}

const passwordTest = (text, index) => {
    if (expresiones.password.test(text.value)) {
        label[index].classList.remove("color-red");
        input[index].classList.remove("border-red");
        emptyAlert[index].classList.remove("active-block");
        invalid[index].classList.remove("active-flex");
        errorAlert[index].classList.remove("active-block");
        error[index].classList.remove("active-flex");
        if (validaciones[index] === true) {
            input[index].classList.add("border-green");
            label[index].classList.add("color-green");
            check[index].classList.add("active-flex");
            validaciones[index] = false;
        }
    } else {
        label[index].classList.add("color-red");
        input[index].classList.add("border-red");
        input[index].classList.remove("border-green");
        label[index].classList.remove("color-green");
        check[index].classList.remove("active-flex");
        if (text.value === "") {
            emptyAlert[index].classList.add("active-block");
            invalid[index].classList.add("active-flex");
            errorAlert[index].classList.remove("active-block");
            error[index].classList.remove("active-flex");
        } else {
            errorAlert[index].classList.add("active-block");
            error[index].classList.add("active-flex");
            emptyAlert[index].classList.remove("active-block");
            invalid[index].classList.remove("active-flex");
        }
    }
}