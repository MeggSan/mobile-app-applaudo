import {api} from '@networking/Axios';

const URL = 'manga';

export const getMangaList = (params) => api.get(`${URL}`, {params});

export const getMangaDetail = (mangaId: number) => api.get(`${URL}/${mangaId}`);

export const getMangaChaptersList = (mangaId: number, params) =>
  api.get(`${URL}/${mangaId}/chapters`, {params});

export const getMangaCharactersList = (mangaId: number, params) =>
  api.get(`${URL}/${mangaId}/manga-characters`, {params});

export const getMangaCharacterDetail = (mangaCharacterId: number) =>
  api.get(`${URL}-characters/${mangaCharacterId}/character`);
