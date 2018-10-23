export class Boleto{

    private boletos:number[][];
    private huecos:number[][];

    constructor(){
        this.huecos=[[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]];
        this.huecos=this.generarHuecos();
        /*-----------------------------------------------------------------------*/
        this.boletos=[[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]];
        this.boletos=this.generarNAB();
    }

    get boleto():number[][]{
        return this.boletos;
    }
    set boleto(boletos:number[][]) {
        this.boletos = boletos;
    }

    get hueco():number[][]{
        return this.huecos;
    }
    set hueco(hueco:number[][]) {
        this.huecos = hueco;
    }

    public generarNAB():number[][]{
        let num:number[][]=[[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]];
        for(var i=0;i<3;i++){
            for(var j=0;j<9;j++){
                //Cogemos el valor i y lo multiplicamos por 10, para recoger el valor maximo de esa
                //columna. Despues el minimo recogemos el valor maximo de la columna menos 9,
                //para recoger el numero minimo. Por ejemplo (1*10-1*10-9)+i*10-9. Si el indice es 1
                //El rango de valores ira de 1 a 9, si no, el rango de valores ira de (i*10 - (i*10)-10]
                var numero:number=0
                if(j==0)
                    numero= Math.floor(Math.random()*9+1);
                else
                    numero= 10*j+Math.floor(Math.random()*10);

                if(num[0].indexOf(numero)==-1 && num[1].indexOf(numero)==-1 && num[2].indexOf(numero)==-1){
                    //Si el valor de la posicion es 0 se inserta el valor. Puesto que el 
                    //array lo inicializo a 0 y se sobreescribe en las posiciones donde se encuentre el 1
                    //1=HUECO - 0=VALOR
                    if(this.comprobarPosicion(i,j)){
                        num[i][j]=numero;
                    }
                }else{
                    //Descontamos el contador de j por si la condicion de arriba no se cumple vuelva a realizar el proceso
                    //desde donde fallo
                    j--;
                }
            }   
        }

        return num;
    }

    public comprobarPosicion(col:number, fila:number):boolean{
        //Comprueba la fila y culmna al recorrer el bucle y si en esa posicion hay un 1
        //devuelve true, si es 0 false
        if(this.huecos[col][fila]==1)
            return false;
        else
            return true;
    }

    public generarHuecos():number[][]{
        //Genero una matriz con el mismo tamaño que el boleto. Por cada fila genero
        //un array de posiciones que indican las posiciones j en las que se encuentran las posiciones
        //a las que insertará un 1, es decir, que inculuirá un numero. Si la posicion de b es 2 le pasamos
        //la fila 0 que contendran todas las posiciones marcada, si no le pasaremos la misma fila que se
        //esta recorriendo. Todo para que no haya columnas con mas de 2 huecos
        var b:number[][]=[[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]];
        for(var i=0;i<3;i++){
            var casillasConNumeros:number[];
            if(i==2)
                casillasConNumeros = this.generarPosicionesNumeros(b[i-2]);
            else
                casillasConNumeros = this.generarPosicionesNumeros(b[i]);
            
                for(var j=0;j<casillasConNumeros.length;j++){
                //Recorro el array de las posiciones y en la posicion de cada indice coloco un 1 en el array b
                b[i][casillasConNumeros[j]]=1;
            }
        }
        return b;
    }

    public generarPosicionesNumeros(f:number[]):number[]{
        //Genera un numero aleatorio [0-9] por cada pasada del array de 4 posiciones
        //si el numero no se encuentra en el array Y en el array pasado por parametro(matriz de huecos, fila anterior) 
        //en la posicion del numero aleatorio(fileAnterior[numero aleatorio]) se encuentra un 0
        //inserto un 1, si no resto la variable i para que vuelva a repetir el procedimiento. Y a continuacion lo ordeno.
        var ale:number[]=[0,0,0,0];
        for(var i=0;i<ale.length;i++){
            var num = Math.floor(Math.random()*(10-0)+0);
            //Si el aleatorio no esta en el array y la fila en la posicion aleatoria esta el 0, es decir no hay hueco, inserta el hueco
            if(ale.indexOf(num)==-1 && f[num]==0)
                ale[i]=num;
            else
                i--;
        }
        ale.sort();
        return ale;
    }

}