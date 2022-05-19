import React, { useState } from "react";
import JoinInnerIcon from "@mui/icons-material/JoinInner";
import "./Header.css"; 
function Header({ generateCode, button, Bulk }) {
	return (
		<div className="headPill">
			<p className="header">Continental Hotel Downtown - Chart of Account</p>
			 
				<button className="generate_btn" onClick={generateCode}>
					{" "}
					<JoinInnerIcon /> Generate inHovate Codes{" "}
				</button> 

			<div className="buttons">
				<button
					className="upload"
					onClick={() => {
						window.location.href = "/";
					}}
				>
					Re-Upload
				</button> 
				{button}   
					{Bulk} 
			</div>
		</div>
	);
}

export default Header;
