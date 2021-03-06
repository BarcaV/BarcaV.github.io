
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
        let k;
        
        if (index === 0) {
            j = index + 3;
            for (let i = index; i < j; i++) {
                degradeText[i].classList.toggle("fade");
            }
        } else if (index >= 6) {
            switch (index) {
                case 6: 
                    k = 1;
                    break;
                case 7: 
                    k = 2;
                    break;
                case 8:
                    k = 3;
                    break;
            }
            index += (index + k);
            j = index + 3;
            for (let i = index; i < j; i++) {
                degradeText[i].classList.toggle("fade");
            }
        } else if (index > 0) {
            index += (index + 1);
            j = index + 2;
            for (let i = index; i < j; i++) {
                degradeText[i].classList.toggle("fade");
            }
        } 
    }
})();

/* ********** Image Active Animation ********** */

((d, w) => {
    const previewImage =  d.querySelectorAll(".second-image");


    setInterval(() => {
        previewImage[2].classList.toggle("opacity");
    }, 5250);

    setInterval(() => {
        previewImage[0].classList.toggle("opacity");
    }, 5000);

    setInterval(() => {
        previewImage[1].classList.toggle("opacity");
    }, 4750);
})(document, window);

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
    const $stickyNavBar = d.querySelector(".sticky_group");
    const $links = d.querySelectorAll(".sticky_link_group");
    const $spans = d.querySelectorAll(".sticky_link_group p")
    const $icons = d.querySelectorAll(".sticky_link_group i");
    const $home = d.querySelector("#home");
    const startPosition = w.pageYOffset;
    const navBarHeight = $stickyNavBar.clientHeight
    var viewHeight = w.innerHeight;
    var viewWidth = w.innerWidth;

    w.addEventListener("load", () => resizingNavBar(viewWidth));
    w.addEventListener("resize", () => resizingNavBar(w.innerWidth));


    
    d.addEventListener("scroll", () => {
        let topStickyNavBar = $stickyNavBar.getBoundingClientRect().top;
        let bottomStickyNavBar = $stickyNavBar.getBoundingClientRect().bottom;
        let scrollDown = w.pageYOffset;
        let actualWidth = w.innerWidth;

        navBarAnimation(topStickyNavBar, bottomStickyNavBar, scrollDown, actualWidth);
        if (w.innerWidth < 600) {
            homeAnimation(scrollDown);
        }
    })
    
    const navBarAnimation = (ts, bs, sd, aw) => {
        if (aw >= 1000) {
            if (bs < viewHeight) {

                $icons.forEach(e => e.classList.add("sticky_icons_active"));
                
                if (ts <= (viewHeight / 2)) {
                    $spans.forEach(e => e.classList.add("sticky_label_active"));
                    $links.forEach(e => e.classList.add("sticky_links_active"));
                    $icons.forEach(e => e.classList.add("icons_left"));
                } else {
                    $spans.forEach(e => e.classList.remove("sticky_label_active"));
                    $links.forEach(e => e.classList.remove("sticky_links_active"));
                    $icons.forEach(e => e.classList.remove("icons_left"));
                }

            } else {$icons.forEach(e => e.classList.remove("sticky_icons_active"));}

        } else if (aw >= 800) {

            if (bs <= viewHeight) {

                $icons.forEach(e => e.classList.add("sticky_icons_active"));

                if (sd >= (viewHeight / 2.2)) {
                    $spans.forEach(e => e.classList.add("sticky_label_active"));
                    $links.forEach(e => e.classList.add("sticky_links_active"));
                    $icons.forEach(e => e.classList.add("icons_left"));
                } else {
                    $spans.forEach(e => e.classList.remove("sticky_label_active"));
                    $links.forEach(e => e.classList.remove("sticky_links_active"));
                    $icons.forEach(e => e.classList.remove("icons_left"));
                }

            } else {$icons.forEach(e => e.classList.remove("sticky_icons_active"));}

        } else if (aw >= 600) {

            (bs <= viewHeight) ? $icons.forEach(e => e.classList.add("sticky_icons_active")) : $icons.forEach(e => e.classList.remove("sticky_icons_active"));
            
        } else {
            
            if (sd >= navBarHeight) {
                $icons.forEach(e => e.classList.add("sticky_icons_active"));
                $icons[0].classList.remove("sticky_icons_active");
            } else {$icons.forEach(e => e.classList.remove("sticky_icons_active"));}

        }
    }

    var actualPosition = startPosition;

    const homeAnimation = (sd) => {

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
        } 

    }

    const resizingNavBar = vw => {

        if (vw >= 1000) {

            $stickyNavBar.remove();
            $main.insertAdjacentElement("afterbegin", $stickyNavBar);

        } else {

            $stickyNavBar.remove();
            $main.insertAdjacentElement("beforeend", $stickyNavBar);

            if (vw < 800) {
                $spans.forEach(e => e.classList.remove("sticky_label_active"));
                $icons.forEach(e => e.classList.remove("icons_left"));
            } else {
                $spans.forEach(e => e.classList.add("sticky_label_active"));
                $icons.forEach(e => e.classList.add("icons_left"));
            }
        }
    }
})(document, window);
