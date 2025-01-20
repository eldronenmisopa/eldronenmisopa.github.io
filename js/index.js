import { msgSuccess, msgError, msgLoad } from './servicios/mensajes.js';

var JGEInicio = function() {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    var EnviarFormulario = function() {
        
        const googleFormURL = 'https://docs.google.com/forms/d/e/1FAIpQLSeIJGN0sXKyahVBHV4ZLCysyKGy-8TmZxMXgbw_6Dz69kKR_Q/formResponse'; // Reemplaza FORM_ID con el ID de tu formulario
        const formInteresados = document.querySelector('#contactForm');

        formInteresados.addEventListener('submit', function (e) {
            
            e.preventDefault();

            msgLoad("Procesando...");

            // Mapea los datos del formulario
            const formData = new FormData();
            formData.append('entry.1520317700', document.getElementById('name').value); // Reemplaza entry.123456 con el ID del campo correspondiente
            formData.append('entry.1310520921', document.getElementById('email').value); // Reemplaza entry.789012 con el ID del campo correspondiente
            formData.append('entry.691905441', document.getElementById('phone').value); // Reemplaza entry.345678 con el ID del campo correspondiente
            formData.append('entry.1784614301', document.getElementById('message').value); // Reemplaza entry.345678 con el ID del campo correspondiente
            formData.append('entry.1525839078', 'PENDIENTE'); // Reemplaza entry.345678 con el ID del campo correspondiente
            
            try {

                fetch(`${googleFormURL}`, {
                    method: 'POST',
                    body: formData,
                    mode: 'no-cors'
                }).then(response => {
                    if (response.status === 0) {
                        msgSuccess('¡Formulario enviado correctamente!','',()=>{})
                        formInteresados.reset();
                        document.getElementById('submitSuccessMessage').style.display = 'block';
                        document.getElementById('submitButton').style.display = 'none';
                    } else {
                        msgError('No se ha podido enviar el formulario', '', () => {});
                    }
                })

            } catch (error) {
                msgError('Ocurrió un error al enviar el formulario: ' + error.message, () => {});
            }

        });
    }

    return {
        init: function() {
            // Shrink the navbar
            navbarShrink();
            EnviarFormulario();
        }
    }
}();

window.addEventListener('DOMContentLoaded', event => {
    JGEInicio.init();
});