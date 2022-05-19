import React, { useState } from "react";
import "./Header.css"; 
function MapUtiHeader({ Bulk }) {
	return (
		<div className="headPill">
			<p className="header">Continental Hotel Downtown - Chart of Account</p>
			 
				{/* <button className="generate_btn" onClick={generateCode}>
					{" "}
					<JoinInnerIcon /> generate the code{" "}
				</button>  */}

			<div className="buttons">
				{/* <button
					className="upload"
					onClick={() => {
						window.location.href = "/";
					}}
				>
					Re-Upload
				</button>  */}
				{/* {button}    */}
					{Bulk} 
			</div>
		</div>
	);
}

export default MapUtiHeader;