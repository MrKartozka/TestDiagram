import React, { useEffect, useRef } from "react";
import { gantt } from "dhtmlx-gantt";

import "dhtmlx-gantt/codebase/dhtmlxgantt.css";

export default function Gantt({ tasks, zoom }) {
	gantt.config.lightbox_additional_height = 150;
	gantt.templates.lightbox_header = function () {
		let headerStyle = "text-align:center; cursor:default;";
		return "<div style='" + headerStyle + "'>Информация</div>";
	};

	gantt.config.lightbox.sections = [
		{
			name: "description",
			height: 38,
			map_to: "text",
			type: "textarea",
			focus: true,
		},
		{
			name: "product",
			height: 30,
			type: "textarea",
			map_to: "product",
		},
		{
			name: "codeOperation",
			height: 30,
			type: "textarea",
			map_to: "codeOperation",
		},
		{
			name: "startDate",
			height: 30,
			type: "duration",
			time_format: ["%d", "%m", "%Y"],
			map_to: "start_date",
			single_date: true,
			readonly: true,
		},
		{
			name: "endDate",
			height: 30,
			type: "duration",
			time_format: ["%d", "%m", "%Y"],
			map_to: "end_date",
			single_date: true,
			readonly: true,
		},
		{
			name: "cost",
			height: 30,
			type: "textarea",
			map_to: "cost",
		},
	];

	gantt.locale.labels.section_product = "Product";
	gantt.locale.labels.section_startDate = "Start date";
	gantt.locale.labels.section_endDate = "End date";
	gantt.locale.labels.section_codeOperation = "codeOperation";
	gantt.locale.labels.section_cost = "cost";

	gantt.config.buttons_left = []; // Удалите кнопки с левой стороны
	gantt.config.buttons_right = ["gantt_cancel_btn"]; // Добавляет стандартную кнопку закрытия справа

	gantt.config.columns = [
		{ name: "text", label: "Task name", tree: true, width: "*" },
		{ name: "start_date", label: "Start time", align: "center" },
		{ name: "duration", label: "Duration", align: "center" },
		// Removes the '+' button by not including the 'add' column.
	];
	gantt.attachEvent('onBeforeLightbox', function (task_id) {
		const task = gantt.getTask(task_id);
		switch (task.taskType) {
			case 'order':
				gantt.config.lightbox.sections = [
					{ name: "description", height: 38, map_to: "text", type: "textarea", focus: true },
					{ name: "product", height: 22, map_to: "product", type: "textarea" },
					{ name: "cost", height: 22, map_to: "cost", type: "textarea" }
				];
				break;
			case 'operation':
				gantt.config.lightbox.sections = [
					{ name: "codeOperation", height: 30, type: "textarea", map_to: "codeOperation" }
				];
				break;
			case 'resources':
				gantt.config.lightbox.sections = [
					// Добавьте здесь секции для ресурсов
				];
				break;
			default:
				gantt.config.lightbox.sections = [
					{ name: "description", height: 38, map_to: "text", type: "textarea", focus: true },
					{ name: "time", type: "duration", map_to: "auto", label: "Time" }
				];
		}
		gantt.resetLightbox();
		return true; // Возвращаем true, чтобы lightbox открылся
	})
	const container = useRef(null);

	const initZoom = () => {
		gantt.ext.zoom.init({
			levels: [
				{
					name: "Hours",
					scale_height: 60,
					min_column_width: 30,
					scales: [
						{ unit: "day", step: 1, format: "%d %M" },
						{ unit: "hour", step: 1, format: "%H" },
					],
				},
				{
					name: "Days",
					scale_height: 60,
					min_column_width: 70,
					scales: [
						{ unit: "week", step: 1, format: "Week #%W" },
						{ unit: "day", step: 1, format: "%d %M" },
					],
				},
				{
					name: "Months",
					scale_height: 60,
					min_column_width: 70,
					scales: [
						{ unit: "month", step: 1, format: "%F" },
						{ unit: "week", step: 1, format: "#%W" },
					],
				},
			],
		});
	};

	const setZoom = (value) => {
		if (!gantt.ext.zoom.getLevels()) {
			initZoom();
		}
		gantt.ext.zoom.setLevel(value);
	};

	useEffect(() => {
		try {
			gantt.init(container.current);
			gantt.parse(tasks);
			setZoom(zoom);
		} catch (error) {
			console.error("Failed to initialize Gantt chart: ", error);
		}
	}, [zoom, tasks]);
	// Add tasks to dependency array if tasks data can change over time

	return (
		<div ref={container} style={{ width: "100%", height: "500px" }}></div>
	); // Ensure a minimum height is set
}
