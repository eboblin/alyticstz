import React from 'react';
import { Button, ButtonGroup, Glyphicon } from 'react-bootstrap';
import ReactModal from 'react-modal';

export const ColsFilter = (props) => {
	let items = Object.keys(props.state).map((item, i) =>
		<Button key={i} style={{ "textAlign": "left" }} onClick={() => props.change(item)}>
			<Glyphicon glyph={props.state[item].visible === true ? "check" : "unchecked"} />
			{props.state[item].name}
		</Button>);
	
	return (
		//<div className="ColsFilter" style={{"display":visibility, "top":props.position.y+"px", "left":props.position.x+"px"}}>
		<ReactModal className="ColsFilter"
			isOpen={props.visibility}
			onRequestClose={props.close}
			shouldCloseOnOverlayClick={true}
			ariaHideApp={false}
			shouldFocusAfterRender={false}			
			style={{
				content:
					{
						border: "none",
						background: "#dfe9f1",
						padding: 0,
						right: "unset",
						top: props.position.y+"px",
						left: props.position.x + "px",
						zIndex: "101"
					},
				overlay:
					{
						background: "rgba(255, 255, 255, 0.2)",
						zIndex: "99"
					}	
			}}
		>
			<ButtonGroup vertical>
				{items}
			</ButtonGroup>
			<div className="closeButtonContainer">
				<Button onClick = {props.close} bsStyle="primary">Закрыть</Button>
			</div>
		</ReactModal>	
		);
}