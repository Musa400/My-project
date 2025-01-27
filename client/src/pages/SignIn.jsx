       
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux'
import {signInStart, signInSuccess, signInFailure} from '../redux/User/UserSlice'
import OAuth from '../Compeunet/OAuth';


function SignIn() {
  const dispatch = useDispatch();
  const [formData,setFormData] = useState({});
  // const [error, setError] = useState(null);
  const {loading, error} = useSelector((stata)=>stata.user);
  const nevigate = useNavigate();


  const handleChange = (e)=>{
    setFormData({...formData, [e.target.id] : e.target.value})
    console.log(formData)
  }   


  let handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers:{
          "Content-Type":"application/json",
        },
        body: JSON.stringify(formData)
      })
      const data = await res.json();
      console.log(data)
      if(data.success == false){
        dispatch(signInFailure(data.message))
        return;
      }
      dispatch(signInSuccess(data.user));
      
      nevigate('/')
    } catch (error) {
      console.log('eroor')
    }
  };
  return (
    <div className='p-3  max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7 '>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        

        <input
          type="email"
          placeholder='email'
          className='border p-3 rounded-lg '
          id='email'
          onChange={handleChange} />

        <input
          type="password"
          placeholder='Password'
          className='border p-3 rounded-lg '
          id='password'
          onChange={handleChange} />
        <button className='bg-slate-700 text-white p-3 rounded-lg  uppercase hover:opacity-95 disabled:opacity-80'>
        {loading ? "Loading" : "Sign Up"}
        </button>
        <OAuth/>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>You Dont Have an Account?</p>
        <Link to={'/sign-up'}>
        <span className='text-blue-700'>
          Sign Up
        </span>
        </Link>
      </div>
        {error && <p className='text-red-500 m'>{error}</p>}
    </div>
  )
}

export default SignIn