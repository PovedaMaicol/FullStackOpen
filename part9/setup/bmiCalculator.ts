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

  interface BmiResult {
    height: number;
    weight: number;
    bmiValue: number;
    bmiCategory: ResultadoIMC;
  }

  /**
 * Calcula el Índice de Masa Corporal (IMC) y determina la categoría correspondiente.
 * @param altura Altura en metros.
 * @param peso Peso en kilogramos.
 * @returns Un objeto con los detalles del IMC.
 */

export const imc = ( altura: number, peso: number ) : BmiResult => {

  if (altura <= 0 || peso <= 0) {
    return {
      height: altura,
      weight: peso,
      bmiValue: 0,
      bmiCategory: 'Valores incorrectos',
    };
  }

   const resultado = Number(( peso / (altura ** 2)).toFixed(2));
   
   let categoria: ResultadoIMC;

   if (resultado < 16.00) {
    categoria = 'Delgadez severa';
  } else if (resultado >= 16.00 && resultado <= 16.99) {
    categoria = 'Delgadez moderada';
  } else if (resultado >= 17.00 && resultado <= 18.49) {
    categoria = 'Delgadez leve';
  } else if (resultado >= 18.50 && resultado <= 24.99) {
    categoria = 'Peso normal';
  } else if (resultado >= 25.00 && resultado <= 29.99) {
    categoria = 'Preobesidad';
  } else if (resultado >= 30.00 && resultado <= 34.99) {
    categoria = 'Obesidad leve';
  } else if (resultado >= 35.00 && resultado <= 39.99) {
    categoria = 'Obesidad media';
  } else if (resultado >= 40.00) {
    categoria = 'Obesidad mórbida';
  } else {
    categoria = 'Fuera de rango';
  }

  return {
    height: altura,
    weight: peso,
    bmiValue: resultado,
    bmiCategory: categoria,
  };
};

// funcion para manejar la entrada y salida
// const main = () => {
//   const args = process.argv.slice(2);

//   if (args.length < 2) {
//     console.error('Error: Se requieren dos argumentos: altura (en metros) y peso (en kg).');
//     console.error('Uso: npm run calcularBmi -- <altura> <peso>');
//     process.exit(1);
//   }

//   const [alturaArg, pesoArg] = args;

//   const altura = Number(alturaArg);
//   const peso = Number(pesoArg);

//   if(isNaN(altura) || isNaN(peso)) {
//     console.error('Error: Tanto la altura como el peso deben ser números.');
//     process.exit(1);
//   }

//   const resultado: BmiResult = imc(altura, peso);

//   if (resultado.bmiCategory === 'Valores incorrectos') {
//     console.error('Error: La altura y el peso deben ser mayores que cero.');
//     process.exit(1);
//   }

//   console.log(`Altura: ${resultado.height} m`);
//   console.log(`Peso: ${resultado.weight} kg`);
//   console.log(`IMC: ${resultado.bmiValue}`);
//   console.log(`Categoría: ${resultado.bmiCategory}`);
// };

// // ejecutar la funcion principal
// main();