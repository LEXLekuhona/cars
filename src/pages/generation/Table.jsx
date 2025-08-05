import TableActions from '@shared/Table/Actions'
import TableGeneric from '@shared/Table/Table'
import PropTypes from 'prop-types'
import { useMemo } from 'react'

function Table({ generations, loading, onDelete, onCopy }) {
  const columns = useMemo(() => [
    { Header: 'Поколение', accessor: 'title' },
    {
      Header: 'Действия',
      id: 'actions',
      Cell: ({ row }) => <TableActions onCopy={() => onCopy(row.original)} onDelete={() => onDelete(row.original.id)} />
    }
  ], [onDelete, onCopy])

  return (
    <TableGeneric
      data={generations}
      loading={loading}
      columns={columns}
      addLink="/generation/new"
      addLabel="Добавить"
      lengthId="generations_length"
      filterId="generations_filter"
    />
  )
}

Table.propTypes = {
  generations: PropTypes.array.isRequired,
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
