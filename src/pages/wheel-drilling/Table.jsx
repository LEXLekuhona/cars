import TableActions from '@shared/Table/Actions'
import TableGeneric from '@shared/Table/Table'
import PropTypes from 'prop-types'
import { useMemo } from 'react'

function Table({ wheelDrillings, loading, onDelete, onCopy }) {
	const columns = useMemo(() => [
		{ Header: 'Сверловка', accessor: 'title' },
		{
			Header: 'Действия',
			id: 'actions',
			Cell: ({ row }) => <TableActions onCopy={() => onCopy(row.original)} onDelete={() => onDelete(row.original.id)} />
		}
	], [onDelete, onCopy])

	return (
		<TableGeneric
			data={wheelDrillings}
			loading={loading}
			columns={columns}
			addLink="/wheel-drilling/new"
			addLabel="Добавить"
			lengthId="wheel_drillings_length"
			filterId="wheel_drillings_filter"
		/>
	)
}

Table.propTypes = {
	wheelDrillings: PropTypes.array.isRequired,
	loading: PropTypes.bool,
	onDelete: PropTypes.func.isRequired,
	onCopy: PropTypes.func.isRequired,
}

export default Table
