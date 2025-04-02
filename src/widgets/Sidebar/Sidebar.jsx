import { Link } from "react-router-dom"
import User from "@entities/users/User"
import Menu from "./Menu/Menu"

function Sidebar() {
	return (
		<>
			{/* Main Sidebar Container */}
			<aside className="main-sidebar sidebar-dark-primary elevation-4">
				{/* Brand Logo */}
				<Link to={'/'} className="brand-link">
					<img src="./dist/img/AdminLogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
					<span className="brand-text font-weight-light">Cars DB</span>
				</Link>
				{/* Sidebar */}
				<div className="sidebar">
					{/* Sidebar user panel (optional) */}
					<User />
					{/* Sidebar Menu */}
					<Menu />
					{/* /.sidebar-menu */}
				</div>
				{/* /.sidebar */}
			</aside>

		</>
	)
}
export default Sidebar