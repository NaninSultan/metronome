import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import click from "../sound/click.wav";

const Metronome = () => {

    const [button, setButton] = useState(false);
    const [bpm, setBpm] = useState(100);

    let sound = useMemo(() => new Audio(click), []);
    const delay = 60000 / bpm;
    const timer = useRef();


    const ChangeHandler = (e) => {
        setBpm(e.target.value);
    }


    const ButtonHandler = () => {
        if(!button) {
            setButton(true);
            timer.current = setInterval(PlaySound, delay);
            PlaySound();
        } else {
            clearInterval(timer.current);
            setButton(false);
        }
    }

    const PlaySound = useCallback(() => {
       sound.play();
    }, [sound]);

    useEffect(() => {
    
        if(!button) {
            clearInterval(timer.current);
        } else {
            clearInterval(timer.current);
            timer.current = setInterval(PlaySound, delay);
        }
    }, [bpm, button, delay, PlaySound])

    return (
        <div className="metronome">
            <h1>METRONOME</h1>
            <h2>{bpm} BPM</h2>
            <input type="range"
                    min="40"
                    max="200"
                    value={bpm}
                    onChange={ChangeHandler} />
            <br />
            <button onClick={ButtonHandler}>{button ? 'Stop' : 'Start'}</button>
        </div>
    )
}

export default Metronome;