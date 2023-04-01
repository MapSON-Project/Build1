import { useEffect, useState } from 'react'
import './App.css'

// prefix for API URL
const API_PREFIX = "https://sea-turtle-app-qlvxz.ondigitalocean.app/api";

function App() {
  const [texts, setTexts] = useState([]);
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API_PREFIX}/texts`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setTexts(data.texts));
  }, []);

  const addText = () => 
    fetch(`${API_PREFIX}/text`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({text: text})
    })
      .then((response) => {
        if (!response.ok) throw response
        return response.json();
      })
      .then((data) => setTexts(data.texts))
      .catch((error) => setError("Oops! Make sure you entered text"));

  const deleteText = (text) => {
    fetch(`${API_PREFIX}/text`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({text: text})
    })
      .then((response) => {
        if (!response.ok) throw response
        return response.json();
      })
      .then((data) => setTexts(data.texts))
      .catch((error) => setError("Oops! Make sure you entered text"));
  }

  return (
    <div className="App">
      <div>
        <label>Add some text</label><br/>
        <input type="text" onChange={(e) => setText(e.target.value)}/>
        <button onClick={addText}>Submit</button>
      </div><br/>
      
      <div>
        <span>List of texts: </span>
        <ul> 
          {texts.map((text) => <li>{text} <button onClick={() => deleteText(text)}>Delete</button></li>)}
          
        </ul>
      </div>

      {
        error &&

        <div>
          <b>{error}</b><br/>
          <button onClick={() => setError("")}>Clear</button>
        </div>
      }
    </div>
  )
}

export default App
