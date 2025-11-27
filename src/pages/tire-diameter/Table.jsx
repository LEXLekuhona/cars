import TableActions from '@shared/Table/Actions'
import TableGeneric from '@shared/Table/Table'
import PropTypes from 'prop-types'
import { useMemo } from 'react'

function Table({ tireDiameters, loading, onDelete, onCopy }) {
  const columns = useMemo(() => [
    { Header: 'Диаметр шин', accessor: 'title' },
    {
      Header: 'Действия',
      id: 'actions',
      Cell: ({ row }) => <TableActions onCopy={() => onCopy(row.original)} onDelete={() => onDelete(row.original.id)} />
    }
  ], [onDelete, onCopy])

  return (
    <TableGeneric
      data={tireDiameters}
      loading={loading}
      columns={columns}
      addLink="/tire-diameter/new"
      addLabel="Добавить"
      lengthId="tire_diameters_length"
      filterId="tire_diameters_filter"
    />
  )
}

Table.propTypes = {
  tireDiameters: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  onDelete: PropTypes.func.isRequired,
  onCopy: PropTypes.func.isRequired,
}

export default Table