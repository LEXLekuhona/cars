import { propertiesApi, propertyTypesApi } from '@entities/properties/api'
import TableGeneric from '@shared/Table/Table'
import ConfirmModal from '@shared/ConfirmModal'
import ToastSuccess from '@shared/ToastSuccess'
import AddPropertyModal from '@shared/AddPropertyModal/AddPropertyModal'
import NavigationPreloader from '@widgets/Preloader/NavigationPreloader'
import { BASE_URL, API_PATHS } from '@shared/config'
import { useAllDirectory } from '@shared/hooks/useAllDirectory'
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams, useParams } from 'react-router-dom'
import TableActions from '@shared/Table/Actions'

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

function PropertiesPage() {
	const { propertyTypeId } = useParams()
	const [propertyType, setPropertyType] = useState(null)
	const [allTypes, setAllTypes] = useState([])

	useEffect(() => {
		document.title = 'CarsDB - Свойства'
	}, [])

	const [searchParams, setSearchParams] = useSearchParams()
	const size = Number(searchParams.get('size')) || 10
	const page = Number(searchParams.get('page')) || 1
	const refresh = searchParams.get('refresh')

	// Загружаем тип для отображения названия или все типы для страницы без типа
	useEffect(() => {
		if (propertyTypeId) {
			propertyTypesApi.getById(propertyTypeId)
				.then(response => setPropertyType(response.data))
				.catch(() => {})
		} else {
			propertyTypesApi.getAll()
				.then(response => setAllTypes(response.data.items || []))
				.catch(() => {})
		}
	}, [propertyTypeId])

	// Загружаем свойства для конкретного типа
	const endpoint = `${BASE_URL}${API_PATHS.properties}`
	const { data, loading, refetch } = useAllDirectory(
		propertyTypeId ? `${endpoint}?property_type_id=${propertyTypeId}` : endpoint,
		'items',
		size
	)
	const [items, setItems] = useState([])
	const [isInitialLoad, setIsInitialLoad] = useState(true)
	const [showTable, setShowTable] = useState(false)
	const [tableRendered, setTableRendered] = useState(false)

	useEffect(() => {
		if (data) {
			let list = Array.isArray(data) ? data : []
			if (propertyTypeId && propertyType) {
				list = list.filter(
					(p) => p.property_type_id === parseInt(propertyTypeId, 10) || p.property_type?.title === propertyType.title
				)
			} else if (propertyTypeId) {
				list = list.filter((p) => p.property_type_id === parseInt(propertyTypeId, 10))
			}
			const normalized = list.map((p) => ({
				...p,
				property_type_id:
					p.property_type_id ??
					p.property_type?.id ??
					(propertyTypeId ? parseInt(propertyTypeId, 10) : allTypes.find((t) => t.title === p.property_type?.title)?.id)
			}))
			setItems(normalized)
			if (isInitialLoad && !loading) {
				setIsInitialLoad(false)
				setShowTable(true)
			} else if (!isInitialLoad) {
				setShowTable(true)
			}
		}
	}, [data, isInitialLoad, loading, propertyTypeId, propertyType, allTypes])

	useEffect(() => {
		if (showTable && !tableRendered) {
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
	const [showAddModal, setShowAddModal] = useState(false)
	const [deleteId, setDeleteId] = useState(null)
	const [showToast, setShowToast] = useState(false)
	const [toastText, setToastText] = useState('')

	const columns = useMemo(() => [
		{ Header: 'Свойство', accessor: 'title' },
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
	], [])

	const handleDeleteClick = (id) => {
		setDeleteId(id)
		setShowModal(true)
	}

	const handleConfirmDelete = async () => {
		try {
			await propertiesApi.delete(deleteId)
			setItems((prev) => prev.filter((item) => item.id !== deleteId))
			setToastText('Свойство успешно удалено')
			setShowToast(true)
			window.dispatchEvent(new CustomEvent('directory-added'))
		} catch (err) {
			const msg = err.response?.data?.message || 'Ошибка при удалении'
			setToastText(msg)
			setShowToast(true)
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

			const payload = { title: newTitle, property_type_id: item.property_type_id }
			if (payload.property_type_id == null) delete payload.property_type_id
			await propertiesApi.create(payload)

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

	const itemToDelete = items.find((entry) => entry.id === deleteId)
	const confirmText = itemToDelete
		? `Свойство "${itemToDelete.title}" будет удалено навсегда. Это действие нельзя будет вернуть.`
		: ''

	const pageTitle = propertyType ? propertyType.title : 'Свойства'

	return (
		<>
			<NavigationPreloader show={loading && isInitialLoad || (showTable && !tableRendered)} />
			<div className="content-wrapper">
				<div className="content-header" >
					<div className="container-fluid">
						<div className="row mb-2">
							<div className="col-sm-6">
								<h1 className="m-0">{pageTitle}</h1>
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
							onAddClick={() => setShowAddModal(true)}
							addLabel="Добавить"
							lengthId="properties_length"
							filterId="properties_filter"
						/>
					) : null}
					<AddPropertyModal
						show={showAddModal}
						onClose={() => setShowAddModal(false)}
						onSuccess={() => {
							setToastText('Свойство успешно создано')
							setShowToast(true)
							refetch()
						}}
						propertyTypeId={propertyTypeId ?? undefined}
					/>
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

export default PropertiesPage
