import {
	getDoc,
	collection,
	getDocs,
	query,
	orderBy,
	deleteDoc,
	doc,
	where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { date } from "yup";
import { auth, Post, postsRef } from "../../config/firebase";
import { DisplayPost } from "./components/display-post";


export const Main = () => {
	// reference to database in firebase
	const [user] = useAuthState(auth);
	
	// useState can be of `Post[]` (array of Post) or `null` type

	const [postsList, setPostsList] = useState<Post[] | null>(null);
	// Note: all firebase operations require async / await operation
	const getPosts = async () => {
		const data = await getDocs(query(postsRef, orderBy("date", "desc")));
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
		getPosts();
	}, []);

	return (
		<div className="m-auto my-5 flex max-w-lg flex-col">
			{postsList?.map((post) => (
				<DisplayPost post={post} />
			))}
		</div>
	);
};
