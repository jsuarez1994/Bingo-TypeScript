import * as $ from 'jquery';

$(inicio);

function inicio(){
    mostrarNombreBoletos();
    $("#numBoletos").change(mostrarNombreBoletos);
    $("#configuracion").click(guardarDatos);
}

function guardarDatos(){

    if(comprobarCampos()){
        //Recojo numero de usuarios
        var numUsuarios = ''+$('#numBoletos').val();
        sessionStorage.setItem("numeroUsuarios", numUsuarios);

        //Recojo los datos del nombre de Usuario
        var tamNombreU = $('.nombreUsuario');
        for(var i=0;i<tamNombreU.length;i++){
            sessionStorage.setItem('usuario'+i, (<HTMLInputElement>document.getElementsByClassName('nombreUsuario')[i]).value);
        }
        
        //Recojo velocidad
        sessionStorage.setItem('velocidad', $('input:radio[name=velocidad]:checked').prop('id'));

        //Bote del bingo
        var apuesta=''+$('#apuesta').val();
        sessionStorage.setItem('bote', apuesta);

        //Porcentaje que se lleva la linea
        var linea = ''+$('#porcentajeLinea').val();
        sessionStorage.setItem('linea', linea);

        //Almaceno el Array como un strign en el LocalStorage.
        location.href="inicio.html";

    }else
        alert("RELLENA TODOS LOS DATOS");
    
}

function mostrarNombreBoletos(){
    $('#nombreBoletos > ').remove();

    var numBo:number=parseInt(''+$('#numBoletos').val());

    for(var i=0;i<numBo;i++){
        var nombre = document.createElement("input");
        $(nombre).attr('type', 'text');
        $(nombre).attr('placeholder', 'Nombre Usuario');
        $(nombre).attr('class', 'nombreUsuario');
        $('#nombreBoletos').append(nombre);
        $('#nombreBoletos').append(document.createElement("br"));
    }
}

function comprobarCampos():boolean{
    var campos = $("input");

    var valido:boolean = true;
    for(var i=0;i<campos.length;i++){
        if(campos[i].value=="")
            valido=false;
    }

    return valido;
}