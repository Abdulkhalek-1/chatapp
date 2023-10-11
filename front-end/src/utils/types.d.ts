type ThemeType = {
	theme: "light" | "dark" | "system"
	setTheme: (theme: ThemeType["theme"]) => void
}
