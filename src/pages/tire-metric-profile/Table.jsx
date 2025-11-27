import TableActions from '@shared/Table/Actions'
import TableGeneric from '@shared/Table/Table'
import PropTypes from 'prop-types'
import { useMemo } from 'react'

function Table({ tireMetricProfiles, loading, onDelete, onCopy }) {
	const columns = useMemo(() => [
		{ Header: 'Профиль', accessor: 'title' },
		{
			Header: 'Действия',
			id: 'actions',
			Cell: ({ row }) => <TableActions onCopy={() => onCopy(row.original)} onDelete={() => onDelete(row.original.id)} />
		}
	], [onDelete, onCopy])

	return (
		<TableGeneric
			data={tireMetricProfiles}
			loading={loading}
			columns={columns}
			addLink="/tire-metric-profile/new"
			addLabel="Добавить"
			lengthId="tire_metric_profiles_length"
			filterId="tire_metric_profiles_filter"
		/>
	)
}

Table.propTypes = {
	tireMetricProfiles: PropTypes.array.isRequired,
	loading: PropTypes.bool,
	onDelete: PropTypes.func.isRequired,
	onCopy: PropTypes.func.isRequired,
}

export default Table
