import { PAGINATION } from '@shared/config'
import PropTypes from 'prop-types'
import { useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useGlobalFilter, usePagination, useSortBy, useTable } from 'react-table'

function TableGeneric({ data, loading, columns, addLink, addLabel, lengthId, filterId, page, size, onPageChange, onSizeChange }) {
  const memoColumns = useMemo(() => columns, [columns])

  const {
    getTableProps, getTableBodyProps, headerGroups, prepareRow, page: tablePage,
    state, setGlobalFilter, pageOptions, gotoPage, setPageSize, canNextPage, canPreviousPage
  } = useTable(
    {
      columns: memoColumns,
      data,
      initialState: { pageIndex: (page || 1) - 1, pageSize: size || 10 },
      manualPagination: !!page,
      pageCount: Math.ceil(data.length / (size || 10)),
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  )

  // Синхронизируем page/size из пропсов с внутренним состоянием react-table
  useEffect(() => {
    if (typeof page === 'number' && state.pageIndex !== page - 1) {
      gotoPage(page - 1)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])
  useEffect(() => {
    if (typeof size === 'number' && state.pageSize !== size) {
      setPageSize(size)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size])

  const from = tablePage.length === 0 ? 0 : (state.pageIndex * state.pageSize + 1)
  const to = state.pageIndex * state.pageSize + tablePage.length
  const total = data.length

  const handlePageChange = (newPage) => {
    if (onPageChange) onPageChange(newPage + 1)
    gotoPage(newPage)
  }
  const handleSizeChange = (e) => {
    const newSize = Number(e.target.value)
    if (onSizeChange) onSizeChange(newSize)
    setPageSize(newSize)
  }

  return (
    <section className="content">
      <div className="container-fluid">
        <div style={{ marginBottom: '20px' }}>
          <Link to={addLink} className="btn btn-outline-success">
            <i className="fa fa-plus" aria-hidden="true"></i>
            {' '}{addLabel}
          </Link>
        </div>
        <div className="dataTables_wrapper no-footer">
          <div className="dataTables_length" id={lengthId}>
            <label>
              Показать
              <select
                value={state.pageSize}
                onChange={handleSizeChange}
              >
                {PAGINATION.sizeOptions.map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
              записей
            </label>
          </div>
          <div className="dataTables_filter" id={filterId}>
            <label>
              Поиск:
              <input
                type="search"
                value={state.globalFilter || ''}
                onChange={e => setGlobalFilter(e.target.value)}
                placeholder="Что ищете?"
              />
            </label>
          </div>
          <table {...getTableProps()} className="display dataTable no-footer" style={{ width: '100%' }}>
            <thead>
              {headerGroups.map((headerGroup, i) => (
                <tr {...headerGroup.getHeaderGroupProps()} key={i}>
                  {headerGroup.headers.map((column, j) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      key={j}
                      style={j === 1 ? { width: '20%' } : {}}
                      className={
                        column.isSorted
                          ? column.isSortedDesc
                            ? 'sorting_desc'
                            : 'sorting_asc'
                          : 'sorting'
                      }
                    >
                      {column.render('Header')}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {loading
                ? null
                : tablePage.length === 0
                  ? <tr><td colSpan={columns.length}>Нет данных</td></tr>
                  : tablePage.map((row, i) => {
                    prepareRow(row)
                    return (
                      <tr {...row.getRowProps()} key={i}>
                        {row.cells.map((cell, j) => (
                          <td {...cell.getCellProps()} key={j}>{cell.render('Cell')}</td>
                        ))}
                      </tr>
                    )
                  })
              }
            </tbody>
          </table>
          <div className="dataTables_info" role="status">
            Показано {from} по {to} из {total} записей
          </div>
          <div className="dataTables_paginate paging_simple_numbers">
            <a
              className={`paginate_button previous${!canPreviousPage ? ' disabled' : ''}`}
              onClick={canPreviousPage ? () => handlePageChange(state.pageIndex - 1) : undefined}
              tabIndex={0}
              role="button"
              aria-disabled={!canPreviousPage}
            >
              Предыдущая
            </a>
            <span>
              {(() => {
                const total = pageOptions.length
                const current = state.pageIndex
                const pages = []
                if (total <= 7) {
                  for (let i = 0; i < total; i++) {
                    pages.push(i)
                  }
                } else {
                  pages.push(0)
                  if (current > 3) pages.push('start-ellipsis')
                  for (let i = Math.max(1, current - 1); i <= Math.min(total - 2, current + 1); i++) {
                    pages.push(i)
                  }
                  if (current < total - 4) pages.push('end-ellipsis')
                  pages.push(total - 1)
                }
                return pages.map((idx, i) => {
                  if (idx === 'start-ellipsis' || idx === 'end-ellipsis') {
                    return <span key={idx + i} className="paginate_button ellipsis" style={{ pointerEvents: 'none', userSelect: 'none' }}>...</span>
                  }
                  return (
                    <a
                      key={idx}
                      className={`paginate_button${state.pageIndex === idx ? ' current' : ''}`}
                      onClick={state.pageIndex !== idx ? () => handlePageChange(idx) : undefined}
                      tabIndex={0}
                      role="button"
                      aria-current={state.pageIndex === idx}
                      aria-disabled={state.pageIndex === idx}
                    >
                      {idx + 1}
                    </a>
                  )
                })
              })()}
            </span>
            <a
              className={`paginate_button next${!canNextPage ? ' disabled' : ''}`}
              onClick={canNextPage ? () => handlePageChange(state.pageIndex + 1) : undefined}
              tabIndex={0}
              role="button"
              aria-disabled={!canNextPage}
            >
              Следующая
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

TableGeneric.propTypes = {
  data: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  columns: PropTypes.array.isRequired,
  addLink: PropTypes.string.isRequired,
  addLabel: PropTypes.string.isRequired,
  lengthId: PropTypes.string,
  filterId: PropTypes.string,
  page: PropTypes.number,
  size: PropTypes.number,
  onPageChange: PropTypes.func,
  onSizeChange: PropTypes.func,
}

export default TableGeneric
