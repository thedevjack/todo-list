import { ITask } from "../../interfaces";
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import * as Yup from 'yup';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    height: 350,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface TaskProps {
    task: ITask,
    deleteTask(DeleteTaskById: number): void,
    // handleTaskChange([]),
}

// function editTask(id: number) {
//     console.log(id)
// }

const onValidation = Yup.object({
    nameTask: Yup.string()
        .min(5, "* Quantidade mínima: 5")
        .max(18, "* Quantidade máxima: 18")
        .required('')
        .matches(/^[A-Za-zÀ-ú\-s ]+$/, '* Apenas texto')
        .trim()
});

function TodoTask({ task, deleteTask, }: TaskProps) {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const closeModal = () => setOpen(false);

    return (

        <div className="task-card">
            <div className="texto">
                <span>{task.nameTask}</span>
            </div>

            <div className="btn-action">
                <button type='button' className="nes-btn is-primary" id="edit-button" onClick={handleOpen}>Editar</button>
                <button type="button" className="nes-btn is-error" onClick={() => deleteTask(task.id)}>X</button>
            </div>
            <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style} >
                    <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                        <div className="head-modal"><h2>Editar Task</h2></div>
                    </Typography>
                    <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
                        <div className="modal-card">
                            <label htmlFor="textarea_field"></label>
                            <textarea id="textarea_field" defaultValue={task.nameTask} className="nes-textarea"
                            />
                        </div>

                        <div className="modal-btn-att">
                            {/* <button type='submit' className="nes-btn is-success" onClick={() => handleTaskChange}>Atualizar</button> */}
                        </div>
                        <div className="modal-btn-cancel">
                            <button type='button' className="nes-btn is-error" onClick={closeModal}>Cancelar</button>
                        </div>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}
export default TodoTask;