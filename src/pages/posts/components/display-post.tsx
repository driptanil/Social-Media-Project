import { LikesDislikes } from "./likes-dislikes";
import { DeletePost } from "./delete-post";
import { auth, Post } from "../../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

interface UserPost {
	post: Post;
}

export const DisplayPost = (props: UserPost) => {
	
	const [user] = useAuthState(auth);
	const { post } = props;
	const owner: boolean = post.userId === user?.uid;

	return (
		<div className="mt-5 flex items-center max-md:flex-col max-md:items-center">
			<div className="max-md:t my-4 -mr-14 h-44 w-40 rounded-full rounded-br bg-cyan-700/30 p-3 pb-1 max-md:mr-52 max-md:-mb-20">
				<img
					src={post.userPic}
					className="w-40 rounded-full rounded-br" alt="profile pic"></img>
				<p className="ml-3 w-32 pt-1 text-right text-xs font-light text-white">
					@{post.username}
				</p>
			</div>
			<div className="-ml-14 rounded-lg bg-slate-400/5 p-3 pl-36 max-md:ml-0 max-md:-mt-10 max-md:w-80 max-md:pl-6">
				<p className="ml-auto text-right text-xs max-md:mr-2 max-md:text-right">
					{post.date}
				</p>
				<h2 className="py-3 pr-6 text-2xl max-md:my-5 max-md:text-right">
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
			</div>
		</div>
	);
};
