import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";

const Edit = () => {
  const { id } = useParams();
  const [note, setNote] = useState();
  const [newNote, setNewNote] = useState();
  const [socketMessage, setSocketMessage] = useState({
    title: "",
    description: "",
  });

  const socketRef = useRef(null);

  useEffect(() => {
    const getNote = async () => {
      const res = await axios.get(
        `http://localhost:8000/api/notesApp/notes/singleNote/${id}`
      );
      setNewNote(res.data.singleNote[0]);
    };
    getNote();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewNote((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // socket connection setup
  useEffect(() => {
    socketRef.current = io("http://localhost:8000", {
      transports: ["websocket"],
      withCredentials: true,
      extraHeaders: {
        "Access-Control-Allow-Origin": "http://localhost:5173",
      },
    });

    socketRef.current.on("connect", () => {
      console.log("Connected to Socket", socketRef.current.id);
    });

    return () => {
      console.log("Disconnecting socket");
      socketRef.current.disconnect();
    };
  }, []);

  // send and receive socket messages
  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.emit("client-message", newNote);

      socketRef.current.on("server-message", (msg) => {
        // Conditionally update state to avoid infinite re-renders
        if (
          msg.title !== newNote.title ||
          msg.description !== newNote.description
        ) {
          setNewNote({
            title: msg.title,
            description: msg.description,
          });
        }
      });
    }

    // Clean up event listeners when the component is unmounted
    return () => {
      if (socketRef.current) {
        socketRef.current.off("server-message");
      }
    };
  }, [newNote]);

  return (
    <div className="flex-col ml-5 mt-5">
      <h1>This is Editing Page</h1> <br /> <br />
      <input
        name="title"
        onChange={handleChange}
        value={newNote?.title}
        className="border focus:outline-none rounded-md px-2 py-3 mb-2 w-[500px] border-blue-300"
        type="text"
        placeholder="title"
      />{" "}
      <br />
      <textarea
        name="description"
        onChange={handleChange}
        value={newNote?.description}
        className="border h-[200px] focus:outline-none rounded-md px-2 py-3 mb-2 w-[500px] border-blue-300"
        type="text"
        placeholder="description"
      />{" "}
      <br />
      <button className="border rounded-md p-2 px-4">Done</button>
      {socketMessage && (
        <>
          <h1>{socketMessage.title}</h1>
          <p>{socketMessage.description}</p>
        </>
      )}
    </div>
  );
};

export default Edit;
