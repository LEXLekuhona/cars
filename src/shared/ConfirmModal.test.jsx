import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import ConfirmModal from './ConfirmModal'

test('renders modal and calls onConfirm/onCancel', () => {
	const onConfirm = jest.fn()
	const onCancel = jest.fn()
	render(
		<ConfirmModal show={true} onConfirm={onConfirm} onCancel={onCancel} subtext="Тест подтверждения" />
	)
	expect(screen.getByText('Тест подтверждения')).toBeInTheDocument()
	fireEvent.click(screen.getByText('Удалить'))
	expect(onConfirm).toHaveBeenCalled()
	fireEvent.click(screen.getByText('Отмена'))
	expect(onCancel).toHaveBeenCalled()
}) 