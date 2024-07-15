import React, { useEffect, useState } from "react";
import { useSnapshot } from "valtio";
import state from "../../store";
import CustomButton from "../ui/CustomButton";

const Favourites = () => {
  const snap = useSnapshot(state);
  const [editing, setEditing] = useState(false);
  const [userName, setUserName] = useState(snap.userName);

  useEffect(() => {
    // Можно сделать запрос для получения дополнительной информации о пользователе
  }, []);

  const handleEditProfile = () => {
    if (editing) {
      // Логика сохранения изменений профиля
      state.userName = userName;
    }
    setEditing(!editing);
  };

  const handleLogout = () => {
    // Логика выхода из аккаунта
    state.email = null;
    state.userName = null;
    // Дополнительно, если нужно, можно разлогинить пользователя в Firebase
    auth.signOut();
  };

  return (
    <div className="container mx-auto my-10 p-5 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-5">Личный кабинет</h2>
      <div className="mb-5">
        <p>
          <strong>Email:</strong> {snap.email}
        </p>
        <p>
          <strong>Баланс:</strong> {snap.balance} рублей
        </p>
        <p>
          <strong>Имя:</strong>
          {editing ? (
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="border ml-2 p-1 rounded"
            />
          ) : (
            <span className="ml-2">{snap.userName}</span>
          )}
        </p>
      </div>
      <div className="flex gap-4">
        <CustomButton
          type="filled"
          title={editing ? "Сохранить" : "Редактировать профиль"}
          handleClick={handleEditProfile}
          customStyles="w-full px-4 py-2.5 font-bold text-sm"
        />
        <CustomButton
          type="outline"
          title="Выйти"
          handleClick={handleLogout}
          customStyles="w-full px-4 py-2.5 font-bold text-sm"
        />
      </div>
    </div>
  );
};

export default Favourites;
