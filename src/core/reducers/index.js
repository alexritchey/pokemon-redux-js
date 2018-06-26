import { combineReducers } from 'redux';

export const TRAINER_TYPES = {
    PLAYER: 'player',
    OPPONENT: 'opponent'
};

const DEFAULT_TRAINER_STATE = {
    pkmn: [],
    items: [],
    name: ''
};

const mockPkmnDatabase = {
    1: { name: 'Bulbasaur', id: 1 },
    2: { name: 'Ivysaur', id: 2 },
    3: { name: 'Venusaur', id: 3 },
    4: { name: 'Charmander', id: 4 },
    5: { name: 'Charmeleon', id: 5 },
    6: { name: 'Charizard', id: 6 },
    7: { name: 'Squirtle', id: 7 },
    8: { name: 'Wartortle', id: 8 },
    9: { name: 'Blastoise', id: 9 }
};

const getPkmnFromDatabase = id => { return { ...mockPkmnDatabase[id] } };

const trainers = (state = {}, action) => {
    switch (action.type) {
        case 'INIT_TRAINERS':
            return {
                player: { ...DEFAULT_TRAINER_STATE}, 
                opponent: { ...DEFAULT_TRAINER_STATE}
            };
        case 'SET_TRAINER_NAME':
            const updatedState = { ...state };
            updatedState[action.trainerType].name = action.name;
            return updatedState;
        case 'SET_TRAINER_PKMN':
            const trainerState = state[action.trainerType];
            trainerState.pkmn = action.pkmnIds.map(pkmnId => {
                return getPkmnFromDatabase(pkmnId);
            });
        default:
            return state;
    }
};

export default combineReducers({
    trainers
});
