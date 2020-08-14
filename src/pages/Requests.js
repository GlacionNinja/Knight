import React, { Component } from 'react'
import styled from 'styled-components'

export default class Requests extends Component {
    render() {
        return (
            <StyledDiv>
                <div className="container">
                    <h2>No community surveys are up yet.</h2>
                    <h2>Come back later to decide how the game turns out!</h2>
                </div>
            </StyledDiv>
        )
    }
}

const StyledDiv = styled.div` {
    .container {
        padding: 12em;
        color: var(--whites);
        text-align: center;
    }

    h2 {
        font-size: 2em;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        padding: 0.4em 0em;
    }
}`;
