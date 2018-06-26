import { TRAINER_TYPES } from ".";

export const getTrainerPkmnById = (id, trainerType) => {
    const trainer = state.trainers[trainerType];
    
    return trainer.pkmn.find(pkmn => {
        return pkmn.uuid === id;
    });
};

/**
 * TODO: Add logic to determine active pokemon, just pull first for now
 */
export const getOpponentActivePkmn = () => state.trainers[TRAINER_TYPES.OPPONENT].pkmn[0];
export const getPlayerActivePkmn = () => state.trainers[TRAINER_TYPES.PLAYER].pkmn[0];