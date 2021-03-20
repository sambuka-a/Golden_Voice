"use strict"

$(document).ready(function(){
    $('.header__burger').click(function(_event) {
        $('.header__burger , .header__menu').toggleClass('active');
        $('body').toggleClass('lock');
    });

    $('.header__menu').click(function(){
        $('.header__burger, .header__menu').removeClass('active');
        $('body').removeClass('lock');
    }); 
    
    //Scroll Function
    $("a.header__link, a.fullscreen__link").click(function(){
        $("html, body").animate({
            scrollTop: $($(this).attr("href")).offset().top + "px"
        }, {
         duration: 500   
        });
    });

    // Form worker    
    const form = document.getElementById('form');
    form.addEventListener('submit', formSend);

    async function formSend(e) {
        e.preventDefault();

        let error = formValidate(form);
        let formData = new FormData(form);

        if (error === 0) {
            form.classList.add('_sending');
            
        //    let response = await fetch('sendmail.php', {
        //        method: 'POST',
        //        body: formData
        //    });
        //    if (response.ok) {
        //        let result = await response.json();
        //        alert(result.message);
                let success = document.querySelector('.success');
                success.classList.add('_sent');
                form.classList.add('_dark');
                form.reset();
                form.classList.remove('_sending');
                setTimeout(function() {
                    success.classList.remove('_sent');
                    form.classList.remove('_dark');
                }, 5000);
            
            } else {
                let error = document.querySelector('.error');
                error.classList.add('_error');
                //alert ('Error!');
                form.classList.remove('_sending');
            }
        //} else {
            //alert('Please fill all inputs'); //Add additional error message
        //}
    }

    function formValidate(form) {
        let error = 0;
        let formReq = document.querySelectorAll('._req');

        for (let index = 0; index < formReq.length; index++) {
            const input = formReq[index];
            formRemoveError(input);

            if (input.classList.contains('_email')) {
                if (emailTest(input)) {
                    formAddError(input);
                    error++;       
                }
            } else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
                formAddError(input);
                error++;
            } else {
                if (input.value === '') {
                    formAddError(input);
                    error++;
                }
            }
        }

        return error; 
    }

    function formAddError(input) {
        input.parentElement.classList.add('_error');
        input.classList.add('_error');
    }

    function formRemoveError(input) {
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
    }

    function emailTest(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }

});