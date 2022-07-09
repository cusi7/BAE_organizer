
export function Validacion(usuario) {
    let errors = {};
   
    if(usuario.nombre.length >= 16) {
      errors.nombre = 'Debe contener menos de 16 caracteres'
    }
    if(usuario.email.length > 0 && !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(usuario.email)) {
        errors.email = 'Email invalido'
    }
    if(usuario.password.length > 0 && usuario.password.length < 7) {
        errors.password = 'Debe contener al menos 7 caracteres'
    }
    if(usuario.password !== usuario.passwordRepeat) {
        errors.passwordRepeat = 'Las contraseñas no coinciden'
    }

    return errors
}