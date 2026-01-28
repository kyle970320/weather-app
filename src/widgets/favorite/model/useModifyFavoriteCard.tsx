import { useState } from "react";
import type { Favorite } from "@/entity/favorite";

interface Props {
  favorite: Favorite;
}
export const useModifyFavoriteCard = ({ favorite }: Props) => {
  const [editingAddress, setEditingAddress] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const isOpenEditMode = editingAddress === favorite.addressName;
  const onClickEdit = () => {
    setEditingAddress(favorite.addressName);
    setEditName(favorite.nickname);
  };

  const onClickCancel = () => {
    setEditingAddress(null);
    setEditName("");
  };

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditName(e.target.value);
  };

  return {
    isOpenEditMode,
    editName,
    onChangeName,
    onClickEdit,
    onClickCancel,
  };
};
