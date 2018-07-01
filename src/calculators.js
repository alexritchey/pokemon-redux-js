import { getAttackStatTypeFromCategory, getDefenseStatTypeFromCategory } from "./helpers";
import typeChart from './data/typechart';

// See https://bulbapedia.bulbagarden.net/wiki/Damage
export const calculateDirectDamage = (attackingPkmn, defendingPkmn) => {
    const move = attackingPkmn.nextMove;
    const { basePower, category } = move;
    const levelModifier = ((2 * attackingPkmn.level) / 5) + 2;

    const attackDefenseModifier =
        attackingPkmn.stats[getAttackStatTypeFromCategory(category)] /
        defendingPkmn.stats[getDefenseStatTypeFromCategory(category)];
    
    /** TODO: Many modifiers that could be implemented. Critical, STAB, Burn most important */
    const random = calculateRandomModifier();

    const modifier = 1 * random;

    return Math.round(((levelModifier * basePower * attackDefenseModifier) / 50 + 2) * modifier);
}


export const compareTypes = (attackType, defenseType) => typeChart[defenseType][attackType];

export const calculateRandomModifier = () => (Math.random() * (0.85 - 1.00) + 1.00).toFixed(4);

export const calculateHitOrMissChance = (moveAccuracy, accuracy, evasion) => moveAccuracy * (accuracy / evasion);
