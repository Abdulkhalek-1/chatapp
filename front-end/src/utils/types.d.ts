type ThemeType = {
  theme: "light" | "dark" | "system";
  setTheme: (theme: ThemeType["theme"]) => void;
};

type FriendType = {
  name: string;
  img: string;
  id: string;
  notifications: boolean;
  status: "do not disturb" | "online" | "offline";
  archive: boolean;
};
