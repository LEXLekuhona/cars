import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import { propertyTypesApi, propertiesApi, propertyValuesApi } from '@entities/properties/api'

const MODE_TYPE = 'type'
const MODE_PROPERTY = 'property'
const MODE_VALUE = 'value'

/**
 * Модальное окно «Добавить справочник»: тип, свойство или значение.
 */
function AddDirectoryModal({ show, onClose, onSuccess }) {
	const [mode, setMode] = useState(MODE_TYPE)
	const [title, setTitle] = useState('')
	const [typeId, setTypeId] = useState('')
	const [propertyId, setPropertyId] = useState('')
	const [types, setTypes] = useState([])
	const [properties, setProperties] = useState([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')

	useEffect(() => {
		if (!show) return
		setMode(MODE_TYPE)
		setTitle('')
		setTypeId('')
		setPropertyId('')
		setError('')
		propertyTypesApi.getAll()
			.then((res) => setTypes(res.data.items || []))
			.catch(() => setTypes([]))
	}, [show])

	useEffect(() => {
		if (!show || mode !== MODE_PROPERTY && mode !== MODE_VALUE) return
		propertiesApi.getAll()
			.then((res) => setProperties(res.data.items || []))
			.catch(() => setProperties([]))
	}, [show, mode])

	const handleSubmit = (e) => {
		e.preventDefault()
		setError('')
		if (mode === MODE_TYPE) {
			if (!title.trim()) {
				setError('Введите название типа')
				return
			}
			setLoading(true)
			propertyTypesApi.create({ title: title.trim() })
				.then((res) => {
					onSuccess(res.data)
					onClose()
				})
				.catch((err) => {
					setError(err.response?.data?.message || 'Ошибка при создании типа')
				})
				.finally(() => setLoading(false))
			return
		}
		if (mode === MODE_PROPERTY) {
			const tid = typeId ? parseInt(typeId, 10) : null
			if (!tid) {
				setError('Выберите тип свойства')
				return
			}
			if (!title.trim()) {
				setError('Введите название свойства')
				return
			}
			setLoading(true)
			propertiesApi.create({ title: title.trim(), property_type_id: tid })
				.then((res) => {
					onSuccess(res.data)
					onClose()
				})
				.catch((err) => {
					setError(err.response?.data?.message || 'Ошибка при создании свойства')
				})
				.finally(() => setLoading(false))
			return
		}
		if (mode === MODE_VALUE) {
			const pid = propertyId ? parseInt(propertyId, 10) : null
			if (!pid) {
				setError('Выберите свойство')
				return
			}
			if (!title.trim()) {
				setError('Введите значение')
				return
			}
			setLoading(true)
			propertyValuesApi.create({ value: title.trim(), dir_property_id: pid })
				.then((res) => {
					onSuccess(res.data)
					onClose()
				})
				.catch((err) => {
					setError(err.response?.data?.message || 'Ошибка при создании значения')
				})
				.finally(() => setLoading(false))
		}
	}

	if (!show) return null

	const buttonStyle = { marginBottom: '8px' }

	return (
		<div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex={-1} role="dialog">
			<div className="modal-dialog modal-dialog-centered" role="document">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Добавить справочник</h5>
						<button type="button" className="close" onClick={onClose} aria-label="Закрыть">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<form onSubmit={handleSubmit}>
						<div className="modal-body">
							<div className="form-group">
								<div className="d-flex flex-wrap" style={{ gap: '8px' }}>
									<button
										type="button"
										className={`btn ${mode === MODE_TYPE ? 'btn-primary' : 'btn-outline-secondary'}`}
										style={buttonStyle}
										onClick={() => { setMode(MODE_TYPE); setTitle(''); setError('') }}
									>
										Тип
									</button>
									<button
										type="button"
										className={`btn ${mode === MODE_PROPERTY ? 'btn-primary' : 'btn-outline-secondary'}`}
										style={buttonStyle}
										onClick={() => { setMode(MODE_PROPERTY); setTitle(''); setTypeId(types[0] ? String(types[0].id) : ''); setError('') }}
									>
										Свойство
									</button>
									<button
										type="button"
										className={`btn ${mode === MODE_VALUE ? 'btn-primary' : 'btn-outline-secondary'}`}
										style={buttonStyle}
										onClick={() => { setMode(MODE_VALUE); setTitle(''); setPropertyId(properties[0] ? String(properties[0].id) : ''); setError('') }}
									>
										Значение
									</button>
								</div>
							</div>
							{error && <div className="alert alert-danger">{error}</div>}
							{mode === MODE_TYPE && (
								<div className="form-group">
									<label htmlFor="dir-modal-type-title">Название типа</label>
									<input
										id="dir-modal-type-title"
										type="text"
										className="form-control"
										placeholder="Например: Шины"
										value={title}
										onChange={(e) => setTitle(e.target.value)}
										disabled={loading}
									/>
								</div>
							)}
							{mode === MODE_PROPERTY && (
								<>
									<div className="form-group">
										<label htmlFor="dir-modal-property-type">Тип свойства</label>
										<select
											id="dir-modal-property-type"
											className="form-control"
											value={typeId}
											onChange={(e) => setTypeId(e.target.value)}
											required
										>
											<option value="">Выберите тип</option>
											{types.map((t) => (
												<option key={t.id} value={t.id}>{t.title}</option>
											))}
										</select>
									</div>
									<div className="form-group">
										<label htmlFor="dir-modal-property-title">Название свойства</label>
										<input
											id="dir-modal-property-title"
											type="text"
											className="form-control"
											placeholder="Например: Ширина"
											value={title}
											onChange={(e) => setTitle(e.target.value)}
											required
											disabled={loading}
										/>
									</div>
								</>
							)}
							{mode === MODE_VALUE && (
								<>
									<div className="form-group">
										<label htmlFor="dir-modal-value-property">Свойство</label>
										<select
											id="dir-modal-value-property"
											className="form-control"
											value={propertyId}
											onChange={(e) => setPropertyId(e.target.value)}
											required
										>
											<option value="">Выберите свойство</option>
											{properties.map((p) => (
												<option key={p.id} value={p.id}>{p.title}</option>
											))}
										</select>
									</div>
									<div className="form-group">
										<label htmlFor="dir-modal-value-title">Значение</label>
										<input
											id="dir-modal-value-title"
											type="text"
											className="form-control"
											placeholder="Например: 255"
											value={title}
											onChange={(e) => setTitle(e.target.value)}
											required
											disabled={loading}
										/>
									</div>
								</>
							)}
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

AddDirectoryModal.propTypes = {
	show: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	onSuccess: PropTypes.func.isRequired,
}

export default AddDirectoryModal
