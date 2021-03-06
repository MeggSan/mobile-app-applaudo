import {api} from '@networking/Axios';

const URL = 'anime';

export const getAnimeList = (params) => api.get(`${URL}`, {params});

export const getAnimeDetail = (animeId: number) => api.get(`${URL}/${animeId}`);

export const getAnimeEpisodesList = (animeId: number, params) =>
  api.get(`${URL}/${animeId}/episodes`, {params});

export const getAnimeCharactersList = (animeId: number, params) =>
  api.get(`${URL}/${animeId}/anime-characters`, {params});

export const getAnimeCharacterDetail = (animeCharacterId: number) =>
  api.get(`${URL}-characters/${animeCharacterId}/character`);
