export const menuItems = [
    { 
		key: 'cars', 
        to: '/', 
		icon: 'fas fa-car', 
		label: 'Все автомобили', 
		exact: true 
	},
	{ 
		header: 'Справочники' 
	},
	{ 
		key: 'brands', 
		to: '/brands', 
		icon: 'fas fa-cog', 
		label: 'Марка' 
	},
	{ 
		key: 'models', 
		to: '/models', 
		icon: 'fas fa-wrench', 
		label: 'Модель' 
	},
	{ 
		key: 'generation', 
		to: '/generation', 
		icon: 'fas fa-star', 
		label: 'Поколение' 
	},
	{ 
		key: 'year', 
		to: '/year', 
		icon: 'far fa-image', 
		label: 'Год' 
	},
	{ 
		key: 'tireDiameter', 
		to: '/tire_diameter', 
		icon: 'far fa-image', 
		label: 'Диаметр шин' 
	},
	{
		key: 'tireMetric',
		label: 'Шины (метрическая)',
		icon: 'fas fa-edit',
		subMenu: [
			{ 
				key: 'profile', 
				to: '/tire_metric_profile', 
				icon: 'far fa-circle', 
				label: 'Профиль' 
			},
			{ 
				key: 'width', 
				to: '/tire_metric_width', 
				icon: 'far fa-circle', 
				label: 'Ширина' 
			},
		],
	},
	{
		key: 'tireInch',
		label: 'Шины (дюймовая)',
		icon: 'fas fa-edit',
		subMenu: [
			{ 
				key: 'height', 
				to: '/tire_inch_height', 
				icon: 'far fa-circle', 
				label: 'Высота' 
			},
			{ 
				key: 'widthInch', 
				to: '/tire_inch_width', 
				icon: 'far fa-circle', 
				label: 'Ширина' 
			},
		],
	},
	{
		key: 'wheels',
		label: 'Диски',
		icon: 'fas fa-edit',
		subMenu: [
			{ 
				key: 'widthWheel', 
				to: '/wheel_width', 
				icon: 'far fa-circle', 
				label: 'Ширина' 
			},
			{ 
				key: 'diameterWheel', 
				to: '/wheel_diameter', 
				icon: 'far fa-circle', 
				label: 'Диаметр' 
			},
			{ 
				key: 'drilling', 
				to: '/wheel_drilling', 
				icon: 'far fa-circle', 
				label: 'Сверловка' 
			},
			{ 
				key: 'departure', 
				to: '/wheel_departure', 
				icon: 'far fa-circle', 
				label: 'Вылет' 
			},
            { 
				key: 'diameter', 
				to: '/wheel_ch_diameter', 
				icon: 'far fa-circle', 
				label: 'Диаметр ЦО' 
			},
            { 
				key: 'dependencies', 
				to: '/wheel_dependencies', 
				icon: 'far fa-circle', 
				label: 'Связь' 
			},
		],
	},
    {
		key: 'oils',
		label: 'Масла',
		icon: 'fas fa-edit',
		subMenu:[
            {
                key: 'type', 
				to: '/oil_type', 
				icon: 'far fa-circle', 
				label: 'Типы'
            },
            {
                key: 'viscosity', 
				to: '/oil_viscosity', 
				icon: 'far fa-circle', 
				label: 'Вязкость'
            },
        ],
    },
    {
		key: 'wipers',
		label: 'Дворники',
		icon: 'far fa-image',
        to: '/wipers_length'
    },
    {
		key: 'batterys',
		label: 'Аккумуляторы',
		icon: 'fas fa-edit',
		subMenu:[
            {
                key: 'capacity', 
				to: '/battery_capacity', 
				icon: 'far fa-circle', 
				label: 'Емкость'
            },
            {
                key: 'starting_cur', 
				to: '/battery_starting_cur', 
				icon: 'far fa-circle', 
				label: 'Пусковой ток'
            },
            {
                key: 'dimensions', 
				to: '/battery_dimensions', 
				icon: 'far fa-circle', 
				label: 'Габариты'
            },
            {
                key: 'viscosity', 
				to: '/battery_polarity', 
				icon: 'far fa-circle', 
				label: 'Полярность'
            },
        ],
    },
    { 
		header: 'Связи параметров' 
	},
    {
		key: 'tire',
		label: 'Связь шин',
		icon: 'far fa-image',
        to: '/tire_dependencies'
    },

]