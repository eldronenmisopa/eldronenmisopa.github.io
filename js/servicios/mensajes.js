export function msgConfirm(text, callBackOk, callBackError) {
    Swal.fire({
        html: text,
        icon: 'question',
        allowOutsideClick: false,
        allowEscapeKey: false,
        showCancelButton: true,
        cancelButtonText: 'No',
        confirmButtonText: 'Si',
        reverseButtons: true,
        customClass: {
            confirmButton: "btn fw-bold btn-danger",
            cancelButton: "btn fw-bold btn-active-light-primary"
        },
        didOpen: () => {
            Swal.hideLoading();
        }
    }).then((resultado) => {
        // Validar que se haya realizado una acción (confirmar o cancelar)
        if (resultado.isConfirmed) {
            callBackOk();  // Ejecutar callback en caso de confirmación
        } else if (resultado.isDismissed && callBackError) {
            callBackError();  // Ejecutar callback de error si se cancela
        }
    });
}

export function msgError(text, callBack, callBackError) {
    Swal.fire({
        title: 'Error',
        icon: 'error',
        html: text,
        allowOutsideClick: false,
        allowEscapeKey: false,
        buttonsStyling: false,
        confirmButtonText: "Entendido",                                        
        customClass: {
            confirmButton: "btn btn-primary"
        },
        didOpen: () => {
            Swal.hideLoading();
        }
    }).then((value) => {
        if (callBack) callBack();
        else { callBackError() }
    });
    return false;
}

export function msgWarning(text, confirmTexto, callBackOk, callBackError) {
    Swal.fire({
        //title: title,
        icon: 'warning',
        html: text,
        allowOutsideClick: false,
        allowEscapeKey: false,
        showCancelButton: true,
        confirmButtonColor: '#f06445',
        confirmButtonText: confirmTexto,
        cancelButtonText: 'Cancelar',
        didOpen: () => {
            Swal.hideLoading();
        }
    }).then((resultado) => {
        if (resultado.value) {
            if (callBackOk) callBackOk();
        } else if (callBackError) callBackError();
    });
}

export function ErrorMensaje(data) {
    var errorMessage = "<p>Se presentaron los siguientes errores: </p>";

    // Verificar si data.data es un objeto
    if (typeof data.data === 'object') {
        // Iterar sobre las propiedades del objeto JSON
        for (var key in data.data) {
            if (data.data.hasOwnProperty(key)) {
                errorMessage += "<li class='text-start'><strong>" + data.data[key] + "</strong></li><br>";
            }
        }
    } else {
        // Si data.data no es un objeto, simplemente mostrarlo como está
        errorMessage += data.data;
    }

    return errorMessage + "<p>Por favor, intente nuevamente</p>";
}

export function msgLoad(text, callBack) {
    Swal.fire({
        title: '',
        html: text,
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading(null);
        },
        willClose: () => {
            clearInterval(0);
        }
    }).then(() => {
        if (callBack) callBack();
    });
    return false;
}

export function msgSuccess(title, text, callBack) {
    Swal.fire({
        title: title,
        icon: 'success',
        html: text,
        allowOutsideClick: false,
        allowEscapeKey: false,
        confirmButtonText: 'Aceptar',
        customClass: {
            confirmButton: "btn btn-primary"
        },
    }).then((resultado) => {
        if (callBack) callBack();
    });
}

export function msgErrorNormal(title, text, callBack) {
    Swal.fire({
        title: title,
        icon: 'error',
        html: text,
        allowOutsideClick: false,
        allowEscapeKey: false,
        confirmButtonText: 'Aceptar',
        customClass: {
            confirmButton: "btn btn-primary"
        },
    }).then((resultado) => {
        if (callBack) callBack();
    });
}

export function msgSuccessMixin(titulo, texto) {

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        confirmButtonColor: '#43a047',
        confirmButtonText: 'Aceptar',
        //width: '24rem',
        timer: 5000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    Toast.fire({
        icon: 'success',
        title: titulo,
        text: texto
    })
}

export function msgWarningMixin(titulo, texto) {

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        confirmButtonColor: '#43a047',
        confirmButtonText: 'Aceptar',
        //width: '24rem',
        timer: 5000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    Toast.fire({
        icon: 'warning',
        title: titulo,
        text: texto
    })
}

export function msgAutoClose() {
    Swal.close();
}

export function SuccessMensaje(data) {
    var successMessage = "<p>Se realizaron los siguientes cambios: </p>";

    // Verificar si data.data es un objeto
    if (typeof data.data === 'object') {
        // Iterar sobre las propiedades del objeto JSON
        for (var key in data.data) {
            if (data.data.hasOwnProperty(key)) {
                successMessage += "<li class='text-start'><strong>" + data.data[key] + "</strong></li><br>";
            }
        }

        //Si existe la variable validaciones, mostrarlas
        if (data.validaciones) {
            successMessage += "<p>Se han presentado las siguientes observaciones: </p>";

            // Verificar si data.data es un objeto
            if (typeof data.validaciones === 'object') {
                // Iterar sobre las propiedades del objeto JSON
                for (var key in data.validaciones) {
                    if (data.validaciones.hasOwnProperty(key)) {
                        successMessage += "<li class='text-start'><strong>" + data.validaciones[key] + "</strong></li><br>";
                    }
                }
            }
        }
        
    } else {
        // Si data.data no es un objeto, simplemente mostrarlo como está
        successMessage += data.data;
    }

    return successMessage;
}