import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { dispatchMoveSelected } from './core/actions';

class App extends Component {
    constructor(props, context) {
        super(props, context);
    }
    
    render() {
        const { player, opponent } = this.props;

        return (
            <div className="App">
                <p>{`${player.name} sends out ${player.activePkmn.data.name}`}</p>
                {player.activePkmn.moveSet.map((move) => {
                    return (
                        <button
                            onClick={() => this.props.dispatchMoveSelected(move)}
                            key={move.canonical}
                        >
                            {move.display}
                        </button>
                    );
                })}

                <p>{`${opponent.name} sends out ${opponent.activePkmn.data.name}`}</p>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { player, opponent } = state.trainers;

    return {
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
