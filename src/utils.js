import data from './data/data.json';
import React from 'react';
import { Glyphicon } from 'react-bootstrap';
console.log(data);

//LUTs
const subHeadLUT = {
	cpa: "CPA, р.",
	cr: "CR, %",
	count: "Кол-во",
	revenue: "Revenue, р.",	
	gross_profit: "Gross Profit, р.",	
	roi: "ROI",
}

const headerLUT = {
	campaign: "КАМПАНИИ",
	status: "Статус",
	shows: "Показы",
	clicks: "Клики",
	ctr: "CTR",
	cpc: "CPC",
	cost: "Затраты"
}

//utility to construct subheaders for goals' columns
function constructSubheader(goalData, num, clickHandler) {
	let subHead = [];
	let keys = Object.keys(goalData);
	keys.map((el, i) => subHeadLUT[el] ? subHead.push({ Header: <div className="elWrap" onClick={(e) => clickHandler(e.clientX, e.clientY)}>{subHeadLUT[el]}</div>, accessor: `${el}${num}`, minWidth:50, headerClassName:i===0?"boldColLeft subHeadBottom":" subHeadBottom", className:i===0?"boldColLeft":""}) : false);
	return subHead;
}

//creating table data
export function createTable() {
	var outTable = [];
	function pushItem(dataItem) {
		let outTableItem = {
			check: false,
			campaign: dataItem.value,
			status: dataItem.is_active,
			shows: dataItem.costs.shows,
			clicks: dataItem.costs.clicks,
			ctr: dataItem.costs.ctr,
			cpc: dataItem.costs.cpc,
			cost: dataItem.costs.cost,
		};

		dataItem.goals.map((goalItem, num) => Object.keys(goalItem).map((el,i) => subHeadLUT[el] ? outTableItem[`${el}${num}`] = goalItem[el]: false));

		outTable.push(outTableItem);
		return false;
		
	}
	let total = Object.assign(data.total, { value: "Total", status: "none" });
	pushItem(total)
	data.content.map((dataItem) => { pushItem(dataItem); return false; });
	return outTable;
}

//creating header data
export function createHeader(state, clickHandler) {
	
	//creating a checkbox column
	let header = [{Header:" ", accessor: "check", width:30, headerClassName:`defaultHeader check`, className:`defaultCol check`, Cell: row => (<input type="checkbox" />)}];
	
	//creating other default (non-goal) columns
	Object.keys(state).map(el => {
		//adding only visible elements we have in headerLUT
		if (state[el].visible === true && headerLUT[el]) {

			let curHead = {
				Header: <div className="elWrap" onClick={(e) => clickHandler(e.clientX ,e.clientY )}>{headerLUT[el]}</div>,
				accessor: el,
				minWidth: 50,
				headerClassName: `defaultHeader ${el}`,
				className: `defaultCol ${el}`
			}

			//adding custom renderers for non-text data
			switch (el) {
				case "status":
					curHead.Cell = row => (typeof row.value === "boolean"?<Glyphicon glyph={row.value === true ? "pause" : "play"} />:false)
					break;
				
				default:
					break;
			}

			header.push(curHead);
		}
		return false;
	});
	
	//adding goals
	let staticCount = header.length;
	let subitemsToSkip = [];
	data.goals_list.map((goal, i) => state[`id_${goal.goal_id}`].visible === true ? header.push({
		Header: <div className="elWrap" onClick={(e) => clickHandler(e.clientX ,e.clientY )}><b>{goal.name}</b> <i>&mdash; Цель {i} &mdash;</i></div>, headerClassName:"subHead boldColLeft", minWidth:50}):subitemsToSkip.push(i));

	//not showing any goals
	if (subitemsToSkip.length === data.goals_list.length) {
		header.map(item => item.headerClassName+=" noGoals")
	}
	
	//adding goals' subitems
	let cnt = 0;
	data.total.goals.map((goalVal, i) => { if (!subitemsToSkip.includes(i)) { header[cnt + staticCount].columns = constructSubheader(goalVal, i, clickHandler); cnt++; }return false; });

	return header;
}

export function createState() {
	//default rows
	let state =
		{	
		columnsVisibility:
			{
				
				campaign: { visible: true, name: headerLUT.campaign },
				status: { visible: true, name: headerLUT.status },
				shows: { visible: true, name: headerLUT.shows },
				clicks: { visible: true, name: headerLUT.clicks },
				ctr: { visible: true, name: headerLUT.ctr },
				cpc: { visible: true, name: headerLUT.cpc },
				cost: { visible: true, name: headerLUT.cost }
			},
	};

	
	data.goals_list.map((goal) => state.columnsVisibility[`id_${goal.goal_id}`] = { visible: false, name: goal.name.length>0?goal.name:"unknown" });
	
	return state;
}