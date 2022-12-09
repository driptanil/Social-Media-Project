import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CreatePost } from "./pages/posts/create-post";
import { Navbar } from "./components/navbar";
import { Login } from "./pages/login";
import { Main } from "./pages/posts/main";
import { createContext } from "react";
import { useState } from "react";

interface AppContextInterface {
	refetch: boolean;
	setRefetch: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppContext = createContext<AppContextInterface| null>(null);

function App() {
	const [refetch, setRefetch] = useState<boolean>(true);

	return (
		<div className="App">
			<AppContext.Provider value={{ refetch, setRefetch }}>
				<Router>
					<Navbar />
					<Routes>
						<Route path="/" element={<Main />}></Route>
						<Route path="/login" element={<Login />}></Route>
						<Route
							path="/create-post"
							element={<CreatePost />}></Route>
					</Routes>
				</Router>
			</AppContext.Provider>
		</div>
	);
}

export default App;
