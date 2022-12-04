import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CreatePost } from "./pages/posts/create-post";
import { Navbar } from "./components/navbar";
import { Login } from "./pages/login";
import { Main } from "./pages/posts/main";

function App() {
	return (
		<div className="App">
			<Router>
				<Navbar />
				<Routes>
					<Route path="/" element={<Main />}></Route>
					<Route path="/login" element={<Login />}></Route>
					<Route path="/create-post" element={<CreatePost />}></Route>
				</Routes>
			</Router>
		</div>
	);
}

export default App;
