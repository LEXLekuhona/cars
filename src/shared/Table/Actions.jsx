

function TableActions({ onEdit, onCopy, onDelete }) {
	return (
		<div className="d-flex justify-content-center" style={{ gap: '4px' }}>
			<button type="button" className="btn btn-outline-success" onClick={onEdit} title="Редактировать">
				<i className="nav-icon fas fa-highlighter" />
			</button>
			<button type="button" className="btn btn-outline-success" onClick={onCopy} title="Копировать">
				<i className="nav-icon fas fa-clone" />
			</button>
			<button type="button" className="btn btn-outline-danger" onClick={onDelete} title="Удалить">
				<i className="nav-icon fas fa-trash" />
			</button>
		</div>
	)
}

export default TableActions 