
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import  {app}  from '../firebase.js';
import {useDispatch} from 'react-redux';
import {signInSuccess} from '../redux/User/UserSlice.js'
import {useNavigate} from 'react-router-dom'

const OAuth = () => {
    const dispatch = useDispatch();
    const nevigate = useNavigate()
    const handleGoogleClick = async ()=>{
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth,provider);
            const res = await fetch('/api/auth/google',{
                method:'POST',
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL
                }),
            });
            const data = await res.json();
            dispatch(signInSuccess(data));
            nevigate('/')

        } catch (error) {
            console.log('Could not sign in with Google' , error)
            
        }
        

    }
  return (
    <button onClick={handleGoogleClick} type='buttton' className='bg-red-700 text-white p-3 rounded-lg uppercase  hover:opacity-95' >
        countiue with google
    </button>
  )
}

export default OAuth