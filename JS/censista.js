class Censista {
    constructor(nombre,usuario,contraseña){
        this.nombre = nombre;
        this.usuario = usuario;
        this.contraseña = contraseña;
        this.estaLogeado = false;
        this.idCensista = Censista.generarId();
    }

    static generarId() {
        return ++Censista.contador;
    }

    validarContraseña(contraseña){
        if (contraseña.length < 5) {
            alert('La contraseña debe tener al menos 5 caracteres')
            return false;
        }
        
        let tieneNumero = false;
        let tieneMinuscula = false;
        let tieneMayuscula = false;
        
        for (let iterador = 0; iterador < contraseña.length; iterador++) {
            let caracter = contraseña.charAt(iterador);
            if (!isNaN(caracter * 1)) {
                tieneNumero = true;
            } else if (caracter === caracter.toUpperCase()){
                tieneMayuscula = true;
              } else if (caracter === caracter.toLowerCase()){
                tieneMinuscula = true;
              }
        }
        if (tieneNumero && tieneMinuscula && tieneMayuscula) {
            return true;
        } else if(!tieneNumero){
            alert('Hay un error con los datos ingresados la contraseña debe tener al menos un numero')
            return false;
        } else if(!tieneMinuscula){
            alert('Hay un error con los datos ingresados la contraseña debe tener al menos una minuscula')
        } else if(!tieneMayuscula){
            alert('Hay un error con los datos ingresados la contraseña debe tener al menos una mayuscula')
        }
    }

    validarCamposCompletos(nombreInput,usuarioInput,contraseñaInput){
        if (nombreInput === '' || usuarioInput === '' || contraseñaInput === ''){
            alert('Hay un error con los datos ingresados campos vacios')
            return false;
        } else{
            return true;
        }
    }
    
    
}
//El contador empieza en el numero de censistas precargados, si no hubiera ningun cencista precargado empezaria en 0 lo que le daria al primer censista el id 1
Censista.contador = 3;