import "./Toolbar.css";

export default function Toolbar({ zoom, setZoom }) {
	// Локализация меток зума
	const zoomOptions = [
		{ label: "Часы", value: "Hours" },
		{ label: "Дни", value: "Days" },
		{ label: "Месяцы", value: "Months" },
	];

	// Создаем радио-кнопки для выбора уровня зума
	const zoomRadios = zoomOptions.map(({ label, value }) => {
		const isActive = zoom === value; // Проверяем, активна ли текущая опция
		return (
			<label
				key={value}
				className={`radio-label ${
					isActive ? "radio-label-active" : ""
				}`}
			>
				<input
					type="radio"
					checked={isActive} // Устанавливаем, активна ли кнопка
					onChange={() => setZoom(value)} // Обработчик изменения выбора
					value={value}
				/>
				{label} {/* Отображаем локализованную метку */}
			</label>
		);
	});

	// Возвращаем JSX для отображения тулбара
	return (
		<div className="tool-bar">
			<b>Сортировка: </b>
			{zoomRadios} {/* Отображаем радио-кнопки */}
		</div>
	);
}
