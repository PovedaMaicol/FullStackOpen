import { useState, useEffect } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Notify from "./components/Notify";
import LoginForm from "./components/LoginForm";
import { useApolloClient, useQuery, useSubscription } from "@apollo/client";
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED, ME } from "./queries";
import Recommend from "./components/Recommend";
import RegisterForm from "./components/RegisterForm";
import { Button, Navbar, Nav} from "react-bootstrap";
import { Link } from 'react-router-dom'
import Navigation from "./components/Navigation";







const App = () => {

  const [page, setPage] = useState("authors");
  const [message, setMessage] = useState(null)
  const [token, setToken] = useState(null)
  const [isVisible, setIsVisible] = useState(false)
  const [user, setUser] = useState(null)
  const [isRegister, setIsRegister] = useState(false)


  const button = {
    borderRadius: '5px 5px 0 0',
    border: 'transparent',
    '--bs-btn-bg': '#ffecaa',
    '--bs-btn-hover-bg': '#f9d96c',
    '--bs-btn-active-bg': '#f9d96c',
    '--bs-btn-disabled-bg': '#dccb90',
  
  }
  const padding = {
    padding: '15px'
  }

  const result = useQuery(ALL_AUTHORS)
  const resultBook = useQuery(ALL_BOOKS)
  const client = useApolloClient()


  

  // console.log('result book es', resultBook.data.allBooks.length)





  const {data: meData, loading: meLoading, error: meError} = useQuery(ME, {
    skip: !token
  })

  useEffect(() => {
    if (meData && meData.me) {
      setUser(meData.me);
      console.log("Datos de usuario:", meData.me);
    }
  }, [meData, token]);




  const includedIn = (set, object) => 
    set.map(b => b.id).includes(object.id)


    const updateCacheWith = (addedBook) => {
      const dataInStore = client.readQuery({ query: ALL_BOOKS})
      if(!includedIn(dataInStore.allBooks, addedBook)){
        client.writeQuery({
          query: ALL_BOOKS,
          data: {allBooks: dataInStore.allBooks.concat(addedBook)}
        })
      }
    }

  
useSubscription(BOOK_ADDED, {
  onData: ({ data }) => {
    console.log(data)
    const addedBook = data.data.bookAdded
    console.log('libro añadido', addedBook)
    window.alert(`${addedBook.title} added`) 
    setMessage(`${addedBook.title} added`)
    setTimeout(() => {
      setMessage(null)
    }, 10000)
  
    updateCacheWith(addedBook)
  }
})

useEffect(() => {
  if (resultBook.data && resultBook.data.allBooks) {
    console.log('result book es', resultBook.data.allBooks.length);
  }
}, [resultBook.data]);


  if (result.loading || resultBook.loading)  {
    return <div>loading...</div>
  }
  const logout = () => {
    setToken(null)
    localStorage.clear()
    localStorage.removeItem('bookApp-user-token')
    client.resetStore()
    setPage("authors")
    setIsVisible(false)
    setUser(null)
    console.log(localStorage)
  }

  const notify = (message) => {
    setMessage(message)
    console.log(`Notification is: ${message}`)
    setTimeout(() => {
      setMessage(null)
    }, 10000)
  }


 

  return (
    <div>
          {
        !isRegister && (
<Navigation 
setIsRegister={setIsRegister}
isRegister={isRegister}
setPage={setPage}
isVisible={isVisible}
token={token}
logout={logout}

/>

        )
        
      }

 
    
    <Notify message={message} />




     <RegisterForm 
     show={page === "register"}
     setMessage={notify}
     setPage={setPage}
     setIsRegister={setIsRegister}
     
     />

      <Authors 
      show={page === "authors"}  
      setError={notify}
      user={user}
      />

      <Books 
      show={page === "books"} 
      />

      <NewBook 
      show={page === "add"} 
      setMessage={notify} 
      setPage={setPage}
      />
     
      <LoginForm 
      show={page === "login"} 
      setToken={setToken} 
      set={notify}  
      setPage={setPage} 
      setIsVisible={setIsVisible}
      setMessage={notify}
      setIsRegister={setIsRegister}

      />
     

     <Recommend show={page === "recommend"} user={user} setUser={setUser} books={resultBook.data ? resultBook.data.allBooks : []}/>
    
    <div>
    </div>  

    </div>
  );
};



export default App;
