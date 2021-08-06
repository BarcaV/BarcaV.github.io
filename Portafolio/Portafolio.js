const projectContainer = document.querySelectorAll(".project__group");
const degrade = document.querySelectorAll(".project__description");
const degradeText = document.querySelectorAll(".project__container p");
const inputs = document.querySelectorAll(".text-in");
const labels = document.querySelectorAll(".label");
const enviar = document.querySelector("#enviar");

/* Gallery Animation */

projectContainer.forEach((c, index) => {
    c.addEventListener("mouseover", () => {
        grow(index);
        fade(index);
    })

    c.addEventListener("mouseout", () => {
        grow(index);
        fade(index);
    })
})



const grow = index => {
    degrade[index].classList.toggle("grow");
}

const fade = index => {
    let j;

    if (index === 0) {
        j = index + 3;
        for (let i = index; i < j; i++) {
            degradeText[i].classList.toggle("fade");
        }
    } else {
        index += (index + 1);
        j = index + 2;
        for (let i = index; i < j; i++) {
            degradeText[i].classList.toggle("fade");
        }
    }
}

/* Contacto Animation */

inputs.forEach((p, index) => {
    p.addEventListener("focus", () => {
        textOut(index);
    })
    p.addEventListener("blur", () => {
        textIn(index);
    })
})

const textOut = index => {
    if (index === 2) {
        inputs[index].style = "height: 90% !important";
        labels[index].classList.toggle("label-out");
    } else {
        inputs[index].style = "height: 65%";
        labels[index].classList.toggle("label-out");
    }
}

const textIn = index => {
    if (index === 2) {
        inputs[index].style = "height: 95% !important";
        labels[index].classList.toggle("label-out");
    } else {
        inputs[index].style = "height: 80%";
        labels[index].classList.toggle("label-out");
    }
}