import React , { useState } from 'react';
import ReactDOM from 'react-dom';
import './app.css';

const Line=(props)=>
  <li>{props.line.name} {props.line.number}</li>

export const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'TovaSima' ,
      number: '0583204988'}
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState('0')

  const handleNameChange=(event)=>{
    setNewName(event.target.value)
  }

  const handleNumberChange=(event)=>{
    setNewNumber(event.target.value)
  }

  const handleSearchChange=(event)=>{
    setNewSearch(event.target.value)
  }

  const add_person=(event)=>{
    event.preventDefault()
    const personObject={name:newName,
                        number:newNumber}
    setPersons(persons.concat(personObject))
    console.log(persons)
  }

  const names=()=>persons.map(person=>
    <Line
    key={person.number} 
    line={person}/>
  )
  
  let namesToShow = persons.filter(person=>person.name.startsWith(newSearch))

  const search = () => namesToShow.map((person,index)=>
    <Line
    key={index}
    line={person}/>
  )

  return (
    <div>
      <h2 className = "header" >PhoneBook</h2>
      <form onSubmit={add_person}>
        <div className = "entry">
          Name: <input onChange={handleNameChange}/>
          <br/><br/>
          Number: <input number={newNumber} onChange={handleNumberChange}/>
          <br/><br/>
          <button type="submit" className = "badd">Add</button>
        </div>
      </form>
      <br/>
      Search: <input name={newSearch} onChange={handleSearchChange}/>
      <ul className = "list">
          {search()}
      </ul>
      <h2 className = "header1">Contacts</h2>
      <ul className = "list">
          {names()}
      </ul>
    </div>
  )
}
export default App;