import { Link } from "react-router-dom"

function User() {
	return (
		<>
			<div className="user-panel mt-3 pb-3 mb-3 d-flex">
				<div className="image">
					<img src="./dist/img/user.jpg" className="img-circle elevation-2" alt="User Image" />
				</div>
				<div className="info">
					<Link to={'/'} className="d-block">Andrew</Link>
				</div>
			</div>
		</>
	)
}
export default User