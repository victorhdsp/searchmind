"use client";

import ProfileAside from "@/components/Home/ProfileAside";
import ProfileSettings from "@/components/Home/ProfileSettings";
import { useEffect, useState } from "react";
import { QuestionInterface } from "@/types/application";
import api from "@/lib/api";

export default function Home() {
  const [history, setHistory] = useState<QuestionInterface[]>([]);

  useEffect(() => {
    api.getHistory().then(({status, history}) => {
      if(status) setHistory(history);
    })
  }, [])

  return (
    <main className="w-full min-h-screen">
      <div className="grid grid-cols-3 h-screen">
        <h2 className="col-span-2 flex justify-center items-center">
          Em breve
        </h2>
        <ProfileAside />
      </div>
    </main>
  );
}
