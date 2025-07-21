import TableActions from '@shared/Table/Actions'
import TableGeneric from '@shared/Table/Table'
import PropTypes from 'prop-types'
import { useMemo } from 'react'

function Table({ brands, loading }) {
  const columns = useMemo(() => [
    { Header: 'Бренд', accessor: 'title' },
    {
      Header: 'Действия',
      id: 'actions',
      Cell: () => <TableActions />
    }
  ], [])

  return (
    <TableGeneric
      data={brands}
      loading={loading}
      columns={columns}
      addLink="/brands/new"
      addLabel="Добавить"
      lengthId="brands_length"
      filterId="brands_filter"
    />
  )
}

Table.propTypes = {
  brands: PropTypes.array.isRequired,
  loading: PropTypes.bool,
}

export default Table

