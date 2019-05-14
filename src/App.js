import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person.js';
import Radium ,{StyleRoot}from 'radium';

class App extends Component {
  state = {
    persons: [
      {id:'1',name:'max',age:28},
      {id:'2',name:'chan',age:29},
      {id:'3',name:'jack',age:30}
    ],
    otherState:'some other value',
    showPersons: false
  }

  deletePersonHandler =(personIndex) =>{
   // const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons:persons})
  }

  nameChangeHandler = (event,id) =>{
    const personIndex = this.state.persons.findIndex(p=>{
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    }

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({
      persons: persons
  })
  }


  togglePersonHandler =()=>{
    const doesShow = this.state.showPersons;
    this.setState({showPersons:!doesShow});
  }

  render() {
    const style = {
      backgroundColor:'green',
      color:"white",
      font: 'inherit',
      border: '1px solid blue',
      padding:'8px',
      cursor:'pointer',
      ':hover':{
        backgroundColor:'lightgreen',
        color:'black'
      }
    };

    let persons = null;
    
    if (this.state.showPersons){
      persons = (
        <div>
          {this.state.persons.map((person, index)=>{
            return <Person 
            click = {()=> this.deletePersonHandler(index)}
            name={person.name}
            age = {person.age}
            key = {person.id}
            changed = {(event) => this.nameChangeHandler(event,person.id)}
            />
          })}
        </div> 
      );

      style.backgroundColor = 'red';
      style[':hover'] = {
        backgroundColor:'lightred',
        color:'black'
      };
    }

    let classes = [];
    if (this.state.persons.length <=2){
      classes.push('red'); 
    }

    if (this.state.persons.length <=1){
      classes.push('bold'); 
    }


    return (
      <StyleRoot>
      <div className="App">
        <h1>Hello, I am a react app.</h1>
        <p className={classes.join(' ')}> click the person to delete it</p>
        <button 
          style = {style}
          onClick={this.togglePersonHandler}>Toggle Persons
        </button>
        {persons}
      </div>
      </StyleRoot>
    );
   //return React.createElement('div',null,React.createElement('h1',{className:"App"},'Hi,I\m app'));
  }
}

export default Radium(App);
