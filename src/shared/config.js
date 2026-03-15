// При размещении фронта на том же сервере оставьте пустым или задайте префикс API (например /api).
// Для локальной разработки с удалённым бэком задайте VITE_API_BASE_URL в .env (например http://185.239.50.252:8080).
const raw = import.meta.env.VITE_API_BASE_URL ?? ''
// Путь без ведущего / при SPA по /api/ даёт запрос api/api/... — нормализуем путь к абсолютному.
export const BASE_URL =
  raw === '' || raw.startsWith('http://') || raw.startsWith('https://') || raw.startsWith('/')
    ? raw
    : `/${raw}`

export const API_PATHS = {
  brands: '/brands',
  models: '/models',
  generations: '/generation',
  years: '/year',
  // Properties API
  propertyTypes: '/properties/property_types',
  properties: '/properties/properties',
  propertyValues: '/properties/property_values',
  // Закомментированные старые параметры
  // tireDiameter: '/tire-diameter',
  // tires: '/tires',
  // tiresInch: '/tires-inch',
  // tireMetricProfile: '/tire-metric-profile',
  // tireMetricWidth: '/tire-metric-width',
  // tireInchHeight: '/tire-inch-height',
  // tireInchWidth: '/tire-inch-width',
  // wheels: '/wheels',
  // wheelWidth: '/wheel-width',
  // wheelDiameter: '/wheel-diameter',
  // wheelDrilling: '/wheel-drilling',
  // wheelDeparture: '/wheel-departure',
  // wheelChDiameter: '/wheel-ch-diameter',
  // wheelDependencies: '/wheel-dependencies',
  // oils: '/oils',
  // oilType: '/oil-type',
  // oilViscosity: '/oil-viscosity',
  // wipers: '/wipers',
  // wipersLength: '/wipers-length',
  // batteries: '/batteries',
  // batteryCapacity: '/battery-capacity',
  // batteryStartingCur: '/battery-starting-cur',
  // batteryDimensions: '/battery-dimensions',
  // batteryPolarity: '/battery-polarity',
}

export const PAGINATION = {
  defaultPage: 1,
  defaultSize: 100,
  sizeOptions: [10, 25, 50, 100],
}

export const STORAGE_KEYS = {
  token: 'token',
  user: 'user',
}

export const UI = {
  overlayOpacity: 0.5,
  tableInfoLocale: 'ru',
} 