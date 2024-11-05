//A continuación, crea un componente Part que muestre todos los atributos de cada tipo de parte del curso. ¡Utiliza un switch case basado en verificación de tipos exhaustiva! Utiliza el nuevo componente en el componente Content.
interface CoursePart {
  name: string;
  exerciseCount: number;
  kind: "basic" | "group" | "background" | "special";
  description?: string;
  groupProjectCount?: number;
  backgroundMaterial?: string;
  requirements?: string[];
}

interface PartProps {
  parts: CoursePart[];
}
const Part: React.FC<PartProps> = ({ parts }) => {
    return (
        <div>
          {parts.map((part) => {
            switch (part.kind) {
              case "basic":
                return (
                  <div key={part.name}>
                    <h2>{part.name} {part.exerciseCount}</h2>
                    <p>{part.description}</p>
                  </div>
                );
    
              case "group":
                return (
                  <div key={part.name}>
                    <h2>{part.name} {part.exerciseCount}</h2>
                    <p>Project exercises {part.groupProjectCount}</p>
                  </div>
                );
    
              case "background":
                return (
                  <div key={part.name}>
                    <h2>{part.name} {part.exerciseCount}</h2>
                    <p>{part.description}</p>
                    <p>Submit to {part.backgroundMaterial}</p>
                  </div>
                );
    
              case "special":
                return (
                  <div key={part.name}>
                    <h2>{part.name} {part.exerciseCount}</h2>
                    <p>{part.description}</p>
                    <p>Required skills: {part.requirements?.join(", ")}</p>
                  </div>
                );
    
              default:
                return null; // Si el tipo no es reconocido, no se renderiza nada.
            }
          })}
        </div>
      );
}

export default Part