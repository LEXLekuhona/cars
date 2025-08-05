import TableActions from '@shared/Table/Actions'
import TableGeneric from '@shared/Table/Table'
import PropTypes from 'prop-types'
import { useMemo } from 'react'

function Table({ models, loading, onDelete, onCopy }) {
  const columns = useMemo(() => [
    { Header: 'Модель', accessor: 'title' },
    {
      Header: 'Действия',
      id: 'actions',
      Cell: ({ row }) => <TableActions onCopy={() => onCopy(row.original)} onDelete={() => onDelete(row.original.id)} />
    }
  ], [onDelete, onCopy])

  return (
    <TableGeneric
      data={models}
      loading={loading}
      columns={columns}
      addLink="/model/new"
      addLabel="Добавить"
      lengthId="models_length"
      filterId="models_filter"
    />
  )
}

Table.propTypes = {
  models: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  onDelete: PropTypes.func.isRequired,
  onCopy: PropTypes.func.isRequired,
}

// Для кастомной ячейки действий
TableActions.propTypes = {
  onCopy: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  row: PropTypes.shape({
    original: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  }),
}

export default Table
