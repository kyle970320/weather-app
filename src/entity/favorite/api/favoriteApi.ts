import type { Favorite } from "../types";

export const STORAGE_KEY = "weatherApp-favorites";

const loadFavorites = (): Favorite[] => {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed as Favorite[];
  } catch (error) {
    console.error("Failed to load favorites from localStorage", error);
    return [];
  }
};

const saveFavorites = (favorites: Favorite[]): void => {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error("Failed to save favorites to localStorage", error);
  }
};

export const getFavorites = (): Favorite[] => {
  return loadFavorites();
};

export const addFavorite = (favorite: Favorite): Favorite[] => {
  const current = loadFavorites();

  if (current.some((item) => item.addressName === favorite.addressName)) {
    return current;
  }

  const updated = [...current, favorite];
  saveFavorites(updated);
  return updated;
};

export const removeFavorite = (addressName: string): Favorite[] => {
  const current = loadFavorites();
  const updated = current.filter((item) => item.addressName !== addressName);
  saveFavorites(updated);
  return updated;
};

export const updateFavorite = (favorite: Favorite): Favorite[] => {
  const current = loadFavorites();
  const updated = current.map((item) =>
    item.addressName === favorite.addressName ? favorite : item,
  );
  saveFavorites(updated);
  return updated;
};

export const isFavorite = (addressName: string): boolean => {
  const current = loadFavorites();
  return current.some((item) => item.addressName === addressName);
};
