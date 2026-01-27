import { useState } from "react";
import type { Favorite } from "@/entity/favorite";
import {
  getFavorites,
  addFavorite,
  removeFavorite,
  updateFavorite,
  isFavorite,
} from "@/entity/favorite";

export const useFavorite = () => {
  const [favorites, setFavorites] = useState<Favorite[]>(() => getFavorites());

  const addFavoriteItem = (favorite: Favorite) => {
    const updated = addFavorite(favorite);
    setFavorites(updated);
  };

  const removeFavoriteItem = (addressName: string) => {
    const updated = removeFavorite(addressName);
    setFavorites(updated);
  };

  const updateFavoriteItem = (favorite: Favorite) => {
    const updated = updateFavorite(favorite);
    setFavorites(updated);
  };

  const isFavoriteItem = (addressName: string) => {
    return isFavorite(addressName);
  };
  return {
    favorites,
    isFavoriteItem,
    addFavoriteItem,
    removeFavoriteItem,
    updateFavoriteItem,
  };
};
