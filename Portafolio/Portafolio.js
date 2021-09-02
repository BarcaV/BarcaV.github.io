
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
    const previewImage2 = d.querySelectorAll(".third-image")


    const shortTimer = setInterval(() => {
        let image2 = previewImage[2].classList;
        let image3 = previewImage2[0].classList;

        if (!image2.contains("opacity") && !image3.contains("opacity")) {
            image2.add("opacity");
        }   else if (image2.contains("opacity")) {
            image2.remove("opacity");
            image3.add("opacity");
        } else if (image3.contains("opacity")) {
            image3.remove("opacity");
        }
    }, 4750);
    
    const mediumTimer = setInterval(() => {
        previewImage[0].classList.toggle("opacity");
    }, 5000);

    const largeTimer = setInterval(() => {
        previewImage[1].classList.toggle("opacity");
    }, 5250);
})(document, window);

/* ********** Contacto Animation ********** */
(() => {
    const inputs = document.querySelectorAll(".text-in");
    const labels = document.querySelectorAll(".label");

    inputs.forEach((p, index) => {
        p.addEventListener("focus", () => {
            textOut(index);
        })
        p.addEventListener("blur", () => {
            if (p.value === "") {
                textIn(index);
            }
        })
    })

    const textOut = index => {
        inputs[index].classList.add("input-shrink");
        labels[index].classList.add("label-out");
    }

    const textIn = index => {
        inputs[index].classList.remove("input-shrink");
        labels[index].classList.remove("label-out");
    }
})();

/* ********** Form Sent ********** */

((d, w) => {
    const form = d.querySelector(".form");
    const modal = d.querySelector(".modal_container");
    const loading = d.querySelector(".loading");
    const inputs = d.querySelectorAll(".form__group");


    form.addEventListener("submit", (e) => {
        e.preventDefault();
        inputs.forEach(i => i.classList.add("form-opaco"));
        loading.classList.add("loading-active");
        fetch('https://formsubmit.co/ajax/crisquintero98@gmail.com', {method: "POST", body: new FormData(e.target)})
            .then(res => (res.ok ? res.json() : Promise.reject(res)))
            .then(json => {
                console.log(json)
                form.reset();
            })
            .catch(err => {
                let message = err.statusText || "Ocurrio un error, por favor intentelo de nuevo";
                modal.querySelector(".modal_group .modal_text h4").textContent = `Error ${err.status}: ${message}`;
                modal.querySelector(".modal_group .modal_text h3").remove();
                modal.querySelector(".modal_group .plane").remove();
            })
            .finally(() => {
                loading.classList.remove("loading-active");
                modal.classList.add("modal-active");
                setTimeout(() => {
                    modal.classList.remove("modal-active");
                    inputs.forEach(i => {
                        i.classList.remove("form-opaco");
                        i.classList.remove("input-shrink");
                        i.classList.remove("label-out");
                    });
                }, 5000);
            })
    })
    
})(document, window);

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


/* ********** Generales Animation ********** */

((d, w) => {
    const perfilText = d.querySelectorAll(".perfilText");
    const perfilSvg = d.querySelector("#perfil-svg");
    const circles = d.querySelectorAll(".circle");
    const skillsTitle = d.querySelector(".habilidades h1");
    const hDecoration = d.querySelectorAll(".hDecoration");
    const logos = d.querySelectorAll(".logo");
    const portfolioTitle = d.querySelector(".portafolio h1");
    const portfolioGalery = d.querySelectorAll(".project__group");
    const cDecoration = d.querySelectorAll(".cDecoration");
    const contactTitle = d.querySelector(".left-contacto h1");
    const contactSvg = d.querySelector(".email-container svg");

    var viewHeight;
    var viewWidth;

    w.addEventListener("load", () => {
        viewHeight = w.innerHeight;
        viewWidth = w.innerWidth;
    })

    w.addEventListener("resize", () => {
        viewHeight = w.innerHeight;
        viewWidth = w.innerWidth;
    })

    d.addEventListener("scroll", () => {
        let topPerfilText = perfilText[1].getBoundingClientRect().top;
        let topDecoration = hDecoration[0].getBoundingClientRect().top;
        let topPortfolioTitle = portfolioTitle.getBoundingClientRect().top;
        let bottomDecoration = cDecoration[0].getBoundingClientRect().top;
        let scroll = w.pageYOffset;

        if (viewWidth >= 1000) {
            console.log( hDecoration[0])
            active(topPerfilText, topDecoration, topPortfolioTitle, bottomDecoration, scroll);
        }
    })

    const removing = () => {
        perfilText.forEach(p => p.classList.remove("show-active"));
        perfilSvg.classList.remove("show-active");
        skillsTitle.classList.remove("show-active");
        hDecoration[0].classList.remove("top-active");
        hDecoration[1].classList.remove("blanco-active");
        logos.forEach(l => l.classList.remove("show-active"));
        portfolioTitle.classList.remove("show-active");
        portfolioGalery.forEach(g => g.classList.remove("show-active"));
        cDecoration[0].classList.remove("bottom-active");
        cDecoration[1].classList.remove("azul-active");
        contactTitle.classList.remove("show-active");
        contactSvg.classList.remove("show-active");
    }

    const active = (tptext, td, tptitle, bd, scroll) => {
        if (scroll === 0) {
            removing();
        }

        if (tptext <= (viewHeight * 1.3)) {
            perfilText.forEach(p => p.classList.add("show-active"));
            perfilSvg.classList.add("show-active");
        }

        if (td <= (viewHeight / 2.2)) {
            hDecoration[0].classList.add("top-active");
            hDecoration[1].classList.add("blanco-active");
            skillsTitle.classList.add("show-active");
            logos.forEach(l => l.classList.add("show-active"));
        }
        
        if (tptitle <= (viewHeight / 2.3)) {
            portfolioTitle.classList.add("show-active");
            portfolioGalery.forEach(g => g.classList.add("show-active"));
        }

        if (bd <= (viewHeight / 2.4)) {
            cDecoration[0].classList.add("bottom-active");
            cDecoration[1].classList.add("azul-active");
            contactTitle.classList.add("show-active");
            contactSvg.classList.add("show-active");
        }
    }
})(document, window);
