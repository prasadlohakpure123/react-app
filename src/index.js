import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";


class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], text: "" ,glob_name:""};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <div>
        <h3 style={{ fontSize: "2em", display: "block" }}>Stopwatch Creator</h3>
        <form onSubmit={this.handleSubmit}>
          <fieldset>
            <label
              htmlFor="new-todo"
              style={{ fontSize: "2em", display: "block" }}
            >
              <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet"/>
              <h3>Enter the stopwatch name</h3>
              
            </label>
            <input
              id="new-todo"
              onChange={this.handleChange}
              value={this.state.text}
            />
            <button>Add #{this.state.items.length + 1}</button>
          </fieldset>
          <TodoList items={this.state.items} />
        </form>
      </div>
    );
  }
  handleChange(e) {
    this.setState({ text: e.target.value,
      glob_name : e.target.value
     });
    
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.text.length) {
      return;
    }
    // var v1 = item.item_text
    // var v2 = this.state.glob_name
    // this.props.item.map(item => ({
    //   if(v1.equals(v2)==true) 
    //     {alert("No new watch created,watch with this name already exists!")
    //     }
    // }))
    

    const newItem = {
      item_text: this.state.glob_name,
      id: Date.now(),
      lapse: 0,
      running: false
    };

    

    this.setState(prevState => ({
      items: prevState.items.concat(newItem),
      text: ""
    }));
  }
}

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.handleRemoveWatch = this.handleRemoveWatch.bind(this);
  }
  state = { id: this.props.id };

  handleRemoveWatch = () => {
    alert("will be removed")
    

  }

  render() {
    return (
      <ul>
        {this.props.items.map(item => (
          <li key={item.id}>
            <fieldset>
            <StopWatch item={this.props.item} item_text={item.item_text}/>
            <button onClick={this.handleRemoveWatch} data-test="clear">
              Delete
            </button>
            </fieldset>
          </li>
        ))}
      </ul>
    );
  }
}

class StopWatch extends React.Component {
  constructor(props) {
    super(props);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleRunClick = this.handleRunClick.bind(this);
    this.handleClearClick = this.handleClearClick.bind(this);
    
  }
  state = {
    lapse: 0,
    running: false,
    clock_id: this.props.id,
    name: this.props.item_text
  };

  handleRunClick = () => {
    this.setState(state => {
      if (state.running) {
        clearInterval(this.timer);
      } else {
        const startTime = Date.now() - this.state.lapse;
        this.timer = setInterval(() => {
          this.setState({
            lapse: Date.now() - startTime
          });
        });
      }
      return { running: !state.running };
    });
  };

  handleClearClick = () => {
    clearInterval(this.timer);
    this.setState({ lapse: 0, running: false });
  };

  handleTextChange = () => {
    var new_text = prompt("Please enter the new name", "");
    this.setState({ name: new_text });
  }

  render() {
    return (
      <div>
        <h2 onClick={this.handleTextChange}>{this.state.name}</h2>
        <label
          style={{ fontSize: "5em", display: "block" }}
          onClick={this.handleTextChange}
        >
          {this.state.lapse}ms
        </label>
        <button onClick={this.handleRunClick} data-test="toggle">
          {this.state.running ? "Stop" : "Start"}
        </button>
        <button onClick={this.handleClearClick} data-test="clear">
          Clear
        </button>
        
      </div>
    );
  }
}

const element = <TodoApp />;
ReactDOM.render(element, document.getElementById("root"));
export default TodoApp;
