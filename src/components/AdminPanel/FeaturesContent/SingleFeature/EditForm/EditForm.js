import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { Link } from "react-router-dom";

const EditForm = ({ updateContent, loggedInUser }) => {
  const [id, setId] = useState("");
  const [title, setTitile] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setTitile(updateContent.title);
    setDescription(updateContent.description);
    setId(updateContent.id);
  }, [updateContent]);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (window.confirm("Are you sure want to update this feature content ?")) {
      if (title && description) {
        try {
          fetch(`https://safe-lake-59483.herokuapp.com/updateFeature/${id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, description }),
          })
            .then((res) => res.json())
            .then((data) => {
              if(data){
                    toast("This Feature content updated successfully ..");
                    setTimeout(() => {
                        window.location.reload();
                    }, 6000)
                }  
              });
        } catch (error) {
          console.log(error);
        }
      } else {
        toast.error("Title or Detail field is empty ! Please try again");
      }
    }
  };
  return (
    <div>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <label htmlFor="titleField" className="my-3">
          Title
        </label>
        <input
          type="text"
          placeholder="Title"
          id="titleField"
          value={title}
          onChange={(e) => setTitile(e.target.value)}
        />
        <label htmlFor="detailField" className="my-3">
          Detail
        </label>
        <textarea
          placeholder="Detail"
          id="detailField"
          rows={10}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        {loggedInUser.email ? (
          <input className="button-primary mt-3" type="submit" value="Update" />
        ) : (
          <Link to="/login">
            <a href="" className="button button-primary mt-3">
              Login to Update Feature
            </a>
          </Link>
        )}
      </form>
    </div>
  );
};

export default EditForm;
