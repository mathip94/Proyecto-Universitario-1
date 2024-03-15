class Sistema {
    constructor(){
        this.censistas = [];
        this.censados = [];
    }

    validarUsuarioUnico(usuario){
        const arregloCensistas = this.censistas;
        const largoArregloCensistas = this.censistas.length;
        if(this.censistas.length>=1){
            for (let iteracion = 0; iteracion < largoArregloCensistas;iteracion++){
                if(arregloCensistas[iteracion].usuario === usuario){
                    alert ('Ya existe un usuario con ese nombre');
                    return false;
                } 
                }
            }
        return true;
        }
        

    registrarCensista(nombre, usuario, contraseña){
        nombre = nombre.toLowerCase();
        usuario = usuario.toLowerCase();
        const nuevoCensista = new Censista(nombre,usuario,contraseña);
        
        if(nuevoCensista.validarCamposCompletos(nombre,usuario,contraseña) && nuevoCensista.validarContraseña(contraseña) && this.validarUsuarioUnico(usuario)){
            this.censistas.push(nuevoCensista);
            return true;
        }
        return false;
    }

    formatearCedula(cedula){
        let cedulaLimpia = '';
        
        for(let iterador=0;iterador<cedula.length;iterador++){
            if(!isNaN(Number(cedula[iterador]))){
                cedulaLimpia += cedula[iterador];
            }
        }
        
        return cedulaLimpia;
    }

    registrarCenso(nombre,apellido,edad,cedula,departamento,ocupacion){
        const censistaAsignado = Math.floor(Math.random()*this.censistas.length)+1;
        const cedulaLimpia = this.formatearCedula(cedula);
        const nuevoCensado = new Censo(nombre,apellido,edad,cedulaLimpia,departamento,ocupacion,censistaAsignado,false);
        
        for(let iterador=0;iterador<this.censados.length;iterador++){
            if(this.censados[iterador].cedula === cedulaLimpia){
                alert('Ya existe una persona censada con esa cedula');
                return false;
            }
        }
        if(nuevoCensado.validarEdad(edad) && nuevoCensado.ChequearDigitoVerificador(cedulaLimpia) && nuevoCensado.esCampoVacio(nombre) && nuevoCensado.esCampoVacio(apellido) && nuevoCensado.esCampoVacio(edad) && nuevoCensado.esCampoVacio(cedula)){
            this.censados.push(nuevoCensado);
            return true;
        }else{
            return false;
        }  
    }

    registrarCensadoCensista(nombre,apellido,edad,cedula,departamento,ocupacion,idCensista){
        nombre = nombre.toLowerCase();
        apellido = apellido.toLowerCase();
        const cedulaLimpia = this.formatearCedula(cedula);
        const nuevoCensado = new Censo(nombre,apellido,edad,cedulaLimpia,departamento,ocupacion,idCensista,true);
        
        for(let iterador=0;iterador<this.censados.length;iterador++){
            if(this.censados[iterador].cedula === cedulaLimpia){
                alert('Ya existe una persona censada con ese nombre');
                return false;
            }
        }
        if(nuevoCensado.validarEdad(edad) && nuevoCensado.ChequearDigitoVerificador(cedulaLimpia) && nuevoCensado.esCampoVacio(nombre) && nuevoCensado.esCampoVacio(apellido) && nuevoCensado.esCampoVacio(edad) && nuevoCensado.esCampoVacio(cedula)){
            this.censados.push(nuevoCensado);
            return true;
        }else{
            return false;
        }  
    }

    eliminarCensado(cedula){
        if(cedula === ''){
            alert('Debe introducir una cedula');
            return;
        }
        
        const cedulaLimpia = this.formatearCedula(cedula);
        let cedulaEncontrada = false;

        for(let iterador=0;iterador<this.censados.length;iterador++){
            if(this.censados[iterador].cedula === cedulaLimpia){
                cedulaEncontrada = true;
                if(!this.censados[iterador].estaCensado){
                    this.censados.splice(iterador,1);
                    alert('Sus datos han sido eliminados con exito');
                    break;
                } else{
                    alert('Sus datos ya han sido validados, no se puede eliminar su informacion');
                    break;
                }
            }
        }
        if(!cedulaEncontrada){
            alert('No se encontro ningun censo con esa cedula');
        }
    }

    comprobarDatosLogeo(usuario,contraseña){
        for (let iterador = 0; iterador < this.censistas.length; iterador++){
            if (this.censistas[iterador].usuario === usuario && this.censistas[iterador].contraseña === contraseña){
                return true;
            }
        }
        alert('Datos ingresados incorrectos');
        return false;    
        }
    

    darTotalCensados(){
        let contador = 0;
        for(let iterador=0;iterador<this.censados.length;iterador++){
            if(this.censados[iterador].estaCensado === true){
                contador++
            }     
        }
        return contador;
    }

    darCensadosPorDepartamento(){
        let censadosPorDepartamento = {};

        for(let iterador=0;iterador<this.censados.length;iterador++){
            if(this.censados[iterador].estaCensado === true){
                let censado = this.censados[iterador];
                if (censadosPorDepartamento[censado.departamento] === undefined){
                    censadosPorDepartamento[censado.departamento] = 1;
                }else {
                    censadosPorDepartamento[censado.departamento]++;
                }
            }
        }
        return censadosPorDepartamento;
    }

    darPorcentajePendienteValidacion(){
        let pendientesValidar = 0;

        for(let iterador=0;iterador<this.censados.length;iterador++){
            if(!this.censados[iterador].estaCensado){
                pendientesValidar++
            }
        }

        const porcentajePendientes = (pendientesValidar/this.censados.length)*100;
        return porcentajePendientes;
    }
    
    darMenoresYMayoresPorDepartamento(){
        let menoresYMayoresPorDepartamento = {}
        
        for (let iterador=0;iterador<this.censados.length;iterador++){
            let censado = this.censados[iterador];
            if (!menoresYMayoresPorDepartamento[censado.departamento]){
                menoresYMayoresPorDepartamento[censado.departamento] = {menores: 0, mayores: 0};
            }
            if(censado.edad < 18){
                menoresYMayoresPorDepartamento[censado.departamento].menores++;
            }else{
                menoresYMayoresPorDepartamento[censado.departamento].mayores++;
            }
        }
        return menoresYMayoresPorDepartamento;
    }

    darCensistas(){
        return this.censistas;
    }

    darCensos(){
        return this.censados;
    }

    darTablaCensos(censosProcesados){
        let tabla = '<table>';
        tabla += '<tr><th>Departamento</th><th>Estudian</th><th>No Trabajan</th><th>Dependientes o Independientes</th><th>Porcentaje del total de censados</th></tr>';

        for (let iterador=0;iterador<censosProcesados.length;iterador++){
            tabla += '<tr>';
            tabla += `<td>${censosProcesados[iterador].departamento}</td>`;
            tabla += `<td>${censosProcesados[iterador].estudian}</td>`;
            tabla += `<td>${censosProcesados[iterador].noTrabajan}</td>`;
            tabla += `<td>${censosProcesados[iterador].trabajan}</td>`;
            tabla += `<td>${censosProcesados[iterador].porcentajeCensados}</td>`;
            tabla += '</tr>';
        }

        tabla += '</table>';
        return tabla;
    }
    
    procesarDatosParaTabla(){
        let contadorDatos = {};
        let resultado = [];
        for (let iterador=0;iterador<this.censados.length;iterador++){
            let censos = this.censados[iterador];
            let departamento = censos.departamento;
            if(!contadorDatos[departamento]){
                contadorDatos[departamento] = {estudian: 0, noTrabajan: 0, trabajan:0, censados: 0, total: 0};
            }
            contadorDatos[departamento].total += 1;
            if(censos.estaCensado){
                contadorDatos[departamento].censados += 1;
            }
            switch (censos.ocupacion) {
                case 'Estudiante':
                    contadorDatos[departamento].estudian += 1;
                    break;
                case 'No trabaja':
                    contadorDatos[departamento].noTrabajan += 1;
                    break;
                case 'Dependiente':
                case 'Independiente':
                    contadorDatos[departamento].trabajan += 1;
                    break;
            }
        }
        
        for (let departamento in contadorDatos){
            if(contadorDatos.hasOwnProperty(departamento)){
                let datos = contadorDatos[departamento];
                datos.departamento = departamento;
                datos.porcentajeCensados = `${(datos.censados / datos.total * 100).toFixed(1)}%`;
                resultado.push(datos);
            }
        }
        return resultado;
    }

    cambiarEstadoLogeo(usuario){
        for (let iterador = 0; iterador < this.censistas.length; iterador++){
            if (this.censistas[iterador].usuario === usuario){
                this.censistas[iterador].estaLogeado = true;
            }
        }
    }

    precargarDatosCensistas(){
        let censista1 = {nombre: 'mathias', usuario: 'mathi12', contraseña: 'Mathi12', estaLogeado: false, idCensista: 1};
        let censista2 = {nombre: 'carlos', usuario: 'carlo23', contraseña: 'Carlos23', estaLogeado: false, idCensista: 2};
        let censista3 = {nombre: 'marcos', usuario: 'marcos43', contraseña: 'Marcos43', estaLogeado: false, idCensista: 3};
        this.censistas.push(censista1, censista2, censista3);
    }

    precargarDatosCensados(){
        let censado1 = {nombre: 'Mathias', apellido: 'Perez', edad: 28, cedula: '71829310', departamento: 'Montevideo', ocupacion: 'Dependiente', idCensista: 1, estaCensado: false};
        let censado2 = {nombre: 'Diego', apellido: 'Perez', edad: 20, cedula: '11111111', departamento: 'Maldonado', ocupacion: 'Estudiante', idCensista: 2, estaCensado: true};
        let censado3 = {nombre: 'Dario', apellido: 'Gimenez', edad: 45, cedula: '22222222', departamento: 'Artigas', ocupacion: 'Dependiente', idCensista: 2, estaCensado: false};
        let censado4 = {nombre: 'Marcos', apellido: 'Darin', edad: 15, cedula: '3333333', departamento: 'Montevideo', ocupacion: 'Estudiante', idCensista: 1, estaCensado: true};
        let censado5 = {nombre: 'Camila', apellido: 'Suarez', edad: 25, cedula: '55555555', departamento: 'Flores', ocupacion: 'Dependiente', idCensista: 3, estaCensado: true};
        let censado6 = {nombre: 'Carlos', apellido: 'Gonzalez', edad: 30, cedula: '4444444', departamento: 'Maldonado', ocupacion: 'Estudiante', idCensista: 2, estaCensado: true};
        let censado7 = {nombre: 'Felicia', apellido: 'Lopez', edad: 32, cedula: '6666666', departamento: 'Canelones', ocupacion: 'Independiente', idCensista: 3, estaCensado: false};
        let censado8 = {nombre: 'Adriana', apellido: 'Robira', edad: 22, cedula: '77777777', departamento: 'Artigas', ocupacion: 'Estudiante', idCensista: 1, estaCensado: false};
        let censado9 = {nombre: 'Jose', apellido: 'Martinez', edad: 8, cedula: '88888888', departamento: 'Montevideo', ocupacion: 'Estudiante', idCensista: 2, estaCensado: true};
        let censado10 = {nombre: 'Giselle', apellido: 'Mendez', edad: 64, cedula: '9999999', departamento: 'Treinta Y Tres', ocupacion: 'No trabaja', idCensista: 2, estaCensado: false};
        let censado11 = {nombre: 'Rosana', apellido: 'Gomez', edad: 43, cedula: '23232323', departamento: 'Cerro Largo', ocupacion: 'Independiente', idCensista: 2, estaCensado: true};
        let censado12 = {nombre: 'Lucas', apellido: 'Rodriguez', edad: 52, cedula: '4343434', departamento: 'Colonia', ocupacion: 'Estudiante', idCensista: 3, estaCensado: false};
        let censado13 = {nombre: 'Pablo', apellido: 'Perez', edad: 37, cedula: '54545454', departamento: 'Rio Negro', ocupacion: 'Dependiente', idCensista: 3, estaCensado: false};
        let censado14 = {nombre: 'Luz', apellido: 'Silva', edad: 17, cedula: '65656565', departamento: 'Tacuarembo', ocupacion: 'Dependiente', idCensista: 1, estaCensado: true};
        let censado15 = {nombre: 'Luna', apellido: 'Barcelo', edad: 24, cedula: '73737373', departamento: 'Salto', ocupacion: 'Estudiante', idCensista: 1, estaCensado: false};
        let censado16 = {nombre: 'Sol', apellido: 'Castro', edad: 26, cedula: '89898989', departamento: 'Rivera', ocupacion: 'Dependiente', idCensista: 2, estaCensado: true};
        let censado17 = {nombre: 'Esteban', apellido: 'Quito', edad: 31, cedula: '91919191', departamento: 'Flores', ocupacion: 'No trabaja', idCensista: 3, estaCensado: false};
        let censado18 = {nombre: 'Hector', apellido: 'Sanchez', edad: 77, cedula: '1616161', departamento: 'Salto', ocupacion: 'No trabaja', idCensista: 2, estaCensado: true};
        let censado19 = {nombre: 'Rodrigo', apellido: 'Rico', edad: 5, cedula: '29292929', departamento: 'Florida', ocupacion: 'Estudiante', idCensista: 3, estaCensado: false};
        let censado20 = {nombre: 'Maicol', apellido: 'Scott', edad: 41, cedula: '38383838', departamento: 'Florida', ocupacion: 'No trabaja', idCensista: 1, estaCensado: true};
        this.censados.push(censado1,censado2,censado3,censado4,censado5,censado6,censado7,censado8,censado9,censado10,censado11,censado12,censado13,censado14,censado15,censado16,censado17,censado18,censado19,censado20);
    }
}

