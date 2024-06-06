import { useState } from "react";
import { ITask } from "../Types";
import * as Yup from "yup";
import "./style.css";
import { Formik } from "formik";
import Swal from "sweetalert2";

export default function Todo() {
  const [count, setCount] = useState<number>(0);
  const [taskList, setTaskList] = useState<ITask[]>([]);

  const onValidate = Yup.object({
    nameTask: Yup.string()
      .min(5, "* Quantidade mínima: 5")
      .max(18, "* Quantidade máxima: 18")
      .matches(/^[A-Za-zÀ-ú\-s ]+$/, "* Apenas texto")
      .required("")
      .trim()
      .test("Tarefa já existe", "Tarefa já existe", function (value) {
        const lowerCaseValue = value.toLowerCase();
        return !taskList
          ?.map((t) => t.task.toLowerCase())
          .includes(lowerCaseValue);
      }),
  });

  function addTask(task: string) {
    const randomId = (num: number) => Math.floor(Math.random() * num);
    const newTask = { id: randomId(999), task: task };
    setTaskList([...taskList, newTask]);
  }

  function deleteTask(taskId: number) {
    setTaskList(taskList.filter((t) => t.id !== taskId));
    setCount(count - 1);
  }

  function clearAllTasks() {
    setCount(0);
    setTaskList([]);
  }

  console.log(taskList);

  return (
    <>
      <Formik
        validationSchema={onValidate}
        initialValues={{
          nameTask: "",
        }}
        enableReinitialize={true}
        onSubmit={(values, actions) => {
          actions.resetForm();
          return Swal.fire({
            title: `Deseja realmente inserir tarefa ${values.nameTask}`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#2e7d32",
            cancelButtonColor: "#d33",
            confirmButtonText: "Enviar",
            cancelButtonText: "Cancelar",
          }).then((result) => {
            if (result.isConfirmed) {
              addTask(values.nameTask);
              setCount(count + 1);
              Swal.fire({
                icon: "success",
                text: `Tarefa ${values.nameTask} adicionada com sucesso!`,
                toast: true,
                showConfirmButton: false,
                showCloseButton: true,
                position: "bottom-right",
                timer: 8000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener("mouseenter", Swal.stopTimer);
                  toast.addEventListener("mouseleave", Swal.resumeTimer);
                },
              });
            } else {
              const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener("mouseenter", Swal.stopTimer);
                  toast.addEventListener("mouseleave", Swal.resumeTimer);
                },
              });
              Toast.fire({
                icon: "info",
                title: "Criação de tarefa cancelado!",
              });
            }
            actions.setSubmitting(false);
          });
        }}
      >
        {({ ...formik }) => (
          <>
            <div className="container__main">
              <div className="container__titulo">
                <h1>Todo List</h1>
              </div>
              <div className="container__add">
                <input
                  type="text"
                  autoComplete="off"
                  placeholder="Escrever tarefa"
                  name="nameTask"
                  className="nes-input"
                  value={formik.values.nameTask}
                  onChange={formik.handleChange}
                />
                <span className="nes-text is-error">
                  {formik.errors.nameTask}
                </span>
                <button
                  type="submit"
                  onClick={() => formik.handleSubmit()}
                  className="nes-btn is-success"
                >
                  Adicionar
                </button>
              </div>
              <div className="line" />

              <div className="container__clean">
                {taskList.length >= 1 ? (
                  <button
                    type="submit"
                    onClick={() => clearAllTasks()}
                    className="nes-btn is-warning"
                  >
                    Limpar tarefas
                  </button>
                ) : (
                  ""
                )}
                <span>Quantidade de tasks: {count} </span>
              </div>
              {taskList.map((t, index) => (
                <div className="container__tasks">
                  <div className="items">
                    <span key={index}>{t.task}</span>
                  </div>

                  <div className="btn__actions">
                    <button type="submit" className="nes-btn is-primary">
                      Editar
                    </button>
                    <button
                      type="submit"
                      onClick={() => deleteTask(t.id)}
                      className="nes-btn is-error"
                    >
                      X
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </Formik>
    </>
  );
}
