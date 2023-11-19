import { useUserData } from "@/store";
import { Navigate } from "react-router-dom";

export default function Chats() {
  const { authenticated, loading } = useUserData((store) => store);
  if (loading) if (authenticated) return <Navigate to="/accounts" />;
  return <h1>chats</h1>;
}
