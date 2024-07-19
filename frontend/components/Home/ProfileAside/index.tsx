"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Settings2 } from "lucide-react";
import QuestionButton from "./QuestionButton";

export default function ProfileAside() {
  return (
    <div className="
        bg-background
        flex flex-col gap-8
        h-full
        p-8
    ">
        <div className="flex justify-between">
            <h2>Perfil</h2>
            <Button className="bg-zinc-200" variant="link" size="icon">
                <Settings2 className="text-black" size={20} />
            </Button>
        </div>
        {/* <div className="flex gap-4 items-center">
        <h4>01</h4>
        <Progress value={50} />
        </div> */}
        <h4>Em breve</h4>
        <QuestionButton />
    </div>
  );
}
