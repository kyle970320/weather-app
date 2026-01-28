import { useState } from "react";
import type { Favorite } from "@/entity/favorite";
import {
  getFavorites,
  addFavorite,
  removeFavorite,
  updateFavorite,
  isFavorite,
} from "@/entity/favorite";
import { Snackbar } from "@minus-ui/core";

export const useFavorite = () => {
  const [favorites, setFavorites] = useState<Favorite[]>(() => getFavorites());

  const addFavoriteItem = (favorite: Favorite) => {
    if (favorites.length >= 6) {
      Snackbar.show({
        message: "즐겨찾기는 최대 6개까지 등록할 수 있습니다.",
        type: "error",
      });
      return;
    }
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
