import { create } from "zustand";
import { persist } from "zustand/middleware";
import { dummyUserData } from "./constants";

const useTheme = create<ThemeType>()(
	persist(
		(set) => ({
			theme: "system",
			setTheme: (theme) => set(() => ({ theme })),
		}),
		{ name: "theme" },
	),
);

type useUserDataType = {
	authenticated: boolean;
} & ProfileType;
const useUserData = create<
	useUserDataType & {
		setUserData: (userData: useUserDataType) => void;
	}
>()((set) => ({
	authenticated: false,
	...dummyUserData,
	setUserData: (userData: useUserDataType) => set(() => userData),
}));
export { useTheme, useUserData };
