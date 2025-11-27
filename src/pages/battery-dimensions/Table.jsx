import TableActions from '@shared/Table/Actions'
import TableGeneric from '@shared/Table/Table'
import PropTypes from 'prop-types'
import { useMemo } from 'react'

function Table({ batteryDimensions, loading, onDelete, onCopy }) {
	const columns = useMemo(() => [
		{ Header: 'Габариты', accessor: 'title' },
		{
			Header: 'Действия',
			id: 'actions',
			Cell: ({ row }) => <TableActions onCopy={() => onCopy(row.original)} onDelete={() => onDelete(row.original.id)} />
		}
	], [onDelete, onCopy])

	return (
		<TableGeneric
			data={batteryDimensions}
			loading={loading}
			columns={columns}
			addLink="/battery-dimensions/new"
			addLabel="Добавить"
			lengthId="battery_dimensions_length"
			filterId="battery_dimensions_filter"
		/>
	)
}

Table.propTypes = {
	batteryDimensions: PropTypes.array.isRequired,
	loading: PropTypes.bool,
	onDelete: PropTypes.func.isRequired,
	onCopy: PropTypes.func.isRequired,
}

export default Table
