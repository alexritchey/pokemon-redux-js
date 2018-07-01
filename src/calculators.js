import { getAttackStatTypeFromCategory, getDefenseStatTypeFromCategory } from "./helpers";

// See https://bulbapedia.bulbagarden.net/wiki/Damage
export const calculateDirectDamage = (pkmnA, pkmnB) => {
    const move = pkmnA.nextMove;
    const { basePower, category } = move;
    const levelModifier = ((2 * pkmnA.level) / 5) + 2;

    const attackDefenseModifier =
        pkmnA.stats[getAttackStatTypeFromCategory(category)] /
        pkmnB.stats[getDefenseStatTypeFromCategory(category)];
    
    /** TODO: Many modifiers that could be implemented. Critical, STAB, Burn most important */
    const random = calculateRandomModifier();
    console.log(random);
    const modifier = 1 * random;

    return Math.round(((levelModifier * basePower * attackDefenseModifier) / 50 + 2) * modifier);
}

export const calculateRandomModifier = () => (Math.random() * (0.85 - 1.00) + 1.00).toFixed(4);
