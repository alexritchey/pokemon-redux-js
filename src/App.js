import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';

class App extends Component {
    render() {
        const { player, opponent } = this.props;
        return (
            <div className="App">
                <p>{`${player.name} sends out ${player.activePkmn.name}`}</p>
                <p>{`${opponent.name} sends out ${opponent.activePkmn.name}`}</p>
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

export default connect(mapStateToProps)(App);
