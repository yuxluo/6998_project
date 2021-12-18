import React, { useState, useEffect } from 'react';
import TinderCard from "react-tinder-card";
import "./TeamderCard.css";
import database from "./firebase.js";



function TeamderCards() {

    const [people, setPeople] = useState([]);

    useEffect(() => {
        database.collection('people')
            .onSnapshot(snapshot => (
                setPeople(snapshot.docs.map(doc => doc.data()))
            ))
    }, []);


    return (
        <div>
            <div className="tinderCard__cardContainer">
                {people.map((person) => (
                    <TinderCard
                        className="swipe"
                        key={person.name}
                        preventSwipe={["up", "down"]}
                    >
                        <div
                            className="card"
                            style={{ backgroundImage: `url(${person.url})` }}
                        >
                            <h3>{person.name}</h3>
                        </div>
                    </TinderCard>
                ))}
            </div>
        </div>
    );
}

export default TeamderCards
