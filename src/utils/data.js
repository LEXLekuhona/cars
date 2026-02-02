import { SIMPLE_DIRECTORIES } from '@shared/entities/simpleDirectories'

const buildMenuItems = (group) => SIMPLE_DIRECTORIES
	.filter((entry) => entry.menuGroup === group)
	.map((entry) => ({
		key: entry.key,
		to: `/${entry.path}`,
		icon: 'far fa-circle',
		label: entry.menuLabel || entry.label
	}))

// Элементы, которые имеют подменю и не должны быть в rootDirectories
const itemsWithSubMenu = ['wheels', 'oils', 'batteries']

const rootDirectories = SIMPLE_DIRECTORIES
	.filter((entry) => entry.menuGroup === 'root')
	.filter((entry) => !itemsWithSubMenu.includes(entry.key))
	.map((entry) => ({
		key: entry.key,
		to: `/${entry.path}`,
		icon: 'far fa-image',
		label: entry.label
	}))

export const menuItems = [
	{
		key: 'cars',
		to: '/',
		icon: 'fas fa-car',
		label: 'Все автомобили',
		exact: true
	},
	{
		header: 'Справочники'
	},
	{
		key: 'brands',
		to: '/brands',
		icon: 'fas fa-cog',
		label: 'Марка'
	},
	{
		key: 'models',
		to: '/models',
		icon: 'fas fa-wrench',
		label: 'Модель'
	},
	{
		key: 'generation',
		to: '/generation',
		icon: 'fas fa-star',
		label: 'Поколение'
	},
	{
		key: 'year',
		to: '/year',
		icon: 'far fa-image',
		label: 'Год'
	},
	...rootDirectories,
	{
		key: 'tireMetric',
		label: 'Шины',
		icon: 'fas fa-edit',
		subMenu: buildMenuItems('tireMetric')
	},
	{
		key: 'tireInch',
		label: 'Шины (дюймовая)',
		icon: 'fas fa-edit',
		subMenu: buildMenuItems('tireInch')
	},
	{
		key: 'wheels-menu',
		label: 'Диски',
		icon: 'fas fa-edit',
		subMenu: buildMenuItems('wheels')
	},
	{
		key: 'oils-menu',
		label: 'Масла',
		icon: 'fas fa-edit',
		subMenu: buildMenuItems('oils')
	},
	{
		key: 'batteries-menu',
		label: 'Аккумуляторы',
		icon: 'fas fa-edit',
		subMenu: buildMenuItems('batteries')
	},
	{
		header: 'Связи параметров'
	},
	{
		key: 'tire',
		label: 'Связь шин',
		icon: 'far fa-image',
		to: '/tire_dependencies'
	}
]