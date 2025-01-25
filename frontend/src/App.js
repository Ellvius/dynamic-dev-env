import './App.css';
import axios from 'axios';

function App() {

  const handleClick = () => {
    axios.get("http://localhost:3000/start-container")
      .then(() => console.log("Successfully start container."))
      .catch((err) => console.log(err));
  }

  return (
    <div className="App">
      <button onClick={handleClick}>Start Container</button>
    </div>
  );
}

export default App;
