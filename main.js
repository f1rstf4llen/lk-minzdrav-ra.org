window.addEventListener("DOMContentLoaded", function() {   

    [].forEach.call( document.querySelectorAll('.tel'), function(input) {
    var keyCode;
    function mask(event) {
        event.keyCode && (keyCode = event.keyCode);
        var pos = this.selectionStart;
        if (pos < 3) event.preventDefault();
        var matrix = "+7 (___) ___ ____",
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = this.value.replace(/\D/g, ""),
            new_value = matrix.replace(/[_\d]/g, function(a) {
                return i < val.length ? val.charAt(i++) || def.charAt(i) : a
            });
        i = new_value.indexOf("_");
        if (i != -1) {
            i < 5 && (i = 3);
            new_value = new_value.slice(0, i)
        }
        var reg = matrix.substr(0, this.value.length).replace(/_+/g,
            function(a) {
                return "\\d{1," + a.length + "}"
            }).replace(/[+()]/g, "\\$&");
        reg = new RegExp("^" + reg + "$");
        if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
        if (event.type == "blur" && this.value.length < 5)  this.value = "";
    }

    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
    input.addEventListener("keydown", mask, false);

  });

   // Dropdown submenu

   let menuElem = document.querySelector('.dropdown-submenu');
   let titleElem = menuElem.querySelector('.user-name');

   titleElem.onclick = function(e) {
       e.preventDefault();
     menuElem.classList.toggle('open');
   };

});

  // Form Validate
   
$(document).ready(function(){

        // Sticky header
    $(window).scroll(function(){
        if ($(this).scrollTop() > 100) {
            $('.header').addClass('fixed');
        } else {
            $('.header').removeClass('fixed');
        }
    });

    /* HAMBURGER */

    jQuery('.hamburger').click(function(){
        jQuery('.header-nav').toggleClass('header-nav-active');
    });
/*
    $(".enter-btn").click(function (event) {
        event.preventDefault();
        $(".modal-form").addClass("active");
      });
      
      $(".modal-overlay, .modal__closer").click(function () {
        $(".modal-form").removeClass("active");
      });
      
      $(".modal-content").click(function (e) {
        e.stopPropagation();
      });
  */
    
      $(".enter__forgotten").click(function (event) {
        event.preventDefault();
        $(".modal-form_f").addClass("active");
      });
    
      $('#overlay, .modal-overlay_f, .modal__closer').click(function() {
        $('#overlay').css({'display' : 'none'});
        location.reload();  
    });
    
     $('#window-content, .modal-content_f').click(function (e) {
         e.stopPropagation();
    });
    
    jQuery.validator.addMethod("lettersonly", function(value, element) {
         return this.optional(element) || /^[a-z, а-я]+$/i.test(value);
    }, "Допустим ввод только букв");    
     
    $(".form-data_f").each(function() {
        $(this).validate({
            rules: {                
                name: {
                    lettersonly: true,
                    required: true,
                    minlength: 2
                },
                surname: {
                    lettersonly: true,
                    required: true,
                    minlength: 2
                },                         
                phone: {
                    required: true,
                    minlength: 17

                }                        
            },
            messages: {                
                name: {
                    required: "Укажите имя",
                    minlength: "Введите не менее 2-х символов"
                },
                surname: {
                    required: "Укажите фамилию",
                    minlength: "Введите не менее 2-х символов"
                },                                  
                phone: {
                    required: "Введите номер телефона",
                    minlength: "Укажите номер телефона с кодом в формате +7(ХХХ)ХХХХХХХ",
                }                        
            },
            
            submitHandler: function(form) {
                $.ajax({
            type: "POST",
            url: "/reset",
            data: $(form).serialize(),
            timeout: 3000,
            success: function(data) {

                if(data.status == 0){
                    $('.modal-overlay').hide();
                    $('#overlay_body').html(data.data);
                    $('#overlay').show();
                }
                else if (data.status == -1){
                    for (key in data.data) {
                        $('#resetform_error_body').html(data.data[key]);
                    }
                }
                else
                    $('#resetform_error_body').html(data.data);

                     },
                });
            }
        });

    });

    $(".form-data_r").each(function() {
        $(this).validate({
            rules: {
                name: {
                    lettersonly: true,
                    required: true,
                    minlength: 2
                },
                surname: {
                    lettersonly: true,
                    required: true,
                    minlength: 2
                },
                phone: {
                    required: true,
                    minlength: 17

                }
            },
            messages: {
                name: {
                    required: "Укажите имя",
                    minlength: "Введите не менее 2-х символов"
                },
                surname: {
                    required: "Укажите фамилию",
                    minlength: "Введите не менее 2-х символов"
                },
                phone: {
                    required: "Введите номер телефона",
                    minlength: "Укажите номер телефона с кодом в формате +7(ХХХ)ХХХХХХХ",
                }
            },

        });

    });

});

    





