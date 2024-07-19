// simple form component to create a profile for job applicants
import React, { useEffect, useState } from "react";
import { Button, Checkbox, TextInput } from "@carbon/react";
import { supabase } from "../config/supabase";
import { Session } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";

const CreateProfile = () => {
	const initialState = {
		first_name: "",
		last_name: "",
		email: "",
		phone: "",
		experience: 0,
		about: "",
		skills: [] as Array<string>,
		criteria_score: 80,
		location: "",
	};

	const [session, setSession] = useState<Session | null>(null);
	const [profile, setProfile] = useState(initialState);
	const [alreadyHasProfile, setAlreadyHasProfile] = useState(false);

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
		});

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
		});

		return () => subscription.unsubscribe();
	}, []);

	const getCandidateProfile = async () => {
		const { data } = await supabase
			.from("candidates_profiles")
			.select("*")
			.eq("user_id", session?.user.id)
			.limit(1)
			.single();
		if (!data) {
			setProfile(initialState);
			setAlreadyHasProfile(false);
		} else {
			setAlreadyHasProfile(true);
			setProfile(data);
		}
	};
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (session) {
			getCandidateProfile();
		}
	}, [session?.user.id]);

	const navigate = useNavigate();
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		console.log(e.target.name);
		setProfile({ ...profile, [e.target.name]: e.target.value });
	};

	console.log(profile);
	const handleSubmit = async () => {
		if (alreadyHasProfile) {
			const { error } = await supabase
				.from("candidates_profiles")
				.update(profile)
				.eq("user_id", session?.user.id)
				.limit(1)
				.single();
			if (error) {
				alert("Error updating profile");
			} else {
				navigate("/roles");
			}
		} else {
			const { error } = await supabase
				.from("candidates_profiles")
				.insert({ ...profile, user_id: session?.user.id })
				.limit(1)
				.single();
			if (error) {
				alert("Error creating profile");
			} else {
				navigate("/roles");
			}
		}
	};
	return (
		<div>
			<div style={{ marginTop: 10 }}>
				<TextInput
					id="first_name"
					labelText="First Name"
					name="first_name"
					value={profile.first_name}
					onChange={handleChange}
				/>
			</div>

			<div style={{ marginTop: 10 }}>
				<TextInput
					id="last_name"
					labelText="Last Name"
					name="last_name"
					value={profile.last_name}
					onChange={handleChange}
				/>
			</div>

			<div style={{ marginTop: 10 }}>
				<TextInput
					id="email"
					labelText="Email"
					name="email"
					value={profile.email}
					onChange={handleChange}
				/>
			</div>

			<div style={{ marginTop: 10 }}>
				<TextInput
					id="phone"
					labelText="Phone"
					name="phone"
					value={profile.phone}
					onChange={handleChange}
				/>
			</div>

			<div style={{ marginTop: 10 }}>
				<TextInput
					id="location"
					labelText="Location"
					name="location"
					value={profile.location}
					onChange={handleChange}
				/>
			</div>

			<div style={{ marginTop: 10 }}>
				<TextInput
					id="about"
					labelText="About"
					name="about"
					value={profile.about}
					onChange={handleChange}
				/>
			</div>

			<div style={{ marginTop: 10 }}>
				<TextInput
					id="experience"
					labelText="Years of Experience"
					name="experience"
					value={profile.experience}
					onChange={handleChange}
				/>
			</div>

			<div style={{ marginTop: 10 }}>
				<p>Skills</p>
				<Checkbox
					id="html"
					labelText="HTML"
					checked={profile.skills.includes("html")}
					onChange={() => {
						if (profile.skills.includes("html")) {
							setProfile({
								...profile,
								skills: profile.skills.filter((skill) => skill !== "html"),
							});
						} else {
							setProfile({
								...profile,
								skills: [...profile.skills, "html"],
							});
						}
					}}
				/>
				<Checkbox
					id="javascript"
					labelText="Javascript"
					checked={profile.skills.includes("javascript")}
					onChange={() => {
						if (profile.skills.includes("javascript")) {
							setProfile({
								...profile,
								skills: profile.skills.filter(
									(skill) => skill !== "javascript",
								),
							});
						} else {
							setProfile({
								...profile,
								skills: [...profile.skills, "javascript"],
							});
						}
					}}
				/>
				<Checkbox
					id="supabase"
					labelText="Supabase"
					checked={profile.skills.includes("supabase")}
					onChange={() => {
						if (profile.skills.includes("supabase")) {
							setProfile({
								...profile,
								skills: profile.skills.filter((skill) => skill !== "supabase"),
							});
						} else {
							setProfile({
								...profile,
								skills: [...profile.skills, "supabase"],
							});
						}
					}}
				/>
				<Checkbox
					id="sql"
					labelText="SQL"
					checked={profile.skills.includes("sql")}
					onChange={() => {
						if (profile.skills.includes("sql")) {
							setProfile({
								...profile,
								skills: profile.skills.filter((skill) => skill !== "sql"),
							});
						} else {
							setProfile({
								...profile,
								skills: [...profile.skills, "sql"],
							});
						}
					}}
				/>
				<Checkbox
					id="css"
					labelText="CSS"
					checked={profile.skills.includes("css")}
					onChange={() => {
						if (profile.skills.includes("css")) {
							setProfile({
								...profile,
								skills: profile.skills.filter((skill) => skill !== "css"),
							});
						} else {
							setProfile({
								...profile,
								skills: [...profile.skills, "css"],
							});
						}
					}}
				/>
				<Checkbox
					id="react"
					labelText="React"
					checked={profile.skills.includes("react")}
					onChange={() => {
						if (profile.skills.includes("react")) {
							setProfile({
								...profile,
								skills: profile.skills.filter((skill) => skill !== "react"),
							});
						} else {
							setProfile({
								...profile,
								skills: [...profile.skills, "react"],
							});
						}
					}}
				/>
			</div>

			<Button onClick={handleSubmit}>
				{alreadyHasProfile ? "Update Profile" : "Create Profile"}
			</Button>
		</div>
	);
};

export default CreateProfile;
