import { FormEvent, useEffect, useState } from "react"
import Diaries from "./components/Diaries"
import * as diaryServices from "./services/diaryServices"
import { Diary, DiaryDraft } from "./types";
import NewDiary from "./components/NewDiary";
import axios from "axios";

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([])
  const [notification, setNotification] = useState<string>('')
  useEffect(() => {
    diaryServices.getAllDiaries().then(d => setDiaries(d))
  })

  const submitNewDiary = (event: FormEvent) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const diary: DiaryDraft = {
      date: formData.get('selected-date') as string,
      weather: formData.get('selected-weather') as string,
      visibility: formData.get('selected-visibility') as string,
      comment: formData.get('typed-comment') as string
    };

    diaryServices
      .postNewDiary(diary)
      .then(d => setDiaries([...diaries, d]))
      .catch(e => {
        if (axios.isAxiosError(e))
          setNotification(e.response?.data);
        else
          setNotification(e);

        setTimeout(() => {
          setNotification('');
        }, 3000);
      })
  }

  return (
    <main>
      <NewDiary submitCallback={submitNewDiary} notification={notification} />
      <br />
      <Diaries diaries={diaries} />
    </main>
  )
}

export default App