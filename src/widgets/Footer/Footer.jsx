function Footer() {
	const date = new Date().getFullYear()
	
	return (
		<>
			<footer className="main-footer">
				<strong>Copyright © 2021-{date +' '}
					<a target='blank' href="https://bumm-shop.ru/">cardan.shop</a>. </strong>
				All rights reserved.
			</footer>
		</>
	)
}
export default Footer