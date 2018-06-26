import * as actions from './creators';
import { TRAINER_TYPES } from '../reducers';

// Core Actions

export const dispatchInitialSetup = () => dispatch => {
    dispatch({
        type: 'INIT_TRAINERS'
    });
    dispatch({
        type: 'SET_TRAINER_NAME',
        name: 'Alex',
        trainerType: TRAINER_TYPES.PLAYER
    });
    dispatch({
        type: 'SET_TRAINER_NAME',
        name: 'Gary',
        trainerType: TRAINER_TYPES.OPPONENT
    });
};

export const setTrainerPkmn = (pkmnIds = [], trainerType) => dispatch => {
    dispatch({
        type: 'SET_TRAINER_PKMN',
        pkmnIds,
        trainerType
    });
}

export const dispatchMoveSelected = move => (dispatch) => {
    dispatch({
        type: 'SET_PKMN_NEXT_MOVE',
        move,
        trainerType: TRAINER_TYPES.PLAYER
    });
    dispatch(beginCombat());
};

export const beginCombat = () => (dispatch) => {
    dispatch({
        type: 'SET_PKMN_NEXT_MOVE',
        // TODO: Add logic for opponent to decide its next move
        move: { canonical: 'tackle', display: 'Tackle', power: 40 },
        trainerType: TRAINER_TYPES.OPPONENT
    });

    dispatch({
        type: 'BEGIN_COMBAT_PHASE'
    })
};
