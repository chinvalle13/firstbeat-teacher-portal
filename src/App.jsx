import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "YOUR_SUPABASE_URL",
  "YOUR_SUPABASE_ANON_KEY"
);

export default function App() {

  const [teacher, setTeacher] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const [students, setStudents] = useState([]);

  const [name, setName] = useState("");
  const [instrument, setInstrument] = useState("");
  const [level, setLevel] = useState("");
  const [status, setStatus] = useState("");

  const teachers = {
    NELLE: "1234",
    JOSEPH: "1234"
  };

  function login(user, pass){

    if(teachers[user] === pass){
      setTeacher(user);
      setLoggedIn(true);
      loadStudents(user);
    }else{
      alert("Wrong login");
    }

  }

  async function loadStudents(t){

    const { data } = await supabase
      .from("students")
      .select("*")
      .eq("teacher", t);

    if(data) setStudents(data);

  }

  async function addStudent(){

    if(!name) return;

    await supabase
      .from("students")
      .insert([
        {
          name,
          instrument,
          level,
          status,
          teacher
        }
      ]);

    setName("");
    setInstrument("");
    setLevel("");
    setStatus("");

    loadStudents(teacher);
  }

  if(!loggedIn){

    return(

      <div style={{padding:40}}>

        <h1>Teachers Login</h1>

        <button onClick={()=>login("NELLE","1234")}>
          Login Nelle
        </button>

        <button onClick={()=>login("JOSEPH","1234")}>
          Login Joseph
        </button>

      </div>

    );

  }

  return(

    <div style={{padding:40}}>

      <h1>Teacher: {teacher}</h1>

      <h2>Add Student</h2>

      <input
      placeholder="Student Name"
      value={name}
      onChange={e=>setName(e.target.value)}
      />

      <input
      placeholder="Instrument"
      value={instrument}
      onChange={e=>setInstrument(e.target.value)}
      />

      <input
      placeholder="Level"
      value={level}
      onChange={e=>setLevel(e.target.value)}
      />

      <input
      placeholder="Status"
      value={status}
      onChange={e=>setStatus(e.target.value)}
      />

      <button onClick={addStudent}>
        Add Student
      </button>

      <h2>My Students</h2>

      {students.map((s,i)=>(
        <div key={i}>
          {s.name} - {s.instrument} - {s.level} - {s.status}
        </div>
      ))}

    </div>

  );

}