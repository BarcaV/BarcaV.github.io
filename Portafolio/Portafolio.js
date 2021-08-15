
/* ********** Gallery Animation ********** */
(() => {
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
})();

/* ********** Contacto Animation ********** */
(() => {
    const inputs = document.querySelectorAll(".text-in");
    const labels = document.querySelectorAll(".label");
    const enviar = document.querySelector("#enviar");

    inputs.forEach((p, index) => {
        p.addEventListener("focus", () => {
            textOut(index);
        })
        p.addEventListener("blur", () => {
            textIn(index);
        })
    })

    const textOut = index => {
        inputs[index].classList.toggle("input-shrink");
        labels[index].classList.toggle("label-out");
    }

    const textIn = index => {
        inputs[index].classList.toggle("input-shrink");
        labels[index].classList.toggle("label-out");
    }
})();

/* ********** Sticky Menu ********** */

((d, w) => {
    const $main = d.querySelector("main");
    const $stickyContainer = d.querySelector(".sticky-container");
    const $stickyNavBar = d.querySelector(".sticky_group");
    const $links = d.querySelectorAll(".sticky_link_group");
    const $spans = d.querySelectorAll(".sticky_link_group p")
    const $icons = d.querySelectorAll(".sticky_link_group i");
    const $home = d.querySelector("#home");
    const startPosition = w.pageYOffset;
    var viewHeight = w.innerHeight;
    var viewWidth = w.innerWidth;

    if (viewWidth >= 1000) {
    } else {
        $stickyNavBar.remove();
        $main.insertAdjacentElement("beforeend", $stickyNavBar);
    }
    
    d.addEventListener("scroll", () => {
        let topStickyNavBar = $stickyNavBar.getBoundingClientRect().top;
        let bottomStickyNavBar = $stickyNavBar.getBoundingClientRect().bottom;
        let scrollDown = w.pageYOffset;
        console.log(scrollDown, viewHeight);
        navBarAnimation(topStickyNavBar, bottomStickyNavBar, scrollDown);
        if (viewWidth < 600) {
            homeAnimation(scrollDown, bottomStickyNavBar);
        }
    })
    
    const navBarAnimation = (ts, bs, sd) => {
        if (viewWidth >= 1000) {
            if (bs < viewHeight) {
                $icons.forEach(e => {e.classList.add("sticky_icons_active");});
                
                if (ts <= (viewHeight / 2)) {
                    $spans.forEach(e => {e.classList.add("sticky_label_active");});
                    $links.forEach(e => {e.classList.add("sticky_links_active");});
                } else {
                    $spans.forEach(e => {e.classList.remove("sticky_label_active");});
                    $links.forEach(e => {e.classList.remove("sticky_links_active");});
                }
            } else {
                $icons.forEach(e => {e.classList.remove("sticky_icons_active");});
            }
        } else if (viewWidth >= 800) {
            if (bs <= viewHeight) {
                $icons.forEach(e => {e.classList.add("sticky_icons_active");});
                if (bs >= (viewHeight / 2)) {
                    $spans.forEach(e => {e.classList.add("sticky_label_active");});
                    $links.forEach(e => {e.classList.add("sticky_links_active");});
                } else {
                    $spans.forEach(e => {e.classList.remove("sticky_label_active");});
                    $links.forEach(e => {e.classList.remove("sticky_links_active");});
                }
            } else {
                $icons.forEach(e => {e.classList.remove("sticky_icons_active");});
            }
        } else {
            if (sd >= 64) {
                $icons.forEach(e => {e.classList.add("sticky_icons_active");});
                $icons[0].classList.remove("sticky_icons_active");
            } else {
                $icons.forEach(e => {e.classList.remove("sticky_icons_active");});
            }
        }
    }

    var actualPosition = startPosition;
    const homeAnimation = (sd, bs) => {
        if (sd >= actualPosition) {
            $home.classList.add("abajo");
            $icons[0].classList.remove("sticky_icons_active");
        } else {
            $home.classList.remove("abajo");
            $icons[0].classList.add("sticky_icons_active");
        }

        actualPosition = sd;

        if (sd <= (viewHeight / 2)) {
            $home.classList.add("abajo");
            $icons[0].classList.remove("sticky_icons_active");
        } else {
        }
    }
})(document, window);
