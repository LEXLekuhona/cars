import TableActions from '@shared/Table/Actions'
import TableGeneric from '@shared/Table/Table'
import PropTypes from 'prop-types'
import { useMemo } from 'react'

function Table({ tires, loading, onDelete, onCopy }) {
	const columns = useMemo(() => [
		{ Header: 'Шины', accessor: 'title' },
		{
			Header: 'Действия',
			id: 'actions',
			Cell: ({ row }) => <TableActions onCopy={() => onCopy(row.original)} onDelete={() => onDelete(row.original.id)} />
		}
	], [onDelete, onCopy])

	return (
		<TableGeneric
			data={tires}
			loading={loading}
			columns={columns}
			addLink="/tires/new"
			addLabel="Добавить"
			lengthId="tires_length"
			filterId="tires_filter"
		/>
	)
}

Table.propTypes = {
	tires: PropTypes.array.isRequired,
	loading: PropTypes.bool,
	onDelete: PropTypes.func.isRequired,
	onCopy: PropTypes.func.isRequired,
}

export default Table
