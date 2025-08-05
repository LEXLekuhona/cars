import { menuItems } from '@utils/data'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'


// Функция для рендера заголовка
function renderHeader(item) {
	return (
		<li key={item.key || item.label} className="nav-header">
			{item.header}
		</li>
	)
}

// Функция для рендера вложенного подменю
function SubMenu({ subMenu, isOpen }) {
	return (
		<ul
			className="nav nav-treeview"
			style={{ display: isOpen ? 'block' : 'none' }}
		>
			{subMenu.map((sub) => (
				<li key={sub.key} className="nav-item">
					{sub.to ? (
						<Link to={sub.to} className="nav-link">
							<i className="far fa-circle nav-icon"></i>
							<p>{sub.label}</p>
						</Link>
					) : (
						<a href={sub.href || '#'} className="nav-link">
							<i className="far fa-circle nav-icon"></i>
							<p>{sub.label}</p>
						</a>
					)}
				</li>
			))}
		</ul>
	)
}

// Функция для рендера элемента меню с подменю
function MenuItemWithSubMenu({ item, isOpen, onToggle }) {
	return (
		<li
			key={item.key}
			className={`nav-item ${isOpen ? 'menu-is-opening menu-open' : ''}`}
		>
			<Link
				to="#"
				className="nav-link"
				onClick={() => onToggle(item.key)}
				role="button"
				aria-expanded={isOpen}
			>
				<i className={`nav-icon fas ${item.icon.replace('fas ', '')}`}></i>
				<p>
					{item.label} <i className="fas fa-angle-left right"></i>
				</p>
			</Link>
			<SubMenu subMenu={item.subMenu} isOpen={isOpen} />
		</li>
	)
}

// Функция для рендера обычного пункта меню
function MenuItem({ item }) {
	return (
		<li key={item.key} className="nav-item">
			{item.to ? (
				<NavLink
					to={item.to}
					exact={item.exact}
					className="nav-link menu_button"
				>
					<i className={`nav-icon fas ${item.icon.replace('fas ', '')}`}></i>
					<p>{item.label}</p>
				</NavLink>
			) : (
				<a href={item.href || '#'} className="nav-link">
					<i className={`nav-icon far ${item.icon.replace('far ', '')}`}></i>
					<p>{item.label}</p>
				</a>
			)}
		</li>
	)
}

export default function Sidebar() {
	const [openKeys, setOpenKeys] = useState({})

	const toggleSubMenu = (key) => {
		setOpenKeys((prev) => ({
			...prev,
			[key]: !prev[key],
		}))
	}

	const renderMenuItem = (item) => {
		if (item.header) {
			return renderHeader(item)
		}

		if (item.subMenu) {
			const isOpen = !!openKeys[item.key]
			return (
				<MenuItemWithSubMenu
					key={item.key}
					item={item}
					isOpen={isOpen}
					onToggle={toggleSubMenu}
				/>
			)
		}

		return <MenuItem key={item.key} item={item} />
	}

	return (
		<ul
			className="nav nav-pills nav-sidebar flex-column"
			data-widget="treeview"
			role="menu"
			data-accordion="false"
		>
			{menuItems.map(renderMenuItem)}
		</ul>
	)
}

MenuItemWithSubMenu.propTypes = {
	subMenu: PropTypes.array.isRequired,
	isOpen: PropTypes.bool.isRequired,
	onToggle: PropTypes.func.isRequired,
}

MenuItem.propTypes = {
	key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	icon: PropTypes.string,
	label: PropTypes.string,
	to: PropTypes.string,
	exact: PropTypes.bool,
	href: PropTypes.string,
	subMenu: PropTypes.array,
}
