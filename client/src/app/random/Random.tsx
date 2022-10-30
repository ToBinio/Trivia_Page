import React, {useEffect, useState} from 'react';
import QuizPart, {QuizElement} from "../QuizPart";
import Cookies from 'js-cookie'
import "./Random.scss"

function Random() {

    const [data, setData] = useState([] as QuizElement[]);
    const [avg, setAvg] = useState(1);

    useEffect(() => {
        setData([])

        addQuestion().then()
        addQuestion().then()
        addQuestion().then()
        addQuestion().then()
        addQuestion().then()

        setAvg(Number(Cookies.get("last100avg")) || 100)

    }, [])


    function handleAnswerQuestion(value: String, answerWasCorrect: boolean) {

        let count = +(Number(Cookies.get("last100avgCount")) || 0);

        let newAvg = (+(Cookies.get("last100avg") || 0) * count + (answerWasCorrect ? 100 : 0)) / (count + 1);

        setAvg(newAvg)

        Cookies.set("last100avg", String(newAvg))
        Cookies.set("last100avgCount", String(Math.min(count + 1, 99)))

        setTimeout(function () {
            addQuestion().then(() => {
                let index = data.findIndex(value1 => value1.question == value);

                data.splice(index, 1);

                setData([...data])
            })
        }, 2000)
    }

    async function addQuestion() {
        let quizElements = await fetchData(handleAnswerQuestion);
        data.push(quizElements[0])
        setData([...data])
    }

    return (
        <div>
            <h2>Random Trivia</h2>
            <hr/>
            {data.map((value) => <QuizPart value={value} key={value.question}/>)}
        </div>
    )
}

export default Random;

async function fetchData(handleAnswerQuestionCallback: (value: String, answerWasCorrect: boolean) => void): Promise<QuizElement[]> {
    let response = await fetch("https://opentdb.com/api.php?amount=1&difficulty=easy");
    let json = await response.json()

    let questions: QuizElement[] = []

    for (let i = 0; i < json.results.length; i++) {
        let question = json.results[i];

        questions.push({
            correctAnswer: question.correct_answer,
            incorrectAnswers: question.incorrect_answers,
            question: question.question,
            category: question.category,
            handleAnswerQuestionCallback: handleAnswerQuestionCallback
        })

    }

    return questions
}