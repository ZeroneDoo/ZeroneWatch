import axios from "axios"

const BASE_URL = "https://aniyoi-api.vercel.app/kuramanime"

export const popularAnimes = async () => {
    const response = await axios.get(BASE_URL+"/popular")

    return response.data
}

export const detailAnime = async (slug) => {
    const response = await axios.get(`${BASE_URL}/anime/${slug}`)

    return response.data
}

export const detailEpisode = async (slug, eps) => {
    const response = await axios.get(`${BASE_URL}/anime/${slug}/${eps}`)

    return response.data
}

export const searchAnime = async (keyword) => {
    const response = await axios.get(`${BASE_URL}/search?query=${keyword}`)

    return response.data
}

export const genres = async () => {
    const response = await axios.get(`${BASE_URL}/genre`)

    return response.data
}

export const detailGenre = async (slug) => {
    const response = await axios.get(`${BASE_URL}/genre/${slug}`)

    return response.data
}