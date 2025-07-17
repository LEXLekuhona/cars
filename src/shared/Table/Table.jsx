import { Link } from 'react-router-dom'

function Table({ brands }) {
  
  return (
    <section className="content">
      <div className="container-fluid">
      <div style={{marginBottom: '20px'}}>
        <Link to="/brands/new/" className="btn btn-outline-success">
          <i className="fa fa-plus" aria-hidden="true"></i>
          Добавить
        </Link>
      </div>
        <table className="display dataTable ">
          <thead>
            <tr>
              <th className='sorting sorting_asc'>Бренд</th>
              <th style={{ width: '20%' }} className='sorting'>Действия</th>
            </tr>
          </thead>
          <tbody>
            {
              brands.map((brand) => 
                <tr key={brand.id}>
                  <td>{brand.title}</td>
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
      </div>
    </section>
  )
}
export default Table
