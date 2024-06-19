import { useState, useEffect } from "react"; //import necessary Hooks
import "./App.css"; 

export default function App() {
  const [data, setData] = useState([]); // Initialize data state
  const [error, setError] = useState(null);  // Initialize error state  

  useEffect(() => {
    // An asynchronous function to fetch data
    const fetchData = async () => {
      try {
          const response = await fetch("https://jsonplaceholder.typicode.com/posts"); 
          if (!response.ok) {     // Check if the response is not OK and then throw error
            
            throw new Error(`HTTP error! status: ${response.status}`); 
          }
        const result = await response.json(); 
        setData(result); // Assign fetched data to data variable
      } catch (error) {
        setError(error.message); 
      }
    };

    fetchData(); 
  }, []); // Set dependency array to empty so useEffect runs once at initial render

 
  if (error) {
    return <div className="error-div">An error has occured: {error}</div>; // If there is an error, display the message
  }

  return (
    <div>
      <h1>Posts</h1>
      <ol>
        {data.map((post) => (     //Map through each post on posts 
          <li key={post.id}>
            <h3>{post.title}</h3>  
            <p>{post.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
