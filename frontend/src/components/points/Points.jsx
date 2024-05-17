// src/components/points/Points.jsx
import React from "react";
import "./style.scss";

export default function Points({ players }) {
	return (
		<div className="points-container">
			<h2>Player Points</h2>
			<ul>
				{players.map((player, index) => (
					<li key={index}>
						{player.name}: {player.points}
					</li>
				))}
			</ul>
		</div>
	);
}
