import { Navigate } from "react-router-dom"

export default function Chats() {
	const test = "ziad"
	if (test == "ziad") return <Navigate to="/accounts" />
	return <h1>chats</h1>
}
