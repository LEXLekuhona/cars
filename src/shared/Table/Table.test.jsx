import { render, screen } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import TableGeneric from './Table'

const columns = [
	{ Header: 'Имя', accessor: 'name' },
	{ Header: 'Возраст', accessor: 'age' },
]
const data = [
	{ name: 'Иван', age: 30 },
	{ name: 'Мария', age: 25 },
]

test('renders table with data', () => {
	render(
		<MemoryRouter>
			<TableGeneric data={data} columns={columns} loading={false} addLink="" addLabel="Добавить" />
		</MemoryRouter>
	)
	expect(screen.getByText('Имя')).toBeInTheDocument()
	expect(screen.getByText('Иван')).toBeInTheDocument()
	expect(screen.getByText('Мария')).toBeInTheDocument()
}) 