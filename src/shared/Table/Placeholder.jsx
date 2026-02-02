function TablePlaceholder() {
	return (
		<div 
			className="preloader flex-column justify-content-center align-items-center" 
			style={{
				position: 'relative',
				height: '400px',
				width: '100%',
				background: 'transparent',
				transition: 'height 200ms linear',
				overflow: 'hidden'
			}}
		>
			<img className="animation__wobble" src="dist/img/AdminLogo.png" alt="AdminLTELogo" height={60} width={60} />
		</div>
	)
}

export default TablePlaceholder
