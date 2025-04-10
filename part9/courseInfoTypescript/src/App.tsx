import Content from "./components/Content";
import Header from "./components/Header";
import Total from "./components/Total";


interface CoursePartBase {
  name: string;
  exerciseCount: number;
  description?: string;
}
// incluye description
interface CoursePartBasic extends CoursePartBase {
  // description: string;
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}
// incluye description
interface CoursePartBackground extends CoursePartBase {
  // description: string;
  backgroundMaterial: string;
  kind: "background"
}
// debo crear una nueva interface que incluya DESCRIPTION
// extender la interfaz de coursePartBasic
// depo poder elimin<r el descripcion de Basic y Background
interface CoursePartSpecial extends CoursePartBase {
requirements:string[] ;
kind: "special"
}

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;
export const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is an awesome course part",
    kind: "basic"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3,
    kind: "group"
  },
  {
    name: "Basics of type Narrowing",
    exerciseCount: 7,
    description: "How to go from unknown to string",
    kind: "basic"
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
    kind: "background"
  },
  {
    name: "Backend development",
    exerciseCount: 21,
    description: "Typing the backend",
    requirements: ["nodejs", "jest"],
    kind: "special"
  }
]
const App = () => {
  const courseName = "Half Stack application development";
 
  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <div>
      <Header name={courseName}/>
      <Content parts={courseParts}/>
      <Total totalExercise={totalExercises}/>
    </div>
  );
};

export default App;