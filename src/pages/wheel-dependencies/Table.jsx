import TableActions from '@shared/Table/Actions'
import TableGeneric from '@shared/Table/Table'
import PropTypes from 'prop-types'
import { useMemo } from 'react'

function Table({ wheelDependencies, loading, onDelete, onCopy }) {
	const columns = useMemo(() => [
		{ Header: 'Связь', accessor: 'title' },
		{
			Header: 'Действия',
			id: 'actions',
			Cell: ({ row }) => <TableActions onCopy={() => onCopy(row.original)} onDelete={() => onDelete(row.original.id)} />
		}
	], [onDelete, onCopy])

	return (
		<TableGeneric
			data={wheelDependencies}
			loading={loading}
			columns={columns}
			addLink="/wheel-dependencies/new"
			addLabel="Добавить"
			lengthId="wheel_dependencies_length"
			filterId="wheel_dependencies_filter"
		/>
	)
}

Table.propTypes = {
	wheelDependencies: PropTypes.array.isRequired,
	loading: PropTypes.bool,
	onDelete: PropTypes.func.isRequired,
	onCopy: PropTypes.func.isRequired,
}

export default Table
