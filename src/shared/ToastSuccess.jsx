import PropTypes from 'prop-types'
import React, { useEffect } from 'react'

function ToastSuccess({ show, text = 'Запись успешно удалена', onClose }) {
	useEffect(() => {
		if (show) {
			const timer = setTimeout(onClose, 2000)
			return () => clearTimeout(timer)
		}
	}, [show, onClose])

	if (!show) return null
	return (
		<div style={{
			position: 'fixed',
			left: '50%',
			bottom: 35,
			transform: 'translateX(-50%)',
			width: 274.4,
			height: 68,
			background: '#fff',
			borderRadius: 4,
			boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			zIndex: 2000,
			fontSize: 18,
			fontWeight: 400,
			color: '#343A40',
			gap: 16,
		}}>
			<span style={{ display: 'flex', alignItems: 'center' }}>
				<svg width="33.5" height="32" viewBox="0 0 32 32" fill="none">
					<path d="M8 17L15 24L24 10" stroke="#2FC36A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
				</svg>
			</span>
			<span>{text}</span>
		</div>
	)
}

ToastSuccess.propTypes = {
	show: PropTypes.bool.isRequired,
	text: PropTypes.string,
	onClose: PropTypes.func.isRequired,
}

export default ToastSuccess 