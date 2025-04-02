import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, NavLink, useNavigate } from "react-router-dom"
import { logout } from '../../../features/auth/authSlice'
import { data } from "../../../utils/data"

function Menu() {
	const [isOpen, setIsOpen] = useState(false)
	const dispatch = useDispatch()
	const navigate = useNavigate()
	
	

	const toggleSubMenu = () => {
		setIsOpen(!isOpen)
	}

	const handleLogout = () =>{
		dispatch(logout())
		navigate('/login')
	}
	return (
		<>
			<nav className="mt-2">
				<ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
					{data.map((item) =>
						<li className="nav-item" key={item.id}>
							<NavLink to={item.path} className="nav-link menu_button">
								<i className={`nav-icon fas ${item.icon}`} />
								<p>{item.title}</p>
							</NavLink>
						</li>
					)}

					{/*Справочник */}
					<li className="nav-header">Справочники</li>
					<li className="nav-item">
						<NavLink to={'/tire_diameter/'} className="nav-link">
							<i className="nav-icon far fa-image" />
							<p>
								Диаметр шин
							</p>
						</NavLink>
					</li>

					<li className="nav-item">
						<NavLink to={'/tire_dependencies/'} className="nav-link">
							<i className="nav-icon far fa-image" />
							<p>Связь шин</p>
						</NavLink>
					</li>

					<li className={`nav-item ${isOpen ? 'menu-is-opening menu-open' : ''}`}>
						<Link className="nav-link" onClick={() => toggleSubMenu()}>
							<i className="nav-icon fas fa-edit"></i>
							<p>
								Шины (метрическая)
								<i className="fas fa-angle-left right"></i>
							</p>
						</Link>
						<ul className="nav nav-treeview" style={{ display: isOpen ? 'block' : 'none' }}>
							<li className="nav-item">
								<Link to={'tire_metric_profile/'} className="nav-link">
									<i className="far fa-circle nav-icon"></i>
									<p>Профиль</p>
								</Link>
							</li>
							<li className="nav-item">
								<a href className="nav-link">
									<i className="far fa-circle nav-icon"></i>
									<p>Ширина</p>
								</a>
							</li>
						</ul>
					</li>


					<li className="nav-item">
						<a href="#" className="nav-link">
							<i className="nav-icon fas fa-edit" />
							<p>
								Шины (дюймовая)
								<i className="fas fa-angle-left right" />
							</p>
						</a>
						<ul className="nav nav-treeview" /*style={{ display: isOpen ? 'block' : 'none' }}*/>
							<li className="nav-item">
								<a href="/tire_inch_height/" className="nav-link">
									<i className="far fa-circle nav-icon" />
									<p>Высота</p>
								</a>
							</li>
							<li className="nav-item">
								<a href="/tire_inch_width/" className="nav-link">
									<i className="far fa-circle nav-icon" />
									<p>Ширина</p>
								</a>
							</li>
						</ul>
					</li>
					<li className="nav-item">
						<a href="#" className="nav-link">
							<i className="nav-icon fas fa-edit" />
							<p>
								Диски
								<i className="fas fa-angle-left right" />
							</p>
						</a>
						<ul className="nav nav-treeview" /*style={{ display: isOpen ? 'block' : 'none' }}*/>
							<li className="nav-item">
								<a href="/wheel_width/" className="nav-link">
									<i className="far fa-circle nav-icon" />
									<p>Ширина</p>
								</a>
							</li>
							<li className="nav-item">
								<a href="/wheel_diameter/" className="nav-link">
									<i className="far fa-circle nav-icon" />
									<p>Диаметр</p>
								</a>
							</li>
							<li className="nav-item">
								<a href="/wheel_drilling/" className="nav-link">
									<i className="far fa-circle nav-icon" />
									<p>Сверловка</p>
								</a>
							</li>
							<li className="nav-item">
								<a href="/wheel_departure/" className="nav-link">
									<i className="far fa-circle nav-icon" />
									<p>Вылет</p>
								</a>
							</li>
							<li className="nav-item">
								<a href="/wheel_ch_diameter/" className="nav-link">
									<i className="far fa-circle nav-icon" />
									<p>Диаметр ЦО</p>
								</a>
							</li>
							<li className="nav-item">
								<a href="/wheel_dependencies/" className="nav-link">
									<i className="far fa-circle nav-icon" />
									<p>Связь</p>
								</a>
							</li>
						</ul>
					</li>
					<li className="nav-item">
						<a href="#" className="nav-link" >
							<i className="nav-icon fas fa-edit" />
							<p>
								Масла
								<i className="fas fa-angle-left right" />
							</p>
						</a>
						<ul className="nav nav-treeview" /*style={{ display: isOpen ? 'block' : 'none' }}*/>
							<li className="nav-item">
								<a href="/oil_type/" className="nav-link">
									<i className="far fa-circle nav-icon" />
									<p>Типы</p>
								</a>
							</li>
							<li className="nav-item">
								<a href="/oil_viscosity/" className="nav-link">
									<i className="far fa-circle nav-icon" />
									<p>Вязкость</p>
								</a>
							</li>
						</ul>
					</li>
					<li className="nav-item">
						<a href="/wipers_length/" className="nav-link">
							<i className="nav-icon far fa-image" />
							<p>
								Дворники
							</p>
						</a>
					</li>
					<li className="nav-item">
						<a href="#" className="nav-link">
							<i className="nav-icon fas fa-edit" />
							<p>
								Аккумуляторы
								<i className="fas fa-angle-left right" />
							</p>
						</a>
						<ul className="nav nav-treeview" /*style={{ display: isOpen ? 'block' : 'none' }}*/>
							<li className="nav-item">
								<a href="/battery_capacity/" className="nav-link">
									<i className="far fa-circle nav-icon" />
									<p>Емкость</p>
								</a>
							</li>
							<li className="nav-item">
								<a href="/battery_starting_current/" className="nav-link">
									<i className="far fa-circle nav-icon" />
									<p>Пусковой ток</p>
								</a>
							</li>
							<li className="nav-item">
								<a href="/battery_dimensions/" className="nav-link">
									<i className="far fa-circle nav-icon" />
									<p>Габариты</p>
								</a>
							</li>
							<li className="nav-item">
								<a href="/battery_polarity/" className="nav-link">
									<i className="far fa-circle nav-icon" />
									<p>Полярность</p>
								</a>
							</li>
						</ul>
					</li>
					<li className="nav-item">
						<a href="/year/" className="nav-link">
							<i className="nav-icon far fa-image" />
							<p>
								Годы
							</p>
						</a>
					</li>

				</ul>
				<div className='d-flex justify-content-center'>

					<button style={{ padding: "9px 60px", marginTop: "50px", marginBottom: "50px" }}
						type="button"
						className="btn btn-outline-light" onClick={handleLogout} >
						Выйти
					</button>

				</div>
			</nav>
		</>
	)
}
export default Menu