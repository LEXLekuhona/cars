import { Link, useLocation } from "react-router-dom"

// Маппинг путей к названиям страниц
const getPageTitle = (pathname) => {
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
		'/tire-diameter': 'Диаметр шин',
		'/tire-diameter/new': 'Добавить диаметр шин',
		'/tire-metric-profile': 'Профиль',
		'/tire-metric-profile/new': 'Добавить профиль',
		'/tire-metric-width': 'Ширина',
		'/tire-metric-width/new': 'Добавить ширину',
		'/tire-inch-height': 'Высота',
		'/tire-inch-height/new': 'Добавить высоту',
		'/tire-inch-width': 'Ширина',
		'/tire-inch-width/new': 'Добавить ширину',
		'/tires': 'Шины',
		'/tires/new': 'Добавить шины',
		'/tires-inch': 'Шины (дюймовая)',
		'/tires-inch/new': 'Добавить шины (дюймовая)',
		'/wheels': 'Диски',
		'/wheels/new': 'Добавить диски',
		'/wheel-width': 'Ширина',
		'/wheel-width/new': 'Добавить ширину',
		'/wheel-diameter': 'Диаметр',
		'/wheel-diameter/new': 'Добавить диаметр',
		'/wheel-drilling': 'Сверловка',
		'/wheel-drilling/new': 'Добавить сверловку',
		'/wheel-departure': 'Вылет',
		'/wheel-departure/new': 'Добавить вылет',
		'/wheel-ch-diameter': 'Диаметр ЦО',
		'/wheel-ch-diameter/new': 'Добавить диаметр ЦО',
		'/wheel-dependencies': 'Связь',
		'/wheel-dependencies/new': 'Добавить связь',
		'/oils': 'Масла',
		'/oils/new': 'Добавить масла',
		'/oil-type': 'Типы',
		'/oil-type/new': 'Добавить тип',
		'/oil-viscosity': 'Вязкость',
		'/oil-viscosity/new': 'Добавить вязкость',
		'/wipers': 'Дворники',
		'/wipers/new': 'Добавить дворники',
		'/wipers-length': 'Длина',
		'/wipers-length/new': 'Добавить длину',
		'/batteries': 'Аккумуляторы',
		'/batteries/new': 'Добавить аккумуляторы',
		'/battery-capacity': 'Емкость',
		'/battery-capacity/new': 'Добавить емкость',
		'/battery-starting-cur': 'Пусковой ток',
		'/battery-starting-cur/new': 'Добавить пусковой ток',
		'/battery-dimensions': 'Габариты',
		'/battery-dimensions/new': 'Добавить габариты',
		'/battery-polarity': 'Полярность',
		'/battery-polarity/new': 'Добавить полярность',
	}

	// Убираем query параметры из пути
	const cleanPath = pathname.split('?')[0]

	// Возвращаем название страницы или "Главная страница" по умолчанию
	return pathMap[cleanPath] || 'Главная страница'
}

function Navbar() {
	const location = useLocation()
	const pageTitle = getPageTitle(location.pathname)

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