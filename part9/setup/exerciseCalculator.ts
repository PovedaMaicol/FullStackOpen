// las horas diarias estan en un array con las horas de cada diaz
interface Result {
periodLength: number;
trainingDays: number;
success: boolean;
rating: number;
ratingDescription: string;
target: number;
average: number;
}

const calculateExercises = (dailyHours: number[], target: number) : Result => {
    
const periodLength = dailyHours.length;
const trainingDays = dailyHours.filter(hour => hour > 0).length;
const totalHours = dailyHours.reduce((sum => hour ))
}
    
