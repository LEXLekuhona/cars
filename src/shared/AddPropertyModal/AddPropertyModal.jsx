import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import { propertiesApi, propertyTypesApi } from '@entities/properties/api'

/**
 * Модальное окно для быстрого добавления свойства (property).
 * @param {boolean} show - показывать модалку
 * @param {function} onClose - закрыть
 * @param {function} onSuccess - после успешного создания (newProperty) => {}
 * @param {number|string|null} propertyTypeId - если задан, тип фиксирован и селект не показывается
 */
function AddPropertyModal({ show, onClose, onSuccess, propertyTypeId }) {
	const [title, setTitle] = useState('')
	const [propertyTypeIdSelect, setPropertyTypeIdSelect] = useState('')
	const [types, setTypes] = useState([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')

	const fixedTypeId = propertyTypeId != null && propertyTypeId !== '' ? parseInt(propertyTypeId, 10) : null

	useEffect(() => {
		if (!show) return
		setTitle('')
		setError('')
		if (!fixedTypeId) {
			propertyTypesApi.getAll()
				.then((res) => {
					const items = res.data.items || []
					setTypes(items)
					if (items.length) setPropertyTypeIdSelect(String(items[0].id))
				})
				.catch(() => setTypes([]))
		}
	}, [show, fixedTypeId])

	const handleSubmit = (e) => {
		e.preventDefault()
		const typeId = fixedTypeId ?? (propertyTypeIdSelect ? parseInt(propertyTypeIdSelect, 10) : null)
		if (!typeId) {
			setError('Выберите тип свойства')
			return
		}
		if (!title.trim()) {
			setError('Введите название свойства')
			return
		}
		setLoading(true)
		setError('')
		propertiesApi.create({ title: title.trim(), property_type_id: typeId })
			.then((res) => {
				onSuccess(res.data)
				onClose()
			})
			.catch((err) => {
				const msg = err.response?.data?.message || 'Ошибка при создании свойства'
				setError(msg)
			})
			.finally(() => setLoading(false))
	}

	if (!show) return null

	return (
		<div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex={-1} role="dialog">
			<div className="modal-dialog modal-dialog-centered" role="document">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Добавить свойство</h5>
						<button type="button" className="close" onClick={onClose} aria-label="Закрыть">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<form onSubmit={handleSubmit}>
						<div className="modal-body">
							{error && <div className="alert alert-danger">{error}</div>}
							{!fixedTypeId && (
								<div className="form-group">
									<label htmlFor="add-property-modal-type">Тип свойства</label>
									<select
										id="add-property-modal-type"
										className="form-control"
										value={propertyTypeIdSelect}
										onChange={(e) => setPropertyTypeIdSelect(e.target.value)}
										required
									>
										<option value="">Выберите тип</option>
										{types.map((t) => (
											<option key={t.id} value={t.id}>{t.title}</option>
										))}
									</select>
								</div>
							)}
							<div className="form-group">
								<label htmlFor="add-property-modal-title">Название свойства</label>
								<input
									id="add-property-modal-title"
									type="text"
									className="form-control"
									placeholder="Например: Ширина"
									value={title}
									onChange={(e) => setTitle(e.target.value)}
									required
									disabled={loading}
								/>
							</div>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-secondary" onClick={onClose}>
								Отмена
							</button>
							<button type="submit" className="btn btn-primary" disabled={loading}>
								{loading ? 'Создание…' : 'Создать'}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

AddPropertyModal.propTypes = {
	show: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	onSuccess: PropTypes.func.isRequired,
	propertyTypeId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

export default AddPropertyModal
