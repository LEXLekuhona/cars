import PropTypes from 'prop-types'
import React from 'react'

function ConfirmModal({ show, onConfirm, onCancel, text, subtext }) {
	if (!show) return null
	return (
		<div style={{ position: 'fixed', inset: 0, zIndex: 1050, background: 'rgba(0,0,0,0.3)' }}>
			<div style={{
				position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
				width: 725.29, minHeight: 222, background: '#454D55', borderRadius: 16, boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
				color: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'center',
			}}>
				<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '32px 40px 0 40px' }}>
					<div style={{ fontSize: 32, fontWeight: 500, lineHeight: 1.2 }}>
						Вы уверены что хотите удалить запись?
					</div>
					<button onClick={onCancel} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 32, cursor: 'pointer', lineHeight: 1 }} aria-label="Закрыть">×</button>
				</div>
				<div style={{ borderTop: '1px solid #6B747C', borderBottom: '1px solid #6B747C', margin: '24px 0 0 0', padding: '24px 40px', fontSize: 24, color: '#fff', fontWeight: 400 }}>
					{subtext || text}
				</div>
				<div style={{ display: 'flex', gap: 16, justifyContent: 'flex-start', padding: '32px 40px' }}>
					<button
						className="btn"
						style={{
							border: '2px solid #F05B5B', color: '#F05B5B', background: 'transparent', borderRadius: 8, fontSize: 28, fontWeight: 400, width: 200, height: 56,
						}}
						onClick={onConfirm}
					>
						Удалить
					</button>
					<button
						className="btn"
						style={{
							border: '2px solid #fff', color: '#fff', background: 'transparent', borderRadius: 8, fontSize: 28, fontWeight: 400, width: 200, height: 56,
						}}
						onClick={onCancel}
					>
						Отмена
					</button>
				</div>
			</div>
		</div>
	)
}

ConfirmModal.propTypes = {
	show: PropTypes.bool.isRequired,
	onConfirm: PropTypes.func.isRequired,
	onCancel: PropTypes.func.isRequired,
	text: PropTypes.string,
	subtext: PropTypes.string,
}

export default ConfirmModal 