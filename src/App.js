import {useState, useEffect} from 'react'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import Header from './Component/Header'
import Footer from './Component/Footer'
import Tasks from './Component/Tasks'
import AddTask from './Component/Task'
import About from './Component/About'
function App() {
  const [showAddTask, setShowAddTask]=useState(false)
  const [tasks,setTasks] =useState([])

  useEffect(()=>{
    const getTask=async()=>{
      const res=await featchTasks();
      setTasks(res)
    }
    getTask();
  },[])
  //fetch tasks
  const featchTasks=async()=>{
    
    const res=await fetch("http://localhost:5000/tasks");
    const data=await res.json();
    return data;
  }

  //Add task
  const addTask =async(task)=>{
    const res=await fetch("http://localhost:5000/tasks",{
      method: "POST",
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    });
      const newTask= await res.json();
      setTasks([...tasks,newTask])
  }
  //Delete A Task
  const DeleteTask =async(id)=>{
      await fetch(`http://localhost:5000/tasks/${id}`,{
        method: 'DELETE'
      });
      setTasks(tasks.filter((task)=>task.id !== id))
  }

  const featchTask=async(id)=>{
    const res=await fetch(`http://localhost:5000/tasks/${id}`);
    const data=await res.json();
    return data;
  }
  //Toggle
  const toggleReminder =async(id)=>{
    const taskToToggle=await featchTask(id)
    const updateTask ={...taskToToggle,reminder:!taskToToggle.reminder}
    const res=await fetch(`http://localhost:5000/tasks/${id}`,{
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(updateTask)
    })
    const data = await res.json();
    setTasks(tasks.map((task)=>task.id === id ?{...task,reminder:data.reminder} : task))
  }
  return (
    <Router>
      <div className='container'>
        <Header
          onAdd={() => setShowAddTask(!showAddTask)}
          showAdd={showAddTask}
        />
        <Routes>
          <Route
            path='/'
            element={
              <>
                {showAddTask && <AddTask onAdd={addTask} />}
                {tasks.length > 0 ? (
                  <Tasks
                    tasks={tasks}
                    onDelete={DeleteTask}
                    onToggle={toggleReminder}
                  />
                ) : (
                  'No Tasks To Show'
                )}
              </>
            }
          />
          <Route path='/about' element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App;