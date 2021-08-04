const projectContainer = document.querySelectorAll(".project__group");
const degrade = document.querySelectorAll(".project__description");
const degradeText = document.querySelectorAll(".project__container p");


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