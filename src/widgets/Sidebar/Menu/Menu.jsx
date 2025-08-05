import { logout } from '@features/auth/authSlice'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom"
import Sidebar from './subMenu'

function Menu() {

	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [collapsed, setCollapsed] = useState(false)

	const handleLogout = () => {
		dispatch(logout())
		navigate('/login')
	}

	const date = new Date().getFullYear()

	// Функция для проверки состояния сайдбара
	const isSidebarCollapsed = () => {
		return document.body.classList.contains('sidebar-collapse')
	}

	useEffect(() => {
		const checkCollapsed = () => setCollapsed(isSidebarCollapsed())

		// Проверяем начальное состояние
		checkCollapsed()

		// Слушаем изменения классов на body
		const observer = new MutationObserver(checkCollapsed)
		observer.observe(document.body, {
			attributes: true,
			attributeFilter: ['class']
		})

		// Слушаем события изменения размера окна
		window.addEventListener('resize', checkCollapsed)

		return () => {
			observer.disconnect()
			window.removeEventListener('resize', checkCollapsed)
		}
	}, [])

	return (
		<>
			<nav className="mt-2">
				<Sidebar />
				<div className='d-flex justify-content-center'>
					{collapsed ? (
						// Иконка для свернутого состояния
						<button
							style={{
								padding: "8px",
								marginTop: "50px",
								marginBottom: "12px",
								width: "40px",
								height: "40px",
								borderRadius: "4px",
								border: "1px solid #6c757d",
								background: "transparent",
								color: "#fff",
								display: "flex",
								alignItems: "center",
								justifyContent: "center"
							}}
							type="button"
							className="btn btn-outline-light"
							onClick={handleLogout}
							title="Выйти"
						>
							<i className="fas fa-sign-out-alt" style={{ fontSize: "16px" }} />
						</button>
					) : (
						// Кнопка для развернутого состояния
						<button style={{
							padding: "9px 60px",
							marginTop: "50px",
							marginBottom: "12px",
							minWidth: "120px",
							whiteSpace: "nowrap",
							fontSize: "14px"
						}}
							type="button"
							className="btn btn-outline-light" onClick={handleLogout} >
							Выйти
						</button>
					)}
				</div>
				<div className='d-flex justify-content-center' style={{ width: '100%' }}>
					<span style={{
						color: '#aaa',
						fontSize: "12px",
						textAlign: 'center',
						whiteSpace: "nowrap",
						overflow: "hidden",
						textOverflow: "ellipsis",
						maxWidth: "100%"
					}}>© 2021-{date + ' '}</span>
				</div>
			</nav>
		</>
	)
}

export default Menu