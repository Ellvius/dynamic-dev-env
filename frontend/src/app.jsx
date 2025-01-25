import axios from 'axios';

function App() {

    const handleClick = async (devName) => {
        try {
          const newTab = window.open("", "_blank");
          if (newTab) {
            newTab.document.write("<h1>Setting up your development environment...</h1>");
          }
      
          const response = await axios.get('http://localhost:5000/start-container', {
            params: { dev: devName }
          });
      
          if (response.data.redirectUrl) {
            const url = response.data.redirectUrl;
      
                newTab.location.href = url;
          }
        } catch (error) {
          console.error("Error starting container:", error);
        }
      };

  return (
    <div className="App">
      <button className='Node' onClick={() => handleClick("node-dev")}>Node</button>
      <button className='Python' onClick={() => handleClick("python-dev")}>Python</button>
      <button className='Cpp' onClick={() => handleClick("cpp-dev")}>Cpp</button>
    </div>
  );
}

export default App;