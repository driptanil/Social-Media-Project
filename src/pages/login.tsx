import { auth, provider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";

// react icons
import { BsGoogle } from "react-icons/bs";
import { GiKeyLock } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

export const Login = () => {
	const navigate = useNavigate();

	const signInWithGoogle = async () => {
		await signInWithPopup(auth, provider);
		// console.log(result);

		navigate("/");
	};

	return (
		<div className="m-auto my-10 flex max-w-xl flex-col rounded-xl bg-gradient-to-b from-neutral-800/40 to-cyan-900/10 p-5 max-md:w-3/4">
			<div className="m-auto my-6 text-cyan-300">
				<GiKeyLock className=" my-1 mr-3 inline -translate-y-0.5 pr-1 text-3xl" />
				<p className="inline text-xl">Authentication</p>
			</div>
			<button
				onClick={signInWithGoogle}
				className="flex items-center justify-center rounded-md bg-neutral-900 p-2 text-cyan-300 shadow-lg shadow-cyan-500/40 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:text-white hover:shadow-white/20">
				<BsGoogle className=" my-1 mr-3 inline pr-1 text-2xl" />
				<p className="inline text-sm">Sign in with Google</p>
			</button>
		</div>
	);
};
