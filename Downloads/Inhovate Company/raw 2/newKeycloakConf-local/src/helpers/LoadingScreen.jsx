import React from "react";
import "./styles.css";
//import image
import image from "../assets/inhovateLogo.png";

const LoadingScreen = () => {
	return (
		<div className="loader">
			<div className="loader-img">
				<img src={image} alt="logo" />
			</div>
		</div>
	);
};

export default LoadingScreen;
