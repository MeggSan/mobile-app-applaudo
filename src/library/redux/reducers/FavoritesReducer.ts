import {FAVORITES_TYPES} from '@redux/types/FavoritesTypes';

const {
  ADD_ANIME_FAVORITES,
  ADD_MANGA_FAVORITES,
  ADD_ANIME_FAVORITE,
  ADD_MANGA_FAVORITE,
  REMOVE_ANIME_FAVORITE,
  REMOVE_MANGA_FAVORITE,
} = FAVORITES_TYPES;

const favoritesInitialState = {
  animeFavorites: [],
  mangaFavorites: [],
};

export const favoritesReducer = (state = favoritesInitialState, action) => {
  const {type, payload} = action;

  switch (type) {
    case ADD_ANIME_FAVORITES:
      return {
        ...state,
        animeFavorites: payload,
      };
    case ADD_MANGA_FAVORITES:
      return {
        ...state,
        mangaFavorites: payload,
      };
    case ADD_ANIME_FAVORITE:
      return {
        ...state,
        animeFavorites: [...state.animeFavorites, payload],
      };
    case ADD_MANGA_FAVORITE:
      return {
        ...state,
        mangaFavorites: [...state.mangaFavorites, payload],
      };
    case REMOVE_ANIME_FAVORITE:
      return {
        ...state,
        animeFavorites: state.animeFavorites.filter(
          (favorite) => favorite.id !== payload,
        ),
      };
    case REMOVE_MANGA_FAVORITE:
      return {
        ...state,
        mangaFavorites: state.mangaFavorites.filter(
          (favorite) => favorite.id !== payload,
        ),
      };
    default:
      return state;
  }
};
