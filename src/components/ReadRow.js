import React from 'react'

const ReadRow = ({ contact, handleEditClick, handleDeleteClick }) => {
  return (
     <tr>
       <td>{contact.fullName}</td>
       <td>{contact.address}</td>
        <td>{contact.phoneNumber}</td>
        <td>{contact.email}</td>
        <td>
          <button type="button" class="edit" onClick={(event)=> handleEditClick(event, contact)}>Edit</button>
          <button type="button" class="delete" onClick={()=> handleDeleteClick(contact.id)}>Delete</button>
        </td>
        </tr> 
  );
};

export default ReadRow
