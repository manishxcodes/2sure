import { RouterProvider } from "react-router-dom"
import router from "./routes"
import { SessionProvider } from "./context/session-context"

function App() {

	return (
		<div className="">
			<div>
				<SessionProvider>
					<RouterProvider router={router} />
				</SessionProvider>
			</div>
		</div>
	)
}

export default App
