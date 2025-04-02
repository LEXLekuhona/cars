import { Link } from "react-router-dom"

function Navbar() {
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
						<Link to={'/'} className="nav-link">Главная страница</Link>
					</li>
				</ul>

			</nav>
			{/* /.navbar */}
		</>
	)
}
export default Navbar