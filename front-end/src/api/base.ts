import getCookie from "@/utils/getCookie"
import axios from "axios"

const csrf = getCookie("csrftoken")

const baseAPI = axios.create({
	baseURL: `${import.meta.env.VITE_API_URL}/api/v1`,
	withCredentials: true,
	headers: {
		"X-CSRFToken": csrf,
	},
})

export default baseAPI
