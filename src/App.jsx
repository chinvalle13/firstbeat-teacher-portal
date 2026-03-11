import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "YOUR_SUPABASE_URL",
  "YOUR_SUPABASE_ANON_KEY"
);

export default function App() {

  const teacher = "NELLE";

  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadStudents();
  }, []);

  async function loadStudents() {

    const { data } = await supabase
      .from("students")
      .select("*")
      .eq("teacher", teacher);

    if (data) {
      setStudents(data);
    }
  }

  async function searchStudent() {

    const { data } = await supabase
      .from("students")
      .select("*")
      .eq("teacher", teacher)
      .ilike("name", `%${search}%`);

    if (data) {
      setStudents(data);
    }
  }

  return (
    <div style={{padding:40,fontFamily:"Arial"}}>

      <h1>First Beat Teachers Portal</h1>

      <div style={{marginBottom:20}}>

        <input
          placeholder="Search student"
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          style={{padding:10,marginRight:10}}
        />

        <button onClick={searchStudent} style={{padding:10}}>
          Search
        </button>

        <button onClick={loadStudents} style={{padding:10,marginLeft:10}}>
          Reload
        </button>

      </div>

      <table border="1" cellPadding="10" style={{width:"100%"}}>

        <thead>
          <tr>
            <th>Name</th>
            <th>Instrument</th>
            <th>Level</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>

          {students.map((s,i)=>(
            <tr key={i}>
              <td>{s.name}</td>
              <td>{s.instrument}</td>
              <td>{s.level}</td>
              <td>{s.status}</td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}