class Censo {
    constructor(nombre,apellido,edad,cedula,departamento,ocupacion,idCensista,estaCensado){
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.cedula = cedula;
        this.despartamento = departamento;
        this.ocupacion = ocupacion;
        this.idCensista = idCensista;
        this.estaCensado = estaCensado;
    }
    
    ChequearDigitoVerificador(cedulaLimpia){
        const digitos = cedulaLimpia.substr(0,7);
        const digitoVerificador = Number(cedulaLimpia.slice(-1));
        let suma = 0;
        let multiplicador = '2987634';
        
        for (let iterador=0;iterador<digitos.length;iterador++){
            suma += Number(digitos[iterador]) * Number(multiplicador[iterador])
        }

        const proximoNumeroTerminadoEnCero = Math.ceil(suma/10)*10;
        const digitoVerificadorCalculado = proximoNumeroTerminadoEnCero - suma;

        if(digitoVerificador!=digitoVerificadorCalculado){
            alert('Hay un error en su cedula');
        }

        return digitoVerificador === digitoVerificadorCalculado
    }

    validarEdad(edad){
        if(edad<0 || edad>130 || edad ===''){
            alert('Por favor, revises edad ingresada')
            return false;
        }else{
            return true;
        }
    }

    esCampoVacio(campo){
        return campo != '';
    }
    
}
    