import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { dispatchMoveSelected } from './core/actions';
import { getIsCombatPhase } from './core/reducers/selectors';

class App extends Component {
    constructor(props, context) {
        super(props, context);
    }
    
    render() {
        const { player, opponent } = this.props;

        return (
            <div className="App">
                <p>{`${player.name} sends out ${player.activePkmn.data.species}`}</p>
                <p><strong>{`${player.activePkmn.stats.hp} HP`}</strong></p>
                <br/>
                {player.activePkmn.moveSet.map((move) => {
                    return (
                        <button
                            onClick={() => this.props.dispatchMoveSelected(move)}
                            key={move.canonical}
                            disabled={this.props.isCombatPhase}
                        >
                            {move.name}
                        </button>
                    );
                })}

                <p>{`${opponent.name} sends out ${opponent.activePkmn.data.species}`}</p>
                <strong>{`${opponent.activePkmn.stats.hp} HP`}</strong>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { player, opponent } = state.trainers;

    return {
        isCombatPhase: getIsCombatPhase(state),
        player: {
            ...player,
            activePkmn: player.pkmn[0]
        },
        opponent: {
            ...opponent,
            activePkmn: opponent.pkmn[0]
        }
    };
};

export default connect(mapStateToProps, { dispatchMoveSelected })(App);
