import { TRAINER_TYPES } from '../../constants.js';
import { getPlayerActivePkmn, getOpponentActivePkmn } from '../reducers/selectors';
import { calculateDirectDamage, calculateHitOrMissChance } from '../../calculators.js';
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

    dispatch(beginTurn(playerActivePkmn, opponentActivePkmn, true));

    state = getState();
    playerActivePkmn = getPlayerActivePkmn(state);
    opponentActivePkmn = getOpponentActivePkmn(state);

    dispatch(beginTurn(playerActivePkmn, opponentActivePkmn, false));

    // dispatch(calculateResults());
    dispatch({
        type: 'END_COMBAT_PHASE'
    })
};

const beginTurn = (playerActivePkmn, opponentActivePkmn, isFirstTurn) => (dispatch) => {
    if(!playerActivePkmn.isFainted && !opponentActivePkmn.isFainted) {
        let pkmnWithPriority = getPkmnWithPriority(playerActivePkmn, opponentActivePkmn);
        let pkmnWithoutPriority = pkmnWithPriority.trainer === playerActivePkmn.trainer ?
            opponentActivePkmn :
            playerActivePkmn;

        let attackingPkmn, defendingPkmn;

        if (isFirstTurn) {
            attackingPkmn = pkmnWithPriority;
            defendingPkmn = pkmnWithoutPriority;
        } else {
            attackingPkmn = pkmnWithoutPriority;
            defendingPkmn = pkmnWithPriority;
        }
        let damageToDeal = 0;

        const { nextMove, accuracy } = attackingPkmn;
        const { evasion } = defendingPkmn;

        const finalAccuracy = calculateHitOrMissChance(nextMove.accuracy, accuracy, evasion);

        if ((Math.random() * 100) < finalAccuracy) {
            damageToDeal = calculateDirectDamage(attackingPkmn, defendingPkmn);

            if (damageToDeal !== null) {
                dispatch({
                    type: 'REDUCE_HP',
                    damage: damageToDeal,
                    trainerType: defendingPkmn.trainer
                });
            }
        } else {
            dispatch({
                type: 'ATTACK_MISSED'
            });
        }
    }
};

const getPkmnWithPriority = (pkmnA, pkmnB) => {
    let pkmnWithPriority;

    if(pkmnA.stats.spe > pkmnB.stats.spe) {
        pkmnWithPriority = pkmnA;
    } else {
        pkmnWithPriority = pkmnB;
    }

    /**
     * TODO - Other ways to affect priority logic go here
     * Stat affecting moves (Growl, Tail Whip)
     * Moves like Quick Attack that always get priority
     */

     return pkmnWithPriority;
};
