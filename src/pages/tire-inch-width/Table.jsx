import TableActions from '@shared/Table/Actions'
import TableGeneric from '@shared/Table/Table'
import PropTypes from 'prop-types'
import { useMemo } from 'react'

function Table({ tireInchWidths, loading, onDelete, onCopy }) {
	const columns = useMemo(() => [
		{ Header: 'Ширина', accessor: 'title' },
		{
			Header: 'Действия',
			id: 'actions',
			Cell: ({ row }) => <TableActions onCopy={() => onCopy(row.original)} onDelete={() => onDelete(row.original.id)} />
		}
	], [onDelete, onCopy])

	return (
		<TableGeneric
			data={tireInchWidths}
			loading={loading}
			columns={columns}
			addLink="/tire-inch-width/new"
			addLabel="Добавить"
			lengthId="tire_inch_widths_length"
			filterId="tire_inch_widths_filter"
		/>
	)
}

Table.propTypes = {
	tireInchWidths: PropTypes.array.isRequired,
	loading: PropTypes.bool,
	onDelete: PropTypes.func.isRequired,
	onCopy: PropTypes.func.isRequired,
}

export default Table
