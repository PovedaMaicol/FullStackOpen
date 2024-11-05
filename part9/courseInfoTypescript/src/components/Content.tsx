import { CoursePart } from "../App";
import Part from "./Part";

interface ContentProps {
    parts: CoursePart[];
}


const Content = ({ parts } : ContentProps) => {
  return (
    <div>
    <Part parts={parts}/>
    </div>
  )
}

export default Content