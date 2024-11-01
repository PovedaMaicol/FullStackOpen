interface ContentProps {
    parts: Part[];
}

interface Part {
    name: string;
    exerciseCount: number;
}

const Content = (props: ContentProps) => {
  return (
    <div>
      {
        props.parts.map((course, i) => (
            <p key={i}>
                {course.name} {course.exerciseCount}
            </p>
        ))
      }
    </div>
  )
}

export default Content