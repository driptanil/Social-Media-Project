import { Link } from "react-router-dom";

import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

import {
	HiOutlineLogin,
	HiOutlineLogout,
	HiHome,
	HiPlus,
} from "react-icons/hi";

export const Navbar = () => {
	const [user] = useAuthState(auth);
	const signUserOut = async () => {
		user?.delete();
		await signOut(auth);
	};

	return (
		<div className="m-auto my-3 flex max-w-3xl flex-row items-center justify-center text-xl">
			<Link
				to="/"
				className="m-1 rounded-lg border-b-2 border-pink-500/30 bg-neutral-900 px-6 py-2 text-pink-300 shadow-lg shadow-pink-500/40 transition-all delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:border-cyan-500/30 hover:text-cyan-300 hover:shadow-cyan-500/40 max-sm:px-4">
				<HiHome className="my-1 mx-1 inline -translate-y-0.5 pr-1 text-2xl " />
				<p className="ml-2 inline text-sm max-md:hidden">Home</p>
			</Link>

			{!user ? (
				<Link
					to="/login"
					className="mx-2 my-1 rounded-lg border-b-2 border-pink-500/30 bg-neutral-900 px-6 py-2 text-pink-300 shadow-lg shadow-pink-500/40 transition-all delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:border-cyan-500/30 hover:text-cyan-300 hover:shadow-cyan-500/40 max-sm:px-4">
					<HiOutlineLogin className="my-1 mx-1 inline -translate-y-0.5 pr-1 text-2xl" />
					<p className="ml-2 inline text-sm">Login</p>
				</Link>
			) : (
				<Link
					to="/create-post"
					className="mx-2 my-1 rounded-lg border-b-2 border-pink-500/30 bg-neutral-900 px-6 py-2 text-pink-300 shadow-lg shadow-pink-500/40 transition-all delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:border-cyan-500/30 hover:text-cyan-300 hover:shadow-cyan-500/40 max-sm:px-4">
					<HiPlus className="my-1 mx-1 inline -translate-y-0.5 pr-1 text-2xl " />
					<p className="ml-2 inline text-sm max-md:hidden">Post</p>
				</Link>
			)}

			{user && (
				<div className="ml-auto flex items-center justify-center">
					<p className=" -mr-2 rounded-lg bg-neutral-900 p-3 text-sm tracking-wider text-cyan-200 shadow-lg shadow-cyan-500/40 max-sm:text-xs">
						{user?.displayName}
					</p>
					<img
						src={user?.photoURL || ""}
						alt="profile pic"
						className="mr-5 w-14 rounded-3xl border-4 border-neutral-900/50 text-cyan-200 opacity-80 shadow-lg shadow-cyan-500/40 max-sm:mr-2"
					/>

					<button
						onClick={signUserOut}
						className="m-1 rounded-lg border-b-2 border-cyan-500/30 bg-neutral-900 px-6 py-2 text-cyan-300 shadow-lg shadow-cyan-500/40 transition-all delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:border-pink-500/30 hover:text-pink-300 hover:shadow-pink-500/40 max-sm:px-4">
						<HiOutlineLogout className="my-1 mx-1 inline -translate-y-0.5 pr-1 text-2xl" />
						<p className="ml-2 inline text-sm max-md:hidden">
							Logout
						</p>
					</button>
				</div>
			)}
		</div>
	);
};
