import TableActions from '@shared/Table/Actions'
import TableGeneric from '@shared/Table/Table'
import PropTypes from 'prop-types'
import { useMemo } from 'react'

function Table({ wipers, loading, onDelete, onCopy }) {
	const columns = useMemo(() => [
		{ Header: 'Дворники', accessor: 'title' },
		{
			Header: 'Действия',
			id: 'actions',
			Cell: ({ row }) => <TableActions onCopy={() => onCopy(row.original)} onDelete={() => onDelete(row.original.id)} />
		}
	], [onDelete, onCopy])

	return (
		<TableGeneric
			data={wipers}
			loading={loading}
			columns={columns}
			addLink="/wipers/new"
			addLabel="Добавить"
			lengthId="wipers_length"
			filterId="wipers_filter"
		/>
	)
}

Table.propTypes = {
	wipers: PropTypes.array.isRequired,
	loading: PropTypes.bool,
	onDelete: PropTypes.func.isRequired,
	onCopy: PropTypes.func.isRequired,
}

export default Table
