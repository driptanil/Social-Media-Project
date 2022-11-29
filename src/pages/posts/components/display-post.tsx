import { BsCardHeading, BsTrash } from "react-icons/bs";
import { MdOutlineDescription } from "react-icons/md";
import { BiTime, BiUserPin } from "react-icons/bi";
import { TbBinary } from "react-icons/tb";
// import { Likes } from "./likes";
// import { Dislikes } from "./dislikes";
import { LikesDislikes } from "./likes-dislikes";
import { DeletePost } from "./delete-post";
import { Post } from "../../../config/firebase";

interface UserPost {
	post: Post;
}

export const DisplayPost = (props: UserPost) => {
	const { post } = props;

	return (
		<div className="mt-5 rounded-lg bg-gradient-to-b from-cyan-900/20 to-pink-900/10 p-5 pl-4 pr-7 max-sm:mx-auto max-sm:w-96">
			<div className="my-2 flex flex-row rounded-lg bg-neutral-900/70 shadow-lg shadow-cyan-500/40 ">
				<BsCardHeading className="mx-4 h-10 w-5 text-xl text-cyan-400/50" />
				<h2 className="mr-auto inline  p-2 text-xl text-cyan-200 first-letter:font-serif">
					{post.title}
				</h2>
				<button className="p-2 text-red-300">
					<BsTrash />
				</button>
			</div>
			<div className="mt-4 flex flex-row items-center justify-center rounded-lg bg-neutral-900/70 shadow-lg shadow-pink-500/40">
				<MdOutlineDescription className="mx-4 w-10 text-xl text-pink-400/50" />
				<p className="mr-auto inline p-4 leading-8 text-pink-200/80 first-letter:float-left first-letter:mr-1 first-letter:font-serif first-letter:text-6xl">
					{post.description}
				</p>
			</div>
			<div className="flex flex-row">
				<div className="-my-2 flex translate-y-2 flex-row">
					<LikesDislikes post={post} />
				</div>
				<div className="ml-auto mr-2 mt-4 flex flex-col rounded-lg">
					<div className="flex flex-row">
						<BiUserPin className="mx-2 ml-auto text-white/60" />
						<p className="text-xs text-white/60">
							@{post.username}
						</p>
					</div>
					<div className="flex flex-row">
						<BiTime className="mx-2 ml-auto text-neutral-500" />
						<p className="text-xs text-neutral-500">{post.date}</p>
					</div>
				</div>
			</div>
			<div className="-my-5 flex translate-x-60 -translate-y-60 -rotate-90 flex-row items-center pt-3 max-sm:translate-x-44 max-sm:-translate-y-44">
				<TbBinary className="mr-2 text-xl text-red-300/30" />
				<p className="inline font-mono text-xs tracking-widest text-red-300/30">
					{post.id}
				</p>
			</div>
		</div>
	);
};
