import { getDocs, query, orderBy } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import { Post, postsRef } from "../../config/firebase";
import { DisplayPost } from "./components/display-post";
import { motion } from "framer-motion";

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
	}, [""]);

	const container: any = {
		hidden: { opacity: 0, y: 40 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				delayChildren: 0.3,
				staggerChildren: 0.5,
				duration: 0.8,
			},
		},
	};

	const child: any = {
		hidden: { y: 40, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
		},
		transition: {
			duration: 1,
		},
	};

	return (
		<motion.div
			className="m-auto my-5 flex max-w-lg list-none flex-col"
			variants={container}
			initial="hidden"
			animate="visible">
			{postsList?.map((post) => {
				return (
					<motion.li variants={child}>
						<DisplayPost post={post} />
					</motion.li>
				);
			})}
		</motion.div>
	);
};
