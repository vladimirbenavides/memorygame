//Inicializacion de variables
let tarjetasDestapadas = 0;
let tarjeta1=null;
let tarjeta2=null
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 30;
let timerInicial = 30;
let tiempoRegresivoId = null


//Apuntando a documento Html

let mostrarMovimientos = document.getElementById('movimientos');
let mostrasAciertos = document.getElementById('aciertos');
let mostrarTiempo = document.getElementById('t-restante');

//Generacion de numeros aleatorios
let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numeros = numeros.sort(()=>{return Math.random()-0.5});
/* console.log(numeros); */

//Funciones

function contarTiempo(){
    tiempoRegresivoId = setInterval(()=>{
        timer--;
        mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos` 
        if(timer == 0){
            clearInterval(tiempoRegresivoId);//se detiene el contador
            bloquearTarjetas();
        }
    },1000);
}
function bloquearTarjetas(){
    for (let i= 0; i<=15; i++){
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = numeros[i];
        tarjetaBloqueada.disabled = true;
    }

}

//Algotitmo Principal
function destapar(id){
    if (temporizador == false){
        contarTiempo();
        temporizador = true;
    }

    tarjetasDestapadas++;
    console.log(tarjetasDestapadas);

    if(tarjetasDestapadas ==1){
        //mostrar primer numero
        tarjeta1 = document.getElementById(id);
        primerResultado = numeros[id]
        tarjeta1.innerHTML= primerResultado;

       // deshabilitar primer boton
       tarjeta1.disabled = true;
        
    }else if (tarjetasDestapadas ==2){
        //mostrar segundo numero
        tarjeta2 = document.getElementById(id);
        segundoResultado = numeros[id];
        tarjeta2.innerHTML = segundoResultado;

        //deshabilitar el segundo numero
        tarjeta2.disabled = true;

       //incrementar movimientos
       movimientos++;
       mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;
       console.log(movimientos)

       if (primerResultado == segundoResultado){
            //resetear contador tarjetas destapadas
            tarjetasDestapadas = 0;

            //Aumnentar Aciertos
            aciertos++;
            mostrasAciertos.innerHTML =`Aciertos: ${aciertos}`;

            if(aciertos == 8){
                clearInterval(tiempoRegresivoId);
                mostrasAciertos.innerHTML =`Aciertos: ${aciertos} !Felicitaciones 👍` ;
                mostrarTiempo.innerHTML = `Genial! 🎉 solo demoraste ${timerInicial - timer} segundos`
                mostrarMovimientos.innerHTML = `Movimientos: ${movimientos} Muy Bien! 😎` ;

            }

       }else{
            //mostrar momentaneamente los valores y volver a tapar
            setTimeout(()=>{
                tarjeta1.innerHTML = ' ';
                tarjeta2.innerHTML = ' ';
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetasDestapadas = 0;
            },800);
       }
    }
}