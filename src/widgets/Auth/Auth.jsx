import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { login } from "../../features/auth/authSlice"


function Auth() {
    document.body.className = ''
    document.title = 'CarsDB | Вход'

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const status = useSelector((state) => state.auth.status)


    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(login({username, password}))
        .then((action) => {
            if(action.type === 'auth/login/fulfilled'){
                navigate('/brands')
            }
        })
    }

    return (
        <div className='hold-transition login-page'>
            <div className="login-box">
                <div className="login-logo">
                    <b>Cars</b>DB
                </div>
                {/* /.login-logo */}
                <div className="card">
                    <div className="card-body login-card-body">
                        <p className="login-box-msg">Вход в систему</p>
                        
                        <form onSubmit={handleSubmit}>
                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Логин"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-envelope" />
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Пароль"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock" />
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3">
                                {/* /.col */}
                                <div className="">
                                    <button type="submit"
                                        className="btn btn-primary btn-block"
                                        disabled={status ==='loading'}
                                    >
                                        {status === 'loading' ? 'Загрузка' : 'Войти'}
                                    </button>
                                </div>
                                {/* /.col */}
                            </div>
                        </form>
                    </div>
                    {/* /.login-card-body */}
                </div>
            </div>
        </div>

    )
}
export default Auth