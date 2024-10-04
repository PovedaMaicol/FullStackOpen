import { useQuery } from "@apollo/client"
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries"
import EditBorn from "./EditBorn"
import { Table } from "react-bootstrap"



const Authors = (props) => {

  const result = useQuery(ALL_AUTHORS)

  if (result.loading)  {
    return <div>loading...</div>
  }

  if (!props.show) {
    return null
  }
  

  const authors= result.data ? result.data.allAuthors : []


  return (
    <div>


 
      <Table striped style={{'--bs-table-striped-bg': 'rgba(255, 236, 170)', border: 'transparent'}}>
        <tbody >
          <tr>
            <th>Name</th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
          
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <EditBorn authors={authors} setError={props.setError}/>

    </div>
  )
}

export default Authors
