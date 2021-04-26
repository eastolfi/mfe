function GreetingCat(props) {
    const {greeting} = props.match.params;
  
    return (
      <div>
        <h3>Cat : {greeting || 'nope'}</h3>
      </div>
    );
  }
  
  export default GreetingCat;
  