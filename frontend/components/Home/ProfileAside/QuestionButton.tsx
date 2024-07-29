"use client";

import css from "./questionButton.module.css"
import Link from "next/link";
import { QuestionInterface } from "@/types/application";

interface Props {
  question: QuestionInterface
}
export default function QuestionButton({question}:Props) {


  return (
    <>
      {question.is_answer ? (
        <Link 
          className={`${css["question"]} ${css["box"]}`} 
          href={"/response?uid="+question?.uid}
        >
          <p className="text-lg">Responder palavras memorizadas</p>
        </Link>
      ) : (
        <Link 
          className={`${css["question"]} ${css["box"]}`} 
          href={"/question?uid="+question?.uid}
        >
          <p className="text-lg">Palavras aguardando para ser memorizadas</p>
        </Link>
      )}
    </>
  );
}
