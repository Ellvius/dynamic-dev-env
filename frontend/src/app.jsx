import axios from 'axios';

function App() {

  const  handleNodeClick = async () => {
    const response = await axios.get('http://localhost:5000/start-container', {
        dev: "node-dev"
    });
    if (response.data.redirectUrl) {
      // window.location.href = response.data.redirectUrl;
      window.open(response.data.redirectUrl, '_blank') ;
    }
  }

  const  handlePythonClick = async () => {
    const response = await axios.get('http://localhost:5000/start-container', {
        dev: 'python-dev'
    });
    if (response.data.redirectUrl) {
      // window.location.href = response.data.redirectUrl;
      window.open(response.data.redirectUrl, '_blank') ;
    }
  }

  const  handleCppClick = async () => {
    const response = await axios.get('http://localhost:5000/start-container', {
        dev: 'cpp-dev'
    });
    if (response.data.redirectUrl) {
      // window.location.href = response.data.redirectUrl;
      window.open(response.data.redirectUrl, '_blank') ;
    }
  }

  return (
    <div className="App">
      <button className='Node' onClick={handleNodeClick}>Node</button>
      <button className='Python' onClick={handlePythonClick}>Python</button>
      <button className='Cpp' onClick={handleCppClick}>Cpp</button>
    </div>
  );
}

export default App;