export default function ConfirmEmail() {
	return (
		<>
			<div className="w-full h-full grid place-items-center px-2 bg-white">
				<div className="w-[min(100%,24rem)] h-fit shadow-lg rounded-lg p-4">
					<h1 className="w-full text-4xl font-bold mb-4">
						verify your email address
					</h1>
					<p className="text-gray-500 mb-2">
						we've sent an email to you for verification,
						follow the link provided to finalize the signup
						process, if you don't see the verification email
						in your main inbox, check your spam folder, please
						contact us if you don't receive the verification
						email within a few minutes
					</p>
				</div>
			</div>
		</>
	)
}
