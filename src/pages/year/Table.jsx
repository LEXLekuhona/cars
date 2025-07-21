import TableActions from '@shared/Table/Actions'
import TableGeneric from '@shared/Table/Table'
import PropTypes from 'prop-types'
import { useMemo } from 'react'

function Table({ generations, loading }) {
  const columns = useMemo(() => [
    { Header: 'Год', accessor: 'year_before' },
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
      addLink="/year/new"
      addLabel="Добавить"
      lengthId="years_length"
      filterId="years_filter"
    />
  )
}

Table.propTypes = {
  generations: PropTypes.array.isRequired,
  loading: PropTypes.bool,
}

export default Table
