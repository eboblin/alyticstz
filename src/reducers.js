import { createState } from './utils.js';

export const mainReducer = (state = createState(), action) => {
	let newState = Object.assign({}, state);
	switch (action.type)
	{
		case "CHANGE_COLUMN_VISIBILITY":
			let cnt = 0;

			//not letting to switch all columns off
			var s = newState.columnsVisibility;
			Object.keys(s).map((el) => s[el].visible === true ? cnt++ : false);
			
			if (cnt>1 && s[action.name].visible === true)
				s[action.name].visible = false;
			else
			if (s[action.name].visible === false)
				s[action.name].visible = true;	
		
			return newState;

	default:
		return state;
	}

}