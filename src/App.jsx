import { useState } from "react";

export default function App(){

const teachers={
YEYE:{name:"Yeye",students:[]},
JASON:{name:"Jason",students:[]},
ART:{name:"Art",students:[]},
PAU:{name:"Pau",students:[]},
NIAH:{name:"Niah",students:[]},
VIA:{name:"Via",students:[]},
JAREA:{name:"Jarea",students:[]},
CLYDE:{name:"Clyde",students:[]},
CJ:{name:"CJ",students:[]},
ALEX:{name:"Alex",students:[]},
TODD:{name:"Todd",students:[]},
CHIN:{name:"Chin",students:[]}
}

const [code,setCode]=useState("")
const [teacher,setTeacher]=useState(null)
const [students,setStudents]=useState([])
const [newStudent,setNewStudent]=useState("")
const [logs,setLogs]=useState([])

function login(){

if(teachers[code]){
setTeacher(teachers[code])
setStudents(teachers[code].students)
}else{
alert("Invalid Teacher Code")
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

function addLog(student,date,comment){

if(!date) return

setLogs([
...logs,
{
teacher:teacher.name,
student,
date,
comment
}
])

}

function deleteLog(index){

const updated=[...logs]
updated.splice(index,1)
setLogs(updated)

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

<h2 style={{textAlign:"center"}}>
Welcome {teacher.name}
</h2>

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

Log Lesson </button>

</div>

)

})}

<h3 style={{marginTop:30}}>Lesson History</h3>

{logs.map((log,i)=>(

<div key={i} style={{
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
onClick={()=>deleteLog(i)}
style={{height:35}}

>

Delete </button>

</div>

))}

</div>

)

}
