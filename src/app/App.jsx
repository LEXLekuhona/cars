import Auth from '@widgets/Auth/Auth'
import Footer from '@widgets/Footer/Footer'
import Navbar from '@widgets/Navbar/Navbar'
import Preloader from '@widgets/Preloader/Preloader'
import Sidebar from '@widgets/Sidebar/Sidebar'
import Cookies from 'js-cookie'
import { useSelector } from 'react-redux'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Brands from '../page/brands/Brands'
import Generation from '../page/generation/Generation'
import Home from '../page/home/Home'
import Model from '../page/model/Model'
import NotFound from '../page/notFound/NotFound'
import Year from '../page/year/Year'

function App() {
  const token = useSelector((state) => state.auth.token) || Cookies.get('token')


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
              <Route path='brands/*' element={<Brands />} />
              <Route path='models/*' element={<Model />} />
              <Route path='generations/*' element={<Generation />} />
              <Route path='year/*' element={<Year />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
            <Footer />
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
