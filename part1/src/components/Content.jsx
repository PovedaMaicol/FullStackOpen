import Part from "./Part"

const Content = (props) => {
    return (
<>
<Part parte={props.parts[0].name} exercises={props.parts[0].exercises}/>
<Part parte={props.parts[1].name} exercises={props.parts[1].exercises}/>
<Part parte={props.parts[2].name} exercises={props.parts[2].exercises}/>
</>
    )
}

export default Content