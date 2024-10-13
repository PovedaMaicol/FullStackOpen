// la formula es peso en kg 
// la altura es al cuadrado 
// divido los kg por altura 2

// PESO BAJO =  < 18.50 
// < 16.00 --> delgadez severa
// entre 16.00 y 16.99 --> delgadez moderada
// entre 17.00 y 18.49 --> delgadez leve 
//PESO NORMAL = 18.5-24.99
//SOBREPESO= >= 25
//PREOBESIDAD 25.00-29.99
//OBESIDAD >=30
// 30.00-34.99 obesidad leve 
// 35.00-39.99 obesidad media
// >=40 obedidad morbida


type ResultadoIMC =
  | 'Valores incorrectos'
  | 'Delgadez severa'
  | 'Delgadez moderada'
  | 'Delgadez leve'
  | 'Peso normal'
  | 'Preobesidad'
  | 'Obesidad leve'
  | 'Obesidad media'
  | 'Obesidad mórbida'
  | 'Fuera de rango';

const imc = ( altura: number, peso: number ) : ResultadoIMC => {
   if ( altura <= 0 || peso <= 0 ) {
   return 'Valores incorrectos'
   }

   const resultado = Number(( peso / (altura ** 2)).toFixed(2));

   if (resultado < 16.00) {
    return 'Delgadez severa';
  } else if (resultado >= 16.00 && resultado <= 16.99) {
    return 'Delgadez moderada';
  } else if (resultado >= 17.00 && resultado <= 18.49) {
    return 'Delgadez leve';
  } else if (resultado >= 18.50 && resultado <= 24.99) {
    return 'Peso normal';
  } else if (resultado >= 25.00 && resultado <= 29.99) {
    return 'Preobesidad';
  } else if (resultado >= 30.00 && resultado <= 34.99) {
    return 'Obesidad leve';
  } else if (resultado >= 35.00 && resultado <= 39.99) {
    return 'Obesidad media';
  } else if (resultado >= 40.00) {
    return 'Obesidad mórbida';
  } else {
    return 'Fuera de rango';
  }
};

console.log(imc(1.75, 70)); // Peso normal
console.log(imc(1.60, 45)); // Delgadez leve
console.log(imc(1.80, 95)); // Preobesidad