import React ,{useState} from 'react';
import EditUserProfileStyles from './EditUserProfile.module.css';
import pro_pic from '../assets/spider.jpg';

const EditUserProfile = ({isEditingOn ,user , onSave , onCancel}) => {

    //just do un-comment

    const [firstName , setFirstname] = useState(user.firstName);
    const [lastName , setLastname]   = useState(user.lastName);
    const [email, setEmail]          = useState(user.email);
    // const [password , setPassword]   = useState(user.password);
    const [nidNumber , setNidNumber] = useState(user.nidNumber);
    const [profilePic,setProfilePic] = useState(user.profilePic);
    const [phoneNumber , setPhoneNumber] = useState(user.phoneNumber);
    // const [showPassword , setShowPassword] = useState(false);


    const handleSave = () =>{
        onSave({firstName , lastName , email  , nidNumber ,
                 phoneNumber   , profilePic});
    };

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

    //test_code



    return(

            <div className={EditUserProfileStyles.page_container}>
                <div className={EditUserProfileStyles.box_container}>
                    <h2>Edit  &nbsp;  User &nbsp; Profile</h2>
                    <div className = {EditUserProfileStyles.profile_pic}>
                        <img src = {profilePic || pro_pic} alt= "ProfilePic"/>
                        <label className={EditUserProfileStyles.custom_file_upload}>
                            <input type = "file"
                                   accept= "image/*"
                                   onChange = {handleImageUpload}/>
                            Choose File
                        </label>
                    </div>
                    <div className={EditUserProfileStyles.info_container}>
                        <label className={EditUserProfileStyles.label_container}><strong>First Name:  </strong>
                            <input className={EditUserProfileStyles.info_input}
                                   type = "text"
                                   placeholder= "Enter Your First Name"
                                   value={firstName}
                                   onChange={(e)=>setFirstname(e.target.value)} />
                             &nbsp;*
                        </label>
                        <label className={EditUserProfileStyles.label_container}><strong>Last Name:  </strong>
                            <input className={EditUserProfileStyles.info_input}
                                   type = "text"
                                   placeholder= "Enter Your Last Name"
                                   value={lastName}
                                   onChange={(e)=>setLastname(e.target.value)} />
                            &nbsp; *
                        </label>
                        <label className={EditUserProfileStyles.label_container}><strong>Email:  </strong>
                            <input className={EditUserProfileStyles.info_input}
                                   type = "text"
                                   placeholder= "Enter Your Email"
                                   value={email}
                                   onChange={(e)=>setEmail(e.target.value)}/>
                        </label>
                        <label className={EditUserProfileStyles.label_container}><strong>NID Number:  </strong>
                            <input className={EditUserProfileStyles.info_input}
                                   type = "text"
                                   placeholder= "Enter Your NID Number"
                                   value={nidNumber}
                                   onChange={(e)=>setNidNumber(e.target.value)}   />
                            &nbsp; *
                        </label>
                        <label className={EditUserProfileStyles.label_container}><strong>Phone Number:  </strong>
                            <input className={EditUserProfileStyles.info_input}
                                   type = "number"
                                   placeholder= "Enter Your Phone Number"
                                   value={phoneNumber}
                                   onChange={(e)=>setPhoneNumber(e.target.value)}/>
                        </label>
                    </div>
                    <div className={EditUserProfileStyles.button_container}>
                        <button className = {EditUserProfileStyles.EditUserProfile_button}
                                onClick={handleSave}>Done</button>
                        <button className = {EditUserProfileStyles.EditUserProfile_button}
                                onClick={onCancel}>Cancel</button>
                    </div>
                </div>
            </div>

    )
}

export default EditUserProfile;





//optimized code from chat gpt:
// import React, { useState } from 'react';
// import EditUserProfileStyles from './EditUserProfile.module.css';
//
// const EditUserProfile = ({ user, onSave, onCancel }) => {
//     const [firstName, setFirstname] = useState(user.firstName);
//     const [lastName, setLastname] = useState(user.lastName);
//     const [email, setEmail] = useState(user.email);
//     const [nidNumber, setNidNumber] = useState(user.nidNumber);
//     const [profilePic, setProfilePic] = useState(user.profilePic);
//     const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
//
//     const handleSave = () => {
//         onSave({ firstName, lastName, email, nidNumber, phoneNumber, profilePic });
//     };
//
//     const handleImageUpload = (event) => {
//         const file = event.target.files[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 setProfilePic(reader.result);
//             };
//             reader.readAsDataURL(file);
//         }
//     };
//
//     return (
//         <div className={EditUserProfileStyles.page_container}>
//             <div className={EditUserProfileStyles.box_container}>
//                 <h2>Edit User Profile</h2>
//                 <div className={EditUserProfileStyles.profile_pic}>
//                     <img src={profilePic || "default-profile.png"} alt="Profile Pic" />
//                     <label className={EditUserProfileStyles.custom_file_upload}>
//                         <input type="file" accept="image/*" onChange={handleImageUpload} />
//                         Choose File
//                     </label>
//                 </div>
//                 <div className={EditUserProfileStyles.info_container}>
//                     <label className={EditUserProfileStyles.label_container}><strong>First Name: </strong>
//                         <input className={EditUserProfileStyles.info_input} type="text" placeholder="Enter Your First Name"
//                                value={firstName} onChange={(e) => setFirstname(e.target.value)} />
//                         &nbsp;*
//                     </label>
//                     <label className={EditUserProfileStyles.label_container}><strong>Last Name: </strong>
//                         <input className={EditUserProfileStyles.info_input} type="text" placeholder="Enter Your Last Name"
//                                value={lastName} onChange={(e) => setLastname(e.target.value)} />
//                         &nbsp; *
//                     </label>
//                     <label className={EditUserProfileStyles.label_container}><strong>Email: </strong>
//                         <input className={EditUserProfileStyles.info_input} type="text" placeholder="Enter Your Email"
//                                value={email} onChange={(e) => setEmail(e.target.value)} />
//                     </label>
//                     <label className={EditUserProfileStyles.label_container}><strong>NID Number: </strong>
//                         <input className={EditUserProfileStyles.info_input} type="text" placeholder="Enter Your NID Number"
//                                value={nidNumber} onChange={(e) => setNidNumber(e.target.value)} />
//                         &nbsp; *
//                     </label>
//                     <label className={EditUserProfileStyles.label_container}><strong>Phone Number: </strong>
//                         <input className={EditUserProfileStyles.info_input} type="number" placeholder="Enter Your Phone Number"
//                                value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
//                     </label>
//                 </div>
//                 <div className={EditUserProfileStyles.button_container}>
//                     <button className={EditUserProfileStyles.EditUserProfile_button} onClick={handleSave}>Done</button>
//                     <button className={EditUserProfileStyles.EditUserProfile_button} onClick={onCancel}>Cancel</button>
//                 </div>
//             </div>
//         </div>
//     );
// };
//
// export default EditUserProfile;