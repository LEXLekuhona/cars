import TableActions from '@shared/Table/Actions'
import TableGeneric from '@shared/Table/Table'
import PropTypes from 'prop-types'
import { useMemo } from 'react'

function Table({ oilViscosities, loading, onDelete, onCopy }) {
	const columns = useMemo(() => [
		{ Header: 'Вязкость', accessor: 'title' },
		{
			Header: 'Действия',
			id: 'actions',
			Cell: ({ row }) => <TableActions onCopy={() => onCopy(row.original)} onDelete={() => onDelete(row.original.id)} />
		}
	], [onDelete, onCopy])

	return (
		<TableGeneric
			data={oilViscosities}
			loading={loading}
			columns={columns}
			addLink="/oil-viscosity/new"
			addLabel="Добавить"
			lengthId="oil_viscosities_length"
			filterId="oil_viscosities_filter"
		/>
	)
}

Table.propTypes = {
	oilViscosities: PropTypes.array.isRequired,
	loading: PropTypes.bool,
	onDelete: PropTypes.func.isRequired,
	onCopy: PropTypes.func.isRequired,
}

export default Table
