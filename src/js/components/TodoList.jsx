import React, {useState} from "react";


const TodoList = () => {

	const [input, setInput] = useState("");
	const [tasks, setTasks] = useState([]);
	const [filter, setFilter] = useState("all") // filter puede tener 3 estados : all, completed y pending


	const handleInput = () => {
		if (!input) return;
		else {
			setTasks([...tasks, {text: input, completed: false}])
		}
		setInput("")
	}

	const deleteTask = (indexToDelete) => {
		setTasks(tasks.filter((task, index) => index !== indexToDelete))
	}

	const deleteAllTasks = () => {
		setTasks([])
	}

	const filteredTasks = tasks.filter((task) => {
		if (filter == "completed") return task.completed;
		if (filter == "pending") return !task.completed;
		return true;
	});

	const toggleTask = (indexToToggle) =>{
		setTasks(tasks.map((task, index) => {
		return index === indexToToggle ? {...task, completed: !task.completed} : task
		}))
	}

	return (
		<div className="text-center">
				<h1>To Do List</h1>
				
				<input type="text" value={input} onChange={(e) => setInput(e.target.value)}/>
				<button onClick={handleInput}>Add task</button>
				<button onClick={deleteAllTasks}>Remove all tasks</button>
				<select value={filter} onChange={(e) => setFilter(e.target.value)}>
					<option value="all">All</option>
					<option value="completed">Completed</option>
					<option value="pending">Pending</option>
				</select>
			
			<ul>
				{filteredTasks.map((task, index) => 
				<li key={index}> 
				{task.text} 
				<input type="checkbox" checked={task.completed} onChange={() => toggleTask(index)}/>
				<button onClick={()=>deleteTask(index)}>x</button>
				</li> 
				)}
			</ul>


		</div>
	);
};

export default TodoList;