(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "jquery", "./boletos"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var $ = require("jquery");
    var boletos_1 = require("./boletos");
    /*---------------------------------VARIABLES GLOBALES---------------------------------*/
    var idInt;
    //Cargamos los numeros del 0-90.
    var numerosBombo = [];
    for (var i = 0; i < 90; i++)
        numerosBombo[i] = i + 1;
    //Con esta variable controlo si se realiza la funcion comprobarLinea()
    var linea = true;
    //Muestro el texto bingo al iniciar. Cargo los boletos que mirara el numero de usuarios que hay y por cada usuario
    //generara un boleto. Cargo una matriz donde se mostraran todos los numeros [1-90]. Cargo y muestro
    //el dinero de cada premio (Bote y Linea). Escodo boton parar y el cuardro de resultado. Añado funcionalidad
    //a los botones pertinentes como es el inicio, parar bombo, cambio boleto 
    $(inicio);
    function inicio() {
        $('#numeroMostrar').text("BINGO");
        cargarBoletos();
        cargarTablaTodosNumeros();
        cargarDinero();
        $('#init').click(start);
        $('#stop').hide(1);
        $('#res').hide(1);
        $('#cuadroLinea').hide(1);
        $('#stop').click(stopNum);
        $('img[alt="cambio"]').click(cambiarBoleto);
    }
    //Inicia la salida de numeros con la velocidad seleccionada en la configuracion
    //y esconde el cambio de boleto.
    function start() {
        $('#init').hide('slow');
        $('#stop').show('slow');
        var velocidad = parseInt(sessionStorage.getItem('velocidad'));
        idInt = setInterval(mostrarNumero, velocidad * 1000);
        $('img[alt="cambio"]').hide('slow');
    }
    //Para la salida de los numeros.
    function stopNum() {
        $('#init').show('slow');
        $('#stop').hide('slow');
        clearInterval(idInt);
    }
    //Carga la cantidad que se lleva cada premio, previamente seleccionado en la configuracion.
    function cargarDinero() {
        var bote = parseInt(sessionStorage.getItem('bote'));
        var l = parseInt(sessionStorage.getItem('linea'));
        var linea = bote * (l / 100);
        $('#linea').append('LÍNEA: ' + linea + " €");
        $('#bote').append('BOTE: ' + (bote - linea) + " €");
    }
    //Va mostrando los numeros aleatorios. Segun la longitud del array donde están los numeros
    //va mostrando el contenido de la posicion que sale al azar, cambio de formato en los boletos
    //y en los numeros del bombo y lo muestro en una casilla en grande. Luego borro ese indice del array
    //compruebo la linea si antes no se ha hecho y compruebo a continuacion el ganador.
    function mostrarNumero() {
        var numAle = Math.floor(Math.random() * numerosBombo.length);
        cambiarFormato(numerosBombo[numAle]);
        $('#numeroMostrar').text(numerosBombo[numAle]);
        numerosBombo.splice(numAle, 1); //Borro un elemento en la posicion del numero aleatorio.
        //Si linea es true, comprueba la linea, si ya ha encontrado a alguien con la linea no se volvera
        //a iniciar la funcion
        if (linea)
            comprobarLinea();
        //Compruebo si hay un jugador con todas las casillas marcadas o si ha aparecido todos los numeros
        if (ganadorBingo())
            clearInterval(idInt);
    }
    //Recorre todos los boletos y por cada fila cuenta los que estan marcados, si hay 4 marcados, deja
    //de comprobar la linea y da como ganador de la linea el usuario de dicho boleto
    function comprobarLinea() {
        var tablas = $('.boletosUsuarios');
        for (var i = 0; i < tablas.length; i++) {
            var trs = tablas[i].getElementsByTagName("tr");
            for (var j = 0; j < trs.length; j++) {
                var cont = 0;
                var tds = trs[j].getElementsByTagName("td");
                for (var z = 0; z < tds.length; z++) {
                    if ($(tds[z]).css('backgroundColor') == 'rgb(2, 58, 53)')
                        cont++;
                }
                if (cont == 5) {
                    $('#cuadroLinea').show('slow');
                    $('#gLinea').append('' + $(tablas[i]).attr('id'));
                    linea = false;
                    break;
                }
            }
        }
        return linea;
    }
    //Compruebo todos los TD de cada tabla, si cada TD tiene el fondo indicado, incremento el contador
    //Si el contador es igual a todas las casillas que debe de haber indico el id de la tabla, q es el nombre
    //del jugador y lo muestro como ganador.
    function ganadorBingo() {
        var ganador = false;
        var tablas = $('.boletosUsuarios');
        for (var i = 0; i < tablas.length; i++) {
            var cont = 0;
            var trs = tablas[i].getElementsByTagName("tr");
            for (var j = 0; j < trs.length; j++) {
                var tds = trs[j].getElementsByTagName("td");
                for (var z = 0; z < tds.length; z++) {
                    if ($(tds[z]).css('backgroundColor') == 'rgb(2, 58, 53)')
                        cont++;
                }
            }
            if (cont == 15) {
                ganador = true;
                $('html').css('overflow', 'hidden');
                $('#ocultarAlMostrarGanador').hide('slow'); //Ocultamos todo el bingo para mostrar por pantalla el ganador
                $('#res').show('slow');
                $('#ganador').append('' + $(tablas[i]).attr('id'));
            }
        }
        return ganador;
    }
    //Marco los numeros de los boletos y de todos los numeros.
    function cambiarFormato(num) {
        $('.' + num).css('background', 'rgb(2, 58, 53)');
        $('#' + num).css('color', 'rgb(42, 42, 42)');
    }
    //FUNCION PARA CARGAR DEL 1-90.
    function cargarTablaTodosNumeros() {
        var tabla = document.createElement("table");
        $(tabla).attr('id', 'totalNum');
        var num = 11;
        for (var i = 1; i <= 9; i++) {
            var tr = document.createElement("tr");
            for (var j = num - 10; j < num; j++) {
                var td = document.createElement("td");
                td.appendChild(document.createTextNode('' + j));
                $(td).attr('id', ('' + j));
                $(tr).append(td);
            }
            tabla.appendChild(tr);
            num += 10;
        }
        $('#todosNumeros').append(tabla);
    }
    function cargarBoletos() {
        var numB = sessionStorage.getItem("numeroUsuarios");
        for (var i = 0; i < numB; i++) {
            generarBoletos(i);
        }
    }
    //Creo un objeto boleto el cual ya viene implementado las posiciones y los huecos que tendra.
    function generarBoletos(num) {
        var usuario = document.createElement("p");
        usuario.appendChild(document.createTextNode('' + sessionStorage.getItem("usuario" + num)));
        $(usuario).attr('class', 'usuarios');
        $('#boletos').append(usuario);
        $('#boletos').append(document.createElement("br"));
        /* CREACION BOLETO */
        var bol = new boletos_1.Boleto();
        var boleto = bol.boleto;
        var table = document.createElement("table");
        for (var i = 0; i < boleto.length; i++) {
            var tr = document.createElement("tr");
            for (var j = 0; j < boleto[i].length; j++) {
                var td = document.createElement("td");
                if (boleto[i][j] != 0) {
                    td.appendChild(document.createTextNode('' + boleto[i][j]));
                    td.setAttribute('class', '' + boleto[i][j]);
                    tr.appendChild(td);
                }
                else {
                    var img = document.createElement("IMG");
                    img.setAttribute('src', 'dist/src/IMAGES/Bingo.png');
                    img.setAttribute('width', '20%');
                    td.appendChild(img);
                    td.setAttribute('class', 'esconder');
                    tr.appendChild(td);
                }
            }
            table.appendChild(tr);
        }
        //A la tabla de los numeros le asignamos id que será el nombre del usuario
        //y propiedad class.
        $(table).attr('id', '' + sessionStorage.getItem("usuario" + num));
        $(table).attr('class', 'boletosUsuarios');
        //Creamos la imagen la cual tendra el name que el mismo id del Div donde contendrá
        //el boleto
        var img = document.createElement("IMG");
        img.setAttribute('src', 'dist/src/IMAGES/cambio.png');
        img.setAttribute('alt', 'cambio');
        img.setAttribute('width', '4%');
        img.setAttribute('name', 'b' + num);
        var div = document.createElement('div');
        div.setAttribute('id', 'b' + num);
        div.setAttribute('name', '' + sessionStorage.getItem("usuario" + num));
        $(div).append(table);
        $('#boletos').append(div);
        $('#boletos').append(img);
        $('#boletos').append(document.createElement("br"));
        $('#boletos').append(document.createElement("hr"));
    }
    //Pasamos el objeto al que clicamos. Con eso recogemos el name de la imagen. 
    //Con eso recogemos el objeto del Div y eliminamos la tabla que hay dentro y
    //creamos otra dentro del mismo DIV
    function cambiarBoleto(e) {
        var div = document.getElementById(e.target.getAttribute('name'));
        div.removeChild(div.childNodes[0]);
        var bol = new boletos_1.Boleto();
        var boleto = bol.boleto;
        var table = document.createElement("table");
        for (var i = 0; i < boleto.length; i++) {
            var tr = document.createElement("tr");
            for (var j = 0; j < boleto[i].length; j++) {
                var td = document.createElement("td");
                if (boleto[i][j] != 0) {
                    td.appendChild(document.createTextNode('' + boleto[i][j]));
                    td.setAttribute('class', '' + boleto[i][j]);
                    tr.appendChild(td);
                }
                else {
                    var img = document.createElement("IMG");
                    img.setAttribute('src', 'dist/src/IMAGES/Bingo.png');
                    img.setAttribute('width', '20%');
                    td.appendChild(img);
                    td.setAttribute('class', 'esconder');
                    tr.appendChild(td);
                }
            }
            table.appendChild(tr);
        }
        table.setAttribute('id', '' + div.getAttribute('name'));
        table.setAttribute('class', 'boletosUsuarios');
        $(div).append(table);
    }
});
