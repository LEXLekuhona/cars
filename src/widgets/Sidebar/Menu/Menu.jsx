import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom"
import { logout } from '../../../features/auth/authSlice'
import Sidebar from './subMenu'

function Menu() {

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const handleLogout = () => {
		dispatch(logout())
		navigate('/login')
	}
	return (
		<>
			<nav className="mt-2">
				<Sidebar />
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