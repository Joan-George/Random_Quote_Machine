import React from "react";
import "./../css/QuoteMain.css";
class QuoteMain extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      quote: "",
      author: "",
      update: false,
    };

    this.setQuotes = this.setQuotes.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleUpdate() {
    this.setState({ update: true });
  }

  shouldComponentUpdate(nextProps,nextState) {
    if(nextState.update){
      this.setState({ update: false });
      return true
    }
  }

  componentDidUpdate(prevProps,prevState) {
    this.setQuotes()
  }
  
  setQuotes() {
    fetch("https://type.fit/api/quotes")
      .then((response) => response.json())
      .then((data) => {
        const randomNumber = Math.floor(Math.random() * data.length);
        this.setState({
          quote: data[randomNumber].text,
          author: data[randomNumber].author,
        });
      });
  }

  componentDidMount() {
    alert("componentDidMount")
    this.setQuotes();
  }

  render() {
    return (
      <div>
        <h1 className="h1">
          <span style={{ color: "red" }}>Quote:</span>
          {this.state.quote}
        </h1>
        <h4 style={{ opacity: "0.5" }}>-{this.state.author}</h4>
        <button onClick={this.handleUpdate}>Update</button>
      </div>
    );
  }
}

export default QuoteMain;
