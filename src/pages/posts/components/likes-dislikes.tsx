import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDocs,
	query,
	where,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, Post } from "../../../config/firebase";
import {
	AiOutlineLike,
	AiFillLike,
	AiOutlineDislike,
	AiFillDislike,
} from "react-icons/ai";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../App";

interface UserPost {
	post: Post;
}

interface Like {
	userId: string;
}

interface Dislike {
	userId: string;
}

export const LikesDislikes = (props: UserPost) => {
	const refetchObject = useContext(AppContext);

	const { post } = props;

	const [user] = useAuthState(auth);

	const docRef = doc(db, `posts/${post.id}`);

	const likesRef = collection(docRef, "likes");
	const dislikesRef = collection(docRef, "dislikes");
	// creating a firestore collection reference

	const [likes, setLikes] = useState<Like[] | null>(null);
	const [dislikes, setDislikes] = useState<Dislike[] | null>(null);

	const likesDoc = query(likesRef);
	const dislikesDoc = query(dislikesRef);
	// selecting document id
	// using `query` to only the post with given post id

	const getLikes = async () => {
		const data = await getDocs(likesDoc);
		setLikes(
			data.docs.map((doc) => ({
				userId: doc.data().userId,
			}))
		);
	};

	const getDislikes = async () => {
		const data = await getDocs(dislikesDoc);
		setDislikes(
			data.docs.map((doc) => ({
				userId: doc.data().userId,
			}))
		);
	};

	useEffect(() => {
		if (refetchObject?.refetch) {
			getLikes();
			getDislikes();
		}
	}, []);

	let hasUserLiked: boolean =
		likes?.find((like) => like.userId === user?.uid) != null;

	let hasUserDisliked: boolean =
		dislikes?.find((dislike) => dislike.userId === user?.uid) != null;

	const addLike = async () => {
		try {
			await addDoc(likesRef, {
				userId: user?.uid,
			});
			hasUserLiked = true;
			if (user) {
				setLikes((prev) =>
					prev
						? [...prev, { userId: user?.uid }]
						: [{ userId: user?.uid }]
				);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const addDislike = async () => {
		try {
			await addDoc(dislikesRef, {
				userId: user?.uid,
			});
			hasUserDisliked = true;
			// adds new document, returns document id
			if (user) {
				setDislikes((prev) =>
					prev
						? [...prev, { userId: user?.uid }]
						: [{ userId: user?.uid }]
				);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const removeLike = async () => {
		try {
			const likeToDeleteQuery = query(
				likesRef,
				where("userId", "==", user?.uid)
			);

			const likeToDeleteData = await getDocs(likeToDeleteQuery);

			const likeId = likeToDeleteData.docs[0].id;

			const likeToDelete = doc(docRef, "likes", likeId);

			await deleteDoc(likeToDelete);

			hasUserLiked = false;
			if (user) {
				setLikes(
					(prev) =>
						prev && prev.filter((like) => like.userId !== user.uid)
				);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const removeDislike = async () => {
		try {
			const dislikeToDeleteQuery = query(
				dislikesRef,
				where("userId", "==", user?.uid)
			);
			// selects the dislike query

			const dislikeToDeleteData = await getDocs(dislikeToDeleteQuery);

			const dislikeId = dislikeToDeleteData.docs[0].id;

			const dislikeToDelete = doc(docRef, "dislikes", dislikeId);

			await deleteDoc(dislikeToDelete);

			hasUserDisliked = false;

			if (user) {
				setDislikes(
					(prev) =>
						prev &&
						prev.filter((dislike) => dislike.userId !== user.uid)
				);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const finallyLiked = () => {
		if (hasUserDisliked) {
			removeDislike();
			hasUserDisliked = false;
		}
		addLike();
		hasUserLiked = true;
	};

	const finallyDisLiked = () => {
		if (hasUserLiked) {
			removeLike();
			hasUserLiked = false;
		}
		addDislike();
		hasUserDisliked = true;
	};

	return (
		<div className="flex flex-row">
			<button
				onClick={hasUserLiked ? removeLike : finallyLiked}
				className="like my-4 ml-5 flex flex-row items-center rounded-lg p-1 text-cyan-300">
				{hasUserLiked ? (
					<AiFillLike className="mx-2 text-2xl" />
				) : (
					<AiOutlineLike className="mx-2  text-2xl " />
				)}
				{likes && likes.length !== 0 && (
					<p className="mx-2 inline text-sm"> {likes.length}</p>
				)}
			</button>
			<button
				onClick={hasUserDisliked ? removeDislike : finallyDisLiked}
				className="my-4 flex flex-row items-center rounded-lg p-1 text-white">
				{hasUserDisliked ? (
					<AiFillDislike className="mx-2  text-lg " />
				) : (
					<AiOutlineDislike className="mx-2  text-lg " />
				)}
				{dislikes && dislikes.length !== 0 && (
					<p className="mx-2 inline text-sm"> {dislikes.length}</p>
				)}
			</button>
		</div>
	);
};
