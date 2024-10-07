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
    <div className="container" style={{ paddingTop: '65px'}}>


 <h1>Authors</h1>
      <Table striped style={{'--bs-table-striped-bg': 'rgba(255, 236, 170)', border: 'transparent'}}>
        <tbody >
          <tr>
            <th>Name</th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
          
            <tr key={a.name}>
              <td  style={{fontStyle: 'italic'}}>{a.name}</td>
              <td style={{fontStyle: 'italic'}}>{a.born}</td>
              <td style={{fontStyle: 'italic'}}>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <EditBorn authors={authors} setError={props.setError} user={props.user}/>

    </div>
  )
}

export default Authors
