import React from "react";
import { Link } from "react-router-dom";

const SingleFeature = ({ feature, publishFeature, deleteFeature, getUpdateContent }) => {
  const {_id, title, description, username, useremail, requestDate } = feature;
   
  const allertForPublishFeature = (status, id) => {
      if(status){
          if(window.confirm('Are you sure want to publish this feature request ?')){
              publishFeature(status, id)
          }
      } else {
        if(window.confirm('Are you sure want to undo publish this feature request ?')){
           publishFeature(status, id)
        }
     
  }
}

  const alertForDeleteFeature = (id) => {
      if(window.confirm('Are you sure want to delete this feature content? ')){
          deleteFeature(id)
      }
  }
  
  return (
    <div className="bg-light p-5 rounded mb-5">
      <div className="d-flex justify-content-between">
        <h3>{title}</h3>
        <div className="dropdown">
          <button
            className="btn btn-dark dropdown-toggle"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Actions
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li>
              <Link href='' className="dropdown-item pe-auto" onClick={() => allertForPublishFeature(true, _id)}>
                Publish
              </Link>
            </li>
            <li>
              <Link href='' className="dropdown-item pe-auto" onClick={() => getUpdateContent({id:_id, title, description})}>
                Edit
              </Link>
            </li>
            <li>
              <Link href='' className="dropdown-item pe-auto" onClick={() => alertForDeleteFeature(_id)}>
                Delete
              </Link>
            </li>
            <hr/>
            <li>
              <Link href='' className="dropdown-item pe-auto" onClick={() => allertForPublishFeature(false, _id)}>
                Undo Publish
              </Link>
            </li>
          </ul>
          
        </div>
      </div>
      <p>
        <span>
          <strong>
            {username} | {useremail} | {requestDate}
          </strong>
        </span>
      </p>
      <hr />
      <p>{description}</p>
    </div>
  );
};

export default SingleFeature;
