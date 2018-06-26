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