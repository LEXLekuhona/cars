import { useEffect, useRef, useState } from 'react'

// Глобальное состояние для отслеживания, был ли прелоадер уже скрыт
let preloaderHidden = false

function Preloader() {
	const preloaderRef = useRef(null)
	const [isHidden, setIsHidden] = useState(preloaderHidden)

	useEffect(() => {
		// Если прелоадер уже был скрыт, не рендерим его
		if (preloaderHidden) {
			return
		}

		// Убираем класс hold-transition с body через 50ms (как в AdminLTE)
		const holdTransitionTimer = setTimeout(() => {
			document.body.classList.remove('hold-transition')
		}, 50)

		const preloader = preloaderRef.current
		if (preloader) {
			// Логика как в AdminLTE: через preloadDuration (200ms) уменьшаем высоту до 0
			const timer1 = setTimeout(() => {
				// Устанавливаем height: 0 (используется transition из CSS)
				preloader.style.height = '0'

				// Через 200ms скрываем дочерние элементы
				const timer2 = setTimeout(() => {
					if (preloader.children.length > 0) {
						Array.from(preloader.children).forEach(child => {
							child.style.display = 'none'
						})
					}

					// Полностью скрываем после анимации
					const timer3 = setTimeout(() => {
						preloader.style.display = 'none'
						preloader.style.visibility = 'hidden'
						preloaderHidden = true
						setIsHidden(true)
					}, 50)

					return () => clearTimeout(timer3)
				}, 200)

				return () => clearTimeout(timer2)
			}, 200) // preloadDuration из AdminLTE

			return () => {
				clearTimeout(holdTransitionTimer)
				clearTimeout(timer1)
			}
		}

		return () => clearTimeout(holdTransitionTimer)
	}, [])

	// Не рендерим прелоадер, если он уже был скрыт
	if (isHidden || preloaderHidden) {
		return null
	}

	return (
		<>
			{/* Preloader */}
			<div ref={preloaderRef} className="preloader flex-column justify-content-center align-items-center">
				<img className="animation__wobble" src="dist/img/AdminLogo.png" alt="AdminLTELogo" height={60} width={60} />
			</div>
		</>

	)
}
export default Preloader