import { TRAINER_TYPES } from '../../constants.js';
import { getPlayerActivePkmn, getOpponentActivePkmn } from '../reducers/selectors';
import { calculateDirectDamage } from '../../calculators.js';
import { mockMoveDatabase } from '../reducers/index.js';

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

export const beginCombat = () => (dispatch, getState) => {
    dispatch({
        type: 'SET_PKMN_NEXT_MOVE',
        // TODO: Add logic for opponent to decide its next move
        move: mockMoveDatabase['tackle'],
        trainerType: TRAINER_TYPES.OPPONENT
    });

    dispatch({
        type: 'BEGIN_COMBAT_PHASE'
    });

    let state = getState();
    let playerActivePkmn = getPlayerActivePkmn(state);
    let opponentActivePkmn = getOpponentActivePkmn(state);

    const playerHasPriority = pkmnHasPriorityGreaterThan(playerActivePkmn, opponentActivePkmn);
    const firstTurn = playerHasPriority ? beginPlayerTurn : beginOpponentTurn;
    const secondTurn = !playerHasPriority ? beginPlayerTurn : beginOpponentTurn;

    dispatch(firstTurn(playerActivePkmn, opponentActivePkmn, false));

    state = getState();
    playerActivePkmn = getPlayerActivePkmn(state);
    opponentActivePkmn = getOpponentActivePkmn(state);

    dispatch(secondTurn(playerActivePkmn, opponentActivePkmn, true));

    // dispatch(calculateResults());
    dispatch({
        type: 'END_COMBAT_PHASE'
    })
};


const beginPlayerTurn = (playerActivePkmn, opponentActivePkmn, isFirst) => (dispatch, getState) => {
    let damageToDeal = 0;

    if(!playerActivePkmn.isFainted) {
        const move = playerActivePkmn.nextMove;
        if (move.direct) {
            damageToDeal = calculateDirectDamage(playerActivePkmn, opponentActivePkmn);
        } else {
            damageToDeal = null;
        }
    }

    if (damageToDeal !== null) {
        dispatch({
            type: 'REDUCE_HP',
            damage: damageToDeal,
            trainerType: TRAINER_TYPES.OPPONENT
        });
    }
};

const beginOpponentTurn = (playerActivePkmn, opponentActivePkmn, isFirst) => (dispatch, getState) => {
    let damageToDeal = 0;

    // TODO: Extract this out into another function, copy pasta from above for now
    if(!opponentActivePkmn.isFainted) {
        const move = opponentActivePkmn.nextMove;
        if (move.direct) {
            damageToDeal = calculateDirectDamage(opponentActivePkmn, playerActivePkmn);
        } else {
            damageToDeal = null;
        }
    }

    if (damageToDeal !== null) {
        dispatch({
            type: 'REDUCE_HP',
            damage: damageToDeal,
            trainerType: TRAINER_TYPES.PLAYER
        });
    }
};

const calculateResults = () => {};



const pkmnHasPriorityGreaterThan = (playerPkmn, opponentPkmn) => {
    let playerPriority = 0;
    let opponentPriority = 0;

    if(playerPkmn.stats.spd > opponentPkmn.stats.spd) {
        playerPriority++;
    } else {
        opponentPriority++;
    }

    /**
     * TODO - Other ways to affect priority logic go here
     * Stat affecting moves (Growl, Tail Whip)
     * Moves like Quick Attack that always get priority
     */

     return playerPriority > opponentPriority;
};
