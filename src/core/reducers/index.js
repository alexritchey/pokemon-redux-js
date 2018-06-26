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

const mockBaseStats = {
    attack: 10,
    defense: 10,
    spAtk: 10,
    spDef: 10,
    speed: 10
};

const mockPkmnDatabase = {
    1: { name: 'Bulbasaur', id: 1, mockBaseStats: { ...mockBaseStats, speed: 12 }},
    2: { name: 'Ivysaur', id: 2, mockBaseStats },
    3: { name: 'Venusaur', id: 3, mockBaseStats }
};

const mockMoveDatabase = {
    1: { canonical: 'tackle', display: 'Tackle', power: 40}
};

const createNewPkmn = (pkmn) => {
    return {
        data: pkmn,
        stats: {
            ...pkmn.mockBaseStats,
            priority: 0
        },
        moveSet: [mockMoveDatabase[1]],
        nextMove: '',
        uuid: createUniqueId()
    };
};

const getPkmnFromDatabase = id => { return { ...mockPkmnDatabase[id] } };

/**
 * TODO: Should check that ID doesn't already exist
 */
const createUniqueId = () => ('_' + Math.random().toString(36).substr(2, 9));

const trainers = (state = {}, action) => {
    switch (action.type) {
        /**
         * TODO: Initialize name, pkmn, items, etc with this as well
         */
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
            const pkmnList = action.pkmnIds.map(pkmnId => {
                return createNewPkmn(getPkmnFromDatabase(pkmnId));
            });
            return { ...state, ...{
                [action.trainerType]: {
                    ...state[action.trainerType],
                    pkmn: pkmnList
                }
            }}
        case 'SET_PKMN_NEXT_MOVE':
            const activePkmn = { ...state[action.trainerType].pkmn[0] };
            activePkmn.nextMove = action.move;
            return {
                ...state,
                [action.trainerType]: {
                    ...state[action.trainerType],
                    pkmn: [activePkmn]
                }
            };
        default:
            return state;
    }
};

const isCombatPhase = (state = false, action) => {
    switch (action.type) {
        case 'BEGIN_COMBAT_PHASE':
            return true;
        case 'END_COMBAT_PHASE':
            return false;
        default:
            return state;
    }
};

const turnNum = (state = 1, action) => {
    switch (action.type) {
        case 'END_COMBAT_PHASE':
            return state++;
        default:
            return state;
    }
};


export default combineReducers({
    trainers,
    isCombatPhase,
    turnNum
});
