import { BiTrashAlt } from "react-icons/bi";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, Post, postsRef } from "../../../config/firebase";
import {
	collection,
	CollectionReference,
	deleteDoc,
	doc,
	DocumentData,
	getDocs,
	query,
	where,
} from "firebase/firestore";

interface Userpost {
	post: Post;
}

export const DeletePost = (props: Userpost) => {
	const { post } = props;

	const postDetails = post;

	const [user] = useAuthState(auth);

	const deleteCollection = async (
		collectionRef: CollectionReference<DocumentData>
	) => {
		const data = await getDocs(collectionRef);

		data.docs.map(async (document) => {
			await deleteDoc(doc(collectionRef, document.id));
		});
	};

	const removePost = async () => {
		try {
			const post = doc(postsRef, postDetails.id);

			const likes = collection(postsRef, postDetails.id, "likes");
			const dislikes = collection(postsRef, postDetails.id, "dislikes");

			deleteCollection(likes);
			deleteCollection(dislikes);

			await deleteDoc(post);

			window.location.reload();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<button onClick={removePost} className="my-4 flex flex-row items-center rounded-lg p-1 text-lg text-red-300">
			<BiTrashAlt />
		</button>
	);
};
