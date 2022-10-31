import React, {useEffect, useState} from 'react';
import "./QuizPart.scss"

function QuizPart(props: myProps) {

    const [state, setState] = useState(State.PENDING);
    const [possibleAnswers, setPossibleAnswers] = useState([] as string[]);

    useEffect(() => {
        let temp = []
        temp.push(props.value.correctAnswer);

        for (let incorrectAnswer of props.value.incorrectAnswers) {
            temp.push(incorrectAnswer)
        }

        temp.sort()

        setPossibleAnswers(temp)
    }, []);

    function handleClick(answer: string) {

        if (answer === props.value.correctAnswer) {
            setState(State.CORRECT)
            props.value.handleAnswerQuestionCallback(props.value.question,true);
        } else {
            setState(State.INCORRECT)
            props.value.handleAnswerQuestionCallback(props.value.question,false);
        }
    }

    function getClassName(value: string): string {
        if (state === State.PENDING) return "";

        if (value === props.value.correctAnswer) {
            if (state === State.CORRECT) return "correctChosen"
            return "correct"
        }

        return "incorrect"
    }

    return (
        <div className={"quizPart" + " " + (state === State.PENDING ? "" : "finished")} >
            <h4 dangerouslySetInnerHTML={{__html : props.value.question}}></h4>
            <p>{props.value.category}</p>
            <div className={"buttons"}>
                {possibleAnswers.map((value, index) =>
                    <button onClick={() => handleClick(value)} disabled={state !== State.PENDING}
                            className={getClassName(value)} key={value} dangerouslySetInnerHTML={{__html : value}}></button>)}
            </div>
        </div>
    )
}

export default QuizPart;

type myProps = {
    value: QuizElement;
}

export type QuizElement = {
    category: string;
    question: string;
    correctAnswer: string;
    incorrectAnswers: string[];
    handleAnswerQuestionCallback : (value :String, answerWasCorrect : boolean) => void;
}

function shuffle(a: string[]) {
    let j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

enum State {
    PENDING,
    CORRECT,
    INCORRECT
}