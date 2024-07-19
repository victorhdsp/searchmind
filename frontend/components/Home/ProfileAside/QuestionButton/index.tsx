"use client";

import css from "./questionButton.module.css"
import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/api";

export default function QuestionButton() {
  const [question, setQuestion] = useState<any|null>(null);

  useEffect(() => {
    (async () => {
     const questionResponse = await api.getQuestion()
      if (questionResponse.status) {
        setQuestion(questionResponse.question)
      }
    })()
  }, [])

  return (
    <>{question ? (
        <Link 
            className={`${css["question"]} ${css["box"]}`} 
            href={`/question?uid=${question.uid}`}
        >
            <p className="text-lg">
                Aguardando resposta
            </p>
        </Link>
    ) : (
        <div 
            className={`${css["no-question"]} ${css["box"]}`}
        >
            <p className="text-lg">
                Sem palavras para lembrar
            </p>
        </div> 
    )}</>
  );
}
