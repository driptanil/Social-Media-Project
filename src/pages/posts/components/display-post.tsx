import { LikesDislikes } from "./likes-dislikes";
import { DeletePost } from "./delete-post";
import { auth, Post } from "../../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Variants, motion } from "framer-motion";

interface UserPost {
	post: Post;
}

export const DisplayPost = (props: UserPost) => {
	const [user] = useAuthState(auth);
	const { post } = props;
	const owner: boolean = post.userId === user?.uid;

	const profilePicPopOut: Variants = {
		offscreen: {
			y: 100,
			opacity: 0,
			rotate: -15,
		},
		onscreen: {
			y: 0,
			opacity: 1,
			rotate: 0,
			transition: {
				type: "spring",
				bounce: 0.4,
				duration: 1,
			},
		},
	};

	const postCardPopOut: Variants = {
		offscreen: {
			y: -100,
			opacity: 0,
			rotate: +15,
		},
		onscreen: {
			y: 10,
			opacity: 1,
			rotate: 0,
			transition: {
				type: "spring",
				bounce: 0.4,
				duration: 1,
			},
		},
	};

	const glowPopOut: Variants = {
		offscreen: {
			x: -100,
			scale: 0,
		},
		onscreen: {
			scale: 1,
			transition: {
				type: "spring",
				bounce: 0.4,
				duration: 3,
			},
		},
	};

	const profilePicGlowPopOut: Variants = {
		offscreen: {
			scale: 0,
		},
		onscreen: {
			scale: 1,
			transition: {
				type: "spring",
				bounce: 0.4,
				duration: 3,
			},
		},
	};

	return (
		<motion.div
			className="relative mt-10 flex items-center max-md:flex-col max-md:items-center"
			initial="offscreen"
			whileInView="onscreen"
			viewport={{ once: true, amount: 0.8 }}>
			<motion.div
				className="max-md:t z-20 my-4 -mr-14 h-44 w-40 rounded-full rounded-br bg-cyan-700/10 p-3 pb-1 drop-shadow-2xl max-md:mr-52 max-md:-mb-20"
				variants={profilePicPopOut}>
				<motion.div variants={profilePicGlowPopOut} className="absolute top-0 h-40 w-40 rounded-full rounded-br bg-cyan-400/30 opacity-100 blur-xl"></motion.div>
				<img
					src={post.userPic + "=s300-c"}
					className="w-40 rounded-full rounded-br opacity-70"
					alt="profile pic"></img>
				<p className="ml-3 w-32 pt-1 text-right text-xs font-light text-white">
					@{post.username}
				</p>
			</motion.div>
			<motion.div
				className="-ml-14 rounded-lg bg-slate-400/5 p-3 pl-36 shadow-xl shadow-slate-100/5 backdrop-blur-xl max-md:ml-0 max-md:-mt-10 max-md:w-80 max-md:pl-6"
				variants={postCardPopOut}>
				<p className="ml-auto text-right text-xs max-md:mr-2 max-md:text-right">
					{post.date}
				</p>
				<h2 className="py-3 pr-6 text-2xl max-md:my-5 max-md:ml-32 max-md:text-right">
					{post.title}
				</h2>
				<p className="mr-4 text-sm font-light tracking-wider max-md:my-4 max-md:mt-8 max-md:text-right">
					{post.description}
				</p>
				<div className="flex">
					<LikesDislikes post={post} />
					{owner && (
						<div className="ml-auto">
							<DeletePost post={post} />
						</div>
					)}
				</div>
				<p className="text-right text-xs text-neutral-500">{post.id}</p>
			</motion.div>
			<motion.div
				variants={glowPopOut}
				className="absolute right-0 bottom-0 z-0 h-24 w-24 -translate-x-1/2 rounded-full bg-pink-300 blur-3xl max-md:bottom-0 max-md:-translate-x-2/3"></motion.div>
		</motion.div>
	);
};
