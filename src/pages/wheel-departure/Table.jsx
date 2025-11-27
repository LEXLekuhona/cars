import TableActions from '@shared/Table/Actions'
import TableGeneric from '@shared/Table/Table'
import PropTypes from 'prop-types'
import { useMemo } from 'react'

function Table({ wheelDepartures, loading, onDelete, onCopy }) {
	const columns = useMemo(() => [
		{ Header: 'Вылет', accessor: 'title' },
		{
			Header: 'Действия',
			id: 'actions',
			Cell: ({ row }) => <TableActions onCopy={() => onCopy(row.original)} onDelete={() => onDelete(row.original.id)} />
		}
	], [onDelete, onCopy])

	return (
		<TableGeneric
			data={wheelDepartures}
			loading={loading}
			columns={columns}
			addLink="/wheel-departure/new"
			addLabel="Добавить"
			lengthId="wheel_departures_length"
			filterId="wheel_departures_filter"
		/>
	)
}

Table.propTypes = {
	wheelDepartures: PropTypes.array.isRequired,
	loading: PropTypes.bool,
	onDelete: PropTypes.func.isRequired,
	onCopy: PropTypes.func.isRequired,
}

export default Table
