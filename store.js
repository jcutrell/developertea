import React, {createContext, useReducer} from 'react';

const initialState = {
  playerId: null,
  showPlayer: false
};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ( { children } ) => {
	const [state, dispatch] = useReducer((state, action) => {
		switch(action.type) {
			case 'setPlayerId':
				state.playerId = action.value;
        state.showPlayer = true;
      return {
        ...state
      };
			default:
				throw new Error();
		};
	}, initialState);

	return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider }
