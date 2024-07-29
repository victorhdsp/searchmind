"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Settings2 } from "lucide-react";
import css from "./questionButton.module.css"
import QuestionButton from "./QuestionButton";

import { useEffect, useState } from "react";
import { QuestionInterface } from "@/types/application";
import api from "@/lib/api";
import ProfileSettings from "../ProfileSettings";

export default function ProfileAside() {
  const [question, setQuestion] = useState<QuestionInterface>();

  useEffect(() => {
    api.getQuestion().then(({status, question}) => {
      if (status) setQuestion(question);
    })
  }, [])

  return (
    <div className="
        bg-background
        flex flex-col gap-8
        h-full
        p-8
    ">
        <div className="flex justify-between">
            <h2>Perfil</h2>
            <ProfileSettings />
        </div>
        {/* <div className="flex gap-4 items-center">
        <h4>01</h4>
        <Progress value={50} />
        </div> */}
        <h4>Em breve</h4>
        
        {question ? (
          <QuestionButton question={question} />
        ) : (
          <div className={`${css["no-question"]} ${css["box"]}`}>
            <p className="text-lg">Sem palavras para memorizar</p>
          </div>
        )}
    </div>
  );
}
