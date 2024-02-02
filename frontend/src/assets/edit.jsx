import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {useParams} from "react-router-dom"


const Edit = () => {
    const {id} = useParams();
    const [note,setNote] = useState();
    const [newNote,setNewNote] = useState();
    useEffect(()=>{ 
        const getNote = async() =>{
            const res = await axios.get(`http://localhost:8000/api/notesApp/notes/singleNote/${id}`);
            setNote(res.data.singleNote[0]);
        }
        getNote()
    },[])

    const handleChange = (e) =>{
        const {name,value} = e.target;
        setNewNote((prev)=>{
            return {
                ...prev,
                [name]:value,
            }
        });
    }
    console.log(newNote);
  return (
    <div  className='flex-col ml-5 mt-5'>
        <h1>This is Editing Page</h1> <br /> <br />
        <input name='title' onChange={handleChange} defaultValue={note?.title} className='border focus:outline-none rounded-md px-2 py-3 mb-2 w-[500px] border-blue-300' type="text" placeholder='title' /> <br />
        <textarea name='description' onChange={handleChange} defaultValue={note?.description} className='border h-[200px] focus:outline-none rounded-md px-2 py-3 mb-2 w-[500px] border-blue-300' type="text" placeholder='description' /> <br />
        <button className='border rounded-md p-2 px-4'>Done</button>
    </div>
  )
}

export default Edit