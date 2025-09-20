import NewYear from '@/pages/year/new-year/NewYear'
import Brands from '@pages/brands/Brands'
import NewBrands from '@pages/brands/new-brands/Newbrands'
import Generation from '@pages/generation/Generation'
import NewGeneration from '@pages/generation/new-generation/NewGeneration'
import Home from '@pages/home/Home'
import Model from '@pages/model/Model'
import NewModel from '@pages/model/new-model/NewModel'
import NotFound from '@pages/notFound/NotFound'
import Year from '@pages/year/Year'
import { STORAGE_KEYS } from '@shared/config'
import Auth from '@widgets/Auth/Auth'
import Navbar from '@widgets/Navbar/Navbar'
import Preloader from '@widgets/Preloader/Preloader'
import Sidebar from '@widgets/Sidebar/Sidebar'
import Cookies from 'js-cookie'
import { useSelector } from 'react-redux'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

function App() {
  const token = useSelector((state) => state.auth.token) || Cookies.get(STORAGE_KEYS.token)


  return (
    <BrowserRouter>
      {
        token ? (
          <div className="wrapper">
            <Preloader />
            <Navbar />
            <Sidebar />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='brands' element={<Brands />} />
              <Route path='brands/new' element={<NewBrands />} />
              <Route path='models' element={<Model />} />
              <Route path='models/new' element={<NewModel />} />
              <Route path='generation' element={<Generation />} />
              <Route path='generation/new' element={<NewGeneration />} />
              <Route path='year' element={<Year />} />
              <Route path='year/new' element={<NewYear />} />
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
