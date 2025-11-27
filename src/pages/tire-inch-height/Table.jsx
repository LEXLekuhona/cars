import TableActions from '@shared/Table/Actions'
import TableGeneric from '@shared/Table/Table'
import PropTypes from 'prop-types'
import { useMemo } from 'react'

function Table({ tireInchHeights, loading, onDelete, onCopy }) {
	const columns = useMemo(() => [
		{ Header: 'Высота', accessor: 'title' },
		{
			Header: 'Действия',
			id: 'actions',
			Cell: ({ row }) => <TableActions onCopy={() => onCopy(row.original)} onDelete={() => onDelete(row.original.id)} />
		}
	], [onDelete, onCopy])

	return (
		<TableGeneric
			data={tireInchHeights}
			loading={loading}
			columns={columns}
			addLink="/tire-inch-height/new"
			addLabel="Добавить"
			lengthId="tire_inch_heights_length"
			filterId="tire_inch_heights_filter"
		/>
	)
}

Table.propTypes = {
	tireInchHeights: PropTypes.array.isRequired,
	loading: PropTypes.bool,
	onDelete: PropTypes.func.isRequired,
	onCopy: PropTypes.func.isRequired,
}

export default Table
