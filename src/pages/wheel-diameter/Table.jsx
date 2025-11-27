import TableActions from '@shared/Table/Actions'
import TableGeneric from '@shared/Table/Table'
import PropTypes from 'prop-types'
import { useMemo } from 'react'

function Table({ wheelDiameters, loading, onDelete, onCopy }) {
	const columns = useMemo(() => [
		{ Header: 'Диаметр', accessor: 'title' },
		{
			Header: 'Действия',
			id: 'actions',
			Cell: ({ row }) => <TableActions onCopy={() => onCopy(row.original)} onDelete={() => onDelete(row.original.id)} />
		}
	], [onDelete, onCopy])

	return (
		<TableGeneric
			data={wheelDiameters}
			loading={loading}
			columns={columns}
			addLink="/wheel-diameter/new"
			addLabel="Добавить"
			lengthId="wheel_diameters_length"
			filterId="wheel_diameters_filter"
		/>
	)
}

Table.propTypes = {
	wheelDiameters: PropTypes.array.isRequired,
	loading: PropTypes.bool,
	onDelete: PropTypes.func.isRequired,
	onCopy: PropTypes.func.isRequired,
}

export default Table
