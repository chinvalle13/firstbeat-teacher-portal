import { useState } from "react"
import { supabase } from "./supabase"

export default function App(){

const teachers={
YEYE:{name:"Yeye"},
JASON:{name:"Jason"},
ART:{name:"Art"},
PAU:{name:"Pau"},
NIAH:{name:"Niah"},
VIA:{name:"Via"},
JAREA:{name:"Jarea"},
CLYDE:{name:"Clyde"},
CJ:{name:"CJ"},
ALEX:{name:"Alex"},
TODD:{name:"Todd"},
CHIN:{name:"Chin"},
NELLE:{name:"Nelle"},
JOSEPH:{name:"Joseph"}
}

const [code,setCode]=useState("")
const [teacher,setTeacher]=useState(null)
const [students,setStudents]=useState([])
const [newStudent,setNewStudent]=useState("")
const [logs,setLogs]=useState([])

async function login(){

const t = teachers[code]

if(!t){
alert("Invalid Teacher Code")
return
}

setTeacher(t)

const { data } = await supabase
.from("lesson_logs")
.select("*")
.eq("teacher", t.name)
.order("id",{ascending:false})

if(data){

setLogs(data)

const uniqueStudents=[...new Set(data.map(d=>d.student))]
setStudents(uniqueStudents)

}

}

function addStudent(){

if(!newStudent) return

setStudents([...students,newStudent])
setNewStudent("")

}

function getLessonCount(student){
return logs.filter(log=>log.student===student).length
}

async function addLog(student,date,comment){

if(!date) return

const { data } = await supabase
.from("lesson_logs")
.insert([
{
teacher:teacher.name,
student:student,
date:date,
comment:comment
}
])
.select()

if(data){
setLogs([...data,...logs])
}

}

async function deleteLog(id){

await supabase
.from("lesson_logs")
.delete()
.eq("id",id)

setLogs(logs.filter(log=>log.id!==id))

}

function logout(){

setTeacher(null)
setLogs([])
setStudents([])

}

if(!teacher){

return(

<div style={{
display:"flex",
justifyContent:"center",
alignItems:"center",
height:"100vh"
}}>

<div style={{textAlign:"center"}}>

<h2>First Beat Teacher Portal</h2>

<input
placeholder="Teacher Code"
value={code}
onChange={(e)=>setCode(e.target.value.toUpperCase())}
style={{padding:10}}
/>

<br/><br/>

<button onClick={login} style={{padding:10}}>
Login
</button>

</div>

</div>

)

}

return(

<div style={{padding:20}}>

<div style={{
display:"flex",
justifyContent:"space-between",
alignItems:"center"
}}>

<h2>
Welcome {teacher.name}
</h2>

<button onClick={logout} style={{padding:10}}>
Logout
</button>

</div>

<div style={{marginBottom:20}}>

<input
placeholder="Add Student"
value={newStudent}
onChange={(e)=>setNewStudent(e.target.value)}
style={{padding:10}}
/>

<button onClick={addStudent} style={{marginLeft:10,padding:10}}>
Add
</button>

</div>

{students.map((student,i)=>{

let comment=""
let date=new Date().toISOString().split("T")[0]

return(

<div key={i} style={{
border:"1px solid #ccc",
padding:15,
marginBottom:15,
borderRadius:10
}}>

<h3>{student}</h3>

<p>Lessons: {getLessonCount(student)}</p>

<input
type="date"
defaultValue={date}
onChange={(e)=>date=e.target.value}
style={{padding:10,width:"100%",marginBottom:10}}
/>

<input
placeholder="Lesson comment (optional)"
onChange={(e)=>comment=e.target.value}
style={{padding:10,width:"100%",marginBottom:10}}
/>

<button
style={{padding:10,width:"100%"}}
onClick={()=>addLog(student,date,comment)}
>
Log Lesson
</button>

</div>

)

})}

<h3 style={{marginTop:30}}>Lesson History</h3>

{logs.map((log)=>(

<div key={log.id} style={{
borderBottom:"1px solid #ccc",
padding:10,
display:"flex",
justifyContent:"space-between"
}}>

<div>

<b>{log.student}</b><br/>
{log.date}<br/>
{log.comment}

</div>

<button
onClick={()=>deleteLog(log.id)}
style={{height:35}}
>
Delete
</button>

</div>

))}

</div>

)

}