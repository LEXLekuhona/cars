import PropTypes from 'prop-types'
import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useGlobalFilter, usePagination, useSortBy, useTable } from 'react-table'

function Table({ generations, loading }) {
  const columns = useMemo(() => [
    { Header: 'Название', accessor: 'title' },
    {
      Header: 'Действия',
      id: 'actions',
      Cell: () => (
        <div className="d-flex justify-content-center" style={{ gap: '4px' }}>
          <button type="button" className="btn btn-outline-success">
            <i className="nav-icon fas fa-highlighter" />
          </button>
          <button type="button" className="btn btn-outline-success">
            <i className="nav-icon fas fa-clone" />
          </button>
          <button type="button" className="btn btn-outline-danger">
            <i className="nav-icon fas fa-trash" />
          </button>
        </div>
      )
    }
  ], [])

  const {
    getTableProps, getTableBodyProps, headerGroups, prepareRow, page,
    state, setGlobalFilter, pageOptions, gotoPage, nextPage, previousPage, canNextPage, canPreviousPage,
    setPageSize,
    rows
  } = useTable(
    { columns, data: generations, initialState: { pageSize: 10 } },
    useGlobalFilter,
    useSortBy,
    usePagination
  )

  const from = page.length === 0 ? 0 : state.pageIndex * state.pageSize + 1
  const to = state.pageIndex * state.pageSize + page.length
  const total = rows.length

  return (
    <section className="content">
      <div className="container-fluid">
        <div style={{ marginBottom: '20px' }}>
          <Link to={'new'} className="btn btn-outline-success">
            <i className="fa fa-plus" aria-hidden="true"></i>
            {' Добавить'}
          </Link>
        </div>
        <div className="dataTables_wrapper no-footer">
          <div className="dataTables_length" id="generations_length">
            <label>
              Показать
              <select
                value={state.pageSize}
                onChange={e => setPageSize(Number(e.target.value))}
              >
                {[10, 25, 50, 100].map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
              записей
            </label>
          </div>
          <div className="dataTables_filter" id="generations_filter">
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
                : page.length === 0
                  ? <tr><td colSpan={columns.length}>Нет данных</td></tr>
                  : page.map((row, i) => {
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
              onClick={canPreviousPage ? () => previousPage() : undefined}
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
                      onClick={state.pageIndex !== idx ? () => gotoPage(idx) : undefined}
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
              onClick={canNextPage ? () => nextPage() : undefined}
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

Table.propTypes = {
  generations: PropTypes.array.isRequired,
}

export default Table
