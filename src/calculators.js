
// See https://bulbapedia.bulbagarden.net/wiki/Damage
export const calculateDirectDamage = (pkmnA, pkmnB) => {
    const move = pkmnA.nextMove;
    const { power, type, compareToType } = move;
    
    const levelModifier = ((2 * pkmnA.level) / 5) + 2;
    const attackDefenseModifier = pkmnA.stats[type] / pkmnB.stats[compareToType];
    
    /** TODO: Many modifiers that could be implemented. Critical, STAB, Burn most important */
    const modifier = 1;

    return Math.round(((levelModifier * power * attackDefenseModifier) / 50 + 2) * modifier);
}
