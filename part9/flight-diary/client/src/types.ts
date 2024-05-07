interface Diary {
    id: string;
    date: string;
    weather: string;
    visibility: string;
}

type DiaryDraft = Omit<Diary, 'id'> & { comment: string }
export type { Diary, DiaryDraft }