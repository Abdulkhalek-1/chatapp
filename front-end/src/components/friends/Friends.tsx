import Friend from "./components/Friend"

export default function Friends() {
	return (
		<div className="friends-container flex flex-col gap-1 w-full h-full overflow-x-auto p-3 px-4">
			<Friend to="ziad" name="ziad hatem" img="/imgs/profile.jpeg" />
			<Friend
				to="mohammed"
				name="mohamed hossam"
				img="/imgs/profile.jpeg"
			/>
			<Friend
				notifications={90}
				to="abd el5alek"
				name="عبد الخالق"
				img="/imgs/profile.jpeg"
			/>
		</div>
	)
}
