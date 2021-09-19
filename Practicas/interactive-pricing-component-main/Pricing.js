((d, w) => {
    const slider = d.querySelector("#slider_track");
    const progress = d.querySelector("#slider_progress");
    const btn = d.querySelector("#slider_btn");

    slider.oninput = () => {
        btn.style.left = `${(slider.value - 1) * 25}%`;
        progress.style.width = `${(slider.value - 1) * 25}%`;
    }
})(document, window);