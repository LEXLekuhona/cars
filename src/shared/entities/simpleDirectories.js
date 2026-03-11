import { API_PATHS } from '@shared/config'

/**
 * Definitions for simple directories that share the same behaviour.
 * Each entry describes: route path, label, API key (from API_PATHS) and optional menu grouping.
 * 
 * ЗАКОММЕНТИРОВАНО: Старые параметры (Шины, дворники и т.д.) заменены на новую систему Properties
 */
export const SIMPLE_DIRECTORIES = [
	// Закомментированные старые параметры
	// // Tires
	// { key: 'tire-diameter', path: 'tire-diameter', label: 'Диаметр шин', apiKey: 'tireDiameter', menuGroup: 'root' },
	// { key: 'tire-metric-profile', path: 'tire-metric-profile', label: 'Профиль', apiKey: 'tireMetricProfile', menuGroup: 'tireMetric', menuLabel: 'Профиль' },
	// { key: 'tire-metric-width', path: 'tire-metric-width', label: 'Ширина', apiKey: 'tireMetricWidth', menuGroup: 'tireMetric', menuLabel: 'Ширина' },
	// { key: 'tire-inch-height', path: 'tire-inch-height', label: 'Высота', apiKey: 'tireInchHeight', menuGroup: 'tireInch', menuLabel: 'Высота' },
	// { key: 'tire-inch-width', path: 'tire-inch-width', label: 'Ширина (дюйм.)', apiKey: 'tireInchWidth', menuGroup: 'tireInch', menuLabel: 'Ширина' },
	// { key: 'tires', path: 'tires', label: 'Шины', apiKey: 'tires', menuGroup: 'root' },
	// { key: 'tires-inch', path: 'tires-inch', label: 'Шины (дюймовая)', apiKey: 'tiresInch', menuGroup: 'root' },

	// // Wheels
	// { key: 'wheels', path: 'wheels', label: 'Диски', apiKey: 'wheels', menuGroup: 'root' },
	// { key: 'wheel-width', path: 'wheel-width', label: 'Ширина дисков', apiKey: 'wheelWidth', menuGroup: 'wheels', menuLabel: 'Ширина' },
	// { key: 'wheel-diameter', path: 'wheel-diameter', label: 'Диаметр дисков', apiKey: 'wheelDiameter', menuGroup: 'wheels', menuLabel: 'Диаметр' },
	// { key: 'wheel-drilling', path: 'wheel-drilling', label: 'Сверловка дисков', apiKey: 'wheelDrilling', menuGroup: 'wheels', menuLabel: 'Сверловка' },
	// { key: 'wheel-departure', path: 'wheel-departure', label: 'Вылет дисков', apiKey: 'wheelDeparture', menuGroup: 'wheels', menuLabel: 'Вылет' },
	// { key: 'wheel-ch-diameter', path: 'wheel-ch-diameter', label: 'Диаметр ЦО', apiKey: 'wheelChDiameter', menuGroup: 'wheels', menuLabel: 'Диаметр ЦО' },
	// { key: 'wheel-dependencies', path: 'wheel-dependencies', label: 'Связь дисков', apiKey: 'wheelDependencies', menuGroup: 'wheels', menuLabel: 'Связь' },

	// // Oils
	// { key: 'oils', path: 'oils', label: 'Масла', apiKey: 'oils', menuGroup: 'root' },
	// { key: 'oil-type', path: 'oil-type', label: 'Типы масел', apiKey: 'oilType', menuGroup: 'oils', menuLabel: 'Типы' },
	// { key: 'oil-viscosity', path: 'oil-viscosity', label: 'Вязкость масел', apiKey: 'oilViscosity', menuGroup: 'oils', menuLabel: 'Вязкость' },

	// // Batteries
	// { key: 'batteries', path: 'batteries', label: 'Аккумуляторы', apiKey: 'batteries', menuGroup: 'root' },
	// { key: 'battery-capacity', path: 'battery-capacity', label: 'Емкость аккум.', apiKey: 'batteryCapacity', menuGroup: 'batteries', menuLabel: 'Емкость' },
	// { key: 'battery-starting-cur', path: 'battery-starting-cur', label: 'Пусковой ток', apiKey: 'batteryStartingCur', menuGroup: 'batteries', menuLabel: 'Пусковой ток' },
	// { key: 'battery-dimensions', path: 'battery-dimensions', label: 'Габариты аккум.', apiKey: 'batteryDimensions', menuGroup: 'batteries', menuLabel: 'Габариты' },
	// { key: 'battery-polarity', path: 'battery-polarity', label: 'Полярность аккум.', apiKey: 'batteryPolarity', menuGroup: 'batteries', menuLabel: 'Полярность' },

	// // Wipers
	// { key: 'wipers', path: 'wipers', label: 'Дворники', apiKey: 'wipers', menuGroup: 'root' },
]

export const SIMPLE_DIRECTORY_MAP = SIMPLE_DIRECTORIES.reduce((acc, entry) => {
	acc[entry.path] = entry
	return acc
}, {})

export const SIMPLE_DIRECTORY_PATHS = new Set(SIMPLE_DIRECTORIES.map((entry) => entry.path))

export const getApiPathByKey = (apiKey) => API_PATHS[apiKey]

