// las horas diarias estan en un array con las horas de cada diaz
interface ExerciseResult {
periodLength: number;
trainingDays: number;
success: boolean;
rating: number;
ratingDescription: string;
target: number;
average: number;
}

const calculateExercises = (dailyHours: number[], target: number) : ExerciseResult => {
    
const periodLength = dailyHours.length;
const trainingDays = dailyHours.filter(day => day > 0).length;
const totalHours = dailyHours.reduce((sum, hours) => sum + hours, 0);
const average = totalHours / periodLength;
const success = average >= target;


// calcular la calificacion y la descripcion 
let rating: number;
let ratingDescription:  string;

if (average >= target) {
    rating = 3;
    ratingDescription = 'Excellent, you have achieved your goal';
} else if (average >= target * 0.75) {
    rating = 2;
    ratingDescription = `Not bad, but you could do better`
} else {
    rating = 1;
    ratingDescription = 'You need to try harder to achieve your goal'
}

return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
};
};


const main = () => {
    const args = process.argv.slice(2);

    if (args.length < 2) {
        console.error('Error: Se requieren los argumentos de horas diarias y un objetivo de horas.');
        console.error('Uso: npm run calcularExercises -- <objetivo> <horas...>');
        process.exit(1);
    }

    const target = Number(args[0]);
    const dailyHours = args.slice(1).map((hour) => Number(hour));

    // Verificar si los argumentos son números válidos
    if (isNaN(target) || dailyHours.some((hour) => isNaN(hour))) {
    console.error('Error: Todos los argumentos deben ser números válidos.');
    process.exit(1);
    }

    const result = calculateExercises(dailyHours, target);
    console.log(result);
}

main()