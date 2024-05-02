import Gantt from "../components/Gantt/Gantt";
import "./Resources.css";
import { useState, useEffect } from "react";
import Toolbar from "./../components/Toolbar/Toolbar";
import { getData } from "../data";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import SideNav from "../components/SideNav/SideNav";

function filterTasksByType(data, types) {
	const filteredTasks = data.data.filter((task) =>
		types.includes(task.taskType)
	);
	const tasksWithoutParents = filteredTasks.map((task) => {
		const { parent, ...rest } = task;
		return rest; // Возвращаем задачи без свойства parent
	});
	return {
		...data,
		data: tasksWithoutParents,
	};
}

function Resources() {
	const [currentZoom, setZoom] = useState("Days");
	const [filteredData, setFilteredData] = useState({ data: [] }); // Состояние для хранения отфильтрованных данных

	useEffect(() => {
		const taskData = getData(); // Получаем исходные данные
		const filtered = filterTasksByType(taskData, ["resources", "worker"]); // Фильтруем данные
		console.log("Final Data to be used in Gantt:", filteredData); //
		setFilteredData(filtered); // Обновляем состояние отфильтрованными данными
	}, []);

	return (
		<div>
			<NavigationBar />
			<div className="resources-container">
				<div className="zoom-bar">
					<Toolbar zoom={currentZoom} setZoom={setZoom} />
				</div>
				<div className="resources">
					<Gantt tasks={filteredData} zoom={currentZoom} />
				</div>
			</div>
			<SideNav />
		</div>
	);
}

export default Resources;
