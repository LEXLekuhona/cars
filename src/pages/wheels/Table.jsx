import TableActions from '@shared/Table/Actions'
import TableGeneric from '@shared/Table/Table'
import PropTypes from 'prop-types'
import { useMemo } from 'react'

function Table({ wheels, loading, onDelete, onCopy }) {
	const columns = useMemo(() => [
		{ Header: 'Диски', accessor: 'title' },
		{
			Header: 'Действия',
			id: 'actions',
			Cell: ({ row }) => <TableActions onCopy={() => onCopy(row.original)} onDelete={() => onDelete(row.original.id)} />
		}
	], [onDelete, onCopy])

	return (
		<TableGeneric
			data={wheels}
			loading={loading}
			columns={columns}
			addLink="/wheels/new"
			addLabel="Добавить"
			lengthId="wheels_length"
			filterId="wheels_filter"
		/>
	)
}

Table.propTypes = {
	wheels: PropTypes.array.isRequired,
	loading: PropTypes.bool,
	onDelete: PropTypes.func.isRequired,
	onCopy: PropTypes.func.isRequired,
}

export default Table
