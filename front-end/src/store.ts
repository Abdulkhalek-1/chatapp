import { create } from "zustand";
import { persist } from "zustand/middleware";

const useTheme = create<ThemeType>()(
	persist(
		(set) => ({
			theme: "system",
			setTheme: (theme) => set(() => ({ theme })),
		}),
		{ name: "theme" },
	),
);

export { useTheme };
