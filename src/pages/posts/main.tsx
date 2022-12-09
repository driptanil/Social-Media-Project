import { getDocs, query, orderBy } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import { Post, postsRef } from "../../config/firebase";
import { DisplayPost } from "./components/display-post";

export const Main = () => {
	const refetchObject = useContext(AppContext);

	refetchObject?.setRefetch(true);

	// reference to database in firebase
	// useState can be of `Post[]` (array of Post) or `null` type

	// Note: all firebase operations require async / await operation
	const [postsList, setPostsList] = useState<Post[] | null>(null);

	const getPosts = async () => {
		const data = await getDocs(query(postsRef, orderBy("created", "desc")));
		// console.log(data); // firebase returns a complex object which is hard to analyze

		/*
		console.log(
			data.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			}))
		); 
        */

		setPostsList(
			data.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			})) as Post[]
		);
	};

	useEffect(() => {
		if (refetchObject?.refetch) {
			getPosts();
			refetchObject?.setRefetch(false);
		}
	});

	return (
		<div className="m-auto my-5 flex max-w-lg flex-col">
			{postsList?.map((post) => (
				<DisplayPost post={post} />
			))}
		</div>
	);
};
