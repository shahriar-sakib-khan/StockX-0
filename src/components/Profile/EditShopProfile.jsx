import React , {useState} from 'react';
import EditShopProfileStyle from './EditShopProfile.module.css';

const EditShopProfile = (shop , onSave , onCancel) =>{


    const handleImageUpload = (event) =>{
        const file = event.target.files[0];
        if(file){
            const reader = new FileReader();
            reader.onloadend = () =>{
                setProfilePic(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }
    return(
        <>
        </>
    );
}

export default EditShopProfile;