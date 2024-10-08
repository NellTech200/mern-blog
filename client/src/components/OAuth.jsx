import { Button } from 'flowbite-react'
import React from 'react'
import { AiFillGoogleCircle } from 'react-icons/ai';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch, } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';


export default function OAuth() {
  const auth = getAuth(app)
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const handleGoogleClick = async () => {

    console.log('starting the handle');
    const provider = new GoogleAuthProvider()

    // the setCustomParameter will always promt the user to choose which email to use, either login or signup.
    provider.setCustomParameters({ prompt: 'select_account' })
    
    try {
      const resultsFromGoogle = await signInWithPopup (auth, provider)
      console.log('results from google:', resultsFromGoogle);
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify ({
          name: resultsFromGoogle.user.displayName,
          email: resultsFromGoogle.user.email,
          googlePhotoUrl: resultsFromGoogle.user.photoURL
        }),
      })
      console.log('response from fetch:', res);

      const data = await res.json()
      console.log('Data from response:', data);
      if (res.ok) {
        dispatch(signInSuccess(data))
        navigate('/')
      }
    } catch (error) {
      console.log(error);
    }
  }

  // the button has the type button bc we r not submitting
  return (
    <Button type='button' gradientDuoTone='pinkToOrange' outline onClick={handleGoogleClick}>
        <AiFillGoogleCircle className = 'w-6 h-6 mr-2' />
        Continue with Google
    </Button>
  )
}
