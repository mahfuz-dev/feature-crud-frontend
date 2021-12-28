import React, { useContext, useState } from "react";
import { Link } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "../../../App";


const FeatureForm = () => {
  const [title, setTitile] = useState("");
  const [description, setDescription] = useState("");

  const [loggedInUser, setLoggedInUser] = useContext(AuthContext)

  const handleSubmit = e => {
    e.preventDefault();

    const requestDate = new Date().toDateString();
    const publish = false;

    if(title && description ){
      try {
        fetch('https://safe-lake-59483.herokuapp.com/addFeature', {
          method: 'POST',
          headers: {
            'Content-Type' : 'application/json'
          },
          body:JSON.stringify({publish, useremail: loggedInUser.email, username: loggedInUser.name, title, description, requestDate})
        })
        .then(res => res.json())
        .then(data => {
          if(data){
            toast('Your Feature request added successfully ..')
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
    else{
      toast.error('Title or Detail field is empty ! Please try again')
    }
  }

  return (
    <div className="column column-50">
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <label htmlFor="titleField" className='my-3'>Title</label>
        <input type="text" placeholder="Title" id="titleField" value={title} onChange={(e) => setTitile(e.target.value)} />
        <label htmlFor="detailField" className='my-3'>Detail</label>
        <textarea placeholder="Detail" id="detailField" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
        {
          loggedInUser.email ? <input className="button-primary mt-3" type="submit" value="REQUEST FEATURE" /> : <Link to='/login'> <a href='' className='button button-primary mt-3'> Login to Send Request </a> </Link>
        }
      </form>
    </div>
  );
};

export default FeatureForm;
