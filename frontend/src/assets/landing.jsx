import { useState, useRef, useEffect } from "react";
import axios from "axios";

import {useNavigate} from "react-router-dom"


const Landing = () => {
  const [allNotes, setAllNotes] = useState([]);
  const titleRef = useRef();
  const descRef = useRef();
  const navigate = useNavigate();
  console.log(titleRef.current);

  useEffect(() => {
    const fetchAllNotes = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/notesApp/notes/allNotes",
          {
            withCredentials: true,
          }
        );
        setAllNotes(res.data.allNotes);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchAllNotes();
  }, []);

  const handleEdit = (id) => {
    navigate(`/edit/${id}`)
  };
  return (
    <>
      {allNotes?.map((note) => (
        <div key={note.id} className="m-5 border p-2">
          <h1>{note.title}</h1>
          <p>{note.description}</p>
          <button onClick={() => handleEdit(note._id)}>Edit</button>
        </div>
      ))}
      {/* {edit && <div className="fixed inset-0 bg-white h-full w-full flex justify-center item-center ">
      <div className="border-2">
          <input type="text" placeholder="title" />
          <input type="text" placeholder="desc" />
      </div>  
    </div>} */}
    </>
  );
};

export default Landing;
