import TableActions from '@shared/Table/Actions'
import TableGeneric from '@shared/Table/Table'
import PropTypes from 'prop-types'
import { useMemo } from 'react'

function Table({ batteryPolarities, loading, onDelete, onCopy }) {
	const columns = useMemo(() => [
		{ Header: 'Полярность', accessor: 'title' },
		{
			Header: 'Действия',
			id: 'actions',
			Cell: ({ row }) => <TableActions onCopy={() => onCopy(row.original)} onDelete={() => onDelete(row.original.id)} />
		}
	], [onDelete, onCopy])

	return (
		<TableGeneric
			data={batteryPolarities}
			loading={loading}
			columns={columns}
			addLink="/battery-polarity/new"
			addLabel="Добавить"
			lengthId="battery_polarities_length"
			filterId="battery_polarities_filter"
		/>
	)
}

Table.propTypes = {
	batteryPolarities: PropTypes.array.isRequired,
	loading: PropTypes.bool,
	onDelete: PropTypes.func.isRequired,
	onCopy: PropTypes.func.isRequired,
}

export default Table
