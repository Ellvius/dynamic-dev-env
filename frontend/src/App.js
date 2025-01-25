import './App.css';
import axios from 'axios';

function App() {

  const  handleClick = async () => {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000'}/start-container`);
    if (response.data.redirectUrl) {
      // window.location.href = response.data.redirectUrl;
      window.open(response.data.redirectUrl, '_blank') ;
    }
  }

  return (
    <div className="App">
      <button onClick={handleClick}>Start Container</button>
    </div>
  );
}

export default App;
