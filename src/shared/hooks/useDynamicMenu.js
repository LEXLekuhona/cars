import { useEffect, useState } from 'react'
import { propertyTypesApi, propertiesApi } from '@entities/properties/api'

/**
 * Хук для динамической загрузки меню из API
 * Генерирует структуру меню на основе property_types и properties
 */
export const useDynamicMenu = () => {
	const [menuItems, setMenuItems] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const loadMenu = async () => {
			setLoading(true)
			try {
				const typesResponse = await propertyTypesApi.getAll()
				const types = typesResponse.data.items || []

				// Загружаем все свойства (бэкенд может не поддерживать фильтр property_type_id)
				let allProperties = []
				let page = 1
				let hasMore = true
				while (hasMore) {
					const res = await propertiesApi.getAll({ page, size: 100 })
					const items = res.data.items || []
					allProperties = allProperties.concat(items)
					hasMore = items.length === 100
					page += 1
				}

				const dynamicMenuItems = types.map((type) => {
					const properties = allProperties.filter(
						(p) => p.property_type_id === type.id || p.property_type?.title === type.title
					)
					const subMenu = properties.map((property) => ({
						key: `property-${property.id}`,
						to: `/properties/${property.id}/values`,
						icon: 'far fa-circle',
						label: property.title
					}))
					return {
						key: `property-type-${type.id}`,
						label: type.title,
						icon: 'fas fa-edit',
						subMenu: subMenu.length > 0 ? subMenu : undefined,
						to: subMenu.length === 0 ? `/property-types/${type.id}/properties` : undefined
					}
				})

				setMenuItems(dynamicMenuItems)
			} catch (error) {
				console.error('Error loading dynamic menu:', error)
				setMenuItems([])
			} finally {
				setLoading(false)
			}
		}

		loadMenu()

		const onDirectoryAdded = () => loadMenu()
		window.addEventListener('directory-added', onDirectoryAdded)
		return () => window.removeEventListener('directory-added', onDirectoryAdded)
	}, [])

	return { menuItems, loading }
}
