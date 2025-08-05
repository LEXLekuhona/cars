import { render, screen } from '@testing-library/react'
import React from 'react'
import ToastSuccess from './ToastSuccess'

test('renders toast with correct text', () => {
	render(<ToastSuccess show={true} text="Тестовое сообщение" onClose={() => { }} />)
	expect(screen.getByText('Тестовое сообщение')).toBeInTheDocument()
}) 