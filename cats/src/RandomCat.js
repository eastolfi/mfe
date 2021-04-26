function RandomCat() {
    const handleClick = () => {
      alert('CAT');
    }
  
    return (
      <div>
        <h3>Cats</h3>
  
        <button onClick={handleClick}>Cat!</button>
      </div>
    );
  }
  
  export default RandomCat;
  