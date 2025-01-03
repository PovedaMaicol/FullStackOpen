export type Operation = 'multiply' | 'add' | 'divide';
type result = string | number;


export const calculator = (a: number, b: number, op: Operation) : result => {
    switch(op) {
        case 'multiply':
            return a * b;
        case 'divide':
            if( b === 0 ) throw new Error('Can\t divide by 0!')
            return a / b;
        case 'add':
            return a + b;
        default:
            throw new Error('Operation is not multiply, add or divide!');
        
    }

}

console.log(process.argv)

try {
    console.log(calculator(1, 0, 'divide'));
} catch (error: unknown) {

    // el valor por defecto del parametro error en el bloque catch es unknown.
    // unknown es un tipo superopr 
    let errorMessage = 'Something went wrong: '
    if ( error instanceof Error){
        errorMessage += error.message;
    }
    console.log(errorMessage);
}