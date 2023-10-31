import { Navigate } from "react-router-dom";

export default function Chats() {
	const test = "ziader";
	if (test != "ziader") return <Navigate to="/accounts" />;
	return <h1>chats</h1>;
}
