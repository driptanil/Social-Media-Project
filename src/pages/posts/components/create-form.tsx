import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";

// importing firestore
import { addDoc, Timestamp } from "firebase/firestore";
import { postsRef } from "../../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../config/firebase";
import { useState } from "react";

import { RiChatUploadLine } from "react-icons/ri";

interface CreateFormData {
	title: string;
	description: string;
}

export const CreateForm = () => {
	const [user] = useAuthState(auth);

	const navigate = useNavigate();

	const schema = yup.object().shape({
		title: yup
			.string()
			.max(25, "Title must be upto 25 characters")
			.required("Please enter a title "),
		description: yup.string().required("Please enter some description"),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<CreateFormData>({
		resolver: yupResolver(schema),
	});
	// collection() is used to specify the collection where the document will be added

	let formattedTime = Date().toLocaleString().split(" ");
	formattedTime.shift();
	formattedTime.pop();
	formattedTime.pop();
	formattedTime.pop();
	formattedTime.pop();

	const onCreatePost = async (data: CreateFormData) => {
		// `async` ensures that the function returns a promise
		await addDoc(postsRef, {
			/* title: data.title,
			description: data.description, */
			// OR
			...data,
			username: user?.displayName,
			userId: user?.uid,
			created: Timestamp.now(),
			date: formattedTime.join(" "),
			userPic: user?.photoURL?.split("=")[0] || "",
			// uid is the id used by Google used to refer to the specific user
		});

		navigate("/");
		// addDoc() adds documents to database
		// firebase -> collection -> document -> field
	};
	const [description, setDescription] = useState("");

	const handleDescriptionChange = (event: any) => {
		setDescription(event.target.value);
	};

	const countWords = description.split(" ").length - 1;

	const [title, setTitle] = useState("");

	const handleTitleChange = (event: any) => {
		setTitle(event.target.value);
	};

	const countCharacters = title.length - 1;

	return (
		<div className="m-10">
			<form
				onSubmit={handleSubmit(onCreatePost)}
				className="m-auto flex max-w-lg flex-col rounded-lg bg-gradient-to-b from-cyan-900/20 to-pink-900/10 p-7">
				<span className="mr-auto block py-2 px-3 text-sm tracking-wider text-cyan-300">
					TITLE
				</span>
				<input
					placeholder="Title ..."
					{...register("title")}
					className="my-2 mt-1 block w-full rounded-md border border-slate-800 bg-neutral-900 px-3 py-2 text-sm text-white placeholder-slate-400 shadow-lg shadow-cyan-500/40 focus:border-indigo-500/50 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none"
					onChange={handleTitleChange}
				/>
				{title.trim() !== "" && (
					<caption className="-my-4 ml-auto -translate-y-7 bg-neutral-900/50 py-2 px-4 text-sm text-slate-500">
						{countCharacters} characters
					</caption>
				)}
				<p className="ml-4 mb-4 text-sm text-red-400/80 peer-invalid:visible">
					{errors.title?.message}
				</p>

				<span className="mr-auto block py-2 px-3 text-sm tracking-wider text-pink-300 ">
					DESCRIPTION
				</span>
				<textarea
					placeholder="Description ..."
					className="focus:border-indigo-500/50focus:outline-none my-2 mt-1 block h-32 w-full rounded-md border border-slate-800 bg-neutral-900 px-3 py-2 text-sm text-white placeholder-slate-400 shadow-lg shadow-pink-500/40 focus:border-indigo-500/50 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none"
					{...register("description")}
					onChange={handleDescriptionChange}
				/>
				{description !== "" && (
					<caption className="-my-4 ml-auto -translate-y-7 bg-neutral-900/50 py-2 px-4 text-sm text-slate-500">
						{countWords} words
					</caption>
				)}
				<p className="ml-4 mb-4 text-sm text-red-400/80 peer-invalid:visible">
					{errors.description?.message}
				</p>
				<button
					type="submit"
					className="m-2 ml-auto rounded-lg
					bg-neutral-900/20 py-3 px-5 text-pink-300 shadow-lg shadow-pink-500/40
					transition delay-150 duration-300 ease-in-out
					hover:-translate-y-1 hover:scale-110 hover:text-cyan-300
					hover:shadow-cyan-500/40">
					<RiChatUploadLine className="mr-3 inline text-xl" />
					<p className="inline">Submit</p>
				</button>
			</form>
		</div>
	);
};
