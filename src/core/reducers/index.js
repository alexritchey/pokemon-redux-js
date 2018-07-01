import { combineReducers } from 'redux';
import { STAT_TYPES, TRAINER_TYPES } from '../../constants';
import moves from '../../data/moves';

const DEFAULT_TRAINER_STATE = {
    pkmn: [],
    items: [],
    name: ''
};

const { ATK, DEF, SPATK, SPDEF, SPD, HP } = STAT_TYPES;

const mockBaseStats = {
    [ATK]: 6,
    [DEF]: 6,
    [SPATK]: 6,
    [SPDEF]: 6,
    [SPD]: 6,
    [HP]: 12
};

const mockPkmnDatabase = {
    1: { name: 'Bulbasaur', id: 1, mockBaseStats: { ...mockBaseStats, [SPD]: 12 }},
    2: { name: 'Ivysaur', id: 2, mockBaseStats },
    3: { name: 'Venusaur', id: 3, mockBaseStats }
};

export const mockMoveDatabase = { tackle: moves['tackle'] };

const createNewPkmn = (pkmn) => {
    return {
        data: pkmn,
        stats: {
            ...pkmn.mockBaseStats,
            priority: 0
        },
        level: 5,
        moveSet: [mockMoveDatabase['tackle']],
        isFainted: false,
        nextMove: '',
        uuid: createUniqueId()
    };
};

const getPkmnFromDatabase = id => ({ ...mockPkmnDatabase[id] });

/**
 * TODO: Should check that ID doesn't already exist
 */
const createUniqueId = () => ('_' + Math.random().toString(36).substr(2, 9));

const trainers = (state = {}, action) => {
    let activePkmn, updatedState;

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
            updatedState = { ...state };
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
            activePkmn = { ...state[action.trainerType].pkmn[0] };
            activePkmn.nextMove = action.move;
            return {
                ...state,
                [action.trainerType]: {
                    ...state[action.trainerType],
                    pkmn: [activePkmn]
                }
            };
        case 'REDUCE_HP':
            activePkmn = { ...state[action.trainerType].pkmn[0] };

            if (activePkmn.stats.hp > 0) {
                activePkmn.stats.hp = activePkmn.stats.hp - action.damage;
            }

            if (activePkmn.stats.hp < 0) {
                activePkmn.stats.hp = 0;
            }

            return {
                ...state,
                [action.trainerType]: {
                    ...state[action.trainerType],
                    pkmn: [activePkmn]
                }
            };
        case 'END_COMBAT_PHASE':
            updatedState = { ...state };
            updatedState[TRAINER_TYPES.PLAYER].pkmn[0].nextMove = {};
            updatedState[TRAINER_TYPES.OPPONENT].pkmn[0].nextMove = {};
            return updatedState;
            
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
