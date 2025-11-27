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
		to: '/tire-diameter', 
		icon: 'far fa-image', 
		label: 'Диаметр шин' 
	},
	{
		key: 'tireMetric',
		label: 'Шины',
		icon: 'fas fa-edit',
		subMenu: [
			{ 
				key: 'profile', 
				to: '/tire-metric-profile', 
				icon: 'far fa-circle', 
				label: 'Профиль' 
			},
			{ 
				key: 'width', 
				to: '/tire-metric-width', 
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
				to: '/tire-inch-height', 
				icon: 'far fa-circle', 
				label: 'Высота' 
			},
			{ 
				key: 'widthInch', 
				to: '/tire-inch-width', 
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
				to: '/wheel-width', 
				icon: 'far fa-circle', 
				label: 'Ширина' 
			},
			{ 
				key: 'diameterWheel', 
				to: '/wheel-diameter', 
				icon: 'far fa-circle', 
				label: 'Диаметр' 
			},
			{ 
				key: 'drilling', 
				to: '/wheel-drilling', 
				icon: 'far fa-circle', 
				label: 'Сверловка' 
			},
			{ 
				key: 'departure', 
				to: '/wheel-departure', 
				icon: 'far fa-circle', 
				label: 'Вылет' 
			},
            { 
				key: 'diameter', 
				to: '/wheel-ch-diameter', 
				icon: 'far fa-circle', 
				label: 'Диаметр ЦО' 
			},
            { 
				key: 'dependencies', 
				to: '/wheel-dependencies', 
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
				to: '/oil-type', 
				icon: 'far fa-circle', 
				label: 'Типы'
            },
            {
                key: 'viscosity', 
				to: '/oil-viscosity', 
				icon: 'far fa-circle', 
				label: 'Вязкость'
            },
        ],
    },
    {
		key: 'wipers',
		label: 'Дворники',
		icon: 'far fa-image',
        to: '/wipers'
    },
    {
		key: 'batterys',
		label: 'Аккумуляторы',
		icon: 'fas fa-edit',
		subMenu:[
            {
                key: 'capacity', 
				to: '/battery-capacity', 
				icon: 'far fa-circle', 
				label: 'Емкость'
            },
            {
                key: 'starting_cur', 
				to: '/battery-starting-cur', 
				icon: 'far fa-circle', 
				label: 'Пусковой ток'
            },
            {
                key: 'dimensions', 
				to: '/battery-dimensions', 
				icon: 'far fa-circle', 
				label: 'Габариты'
            },
            {
                key: 'viscosity', 
				to: '/battery-polarity', 
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