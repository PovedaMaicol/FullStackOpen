import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Notify from "./components/Notify";
import LoginForm from "./components/LoginForm";
import { useApolloClient, useQuery } from "@apollo/client";
import { ALL_AUTHORS } from "./queries";





const App = () => {

  const [page, setPage] = useState("authors");
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)
  const [isVisible, setIsVisible] = useState(false)
  const result = useQuery(ALL_AUTHORS)
  const client = useApolloClient()

  if (result.loading)  {
    return <div>loading...</div>
  }
  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage("authors")
    setIsVisible(false)
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  // const hanleLoginClick = () => {
  //   // setIsVisible(true)
  //   setPage("login")
  //   // setIsVisible(false)
  // }


 
  

  return (
    <div>
      <div>
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
      
      
      </div>

      <Notify errorMessage={errorMessage} />
     
      <Authors 
      show={page === "authors"}  
      setError={notify}
      />

      <Books 
      show={page === "books"} 
      />

      <NewBook 
      show={page === "add"} 
      setError={notify} 
      />
     
      <LoginForm 
      show={page === "login"} 
      setToken={setToken} 
      setError={notify}  
      setPage={setPage} 
      setIsVisible={setIsVisible}
      />
     
    
      
      
    </div>
  );
};



export default App;
