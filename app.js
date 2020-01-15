import React , { useState, useEffect  } from 'react';
import ReactDOM from 'react-dom';
import './app.css';
import db from './dbservice'
import axios from 'axios'

const Line=(props)=>
  <li><button className = "badd" onClick={props.deleteRec}>Delete</button> {props.line.name} {props.line.number}</li>

export const App = () => {
  const [ persons, setPersons] = useState([]) 

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState('null')
  const [message, setMessage] = useState(null)

  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <h3 >
        {message}
      </h3>
    )
  }

  const hook = () => {
    db.getAll()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response)
      })
  }

  useEffect(hook, [])

  const handleNameChange=(event)=>{
    setNewName(event.target.value)
  }

  const handleNumberChange=(event)=>{
    setNewNumber(event.target.value)
  }

  const handleSearchChange=(event)=>{
    setNewSearch(event.target.value)
  }

  const  deleteRec= (person) => {
    if(window.confirm(`Are you sure you want to delete ${person.name}?`))
    {
    db.deleteRec(person)
    .then(res => {
     setPersons(persons.filter(P => (P.id!== person.id)))
     console.log(res.data)
    })
   .catch(err=> console.log(err))
    }
    }

  const add_person=(event)=>{
    event.preventDefault()
    const personObject={name:newName,
                        number:newNumber, 
                        id: persons.length + 1,}
    console.log(persons)
    db.create(personObject)
    .then(response => {
      console.log(response)
      setPersons(persons.concat(response))
      setNewName(null)
      setMessage('Success')
      setTimeout(() => {
        setMessage(null)
      }, 1000);
    })
  }

  const names=()=>persons.map(person=>
    <Line
    key={person.number} 
    line={person}
    deleteRec={()=>deleteRec(person)}/>
  )
  
  let namesToShow=persons.filter(person=>person.name.startsWith(newSearch))

  const search=()=>
    namesToShow.map((person,index)=>
    <Line
    key={index}
    line={person}/>
  )


  return (
    <div>
      <h2 className = "header" >PhoneBook</h2>
      <Notification message={message} />
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