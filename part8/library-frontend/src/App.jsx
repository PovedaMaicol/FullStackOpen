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
import './app.css'





const App = () => {

  const [page, setPage] = useState("authors");
  const [message, setMessage] = useState(null)
  const [token, setToken] = useState(null)
  const [isVisible, setIsVisible] = useState(false)
  const [user, setUser] = useState(null)

  const result = useQuery(ALL_AUTHORS)
  const resultBook = useQuery(ALL_BOOKS)
  const client = useApolloClient()



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
    // window.alert(`${addedBook.title} added`) 
    setMessage(notify)
  
    updateCacheWith(addedBook)
  }
})

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
    <div className="container">
      <div style={{ 
        display: 'flex',  
        width: '100%',
        backgroundColor: 'blue',
        height: '20px',
        margin: '0',
        padding: '0'
        
        }}>
      <button onClick={() => setPage("authors") }>authors</button>
      <button onClick={() => setPage("books") }>books</button>


      { isVisible && (
        <button onClick={() => setPage("add")}>add book</button>
      )
      }

      { !token && (
  <button onClick={() => setPage("login")}>login</button>
      )
      }

      {
        isVisible && (
      <button onClick={logout}>logout</button>
      )
      }

      {
        isVisible && (
          <button onClick={() => setPage("recommend")}>recommend</button>
        )
      }

    
      
      </div>

      <Notify message={message} />
     

     <RegisterForm 
     show={page === "register"}
    //  setErrorMessage={setErrorMessage}
     setPage={setPage}
     />

      <Authors 
      show={page === "authors"}  
      setError={notify}
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

      />
     

     <Recommend show={page === "recommend"} user={user} setUser={setUser}/>
    
    <div>
    </div>  
    
    </div>
  );
};



export default App;
