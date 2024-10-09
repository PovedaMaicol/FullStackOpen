import { useLazyQuery, useQuery } from "@apollo/client";
import { ALL_BOOKS, ALL_GENRES } from "../queries";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Select from "react-select";

const Books = (props) => {
  const [category, setCategory] = useState('All');


  // Query para obtener todos los libros o filtrados por género
  const [getBooks, { data, loading, error }] = useLazyQuery(ALL_BOOKS);

  // Query para obtener todos los géneros
  const { data: genresData, loading: genresLoading, error: genresError } = useQuery(ALL_GENRES);

  // Opciones de géneros para el componente `Select`, incluyendo "All"
  const options = genresData
    ? [
        { value: 'All', label: 'All' },
        ...genresData.allGenres.map((g) => ({
          value: g,
          label: g,
        })),
      ]
    : [{ value: 'All', label: 'All' }];


  // Ejecutar consulta según la categoría seleccionada
  useEffect(() => {
    
    if (category === 'All') {
      getBooks(); // Obtener todos los libros
    } else {
      getBooks({ variables: { genre: category } }); // Obtener libros filtrados por género
    }
  }, [category, getBooks]);

  if (!props.show) {
    return null;
  }

  if (loading || genresLoading) {
    return <div>Loading...</div>;
  }

  if (error || genresError) {
    return <div>Error... {error ? error.message : genresError.message}</div>;
  }

  // Libros obtenidos de la consulta, ya sea todos o filtrados por género
  const books = data?.allBooks || [];


  const submit = async (event) => {
    event.preventDefault();

    if (!category) {
      props.setMessage("Please select a category");
      setTimeout(() => {
        props.setMessage(null)
      }, 5000);  
      return;
    }

    // se(null);
    // Aquí puedes agregar lógica adicional si es necesario
  };

  return (
    <div className="container" style={{ paddingTop: '65px' }}>
      <form onSubmit={submit} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: '0', padding: '0', lineHeight: '1' }}>
          {category === 'All' ? 'All Books' : `${category} Books`}
        </h1>
        <div style={{ width: '60%', height: '40px' }}>
          <Select
            value={options.find(option => option.value === category)}
            onChange={(selectedOption) => setCategory(selectedOption.value)}
            options={options}
            placeholder="Select a genre..."
          />
        </div>
      </form>
      <br />



      <Table striped style={{ '--bs-table-striped-bg': 'rgba(255, 236, 170)', border: 'transparent' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
        </thead>
        <tbody>
          {books.map((b) => (
            <tr key={b.id}>
              <td style={{ fontStyle: 'italic', margin: '0', lineHeight: '1' }}>{b.title}</td>
              <td style={{ fontStyle: 'italic' }}>{b.author}</td>
              <td style={{ fontStyle: 'italic' }}>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Books;
