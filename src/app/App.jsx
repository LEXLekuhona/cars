import NewYear from '@/pages/year/new-year/NewYear'
import Brands from '@pages/brands/Brands'
import NewBrands from '@pages/brands/new-brands/Newbrands'
import Generation from '@pages/generation/Generation'
import NewGeneration from '@pages/generation/new-generation/NewGeneration'
import Home from '@pages/home/Home'
import Model from '@pages/model/Model'
import NewModel from '@pages/model/new-model/NewModel'
import NotFound from '@pages/notFound/NotFound'
import SimpleDirectoryForm from '@pages/simple-directory/SimpleDirectoryForm'
import SimpleDirectoryPage from '@pages/simple-directory/SimpleDirectoryPage'
import Year from '@pages/year/Year'
import { STORAGE_KEYS } from '@shared/config'
import { SIMPLE_DIRECTORIES } from '@shared/entities/simpleDirectories'
import Auth from '@widgets/Auth/Auth'
import Navbar from '@widgets/Navbar/Navbar'
import Preloader from '@widgets/Preloader/Preloader'
import Sidebar from '@widgets/Sidebar/Sidebar'
import Cookies from 'js-cookie'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

const BASE_ROUTES = [
  // Base
  { path: '/', element: <Home /> },
  { path: 'brands', element: <Brands /> },
  { path: 'brands/new', element: <NewBrands /> },
  { path: 'models', element: <Model /> },
  { path: 'models/new', element: <NewModel /> },
  { path: 'generation', element: <Generation /> },
  { path: 'generation/new', element: <NewGeneration /> },
  { path: 'year', element: <Year /> },
  { path: 'year/new', element: <NewYear /> },
]

const SIMPLE_ROUTES = SIMPLE_DIRECTORIES.flatMap((entry) => ([
  { path: entry.path, element: <SimpleDirectoryPage config={entry} /> },
  { path: `${entry.path}/new`, element: <SimpleDirectoryForm config={entry} /> }
]))

const PROTECTED_ROUTES = [...BASE_ROUTES, ...SIMPLE_ROUTES]

function App() {
  const token = useSelector((state) => state.auth.token) || Cookies.get(STORAGE_KEYS.token)

  useEffect(() => {
    if (token) {
      // Устанавливаем нужные классы для body после авторизации
      document.body.className = 'hold-transition dark-mode sidebar-mini layout-fixed layout-navbar-fixed layout-footer-fixed'
    }
  }, [token])

  return (
    <BrowserRouter>
      {
        token ? (
          <div className="wrapper">
            <Preloader />
            <Navbar />
            <Sidebar />
            <Routes>
              {PROTECTED_ROUTES.map((route) => (
                <Route key={route.path} path={route.path} element={route.element} />
              ))}
              <Route path='*' element={<NotFound />} />
            </Routes>
          </div>
        ) : (
          <Routes>
            <Route path='/' element={<Navigate to="login" replace />} />
            <Route path='login' element={<Auth />} />
          </Routes>
        )
      }
    </BrowserRouter>
  )
}

export default App
