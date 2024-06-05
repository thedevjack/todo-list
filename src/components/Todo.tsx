import "./style.css";

export default function Todo() {
  return (
    <>
      <div className="container__main">
        <div className="container__titulo">
          <h1>Todo List</h1>
        </div>
        <div className="container__add">
          <input
            type="text"
            placeholder="Escrever task"
            className="nes-input"
          />
          <button type="submit" className="nes-btn is-success">
            Adicionar
          </button>
        </div>
        <div className="line"></div>
        <div className="container__tasks">
          <div className="items">
            <span>fodase</span>
          </div>
          <div className="btn__actions">
            <button type="submit" className="nes-btn is-primary">
              Editar
            </button>
            <button type="submit" className="nes-btn is-error">
              Remover
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
