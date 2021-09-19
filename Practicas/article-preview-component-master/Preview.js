((d, w) => {
    const button = d.querySelector("#share-button");
    const tooltip = d.querySelector("#share-group");
    var timer;    

    button.addEventListener("click", () => {
        tooltip.classList.toggle("share_active");
        button.classList.toggle("button_active");
    })
    button.addEventListener("mouseleave", () => timer = setTimeout(() => {
        tooltip.classList.remove("share_active");
        button.classList.remove("button_active");
    }, 500))

    tooltip.addEventListener("mouseenter", () => clearTimeout(timer));
    tooltip.addEventListener("mouseleave", () => tooltip.classList.remove("share_active"));

})(document, window);

((d, w) => {
    const card = d.querySelector(".card__group");
    const elementI = d.querySelector(".perfil__share");
    const share = d.querySelector(".share__group");

    w.addEventListener("load", () => mover())
    w.addEventListener("resize", () => mover())

    const mover = () => {
        if (w.innerWidth > 1000) {
            share.remove();
            elementI.insertAdjacentElement("beforeend", share);
        } else {
            share.remove();
            card.insertAdjacentElement("afterbegin", share);
        }
    }

})(document, window);