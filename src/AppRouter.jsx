import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import GanttView from "./GanttView/GanttView";
import App from "./App";
import Resources from "./Resources/Resources";

function AppRouter() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<App />} />
				<Route path="/ganttview" element={<GanttView />} />
				<Route path="/resources" element={<Resources />} />
			</Routes>
		</Router>
	);
}

export default AppRouter;
