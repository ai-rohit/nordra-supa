import { Button } from "@carbon/react";
import { useEffect, useState } from "react";
import { ebraiSupabase } from "../config/supabase";
import { useParams } from "react-router-dom";

const RolesDescription = () => {
	const [selectedRole, setSelectedRole] = useState<null | {
		title: string;
		description: string;
	}>(null);
	const { id } = useParams();
	const getSelectedRole = async () => {
		const { data: role } = await ebraiSupabase
			.from("roles")
			.select("*")
			.eq("id", id)
			.limit(1)
			.single();
		setSelectedRole(role);
	};
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (id) {
			getSelectedRole();
		}
	}, [id]);

	if (!selectedRole) return null;
	return (
		<div>
			<div style={{ display: "flex", gap: "1rem" }}>
				<p style={{ fontWeight: "bold", marginBottom: "10px" }}>
					{selectedRole.title}
				</p>
				<Button size="sm">Apply</Button>
			</div>

			<pre>{selectedRole.description}</pre>
		</div>
	);
};

export default RolesDescription;
