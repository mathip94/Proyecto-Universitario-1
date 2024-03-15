const sistema = new Sistema();
sistema.precargarDatosCensistas();
sistema.precargarDatosCensados();

const departamentos = ['Artigas','Canelones','Cerro Largo','Colonia','Durazno','Flores','Florida','Lavalleja','Maldonado','Montevideo','Paysandu','Rio Negro','Rivera','Rocha','Salto','San Jose','Soriano','Tacuarembo','Treinta y Tres'];
const ocupaciones = ['Dependiente','Independiente','Estudiante','No trabaja'];
const menuDepartamentos = document.getElementById('departamentos');
const menuOcupaciones = document.getElementById('ocupacion');



//Mostrar y Ocultar Paginas

function ocultarTodo(){
    document.getElementById('ingresoDeDatosCenso').style.display='none';
    document.getElementById('informacionEstadisticaCensistas').style.display='none';
    document.getElementById('registroCensista').style.display='none';
    document.getElementById('menuLogeo').style.display='none';
    document.getElementById('menuCensista').style.display='none';
    document.getElementById('menuInvitado').style.display='none';
    document.getElementById('reasignacionPersonasPendientesValidacion').style.display='none';
    document.getElementById('listaCensados').style.display='none';
}

function inicio(){
    ocultarTodo();
    document.getElementById('nombreCensado').value = '';    
    document.getElementById('apellidoCensado').value = '';
    document.getElementById('edadCensado').value = '';   
    document.getElementById('cedulaCensado').value = '';    
    document.getElementById('nombreCensista').value = '';
    document.getElementById('usuarioCensista').value = '';
    document.getElementById('contraseñaCensista').value = '';
    menuDepartamentos.value = '';
    menuOcupaciones.value = '';
    document.getElementById('menuLogeo').style.display='block';
}

function cerrarSesion(){
    const censistas = sistema.darCensistas();
    for(let iterador=0;iterador<censistas.length;iterador++){
        if(censistas[iterador].estaLogeado){
            censistas[iterador].estaLogeado = false;
        }
    }
    document.getElementById('usuarioCensistaLogeo').value = '';
    document.getElementById('contraseñaCensistaLogeo').value = '';
    document.getElementById('nombreCensado').value = '';    
    document.getElementById('apellidoCensado').value = '';
    document.getElementById('edadCensado').value = '';   
    document.getElementById('cedulaCensado').value = '';    
    menuDepartamentos.value = '';
    menuOcupaciones.value = '';
    inicio();
}

function mostrarRegistroCensista(){
    ocultarTodo();
    document.getElementById('registroCensista').style.display='block';
}

function logeoInvitado(){
    ocultarTodo();
    document.getElementById('menuInvitado').style.display='block';
}

function mostrarEstadisticasCensista(){
    ocultarTodo();
    mostrarInformacionEstadistica()
    document.getElementById('informacionEstadisticaCensistas').style.display='block';
}

function mostrarIngresoDatosCensoCensista(){
    ocultarTodo();
    mostrarMenuCensosAsignados();
    document.getElementById('ingresoDeDatosCenso').style.display='block';
    document.getElementById('menuCensosAsignados').style.display='block';
    document.getElementById('labelMenuCensosAsignados').style.display='block';
    document.getElementById('procesarDatosCensista').hidden = false;
    document.getElementById('confirmarDatos').hidden = false;
    document.getElementById('volverMenuCensista').hidden = false;
}

function mostrarIngresoDatosCensoInvitado(){
    ocultarTodo();
    document.getElementById('procesarDatos').hidden = false;
    document.getElementById('volverMenuInvitado').hidden = false;
    document.getElementById('buscarCensoPreCompletado').hidden = false;
    document.getElementById('eliminarDatos').hidden = false;
    document.getElementById('labelBuscarCenso').style.display = 'block';
    document.getElementById('buscarCensoCargados').style.display = 'block';
    document.getElementById('ingresoDeDatosCenso').style.display='block';
}

function mostrarMenuInvitado(){
    ocultarTodo();
    document.getElementById('menuInvitado').style.display = 'block';
}

function mostrarMenuInvitadoOcultarBotones(){
    ocultarTodo();
    mostrarMenuInvitado();
    document.getElementById('procesarDatos').hidden = true;
    document.getElementById('volverMenuInvitado').hidden = true;
    document.getElementById('buscarCensoPreCompletado').hidden = true;
    document.getElementById('eliminarDatos').hidden = true;
    document.getElementById('labelBuscarCenso').style.display = 'none';
    document.getElementById('buscarCensoCargados').style.display = 'none';
    document.getElementById('ingresoDeDatosCenso').style.display='none';
}

function mostrarConsultarDatosPreCompletados(){
   ocultarTodo();
   document.getElementById('chequeoCedulaCensista').style.display='block';
}

function mostrarReasignarPersona(){
    ocultarTodo();
    menuCensosDisponibles();
    menuCensistasDisponibles();
    document.getElementById('reasignacionPersonasPendientesValidacion').style.display='block';
}

function mostrarChequeoDatosCensado(){
    ocultarTodo();
    document.getElementById('chequeoCedulaCensado').style.display='block';
}

function mostrarMenuCensista(){
    ocultarTodo();
    document.getElementById('menuCensista').style.display='block';
}

function mostrarMenuCensistaOcultarBotones(){
    ocultarTodo();
    document.getElementById('nombreCensado').value = '';    
    document.getElementById('apellidoCensado').value = '';
    document.getElementById('edadCensado').value = '';   
    document.getElementById('cedulaCensado').value = '';    
    document.getElementById('nombreCensista').value = '';
    document.getElementById('usuarioCensista').value = '';
    document.getElementById('contraseñaCensista').value = '';
    document.getElementById('procesarDatosCensista').hidden = true;
    document.getElementById('confirmarDatos').hidden = true;
    document.getElementById('volverMenuCensista').hidden = true;
    document.getElementById('menuCensista').style.display='block';
    document.getElementById('menuCensosAsignados').style.display='none';
    document.getElementById('labelMenuCensosAsignados').style.display='none';
}

//Logeo

document.getElementById('logeoCensista').addEventListener('click',logearUsuario);
document.getElementById('logeoInvitado').addEventListener('click',logeoInvitado);
document.getElementById('btnRegistroCensista').addEventListener('click',mostrarRegistroCensista);

function logearUsuario(){
    let usuario = document.getElementById('usuarioCensistaLogeo').value;
    const contraseña = document.getElementById('contraseñaCensistaLogeo').value;
    const comprobarDatosLogeo = sistema.comprobarDatosLogeo(usuario,contraseña);
    usuario = usuario.toLowerCase();
    if (comprobarDatosLogeo){
        sistema.cambiarEstadoLogeo(usuario);
        mostrarMenuCensista()
    }
}

//Menu Censista

document.getElementById('verEstadisticas').addEventListener('click',mostrarEstadisticasCensista);
document.getElementById('censarPersonaCensista').addEventListener('click',mostrarIngresoDatosCensoCensista);
document.getElementById('reasignarPersonaPorValidar').addEventListener('click',mostrarReasignarPersona);
document.getElementById('cerrarSesion').addEventListener('click',cerrarSesion);

//Menu Invitado

document.getElementById('censarPersonaInvitado').addEventListener('click',mostrarIngresoDatosCensoInvitado);
document.getElementById('volverInicio').addEventListener('click',inicio);
document.getElementById('listaDeCensados').addEventListener('click',mostrarListaCensados);

//Ingreso datos censo

document.getElementById('procesarDatosCensista').addEventListener('click',guardarPersonaCensadaCensita);
document.getElementById('confirmarDatos').addEventListener('click',validarDatos);
document.getElementById('volverMenuCensista').addEventListener('click',mostrarMenuCensistaOcultarBotones);
document.getElementById('volverMenuInvitado').addEventListener('click',mostrarMenuInvitadoOcultarBotones);
document.getElementById('buscarCensoPreCompletado').addEventListener('click',buscarCensoPreCompletado);
document.getElementById('procesarDatos').addEventListener('click',guardarPersonaCensada);
document.getElementById('eliminarDatos').addEventListener('click',eliminarDatos);



function cargarDatosCensista(cedula){
    const censados = sistema.darCensos();
    for(let iterador=0;iterador<censados.length;iterador++){
        if(censados[iterador].cedula === cedula){
            document.getElementById('nombreCensado').value = censados[iterador].nombre;
            document.getElementById('apellidoCensado').value = censados[iterador].apellido;
            document.getElementById('edadCensado').value = censados[iterador].edad;
            document.getElementById('cedulaCensado').value = censados[iterador].cedula;
            menuDepartamentos.value = censados[iterador].departamento;
            menuOcupaciones.value = censados[iterador].ocupacion;
            document.getElementById('cedulaCensado').disabled = true;
            break;
        }
    }
}

function validarDatos(){
    const censados = sistema.darCensos();
    const cedula = document.getElementById('cedulaCensado').value;
    const nuevoNombre = document.getElementById('nombreCensado').value;
    const nuevoApellido = document.getElementById('apellidoCensado').value;
    const nuevaEdad = document.getElementById('edadCensado').value;
    const nuevoDepartamento = menuDepartamentos.value;
    const nuevaOcupacion = menuOcupaciones.value;
    for(let iterador=0;iterador<censados.length;iterador++){
        if(censados[iterador].cedula === cedula){  
            censados[iterador].nombre = nuevoNombre;
            censados[iterador].apellido = nuevoApellido;
            censados[iterador].edad = nuevaEdad;
            censados[iterador].departamento = nuevoDepartamento;
            censados[iterador].ocupacion = nuevaOcupacion;
            censados[iterador].estaCensado = true;
            const menuCensosDisponibles = document.getElementById('menuCensosAsignados');
            let opcionARemover = menuCensosDisponibles.querySelector(`option[value='${cedula}']`);
            menuCensosDisponibles.removeChild(opcionARemover);
            alert('Datos validados con exito');
            break;
        }
    }
}


function guardarPersonaCensadaCensita(){
    const censistas = sistema.darCensistas();
    const nombre = document.getElementById('nombreCensado').value;
    const apellido = document.getElementById('apellidoCensado').value;
    const edad = document.getElementById('edadCensado').value;
    const cedula = document.getElementById('cedulaCensado').value;
    const departamento = menuDepartamentos.value;
    const ocupacion = menuOcupaciones.value;
    let idCensista = 0;

    for(let iterador=0;iterador<censistas.length;iterador++){
        if(censistas[iterador].estaLogeado){
            idCensista = censistas[iterador].idCensista;
        }
    }
    const nuevoCensado = sistema.registrarCensadoCensista(nombre,apellido,edad,cedula,departamento,ocupacion,idCensista);
    
    if(validarSeleccionMenus(departamento,ocupacion)){
        if(nuevoCensado){
            alert('Datos guardados con exito')
        }else{
            alert('Ha habido un error al guardar los datos')
        }
    }
}

function generarMenusDinamicos(){
    for(let iterador=0;iterador<departamentos.length;iterador++){
        let opcion = document.createElement('option');
        opcion.value = departamentos[iterador];
        opcion.text = departamentos[iterador];
        menuDepartamentos.appendChild(opcion);
    }
    for(let iterador=0;iterador<ocupaciones.length;iterador++){
        let opcion = document.createElement('option');
        opcion.value = ocupaciones[iterador];
        opcion.text = ocupaciones[iterador];
        menuOcupaciones.appendChild(opcion);
    }
}
   
function validarSeleccionMenus(departamento,ocupacion){
    if(departamento === ''){
        alert('Por favor, seleccione un departamento');
        return false;
    }else if(ocupacion === ''){
        alert('Por favor, seleccione una ocupacion');
        return false;
    }else{
        return true;
    }
}

function formatearCedula(cedula){
    let cedulaLimpia = '';
    
    for(let iterador=0;iterador<cedula.length;iterador++){
        if(!isNaN(Number(cedula[iterador]))){
            cedulaLimpia += cedula[iterador];
        }
    }
    
    return cedulaLimpia
}

function eliminarDatos(){
    const cedula = document.getElementById('buscarCensoCargados').value;
    const cedulaLimpia = formatearCedula(cedula);
    sistema.eliminarCensado(cedulaLimpia)
}
function guardarPersonaCensada(){
    const nombre = document.getElementById('nombreCensado').value;
    const apellido = document.getElementById('apellidoCensado').value;
    const edad = document.getElementById('edadCensado').value;
    const cedula = document.getElementById('cedulaCensado').value;
    const departamento = menuDepartamentos.value;
    const ocupacion = menuOcupaciones.value;
    const nuevoCensado = sistema.registrarCenso(nombre,apellido,edad,cedula,departamento,ocupacion);
    const censos = sistema.darCensos();
    const censistas = sistema.darCensistas();
    let idCensista = 0;
    let nombreCensista = '';
    
    for(let iterador=0;iterador<censos.length;iterador++){
        if(cedula === censos[iterador].cedula){
            idCensista = censos[iterador].idCensista;
        }
    }
    for (let iterador=0;iterador<censistas.length;iterador++) {
        if(idCensista === censistas[iterador].idCensista){
            nombreCensista = censistas[iterador].nombre;
        } 
    }



    if(validarSeleccionMenus(departamento,ocupacion)){
        if(nuevoCensado){
            alert(`Usted a completado el censo exitosamente, el censista ${nombreCensista} pasara por su hogar a validar sus datos`)
        }else{
            alert('Ha habido un error al guardar sus datos')
        }
    }
}

function mostrarMenuCensosAsignados(){
    const menuCensosDisponibles = document.getElementById('menuCensosAsignados');
    menuCensosDisponibles.innerHTML = '';
    const censistasEnSistema = sistema.darCensistas();
    const censados = sistema.darCensos();
    let idCensista = 0;
    for(let iterador=0;iterador<censistasEnSistema.length;iterador++){
        if(censistasEnSistema[iterador].estaLogeado){
            idCensista = censistasEnSistema[iterador].idCensista;
        }
    }
    for(let iterador=0;iterador<censados.length;iterador++){
        if(censados[iterador].estaCensado === false && censados[iterador].idCensista === idCensista){
            const opcion = document.createElement('option');
            opcion.value = censados[iterador].cedula;
            opcion.text = censados[iterador].cedula;
            menuCensosDisponibles.appendChild(opcion);
        }
    }
}

function buscarCensoPreCompletado(){
    const cedulaBuscada = document.getElementById('buscarCensoCargados').value;
    const arregloCensados = sistema.darCensos();
    let cedulaEncontrada = false;

    for(let iterador=0;iterador<arregloCensados.length;iterador++){
        if (formatearCedula(cedulaBuscada) === arregloCensados[iterador].cedula){
            cedulaEncontrada = true;
            if(!arregloCensados[iterador].estaCensado){
                document.getElementById('nombreCensado').value = arregloCensados[iterador].nombre;
                document.getElementById('apellidoCensado').value = arregloCensados[iterador].apellido;
                document.getElementById('edadCensado').value = arregloCensados[iterador].edad;
                document.getElementById('cedulaCensado').value = arregloCensados[iterador].cedula;
                menuDepartamentos.value = arregloCensados[iterador].departamento;
                menuOcupaciones.value = arregloCensados[iterador].ocupacion;
                break;
            }else {
                alert('El censo ya ha sido validado');
                break;
            }    
        }
    }
    if(!cedulaEncontrada){
        alert('Aun no ha completado el censo, ingrece sus datos');
    }
}


//Registro Censista

document.getElementById('btnRegistrarCensista').addEventListener('click',registrarInformacion);
document.getElementById('btnVolverIncioRegistroCensista').addEventListener('click',inicio);

function registrarInformacion(){
    const contraseña = document.getElementById('contraseñaCensista').value;
    const nombre = document.getElementById('nombreCensista').value;
    let usuario = document.getElementById('usuarioCensista').value;
    usuario = usuario.toLowerCase();
    const nuevoCensista = sistema.registrarCensista(nombre,usuario,contraseña);
    if (nuevoCensista){
        alert('Registro exitoso');
        inicio();
    }else{
        alert('Hubo un error al registrarlo intentelo nuevamente')
    }   
}



//Informacion Estadistica Censista

document.getElementById('volverMenuEstadistica').addEventListener('click',mostrarMenuCensista);

function mostrarInformacionEstadistica(){
    let totalCensados = sistema.darTotalCensados();
    let porcentajePendientes = sistema.darPorcentajePendienteValidacion();
    document.getElementById('totalCensados').innerHTML= 'Total censado:' + totalCensados;
    document.getElementById('porcentajePendientes').innerHTML = 'Porcentaje pendientes de validacion: ' + porcentajePendientes.toFixed(1) + '%';

    let censadosPorDepartamento = sistema.darCensadosPorDepartamento();

    for(let departamento in censadosPorDepartamento){
        document.getElementById('censadosPorDepartamento').innerHTML += departamento + ': ' + censadosPorDepartamento[departamento] + '<br>';
    
        let opciones = document.createElement('option');
        opciones.value = departamento;
        opciones.innerHTML = departamento;
        document.getElementById('departamentosEstadisticas').appendChild(opciones);
}
}

function mostrarEdades(departamento){
    let menoresMayoresPorDepartamento =  sistema.darMenoresYMayoresPorDepartamento();
    const menores = menoresMayoresPorDepartamento[departamento].menores;
    const mayores = menoresMayoresPorDepartamento[departamento].mayores;
    let total = menores + mayores;
    let porcentajeMenores = (menores/total)*100;
    let porcentajeMayores = (mayores/total)*100;

    document.getElementById('porcentajeEdades').innerHTML = `<br>En ${departamento} :<br>
                                                            Porcentaje de menores de edad: ${porcentajeMenores.toFixed(1)} %<br> 
                                                            Porcentaje de mayores de edad: ${porcentajeMayores.toFixed(1)} %`;
}

//Tabla Censo

document.getElementById('volverMenuInvitadoTablaCensados').addEventListener('click',logeoInvitado)
function mostrarListaCensados(){
    ocultarTodo();
    document.getElementById('tablaListaDeCensados').innerHTML = sistema.darTablaCensos(sistema.procesarDatosParaTabla());
    document.getElementById('listaCensados').style.display='block';
    
}

//Reasignar Persona Pendiente de Validacion

document.getElementById('btnReasignarCenso').addEventListener('click',reasignarCenso);
document.getElementById('btnVolverMenuReasignacion').addEventListener('click',mostrarMenuCensista);

function menuCensosDisponibles(){
    const menuCensosDisponibles = document.getElementById('censosAsignadasACensista');
    menuCensosDisponibles.innerHTML = '';
    const censistasEnSistema = sistema.darCensistas();
    const censados = sistema.darCensos();
    let idCensista = 0;
    for(let iterador=0;iterador<censistasEnSistema.length;iterador++){
        if(censistasEnSistema[iterador].estaLogeado){
            idCensista = censistasEnSistema[iterador].idCensista;
        }
    }
    for(let iterador=0;iterador<censados.length;iterador++){
        if(censados[iterador].idCensista === idCensista && censados[iterador].estaCensado === false){
            const opcion = document.createElement('option');
            opcion.value = censados[iterador].cedula;
            opcion.text = censados[iterador].cedula;
            menuCensosDisponibles.appendChild(opcion);
        }
    }
}

function menuCensistasDisponibles(){
    const menuCensistasDisponibles = document.getElementById('censistasDisponibles');
    menuCensistasDisponibles.innerHTML = '';
    const censistasEnSistema = sistema.darCensistas();
    let idCensista = 0;
    for(let iterador=0;iterador<censistasEnSistema.length;iterador++){
        if(censistasEnSistema[iterador].estaLogeado){
            idCensista = censistasEnSistema[iterador].idCensista;
        }
    }
    for(let iterador=0;iterador<censistasEnSistema.length;iterador++){
        if(censistasEnSistema[iterador].idCensista != idCensista){
            const opcion = document.createElement('option');
            opcion.value = censistasEnSistema[iterador].usuario;
            opcion.text = censistasEnSistema[iterador].usuario;
            menuCensistasDisponibles.appendChild(opcion);
        }
    }
}

function reasignarCenso(){
    const censoElegidoMenu = document.getElementById('censosAsignadasACensista').value;
    const censistaElegidoMenu = document.getElementById('censistasDisponibles').value;
    const censistas = sistema.darCensistas();
    const censos = sistema.darCensos();
    let nuevoId = 0;

    for(let iterador=0;iterador<censistas.length;iterador++){
        if(censistaElegidoMenu === censistas[iterador].usuario){
            nuevoId = censistas[iterador].idCensista;
            break;
        }
    }

    for(let iterador=0;iterador<censos.length;iterador++){
        if(censoElegidoMenu === censos[iterador].cedula){
            censos[iterador].idCensista = nuevoId;
            break;
        }
    }
    alert('Censo reasignado correctamente');
    limpiarMenu('censosAsignadasACensista');
    

    menuCensosDisponibles();
    menuCensistasDisponibles();
}

function limpiarMenu(idSelect){
    const menu = document.getElementById(idSelect);
    while(menu.firstChild){
        menu.removeChild(menu.firstChild);
    }
}