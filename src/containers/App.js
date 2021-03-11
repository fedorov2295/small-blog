import React, { Component } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/cockpit/Cockpit';
import withClass from '../hoc/withClass';
import Aux from '../hoc/Auxiliary';
import AuthContext from '../context/auth-context'

class App extends Component {
  constructor(props) {
    super(props);
    console.log('[App.js] constructor');
  }

  state = {
    persons: [
      { id: 'jhg1', name: 'Max', age: 24 },
      { id: 'vk.2', name: 'Maria', age: 21 },
      { id: 'dxtdx3', name: 'Ivan', age: 30 }
    ],
    showCockpit: true,
    changeCounter: 0,
    authinticated:true
  };

  static getDerivedStateFromProps(props, state) {
    console.log('[App.js] getDerivedStateFromProps', props);
    return state;
  }

  // componentWillMount() {
  //   console.log('[App.js] componentWillMount');
  // }

  componentDidMount() {
    console.log('[App.js] componentDidMount');
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('[App.js] shouldComponentUpdate');
    return true;
  }

  componentDidUpdate() {
    console.log('[App.js] componentDidUpdate');
  }

  deletePersonHandler = (personIndex) => {
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons]
    persons.splice(personIndex, 1);
    this.setState({ persons: persons });
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    //const person = Object.assign({}, this.state.persons[personIndex]);

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;


    this.setState((prevState, props) => {
      return {
        persons: persons,
        changeCounter: prevState.changeCounter + 1
      }
    });
  }

  loginHandler = () =>{
    this.setState({authinticated: false})
  };


  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow });
  }

  render() {
    console.log('[App.js] render')
    let persons = null;

    if (this.state.showPersons) {
      persons = <Persons
        persons={this.state.persons}
        clicked={this.deletePersonHandler}
        changed={this.nameChangedHandler} />
    }



    return (
      <Aux>
        <button onClick={() => { this.setState({ showCockpit: false }) }}>Remove cockpit</button>
        <AuthContext.Provider value={{
          authinticated: this.state.authinticated,
          login: this.loginHandler
          }}>
          {this.state.showCockpit ? <Cockpit
            showPersons={this.state.showPersons}
            personsLength={this.state.persons.length}
            togglePersons={this.togglePersonsHandler} /> : null}
          {persons}
        </AuthContext.Provider>
      </Aux>
    );
    // return React.createElement('div',{className:'App'}, React.createElement('h1',null,'Does this work now?'))
  }
}


export default withClass(App, classes.App);