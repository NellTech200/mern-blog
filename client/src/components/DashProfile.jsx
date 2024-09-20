import { Alert, Button, TextInput } from 'flowbite-react'
import React, { useEffect } from 'react'
import { useState, useRef } from 'react';
import {useSelector} from 'react-redux';
import { getDownloadURL, getStorage, ref,uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css'


export default function DashProfile() {
    const {currentUser} = useSelector(state => state.user)
    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
    const [imageFileUploadError, setImageFileUploadError] = useState(null);
    const filePickerRef = useRef();
    const hanldleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImageFileUrl(URL.createObjectURL(file));
        }
    };

    useEffect(() => {
        if (imageFile) {
            uploadImage();
        }

    }, [imageFile]);

    const uploadImage = async () => {
        setImageFileUploadError(null);
        const storage = getStorage(app);
        const fileName = new Date().getTime() + imageFile.name; //this ads extra information to the filename and make it unique
        const storageRef = ref(storage, fileName); // this is for the storage
        const uploadTask = uploadBytesResumable(storageRef, imageFile); // the method to upload our image which gives us information like the amount of bytes that is needed
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress =
                   (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                   setImageFileUploadProgress(progress.toFixed(0)); //the toFixed method removes every decimal to 0
            }, (error) => {
                setImageFileUploadError('could not upload image(file must be less than 2MB)');
                setImageFileUploadProgress(null);
                setImageFile(null);
                setImageFileUrl(null);

                // these above codes are to ensure that a picture is not uploaded twice
            }, () => {
                // this is a feedback after it downlods and this method sets the image permenetly
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageFileUrl(downloadURL);
                });
            }
        )
    };
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
      <form action="" className='flex flex-col gap-4'>
        <input type="file" accept='image/*' onChange={hanldleImageChange} ref={filePickerRef} hidden/>
        <div className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full' onClick={() => filePickerRef.current.click()}>
            {imageFileUploadProgress && (
                <CircularProgressbar value = {imageFileUploadProgress || 0} text = {`${imageFileUploadProgress}%`}
                strokeWidth={5}
                styles={{
                    root:{
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                    },
                    path: {
                        stroke: `rgba(62, 152,199, ${imageFileUploadProgress/100})`,
                    }
                }}
                />
            ) }
         <img src={imageFileUrl || currentUser.profilePicture} alt="user" className={`rounded-full w-full h-full border-8 border-[lightgray] object-cover ${imageFileUploadProgress && imageFileUploadProgress < 100 && 'opacity-75'}`}/>
        </div>
        {imageFileUploadError && <Alert color='failure'>{imageFileUploadError}</Alert>}
        
        <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser.username} />
        <TextInput type='email' id='email' placeholder='email' defaultValue={currentUser.email} />
        <TextInput type='password' id='password' placeholder='password' />
        <Button type='submit' gradientDuoTone='purpleToBlue' outline>
            Update
        </Button>
      </form>
      <div className='text-red-500 flex justify-between mt-5'>
        <span className='cursor-pointer'>Delete Account</span>
        <span className='cursor-pointer'>Sign Out</span>
      </div>
    </div>
  );
}
