import { TRAINER_TYPES } from '../../constants.js';

export const getTrainerPkmnById = (state, id, trainerType) => {
    const trainer = state.trainers[trainerType];
    
    return trainer.pkmn.find(pkmn => {
        return pkmn.uuid === id;
    });
};

export const getIsCombatPhase = state => state.isCombatPhase;

/**
 * TODO: Add logic to determine active pokemon, just pull first for now
 */
export const getOpponentActivePkmn = state => state.trainers[TRAINER_TYPES.OPPONENT].pkmn[0];
export const getPlayerActivePkmn = state => state.trainers[TRAINER_TYPES.PLAYER].pkmn[0];

