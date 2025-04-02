import { Link } from 'react-router-dom'

function Table({ generations }) {

  return (
    <section className="content">
      <div className="container-fluid">
        <div style={{ marginBottom: '20px' }}>
          <Link to="" className="btn btn-outline-success">
            <i className="fa fa-plus" aria-hidden="true"></i>
            {' Добавить'}
          </Link>
        </div>
        <div className='dataTables_wrapper no-footer'>
          <div className='dataTables_length' id="table_id_length">
            <label>
              Показать
              <select name="table_id_length">
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={5}>5</option>
                <option value={10}>10</option>
              </select>
              записей
            </label>
          </div>

          <div className='dataTables_filter'>
            <label>
              Поиск:
              <input type='search' placeholder="Что ищете?" />
            </label>
          </div>

          <table className="display dataTable no-footer">
            <thead>
              <tr>
                <th className='sorting sorting_asc' rowSpan={1} colSpan={1}>
                  Модели
                </th>
                <th style={{ width: '20%' }} className='sorting' rowSpan={1} colSpan={1}>
                  Действия
                </th>
              </tr>
            </thead>
            <tbody>
              {
                generations.map((generation) =>
                  <tr key={generation.id}>
                    <td>{generation.title}</td>
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
                )
              }
            </tbody>
          </table>

          <div className='dataTables_info' role='status'>
            Записи с 1 до 10 из {generations.length} записей
          </div>
          <div className='dataTables_paginate paging_simple_numbers'>
            <a className='paginate_button previous disabled' data-dt-idx='0' tabIndex={-1}>Предыдущая</a>
            <span>
              <a className="paginate_button current" data-dt-idx='1' tabIndex={0}>1</a>
              <a className="paginate_button " data-dt-idx='1' tabIndex={1}>2</a>
            </span>
            <a className='paginate_button next'>Следующая</a>
          </div>
        </div>
      </div>
    </section>
  )
}
export default Table
