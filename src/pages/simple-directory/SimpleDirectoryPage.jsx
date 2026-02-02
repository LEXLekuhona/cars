/* eslint-disable react/prop-types */
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import TableActions from '@shared/Table/Actions'
import TableGeneric from '@shared/Table/Table'
import ConfirmModal from '@shared/ConfirmModal'
import ToastSuccess from '@shared/ToastSuccess'
import NavigationPreloader from '@widgets/Preloader/NavigationPreloader'
import { BASE_URL, API_PATHS } from '@shared/config'
import { useAllDirectory } from '@shared/hooks/useAllDirectory'
import Cookies from 'js-cookie'
import axios from 'axios'
import PropTypes from 'prop-types'

const getBaseTitle = (title = '') => title.replace(/ \(копия( \d+)?\)$/i, '')

const buildCopyTitle = (existingTitles, baseTitle) => {
	let candidate = `${baseTitle} (копия)`
	let index = 2

	while (existingTitles.includes(candidate)) {
		candidate = `${baseTitle} (копия ${index})`
		index += 1
	}

	return candidate
}

const getHeaders = () => {
	const token = Cookies.get('token')
	return {
		Authorization: `Bearer ${token}`,
		Accept: 'application/json',
		'Content-Type': 'application/json'
	}
}

const SimpleDirectoryPage = ({ config }) => {
	const {
		path,
		label,
		apiKey,
		columnHeader,
		entityName = 'Запись'
	} = config

	useEffect(() => {
		document.title = `CarsDB - ${label}`
	}, [label])

	const [searchParams, setSearchParams] = useSearchParams()
	const size = Number(searchParams.get('size')) || 10
	const page = Number(searchParams.get('page')) || 1
	const refresh = searchParams.get('refresh')

	const endpoint = `${BASE_URL}${API_PATHS[apiKey]}`
	const { data, loading, refetch } = useAllDirectory(endpoint, 'items', size)
	const [items, setItems] = useState([])
	const [isInitialLoad, setIsInitialLoad] = useState(true)
	const [showTable, setShowTable] = useState(false)
	const [tableRendered, setTableRendered] = useState(false)

	useEffect(() => {
		if (data) {
			setItems(data)
			if (isInitialLoad && !loading) {
				setIsInitialLoad(false)
				// Показываем таблицу сразу после загрузки данных
				setShowTable(true)
			} else if (!isInitialLoad) {
				setShowTable(true)
			}
		}
	}, [data, isInitialLoad, loading])

	// Отслеживаем, когда таблица отрендерилась
	useEffect(() => {
		if (showTable && !tableRendered) {
			// Даем браузеру время отрисовать таблицу
			requestAnimationFrame(() => {
				requestAnimationFrame(() => {
					setTableRendered(true)
				})
			})
		}
	}, [showTable, tableRendered])

	useEffect(() => {
		if (refresh === 'true') {
			refetch()
			setSearchParams({ page, size })
		}
	}, [refresh, refetch, setSearchParams, page, size])

	const [showModal, setShowModal] = useState(false)
	const [deleteId, setDeleteId] = useState(null)
	const [showToast, setShowToast] = useState(false)
	const [toastText, setToastText] = useState('')

	const columns = useMemo(() => [
		{ Header: columnHeader || label, accessor: 'title' },
		{
			Header: 'Действия',
			id: 'actions',
			Cell: ({ row: { original } }) => (
				<TableActions
					onCopy={() => handleCopy(original)}
					onDelete={() => handleDeleteClick(original.id)}
				/>
			)
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	], [label])

	const handleDeleteClick = (id) => {
		setDeleteId(id)
		setShowModal(true)
	}

	const handleConfirmDelete = async () => {
		try {
			await axios.delete(`${endpoint}/${deleteId}`, { headers: getHeaders() })
			setItems((prev) => prev.filter((item) => item.id !== deleteId))
			setToastText(`${entityName} успешно удалена`)
			setShowToast(true)
		} catch {
			alert('Ошибка при удалении')
		} finally {
			setShowModal(false)
			setDeleteId(null)
		}
	}

	const handleCopy = async (item) => {
		try {
			const titles = items.map((entry) => entry.title)
			const baseTitle = getBaseTitle(item.title)
			const newTitle = buildCopyTitle(titles, baseTitle)

			const payload = { ...item, title: newTitle }
			delete payload.id

			await axios.post(endpoint, payload, { headers: getHeaders() })

			setToastText('Запись успешно скопирована')
			setShowToast(true)
			refetch()
		} catch (error) {
			if (error.response && error.response.status === 409 && error.response.data && error.response.data.message) {
				setToastText(error.response.data.message)
				setShowToast(true)
			} else {
				alert('Ошибка при копировании')
			}
		}
	}

	const lengthId = `${path.replace(/-/g, '_')}_length`
	const filterId = `${path.replace(/-/g, '_')}_filter`

	const itemToDelete = items.find((entry) => entry.id === deleteId)
	const confirmText = itemToDelete
		? `${entityName} "${itemToDelete.title}" будет удалена навсегда. Это действие нельзя будет вернуть.`
		: ''

	return (
		<>
			<NavigationPreloader show={loading && isInitialLoad || (showTable && !tableRendered)} />
			<div className="content-wrapper">
				<div className="content-header" >
					<div className="container-fluid">
						<div className="row mb-2">
							<div className="col-sm-6">
								<h1 className="m-0">{label}</h1>
							</div>
						</div>
					</div>
				</div>
				<div style={{ position: 'relative' }}>
					{showTable && !loading ? (
						<TableGeneric
							data={items}
							loading={loading}
							columns={columns}
							addLink={`/${path}/new`}
							addLabel="Добавить"
							lengthId={lengthId}
							filterId={filterId}
						/>
					) : null}
					<ConfirmModal
						show={showModal}
						onConfirm={handleConfirmDelete}
						onCancel={() => setShowModal(false)}
						subtext={confirmText}
					/>
					<ToastSuccess show={showToast} text={toastText} onClose={() => setShowToast(false)} />
				</div>
			</div>
			<aside className="control-sidebar control-sidebar-dark"></aside>
		</>
	)
}

SimpleDirectoryPage.propTypes = {
	config: PropTypes.shape({
		path: PropTypes.string.isRequired,
		label: PropTypes.string.isRequired,
		apiKey: PropTypes.string.isRequired,
		columnHeader: PropTypes.string,
		entityName: PropTypes.string
	}).isRequired
}

export default SimpleDirectoryPage
/* eslint-enable react/prop-types */

