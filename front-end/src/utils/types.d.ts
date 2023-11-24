type ThemeType = {
    theme: "light" | "dark" | "system";
    setTheme: (theme: ThemeType["theme"]) => void;
};

type ProfileType = {
    bio: string;
    first_name: string;
    last_name: string;
    id: number;
    friends: ProfileType[];
    picture: string;
    username: string;
    user: number;
};

type FriendRequestType = {
    created_at: Date;
    id: number;
    sender_data: Omit<
        ProfileType,
        "friends" | "user" | "first_name" | "last_name"
    >;
};

