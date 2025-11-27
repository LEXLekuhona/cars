import TableActions from '@shared/Table/Actions'
import TableGeneric from '@shared/Table/Table'
import PropTypes from 'prop-types'
import { useMemo } from 'react'

function Table({ oilTypes, loading, onDelete, onCopy }) {
	const columns = useMemo(() => [
		{ Header: 'Типы', accessor: 'title' },
		{
			Header: 'Действия',
			id: 'actions',
			Cell: ({ row }) => <TableActions onCopy={() => onCopy(row.original)} onDelete={() => onDelete(row.original.id)} />
		}
	], [onDelete, onCopy])

	return (
		<TableGeneric
			data={oilTypes}
			loading={loading}
			columns={columns}
			addLink="/oil-type/new"
			addLabel="Добавить"
			lengthId="oil_types_length"
			filterId="oil_types_filter"
		/>
	)
}

Table.propTypes = {
	oilTypes: PropTypes.array.isRequired,
	loading: PropTypes.bool,
	onDelete: PropTypes.func.isRequired,
	onCopy: PropTypes.func.isRequired,
}

export default Table
