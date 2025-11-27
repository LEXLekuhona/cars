import NewYear from '@/pages/year/new-year/NewYear'
import Batteries from '@pages/batteries/Batteries'
import NewBatteries from '@pages/batteries/new-batteries/NewBatteries'
import BatteryCapacity from '@pages/battery-capacity/BatteryCapacity'
import NewBatteryCapacity from '@pages/battery-capacity/new-battery-capacity/NewBatteryCapacity'
import BatteryDimensions from '@pages/battery-dimensions/BatteryDimensions'
import NewBatteryDimensions from '@pages/battery-dimensions/new-battery-dimensions/NewBatteryDimensions'
import BatteryPolarity from '@pages/battery-polarity/BatteryPolarity'
import NewBatteryPolarity from '@pages/battery-polarity/new-battery-polarity/NewBatteryPolarity'
import BatteryStartingCur from '@pages/battery-starting-cur/BatteryStartingCur'
import NewBatteryStartingCur from '@pages/battery-starting-cur/new-battery-starting-cur/NewBatteryStartingCur'
import Brands from '@pages/brands/Brands'
import NewBrands from '@pages/brands/new-brands/Newbrands'
import Generation from '@pages/generation/Generation'
import NewGeneration from '@pages/generation/new-generation/NewGeneration'
import Home from '@pages/home/Home'
import Model from '@pages/model/Model'
import NewModel from '@pages/model/new-model/NewModel'
import NotFound from '@pages/notFound/NotFound'
import NewOilType from '@pages/oil-type/new-oil-type/NewOilType'
import OilType from '@pages/oil-type/OilType'
import NewOilViscosity from '@pages/oil-viscosity/new-oil-viscosity/NewOilViscosity'
import OilViscosity from '@pages/oil-viscosity/OilViscosity'
import NewOils from '@pages/oils/new-oils/NewOils'
import Oils from '@pages/oils/Oils'
import NewTireDiameter from '@pages/tire-diameter/new-tire-diameter/NewTireDiameter'
import TireDiameter from '@pages/tire-diameter/TireDiameter'
import NewTireInchHeight from '@pages/tire-inch-height/new-tire-inch-height/NewTireInchHeight'
import TireInchHeight from '@pages/tire-inch-height/TireInchHeight'
import NewTireInchWidth from '@pages/tire-inch-width/new-tire-inch-width/NewTireInchWidth'
import TireInchWidth from '@pages/tire-inch-width/TireInchWidth'
import NewTireMetricProfile from '@pages/tire-metric-profile/new-tire-metric-profile/NewTireMetricProfile'
import TireMetricProfile from '@pages/tire-metric-profile/TireMetricProfile'
import NewTireMetricWidth from '@pages/tire-metric-width/new-tire-metric-width/NewTireMetricWidth'
import TireMetricWidth from '@pages/tire-metric-width/TireMetricWidth'
import NewTiresInch from '@pages/tires-inch/new-tires-inch/NewTiresInch'
import TiresInch from '@pages/tires-inch/TiresInch'
import NewTires from '@pages/tires/new-tires/NewTires'
import Tires from '@pages/tires/Tires'
import NewWheelChDiameter from '@pages/wheel-ch-diameter/new-wheel-ch-diameter/NewWheelChDiameter'
import WheelChDiameter from '@pages/wheel-ch-diameter/WheelChDiameter'
import NewWheelDeparture from '@pages/wheel-departure/new-wheel-departure/NewWheelDeparture'
import WheelDeparture from '@pages/wheel-departure/WheelDeparture'
import NewWheelDependencies from '@pages/wheel-dependencies/new-wheel-dependencies/NewWheelDependencies'
import WheelDependencies from '@pages/wheel-dependencies/WheelDependencies'
import NewWheelDiameter from '@pages/wheel-diameter/new-wheel-diameter/NewWheelDiameter'
import WheelDiameter from '@pages/wheel-diameter/WheelDiameter'
import NewWheelDrilling from '@pages/wheel-drilling/new-wheel-drilling/NewWheelDrilling'
import WheelDrilling from '@pages/wheel-drilling/WheelDrilling'
import NewWheelWidth from '@pages/wheel-width/new-wheel-width/NewWheelWidth'
import WheelWidth from '@pages/wheel-width/WheelWidth'
import NewWheels from '@pages/wheels/new-wheels/NewWheels'
import Wheels from '@pages/wheels/Wheels'
import NewWipers from '@pages/wipers/new-wipers/NewWipers'
import Wipers from '@pages/wipers/Wipers'
import Year from '@pages/year/Year'
import { STORAGE_KEYS } from '@shared/config'
import Auth from '@widgets/Auth/Auth'
import Navbar from '@widgets/Navbar/Navbar'
import Preloader from '@widgets/Preloader/Preloader'
import Sidebar from '@widgets/Sidebar/Sidebar'
import Cookies from 'js-cookie'
import { useSelector } from 'react-redux'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

const PROTECTED_ROUTES = [
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

  // Tires
  { path: 'tire-diameter', element: <TireDiameter /> },
  { path: 'tire-diameter/new', element: <NewTireDiameter /> },
  { path: 'tire-metric-profile', element: <TireMetricProfile /> },
  { path: 'tire-metric-profile/new', element: <NewTireMetricProfile /> },
  { path: 'tire-metric-width', element: <TireMetricWidth /> },
  { path: 'tire-metric-width/new', element: <NewTireMetricWidth /> },
  { path: 'tire-inch-height', element: <TireInchHeight /> },
  { path: 'tire-inch-height/new', element: <NewTireInchHeight /> },
  { path: 'tire-inch-width', element: <TireInchWidth /> },
  { path: 'tire-inch-width/new', element: <NewTireInchWidth /> },
  { path: 'tires', element: <Tires /> },
  { path: 'tires/new', element: <NewTires /> },
  { path: 'tires-inch', element: <TiresInch /> },
  { path: 'tires-inch/new', element: <NewTiresInch /> },

  // Wheels
  { path: 'wheels', element: <Wheels /> },
  { path: 'wheels/new', element: <NewWheels /> },
  { path: 'wheel-width', element: <WheelWidth /> },
  { path: 'wheel-width/new', element: <NewWheelWidth /> },
  { path: 'wheel-diameter', element: <WheelDiameter /> },
  { path: 'wheel-diameter/new', element: <NewWheelDiameter /> },
  { path: 'wheel-drilling', element: <WheelDrilling /> },
  { path: 'wheel-drilling/new', element: <NewWheelDrilling /> },
  { path: 'wheel-departure', element: <WheelDeparture /> },
  { path: 'wheel-departure/new', element: <NewWheelDeparture /> },
  { path: 'wheel-ch-diameter', element: <WheelChDiameter /> },
  { path: 'wheel-ch-diameter/new', element: <NewWheelChDiameter /> },
  { path: 'wheel-dependencies', element: <WheelDependencies /> },
  { path: 'wheel-dependencies/new', element: <NewWheelDependencies /> },

  // Oils
  { path: 'oils', element: <Oils /> },
  { path: 'oils/new', element: <NewOils /> },
  { path: 'oil-type', element: <OilType /> },
  { path: 'oil-type/new', element: <NewOilType /> },
  { path: 'oil-viscosity', element: <OilViscosity /> },
  { path: 'oil-viscosity/new', element: <NewOilViscosity /> },

  // Wipers
  { path: 'wipers', element: <Wipers /> },
  { path: 'wipers/new', element: <NewWipers /> },

  // Batteries
  { path: 'batteries', element: <Batteries /> },
  { path: 'batteries/new', element: <NewBatteries /> },
  { path: 'battery-capacity', element: <BatteryCapacity /> },
  { path: 'battery-capacity/new', element: <NewBatteryCapacity /> },
  { path: 'battery-starting-cur', element: <BatteryStartingCur /> },
  { path: 'battery-starting-cur/new', element: <NewBatteryStartingCur /> },
  { path: 'battery-dimensions', element: <BatteryDimensions /> },
  { path: 'battery-dimensions/new', element: <NewBatteryDimensions /> },
  { path: 'battery-polarity', element: <BatteryPolarity /> },
  { path: 'battery-polarity/new', element: <NewBatteryPolarity /> },
]

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
