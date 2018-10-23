(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "jquery"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var $ = require("jquery");
    $(inicio);
    function inicio() {
        mostrarNombreBoletos();
        $("#numBoletos").change(mostrarNombreBoletos);
        $("#configuracion").click(guardarDatos);
    }
    function guardarDatos() {
        if (comprobarCampos()) {
            //Recojo numero de usuarios
            var numUsuarios = '' + $('#numBoletos').val();
            sessionStorage.setItem("numeroUsuarios", numUsuarios);
            //Recojo los datos del nombre de Usuario
            var tamNombreU = $('.nombreUsuario');
            for (var i = 0; i < tamNombreU.length; i++) {
                sessionStorage.setItem('usuario' + i, document.getElementsByClassName('nombreUsuario')[i].value);
            }
            //Recojo velocidad
            sessionStorage.setItem('velocidad', $('input:radio[name=velocidad]:checked').prop('id'));
            //Bote del bingo
            var apuesta = '' + $('#apuesta').val();
            sessionStorage.setItem('bote', apuesta);
            //Porcentaje que se lleva la linea
            var linea = '' + $('#porcentajeLinea').val();
            sessionStorage.setItem('linea', linea);
            //Almaceno el Array como un strign en el LocalStorage.
            location.href = "inicio.html";
        }
        else
            alert("RELLENA TODOS LOS DATOS");
    }
    function mostrarNombreBoletos() {
        $('#nombreBoletos > ').remove();
        var numBo = parseInt('' + $('#numBoletos').val());
        for (var i = 0; i < numBo; i++) {
            var nombre = document.createElement("input");
            $(nombre).attr('type', 'text');
            $(nombre).attr('placeholder', 'Nombre Usuario');
            $(nombre).attr('class', 'nombreUsuario');
            $('#nombreBoletos').append(nombre);
            $('#nombreBoletos').append(document.createElement("br"));
        }
    }
    function comprobarCampos() {
        var campos = $("input");
        var valido = true;
        for (var i = 0; i < campos.length; i++) {
            if (campos[i].value == "")
                valido = false;
        }
        return valido;
    }
});
