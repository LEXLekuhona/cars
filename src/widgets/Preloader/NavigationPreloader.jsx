import { useEffect, useRef, useState } from 'react'

function NavigationPreloader({ show }) {
	const preloaderRef = useRef(null)
	const [shouldRender, setShouldRender] = useState(show)
	const hideTimerRef = useRef(null)

	useEffect(() => {
		const preloader = preloaderRef.current
		
		if (show) {
			// Показываем прелоадер
			if (preloader) {
				preloader.style.display = 'flex'
				preloader.style.visibility = 'visible'
				preloader.style.height = '100vh'
				if (preloader.children.length > 0) {
					Array.from(preloader.children).forEach(child => {
						child.style.display = 'block'
					})
				}
			}
			setShouldRender(true)
		} else if (shouldRender && preloader) {
			// Скрываем прелоадер с анимацией как в AdminLTE
			if (hideTimerRef.current) {
				clearTimeout(hideTimerRef.current)
			}
			
			// Сразу начинаем скрывать прелоадер (без задержки)
			if (preloader) {
				preloader.style.height = '0'
				
				// Через 200ms скрываем дочерние элементы
				setTimeout(() => {
					if (preloader && preloader.children.length > 0) {
						Array.from(preloader.children).forEach(child => {
							child.style.display = 'none'
						})
					}
					
					// Полностью скрываем после анимации
					setTimeout(() => {
						if (preloader) {
							preloader.style.display = 'none'
							preloader.style.visibility = 'hidden'
						}
						setShouldRender(false)
					}, 50)
				}, 200)
			}
		}

		return () => {
			if (hideTimerRef.current) {
				clearTimeout(hideTimerRef.current)
			}
		}
	}, [show, shouldRender])

	if (!shouldRender) {
		return null
	}

	return (
		<div 
			ref={preloaderRef}
			className="preloader flex-column justify-content-center align-items-center"
			style={{
				transition: 'height 200ms linear'
			}}
		>
			<img className="animation__wobble" src="dist/img/AdminLogo.png" alt="AdminLTELogo" height={60} width={60} />
		</div>
	)
}

export default NavigationPreloader
