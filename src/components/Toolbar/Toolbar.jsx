import "./Toolbar.css";

export default function Toolbar({ zoom, setZoom }) {
	// Локализация меток зума
	const zoomOptions = [
		{ label: "Часы", value: "Hours" },
		{ label: "Дни", value: "Days" },
		{ label: "Месяцы", value: "Months" },
	];

	const zoomRadios = zoomOptions.map(({ label, value }) => {
		const isActive = zoom === value;
		return (
			<label
				key={value}
				className={`radio-label ${
					isActive ? "radio-label-active" : ""
				}`}
			>
				<input
					type="radio"
					checked={isActive}
					onChange={() => setZoom(value)}
					value={value}
				/>
				{label} {/* Отображаем локализованную метку */}
			</label>
		);
	});

	return (
		<div className="tool-bar">
			<b>Сортировка: </b>
			{zoomRadios}
		</div>
	);
}
