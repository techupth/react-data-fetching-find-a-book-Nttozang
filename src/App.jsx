import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [allBook, setAllBook] = useState([]);
  const [searchInputBook, setSearchInputBook] = useState('');

  const searchBook = async () => {
    try {
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchInputBook}`);
      setAllBook(response.data.items); 
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    if (searchInputBook) {
      searchBook();
    }
  }, [searchInputBook]); 

  return (
    <div className="App">
      <h1>Find a Book</h1>
      <input 
        type="text" 
        value={searchInputBook} 
        onChange={(event) => setSearchInputBook(event.target.value)} 
        placeholder="SearchBook" 
      />
      <div>
        {allBook && allBook.map((book, index) => (
          <div key={index}>
            <li>Book : {book.volumeInfo.title}
              <p>Author : {book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : "Unknown author"}</p>
            </li>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
