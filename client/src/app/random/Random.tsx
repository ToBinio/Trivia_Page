import React, {Component, useEffect} from 'react';
import QuizPart, {QuizElement} from "../QuizPart";

class Random extends Component<{},myState> {

    constructor() {
        super({});

        useEffect(() => {
            fetchData().then(value => this.setState({data: value})
            )
        }, [])

    }

    render() {
        return (
            <div>
                <h3>Random</h3>
                {this.state.data.map(value => <QuizPart category={value.category} question={value.question}/>)}
            </div>
        );
    }
}

export default Random;

async function fetchData(): Promise<QuizElement[]> {
    let response = await fetch("https://opentdb.com/api.php?amount=10");
    let json = await response.json()

    let questions: QuizElement[] = []

    for (let i = 0; i < json.results.length; i++) {
        let question = json.results[i];

        questions.push({question: question.question, category: question.category})

    }

    return questions
}

type myState = {
    data : QuizElement[]
}