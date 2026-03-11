import { Link, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { SIMPLE_DIRECTORIES } from '@shared/entities/simpleDirectories'

// Маппинг путей к названиям страниц
const getPageTitle = (pathname) => {
	const simplePaths = SIMPLE_DIRECTORIES.reduce((acc, entry) => {
		acc[`/${entry.path}`] = entry.label
		acc[`/${entry.path}/new`] = `Добавить ${entry.label.toLowerCase()}`
		return acc
	}, {})

	// Убираем query параметры из пути
	const cleanPath = pathname.split('?')[0]

	// Обработка динамических путей Properties
	if (cleanPath.startsWith('/property-types')) {
		if (cleanPath === '/property-types') return 'Типы свойств'
		if (cleanPath === '/property-types/new') return 'Добавить тип свойства'
		if (cleanPath.includes('/properties') && cleanPath.includes('/values')) {
			if (cleanPath.endsWith('/new')) return 'Добавить значение свойства'
			return 'Значения свойств'
		}
		if (cleanPath.includes('/properties')) {
			if (cleanPath.endsWith('/new')) return 'Добавить свойство'
			return 'Свойства'
		}
	}
	if (cleanPath.startsWith('/properties')) {
		if (cleanPath === '/properties') return 'Свойства'
		if (cleanPath === '/properties/new') return 'Добавить свойство'
		if (cleanPath.includes('/values')) {
			if (cleanPath.endsWith('/new')) return 'Добавить значение свойства'
			return 'Значения свойств'
		}
	}
	if (cleanPath.startsWith('/property-values')) {
		if (cleanPath === '/property-values') return 'Значения свойств'
		if (cleanPath === '/property-values/new') return 'Добавить значение свойства'
	}

	const pathMap = {
		'/': 'Главная страница',
		'/brands': 'Марка',
		'/brands/new': 'Добавить марку автомобиля',
		'/models': 'Модель',
		'/models/new': 'Добавить модель',
		'/generation': 'Поколение',
		'/generation/new': 'Добавить поколение',
		'/year': 'Год',
		'/year/new': 'Добавить год',
		// Закомментированные старые пути параметров
		// ...simplePaths
	}

	// Возвращаем название страницы или "Главная страница" по умолчанию
	return pathMap[cleanPath] || 'Главная страница'
}

function Navbar() {
	const location = useLocation()
	const [dynamicTitle, setDynamicTitle] = useState(null)

	useEffect(() => {
		const onPageTitle = (e) => setDynamicTitle(e.detail?.title ?? null)
		window.addEventListener('page-title', onPageTitle)
		return () => window.removeEventListener('page-title', onPageTitle)
	}, [])

	useEffect(() => {
		setDynamicTitle(null)
	}, [location.pathname])

	const pageTitle = dynamicTitle ?? getPageTitle(location.pathname)

	return (
		<>
			{/* Navbar */}
			<nav className="main-header navbar navbar-expand navbar-dark">
				{/* Left navbar links */}
				<ul className="navbar-nav">
					<li className="nav-item">
						<Link className="nav-link" data-widget="pushmenu" role="button"><i className="fas fa-bars" /></Link>
					</li>
					<li className="nav-item d-none d-sm-inline-block">
						<Link to={'/'} className="nav-link">{pageTitle}</Link>
					</li>
				</ul>

			</nav>
			{/* /.navbar */}
		</>
	)
}
export default Navbar