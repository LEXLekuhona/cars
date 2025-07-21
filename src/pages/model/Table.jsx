import TableActions from '@shared/Table/Actions'
import TableGeneric from '@shared/Table/Table'
import PropTypes from 'prop-types'
import { useMemo } from 'react'

function Table({ models, loading }) {
  const columns = useMemo(() => [
    { Header: 'Модель', accessor: 'title' },
    {
      Header: 'Действия',
      id: 'actions',
      Cell: () => <TableActions />
    }
  ], [])

  return (
    <TableGeneric
      data={models}
      loading={loading}
      columns={columns}
      addLink="/models/new"
      addLabel="Добавить"
      lengthId="models_length"
      filterId="models_filter"
    />
  )
}

Table.propTypes = {
  models: PropTypes.array.isRequired,
  loading: PropTypes.bool,
}

export default Table
