import React, {Component} from 'react';

class QuizPart extends Component<myProps> {
    constructor(props: myProps) {
        super(props);
    }

    render() {
        return (
            <div>
                <h4>{this.props.category}</h4>
                <hr/>
                <p>{this.props.question}</p>
            </div>
        );
    }
}

export default QuizPart;

type myProps = {
    category: string,
    question: string
}

export type QuizElement = {
    category: string;
    question: string;
}

export function createQuizElement(category: string, question: string): QuizElement {
    return {category, question};
}