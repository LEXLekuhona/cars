import TableActions from '@shared/Table/Actions'
import TableGeneric from '@shared/Table/Table'
import PropTypes from 'prop-types'
import { useMemo } from 'react'

function Table({ tiresInch, loading, onDelete, onCopy }) {
	const columns = useMemo(() => [
		{ Header: 'Шины (дюймовая)', accessor: 'title' },
		{
			Header: 'Действия',
			id: 'actions',
			Cell: ({ row }) => <TableActions onCopy={() => onCopy(row.original)} onDelete={() => onDelete(row.original.id)} />
		}
	], [onDelete, onCopy])

	return (
		<TableGeneric
			data={tiresInch}
			loading={loading}
			columns={columns}
			addLink="/tires-inch/new"
			addLabel="Добавить"
			lengthId="tires_inch_length"
			filterId="tires_inch_filter"
		/>
	)
}

Table.propTypes = {
	tiresInch: PropTypes.array.isRequired,
	loading: PropTypes.bool,
	onDelete: PropTypes.func.isRequired,
	onCopy: PropTypes.func.isRequired,
}

export default Table
