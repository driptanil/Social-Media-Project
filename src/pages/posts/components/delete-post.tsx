import { BsTrash } from "react-icons/bs";

import { useAuthState } from "react-firebase-hooks/auth";
import { async } from "@firebase/util";
import { auth, db, Post, postsRef} from "../../../config/firebase";
import { deleteDoc, doc, getDocs, query, where } from "firebase/firestore";

interface Userpost {
	post: Post;
}

export const DeletePost = (props: Userpost) => {
	const { post } = props;

	const [user] = useAuthState(auth);

	const removePost = async () => {
		const toDeleteQuery = query(postsRef, where("userId", "==", user?.uid));
		const toDeleteData = await getDocs(toDeleteQuery);
		const postId = toDeleteData.docs[0].id;
		const likeToDelete = doc(postsRef, postId);

		await deleteDoc(likeToDelete);
        
	};

	return (
		<button className="p-2 text-red-300">
			<BsTrash />
		</button>
	);
};

