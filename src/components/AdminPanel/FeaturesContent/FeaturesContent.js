import React, { useEffect, useState } from 'react';
import SingleFeature from './SingleFeature/SingleFeature';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditForm from './SingleFeature/EditForm/EditForm';

const FeaturesContent = ({loggedInUser}) => {
    const [features, setFeatures] = useState([]);
    const [updateContent, setUpdateContent ] = useState({
        id: '',
        title: '',
        description: ''
    });

    useEffect(() => {
        try {
            fetch('https://safe-lake-59483.herokuapp.com/features')
            .then(res => res.json())
            .then(data => setFeatures(data))
        } catch (error) {
         
        }
    },[updateContent.id])
    const publishFeature = (status, id) => {
        try {
            fetch(`https://safe-lake-59483.herokuapp.com/updatePublishStatus/${id}`,{
                method: 'PATCH',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({publish: status})
            })
            .then(res => {
                if(res.ok){
                    console.log("This feature publish status is successfully updated 😊")
                    toast('This feature publish status is successfully updated 😊')
                }
            })
        } catch (error) {

        }
    }
    const deleteFeature = id => {
        try {
            fetch(`https://safe-lake-59483.herokuapp.com/deleteFeature/${id}`,{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(res => res.json() )
            .then(data => {
                if(data){
                    if(data){
                        toast('This feature is successfully deleted...')
                        setTimeout(() => {
                            window.location.reload();
                        },3000)
                    }
                }
            })
        } catch (error) {
            
        }
    }
    const getUpdateContent = content => {
        setUpdateContent(content)
    }
    return (
        <div className='container mt-5'>
             <ToastContainer />
            <div className='row'>
                <div className='column column-50'>
                
                    {
                     features.length > 0 ? (features.map( feature => <SingleFeature key={feature._id} feature={feature} publishFeature={publishFeature} deleteFeature={deleteFeature} getUpdateContent={getUpdateContent} />)) 
                      : <div>
                          <h2 className='upper text-center'>No Records found</h2>
                      </div>
                    }
                </div>
                <div className='column column-50'>
                    <EditForm updateContent={updateContent} loggedInUser={loggedInUser}></EditForm>
                </div>
            </div>
        </div>
    );
};

export default FeaturesContent;