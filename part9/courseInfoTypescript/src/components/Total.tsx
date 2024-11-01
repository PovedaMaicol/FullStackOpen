interface TotalProps {
    totalExercise: number;
}

const Total = (props: TotalProps) => {
  return (
    <div>
    <p>
    Number of exercises {props.totalExercise}
    </p>
    </div>
  )
}

export default Total