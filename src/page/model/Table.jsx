import PropTypes from 'prop-types'
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

function Table({ models }) {
  const tableRef = useRef(null)

  useEffect(() => {
    const $ = window.$ || window.jQuery
    if (tableRef.current && $ && $.fn.dataTable && models.length > 0) {
      if ($.fn.dataTable.isDataTable(tableRef.current)) {
        $(tableRef.current).DataTable().clear().destroy()
      }
      $(tableRef.current).DataTable({
        paging: true,
        info: true,
        lengthChange: true,
        searching: true,
        language: {
          url: '//cdn.datatables.net/plug-ins/1.12.1/i18n/ru.json'
        }
      })
    }
    return () => {
      if (tableRef.current && $ && $.fn.dataTable && $.fn.dataTable.isDataTable(tableRef.current)) {
        $(tableRef.current).DataTable().clear().destroy()
      }
    }
  }, [models])

  return (
    <section className="content">
      <div className="container-fluid">
        <div style={{ marginBottom: '20px' }}>
          <Link to={'new'} className="btn btn-outline-success">
            <i className="fa fa-plus" aria-hidden="true"></i>
            {' Добавить'}
          </Link>
        </div>
        <table ref={tableRef} className="display dataTable no-footer">
          <thead>
            <tr>
              <th className='sorting sorting_asc'>Название</th>
              <th style={{ width: '20%' }} className='sorting'>Действия</th>
            </tr>
          </thead>
          <tbody>
            {models.length === 0 ? (
              <tr><td colSpan={2}>Нет данных</td></tr>
            ) : (
              models.map((model) =>
                <tr key={model.id}>
                  <td>{model.title}</td>
                  <td>
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
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

Table.propTypes = {
  models: PropTypes.array.isRequired,
}

export default Table
