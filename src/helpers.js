import { STAT_TYPES, CATEGORY_TYPES } from "./constants";

export const getAttackStatTypeFromCategory = (category) => {
    if (category === CATEGORY_TYPES.PHYSICAL) {
        return STAT_TYPES.ATK;
    }
    else if (category === CATEGORY_TYPES.SPECIAL) {
        return STAT_TYPES.SPATK;
    }
};

export const getDefenseStatTypeFromCategory = (category) => {
    if (category === CATEGORY_TYPES.PHYSICAL) {
        return STAT_TYPES.DEF;
    }
    else if (category === CATEGORY_TYPES.SPECIAL) {
        return STAT_TYPES.SPDEF;
    }
};