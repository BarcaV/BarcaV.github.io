/* ********** FAQ ********** */

((d, w) => {
    const faqContainer = d.querySelector(".faqs_container");
    
    faqContainer.addEventListener("click", f => {
        let target = f.target;
        let eliminar = d.querySelector(".faq_active");

        if (eliminar && eliminar !== target.parentElement) {
            eliminar.classList.remove("faq_active");
        }
        
        if (target.classList.contains("question")) {
            target.parentElement.classList.toggle("faq_active");
        }
    })
})(document, window);

