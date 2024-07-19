import { Button, Tile } from "@carbon/react";
import React, { useEffect, useState } from "react";
import { ebraiSupabase } from "../config/supabase";
import { Link } from "react-router-dom";

const Roles = () => {
	const [roleData, setRoleData] = useState([]);

	useEffect(() => {
		(async () => {
			const { data: roles } = await ebraiSupabase
				.from("roles")
				.select("*")
				.eq("status", "active");
			setRoleData(roles);
		})();
	}, []);
	return (
		<div>
			{roleData.length > 0 &&
				roleData.map((role: any) => (
					<Tile style={{ marginTop: "10px" }}>
						<div className="tile-header" style={{ width: "80%" }}>
							<p>{role.title}</p>
							<p>Rohit's Organization</p>
							<div
								style={{
									display: "flex",
									gap: "0.5rem",
								}}
							>
								{role.category && (
									<div
										style={{
											backgroundColor: "lightgray",
											padding: "0.5rem",
											borderRadius: "0.5rem",
										}}
									>
										<p
											style={{
												fontSize: "12px",
											}}
										>
											{role.category}
										</p>
									</div>
								)}

								<div
									style={{
										backgroundColor: "lightgray",
										padding: "5px",
										borderRadius: "0.5rem",
									}}
								>
									<p
										style={{
											fontSize: "12px",
										}}
									>
										{role.role_type}
									</p>
								</div>
								<div
									style={{
										backgroundColor: "lightgray",
										padding: "5px",
										borderRadius: "0.5rem",
									}}
								>
									<p
										style={{
											fontSize: "12px",
										}}
									>
										{role.role_location}
									</p>
								</div>
							</div>
							{role.end_date && (
								<p>
									Apply Before{" "}
									{new Date(role?.end_date).toLocaleDateString("en-US", {
										weekday: "long",
										day: "numeric",
										month: "short",
									})}
								</p>
							)}

							<Link to={`/roles/${role.id}`}>
								<Button kind="primary" size="sm">
									See more
								</Button>
							</Link>

							{/* <pre>{role.description}</pre> */}
						</div>
					</Tile>
				))}
		</div>
	);
};

export default Roles;
