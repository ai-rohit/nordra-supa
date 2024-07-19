import { useEffect, useState } from "react";
import { Button } from "@carbon/react";
import { Session, createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Roles from "./pages/Roles";
import RolesDescription from "./pages/RoleDescription";
import CreateProfile from "./pages/CreateProfile";

const supabase = createClient(
	import.meta.env.VITE_SUPA_PROJECT_URL as string,
	import.meta.env.VITE_SUPA_ANON_KEY as string,
);

function App() {
	const [session, setSession] = useState<Session | null>(null);

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

	const signOut = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) {
			alert("Error Signing out");
		} else {
			setSession(null);
		}
	};
	if (!session)
		return (
			<div className="login-root">
				<div className="login-container">
					<Auth
						supabaseClient={supabase}
						appearance={{ theme: ThemeSupa }}
						providers={[]}
					/>
				</div>
			</div>
		);
	return (
		<>
			<div className="btn-container">
				{/* <Link to="/create-profile"> */}

				<a href="/create-profile">
					<Button>Profile</Button>
				</a>

				{/* </Link> */}

				<Button onClick={() => signOut()}>Logout</Button>
			</div>
			<BrowserRouter>
				<Routes>
					<Route path="/roles" element={<Roles />} />
					<Route path="/" element={<Roles />} />
					<Route path="/roles/:id" element={<RolesDescription />} />
					<Route path="/create-profile" element={<CreateProfile />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
