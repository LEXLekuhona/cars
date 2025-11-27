import TableActions from '@shared/Table/Actions'
import TableGeneric from '@shared/Table/Table'
import PropTypes from 'prop-types'
import { useMemo } from 'react'

function Table({ batteries, loading, onDelete, onCopy }) {
	const columns = useMemo(() => [
		{ Header: 'Аккумуляторы', accessor: 'title' },
		{
			Header: 'Действия',
			id: 'actions',
			Cell: ({ row }) => <TableActions onCopy={() => onCopy(row.original)} onDelete={() => onDelete(row.original.id)} />
		}
	], [onDelete, onCopy])

	return (
		<TableGeneric
			data={batteries}
			loading={loading}
			columns={columns}
			addLink="/batteries/new"
			addLabel="Добавить"
			lengthId="batteries_length"
			filterId="batteries_filter"
		/>
	)
}

Table.propTypes = {
	batteries: PropTypes.array.isRequired,
	loading: PropTypes.bool,
	onDelete: PropTypes.func.isRequired,
	onCopy: PropTypes.func.isRequired,
}

export default Table
