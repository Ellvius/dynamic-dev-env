import './App.css';
import axios from 'axios';

function App() {

  const  handleClick = async () => {
    const response = await axios.get("http://localhost:5000/start-container")
    if (response.data.redirectUrl) {
      window.location.href = response.data.redirectUrl; // Redirect the browser
    }
  }

  return (
    <div className="App">
      <button onClick={handleClick}>Start Container</button>
    </div>
  );
}

export default App;
