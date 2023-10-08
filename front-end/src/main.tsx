import React from "react"
import ReactDOM from "react-dom/client"
import router from "./router"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import "@/assets/styles/style.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RouterProvider router={createBrowserRouter(router)} />
	</React.StrictMode>,
)
