import React, { useEffect, useRef } from "react";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
import { gantt } from "dhtmlx-gantt";

const TableGantt = ({ data }) => {
	const ganttContainer = useRef(null);

	useEffect(() => {
		if (!data || !ganttContainer.current) {
			console.log(
				"Data is not ready or the Gantt container is not mounted"
			);
			return; // Предотвращаем инициализацию, если данные или контейнер не готовы
		}

		gantt.config.layout = {
			css: "gantt_container",
			cols: [
				{
					width: 800, // или любая другая ширина, которая вам нужна
					min_width: 300,
					rows: [
						{
							view: "grid",
							scrollX: "gridScroll",
							scrollable: true,
							scrollY: "scrollVer",
						},
					],
				},
			],
		};

		gantt.init(ganttContainer.current);
		gantt.parse({ data: data.data, links: data.links });

		// Настройка колонок
		gantt.config.columns = [
			{
				name: "text",
				label: "Tasks",
				tree: true,
				width: "*",
				resize: true,
			},
			{
				name: "deviation",
				label: "Deviation",
				align: "center",
				width: 80,
			},
			{ name: "priority", label: "Priority", align: "center", width: 80 },
			{ name: "percent", label: "Percent", align: "center", width: 80 },
			{ name: "quantity", label: "Quantity", align: "center", width: 80 },
			{
				name: "unitPrice",
				label: "Unit Price",
				align: "center",
				width: 80,
			},
			{ name: "dce", label: "DCE", align: "center", width: 80 },
		];

		// Очистка при размонтировании компонента
		return () => {
			gantt.clearAll();
		};
	}, [data]);

	return (
		<div
			ref={ganttContainer}
			style={{ width: "100%", height: "600px" }}
		></div>
	);
};

export default TableGantt;
