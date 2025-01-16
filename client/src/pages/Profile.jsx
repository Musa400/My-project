import React from "react";
import { useSelector } from "react-redux"

import { useEffect, useRef, useState } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from "../firebase";
import { updateUserStart, updateUserSuccess, updateUserFailure, } from "../redux/User/UserSlice.js";
import { useDispatch } from "react-redux";

function Profile() {
  const fileRef = useRef(null)
  const [file, setFile] = useState(undefined)
  const { currentUser, loading, error } = useSelector((state) => state.user);

  const [filePerc, setFilePerc] = useState(0)
  const [fileUploadErorr, setFileUploadErorr] = useState(false)
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false)
  const dispatch = useDispatch();
  console.log(formData);

  useEffect(() => {
    if (file) {
      handlefileupload(file)
    }
  }, [file])


  const handlefileupload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setFilePerc(Math.round(progress))

      },
      (error) => {
        setFileUploadErorr(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })

        )
      }
    )

  }
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message))
        return;
      }
      dispatch(updateUserSuccess(data))
      setUpdateSuccess(true)
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }

  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className='text-3xl font-semibold text-center my-7' >Profile</h1>
      <form onSubmit={handlesubmit} className="flex  flex-col gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          accept="image/*"
          ref={fileRef} hidden
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt="profile"
          className="rounded-full  h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />
        <p>
          {fileUploadErorr ? (
            <span>Error IMage Upload (image must be less than 2mb)</span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span>{`Uploading ${setFilePerc} %`}</span>
          ) : filePerc === 100 ? (
            <span>Image Successfully uploaded!</span>
          ) : (
            ''
          )}
        </p>


        <input
          type="text"
          placeholder="Username"
          id="username"
          defaultValue={currentUser.username}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />


        <input
          type="email"
          placeholder="email"
          id="email"
          defaultValue={currentUser.email}
          onChange={handleChange}

          className="border p-3 rounded-lg"
        />


        <input
          type="password"
          placeholder="Password"
          id="passwrod"
          defaultValue={currentUser.password}
          onChange={handleChange}

          className="boder p-3 rounded-lg"
        />


        <button disabled={loading} className="bg-slate-700 text-white p-3 rounded-lg uppercase text-center opacity-95">
          {loading ? "Loading..." : "Update"}
        </button>

      </form>
      <p className="text-red-700 mt-5">{error ? error : ''}</p>
      <p className="text-green-700 mt-5">{updateSuccess ? 'Profile update successfuly' : ''}</p>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
    </div>
  )
}

export default Profile