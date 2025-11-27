import TableActions from '@shared/Table/Actions'
import TableGeneric from '@shared/Table/Table'
import PropTypes from 'prop-types'
import { useMemo } from 'react'

function Table({ batteryStartingCurs, loading, onDelete, onCopy }) {
	const columns = useMemo(() => [
		{ Header: 'Пусковой ток', accessor: 'title' },
		{
			Header: 'Действия',
			id: 'actions',
			Cell: ({ row }) => <TableActions onCopy={() => onCopy(row.original)} onDelete={() => onDelete(row.original.id)} />
		}
	], [onDelete, onCopy])

	return (
		<TableGeneric
			data={batteryStartingCurs}
			loading={loading}
			columns={columns}
			addLink="/battery-starting-cur/new"
			addLabel="Добавить"
			lengthId="battery_starting_curs_length"
			filterId="battery_starting_curs_filter"
		/>
	)
}

Table.propTypes = {
	batteryStartingCurs: PropTypes.array.isRequired,
	loading: PropTypes.bool,
	onDelete: PropTypes.func.isRequired,
	onCopy: PropTypes.func.isRequired,
}

export default Table
