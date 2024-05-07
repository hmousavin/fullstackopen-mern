import axios from 'axios'
import { Diary, DiaryDraft } from '../types'

const baseUrl = 'http://localhost:3000/'

const getAllDiaries = async (): Promise<Diary[]> => {
    const url = `${baseUrl}api/diaries`
    const { data } = await axios.get<Diary[]>(url)
    return data
}

const postNewDiary = async (diary: DiaryDraft): Promise<Diary> => {
    const url = `${baseUrl}api/diaries`
    const response = await axios.post<Diary>(url, diary)
    const { data } = response
    return data
}

export { getAllDiaries, postNewDiary }
