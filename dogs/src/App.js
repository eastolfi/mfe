
import './App.css';

function App() {
  const handleClick = () => {
    alert('DOG');
  }

  return (
    <div>
      <h3>Dogs</h3>

      <button onClick={handleClick}>Dog!</button>
    </div>
  );
}

export default App;
