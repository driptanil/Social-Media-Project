import { BiTrashAlt } from "react-icons/bi";
import { TiTickOutline, TiTimesOutline } from "react-icons/ti";

import { Post, postsRef } from "../../../config/firebase";
import {
	collection,
	CollectionReference,
	deleteDoc,
	doc,
	DocumentData,
	getDocs,
} from "firebase/firestore";
import { useContext, useState } from "react";
import { AppContext } from "../../../App";

interface Userpost {
	post: Post;
}

export const DeletePost = (props: Userpost) => {

	const refetchObject = useContext(AppContext);

	const { post } = props;

	const postDetails = post;

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

			refetchObject?.setRefetch(true);
			// window.location.reload();
		} catch (error) {
			console.log(error);
		}
	};

	const [confirmDelete, setConfirmDelete] = useState<boolean>(false);

	const toggleConfirmDelete = () => {
		if (confirmDelete) {
			setConfirmDelete(false);
		} else {
			setConfirmDelete(true);
		}
	};

	return (
		<div className="my-4 flex flex-row items-center rounded-lg p-1 text-lg">
			{!confirmDelete ? (
				<button onClick={toggleConfirmDelete} className=" text-red-300">
					<BiTrashAlt />
				</button>
			) : (
				<div className="flex text-xl">
					<button className="text-red-300 " onClick={removePost}>
						<TiTickOutline />
					</button>
					<button onClick={toggleConfirmDelete}>
						<TiTimesOutline />
					</button>
				</div>
			)}
		</div>
	);
};
