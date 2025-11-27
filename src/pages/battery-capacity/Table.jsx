import TableActions from '@shared/Table/Actions'
import TableGeneric from '@shared/Table/Table'
import PropTypes from 'prop-types'
import { useMemo } from 'react'

function Table({ batteryCapacities, loading, onDelete, onCopy }) {
	const columns = useMemo(() => [
		{ Header: 'Емкость', accessor: 'title' },
		{
			Header: 'Действия',
			id: 'actions',
			Cell: ({ row }) => <TableActions onCopy={() => onCopy(row.original)} onDelete={() => onDelete(row.original.id)} />
		}
	], [onDelete, onCopy])

	return (
		<TableGeneric
			data={batteryCapacities}
			loading={loading}
			columns={columns}
			addLink="/battery-capacity/new"
			addLabel="Добавить"
			lengthId="battery_capacities_length"
			filterId="battery_capacities_filter"
		/>
	)
}

Table.propTypes = {
	batteryCapacities: PropTypes.array.isRequired,
	loading: PropTypes.bool,
	onDelete: PropTypes.func.isRequired,
	onCopy: PropTypes.func.isRequired,
}

export default Table
