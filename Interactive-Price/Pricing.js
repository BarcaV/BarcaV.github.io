
((d, w) => {
    const slider = d.querySelector("#slider_track");
    const progress = d.querySelector("#slider_progress");
    const btn = d.querySelector("#slider_btn");
    const pageviews = d.querySelector("#pageviews");
    const value = d.querySelector("#value");
    const toggleBar = d.querySelector("#toggleBar");
    const toggle = d.querySelector("#toggle");
    var yearly = false;

    const prices = [first = {views: "10K", value: 8.00}, second = {views: "50K", value: 12.00}, third = {views: "100K", value: 16.00}, forth = {views: "500K", value: 24.00}, fith = {views: "1M", value: 36.00}];


    w.addEventListener("load", () => {priceSelector(slider.value, yearly)});

    toggleBar.addEventListener("click", () => {
        paymentChange()})

    slider.oninput = () => {
        btn.style.left = `${(slider.value - 1) * 25}%`;
        progress.style.width = `${(slider.value - 1) * 25}%`;
        priceSelector(slider.value, yearly);
    }

    const paymentChange = () => {
        if (!toggle.classList.contains("right")) {
            yearly = true;
            toggle.classList.add("right");
            priceSelector(slider.value, yearly);
        } else {
            yearly = false;
            toggle.classList.remove("right");
            priceSelector(slider.value, yearly);
        }
    }

    const priceSelector = (valor, payment) => {
        let v;
        let pv;

        switch(valor) {
            case "1":
                v = prices[0].value;
                pv = prices[0].views;
                break;
            case "2":
                v = prices[1].value;
                pv = prices[1].views;
                break;
            case "3":
                v = prices[2].value;
                pv = prices[2].views;
                break;
            case "4":
                v = prices[3].value;
                pv = prices[3].views;
                break;
            case "5":
                v = prices[4].value;
                pv = prices[4].views;
            default: 
                break;
        }
        
        
        if (payment === true) {
            v = v * 0.75;
        }

        
        printer(v, pv);
        
    }

    const printer = (v, pv) => {
        value.textContent = "$" + v + ".00";
        pageviews.textContent = pv;
    }

})(document, window);