import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { ITask } from './interfaces';
import TodoTask from './components/TodoTask/TodoTask';
import 'react-toastify/dist/ReactToastify.css';
import './styles/styles.css'

function App() {
	const [count, setCount] = useState(0);
	// armazenar task
	const [todoList, setTodoList] = useState<ITask[]>([]);

	// Adicionar nova tarefas
	function addTask(task: string): void {
		const idRandom = (num: number) => Math.floor(Math.random() * num)
		const newTask = { id: idRandom(999), nameTask: task }
		setTodoList([...todoList, newTask])

		toast.success('Tarefa Adicionada', {
			position: 'top-left',
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
	}

	// if (addTask === nameTask: task){
	// 	console.log('valor igual')
	// }

	// function editTask(id: Number, task: Number): void {
	// 	let newList = todoList.find((taskName) => { taskName.id === id };				
	// 			[...todoList, setTodoList]);
	// };

	// Deletar tarefas
	function deleteTask(DeleteTaskById: Number): void {
		setTodoList(todoList.filter((taskName) =>
			taskName.id !== DeleteTaskById))
		setCount(count - 1)

		toast.error('Tarefa Apagada', {
			position: 'top-left',
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
	}

		const handleTaskChange = (id: number, nameTask: string) => {
			let newList = [...todoList];
			for (let i in newList) {
				if (newList[i].id === id) {
					newList[i].nameTask = nameTask;
				}
			}
			setTodoList(newList);
		}	

	// Deletar todas as tarefas
	function deleteAllTask(): void {
		setTodoList([])
		setCount(0)
	}

	//  Regras do formulário
	const onValidation = Yup.object({
		nameTask: Yup.string()
			.min(5, "* Quantidade mínima: 5")
			.max(18, "* Quantidade máxima: 18")
			.required('')
			.matches(/^[A-Za-zÀ-ú\-s ]+$/, '* Apenas texto')
			.trim()
	});

	return (
		<div className='container'>

			<ToastContainer
				position='top-left'
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>

			<Formik
				validationSchema={onValidation}
				initialValues={{
					nameTask: '',
				}}
				onSubmit={(value, { setSubmitting, resetForm, setValues }) => {
					addTask(value.nameTask);
					resetForm()
					setCount(count + 1)
				}}

				enableReinitialize={true}
			>
				{
					formik => (
						<Form>
							<div className='App'>
								<header>
									<h2>Todo List</h2>
								</header>

								<input
									type='text' autoComplete='off'
									placeholder='Escrever task'
									name='nameTask'
									className='nes-input'
									value={formik.values.nameTask}
									onChange={formik.handleChange}
								/>
								<span className='nes-text is-error'>{formik.errors.nameTask}</span>

								<button type='submit' className='nes-btn is-success'>Adicionar</button>

								<div className='line'></div>

								<button type='button' onClick={deleteAllTask} className='nes-btn is-warning'>Limpar Tarefas</button>
								<div style={{
									textAlign: 'center',
									paddingTop: '14px'
								}}>
									<span>Quantidade de Tasks: {count}</span>
								</div>

								{todoList.map((task, key,) => (
									<TodoTask key={key} task={task} deleteTask={deleteTask}  />
								))}
							</div>
						</Form>
					)
				}
			</Formik >
		</div>
	);
}

export default App;

