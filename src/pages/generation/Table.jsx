import TableActions from '@shared/Table/Actions'
import TableGeneric from '@shared/Table/Table'
import PropTypes from 'prop-types'
import { useMemo } from 'react'

function Table({ generations, loading }) {
  const columns = useMemo(() => [
    { Header: 'Поколение', accessor: 'title' },
    {
      Header: 'Действия',
      id: 'actions',
      Cell: () => <TableActions />
    }
  ], [])

  return (
    <TableGeneric
      data={generations}
      loading={loading}
      columns={columns}
      addLink="/generations/new"
      addLabel="Добавить"
      lengthId="generations_length"
      filterId="generations_filter"
    />
  )
}

Table.propTypes = {
  generations: PropTypes.array.isRequired,
  loading: PropTypes.bool,
}

export default Table
