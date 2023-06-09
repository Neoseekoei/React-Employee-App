//import logo from './logo.svg';
import { nanoid } from 'nanoid';
import './App.css';
import React, { useState, Fragment } from "react";
import data from "./mock-data.json"
import ReadRow from './components/ReadRow';
import EditRow from './components/EditRow';
import search from './Search'

function App() {

  // const getFilteredItems = (query, items) => {
  //   if (!query) {
  //     return items;
  //   }
  //   return items.filter(result => result.name.includes (query))
  // }

  const [query, setQuery] = useState('');

  //const {search} = Search;
  // const {items} = search;

  // const filteredItems = getFilteredItems(query, items)

  const [contacts, setContacts] = useState(data);
   const [ addFormData, setAddformData] = useState({
    fullName: '',
    address: '',
    phoneNumber: '',
    email: '',
   });

   const [editFormData, setEditformData] = useState({
    fullName: '',
    address: '',
    phoneNumber: '',
    email: '',
   });

   const [editContactId, setEditContactId] = useState(null);

   const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute('name');
    const fieldValue = event.target.value;

    const newFormData = {...addFormData};
    newFormData[fieldName] = fieldValue;

    setAddformData(newFormData);
   };

   const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = {...editFormData};
    newFormData[fieldName] = fieldValue;

    setAddformData(newFormData);
   };

   const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newContact = {
      id: nanoid(),
      fullName: addFormData.fullName,
      address: addFormData.address,
      phoneNumber:addFormData.phoneNumber,
      email: addFormData.email,

    };

    const newContacts = [...contacts, newContact];
    setContacts(newContacts);
   };

   const handleEditFormSubmit = (event) => {
     event.preventDefault();

      const editedContact = {
        id: editContactId,
       fullName: editFormData.fullName,
       address: editFormData.address,
       phoneNumber: editFormData.phoneNumber,
       email: editFormData.email,
      };

      const newContacts = [...contacts];

      const index = contacts.findIndex((contact)=> contact.id === editContactId);

     newContacts[index] = editedContact;

     setContacts(newContacts);
     setEditContactId(null)
   };

   const handleEditClick = (event, contact)=> {
    event.preventDefault();
    setEditContactId(contact.id);

    const formValues ={
      fullName: contact.fullName,
      address: contact.address,
      phoneNumber: contact.phoneNumber,
      email: contact.email,
    }

    setEditformData(formValues);
};
    const handleCancelClick = () => {
      setEditContactId(null);
    }

    const handleDeleteClick = (contactId) => {
       const newContacts = [...contacts];


      const index = contacts.findIndex((contact)=> contact.id === contactId);

      newContacts.splice(index, 1);

      setContacts(newContacts);
    }

  return (
    <div className='app-container'>
      <form >
        <label>Search</label>
        <input type='text' onChange={e => setQuery(e.target.value)}/>
        {/* <ul>
          {filteredItems.map(value => <h1 key={value.name}>{value.name}</h1>)}
        </ul> */}
      </form>
      <h2 class="subject">Employee Information Table</h2>
      <form onSubmit={handleEditFormSubmit}>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {contacts.filter((contact) =>
          contact.fullName.toLowerCase().includes(query))
          .map((contact)=> (
            <Fragment>
              { editContactId === contact.id ? (
              <EditRow 
              editFormData={editFormData} 
              handleEditFormChange={handleEditFormChange}

               handleCancelClick={handleCancelClick}
              /> )  : (
              <ReadRow 
              contact={contact} 
              handleEditClick={handleEditClick}
              handleDeleteClick={handleDeleteClick}
              />
              )}
            </Fragment>
          ))}
        </tbody>
      </table>
      </form>
      <h2 class="add-a-contact">Add a Contact</h2>
      <form onSubmit={handleAddFormSubmit}>
        <input 
            type="text" 
            name="fullName"
            required="required"
            placeholder="Enter a name..."
            onChange={handleAddFormChange}
          />
          <input 
            type="text" 
            name='address'
            required="required"
            placeholder='Enter an address...'
            onChange={handleAddFormChange}
          />
           <input 
            type="text" 
            name='phoneNumber'
            required="required"
            placeholder='Enter a phone number...'
            onChange={handleAddFormChange}
          />
           <input 
            type="email" 
            name='email'
            required="required"
            placeholder='Enter an email...'
            onChange={handleAddFormChange}
          />
          <button type='submit' class="add">Add</button>
      </form>
    </div>
  );
};

export default App;
