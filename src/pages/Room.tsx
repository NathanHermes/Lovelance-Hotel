import { findAll, deleteById, save, update } from "../api/quartos/Room";
import { Header, PageNames } from "../components/Header";
import { validateAuth } from "../utils/validateAuth";
import { RoomModel } from "../api/quartos/RoomModel";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { useEffect, useState } from "react";
import { Table, Titles } from "../components/Table";
import toast, { Toaster } from "react-hot-toast";

export function Room() {
  const [rooms, setRooms] = useState([]);
  const _columnTitles = ["ID", "Diária", "Tipo de cama", "Tipo de quarto"];
  const navigate = useNavigate();

  useEffect(() => {
    validateAuth(navigate);
    loadRooms();
  }, [navigate]);

  const loadRooms = () => {
    findAll().then((response) => {
      const roomsData = response.data.map((room: RoomModel) => {
        return {
          id: room.id,
          dailyValue: room.dailyValue,
          bedType: room.bedType,
          roomType: room.roomType,
        };
      });

      setRooms(roomsData);
    });
  };

  const createRoom = (room: RoomModel) => {
    save(room)
      .then(() => {
        toast.success("Quarto cadastrado.");
        loadRooms();
      })
      .catch(() => {
        toast.error(
          "Não foi possivel cadastrar o quarto.\nTente novamente mais tarde."
        );
      });
  };

  const updateRoom = (room: RoomModel) => {
    update(room)
      .then(() => {
        toast.success("Quarto atualizado.");
        loadRooms();
      })
      .catch(() => {
        toast.error(
          "Não foi possivel atualizar o quarto.\nTente novamente mais tarde."
        );
      });
  };

  function deleteRoom(id: string) {
    deleteById(id)
      .then(() => {
        toast.success("Quarto apagado.");
        loadRooms();
      })
      .catch(() => {
        toast.error(
          "Não foi possivel apagar o quarto.\nTente novamente mais tarde."
        );
      });
  }

  return (
    <>
      <Navbar pathActive={"/room"} />

      <main className="flex flex-col gap-10 items-center justify-center w-full ">
        <Header title={PageNames.ROOM} action={createRoom} />

        <Table
          title={Titles.ROOM}
          columnTitles={_columnTitles}
          data={rooms}
          editFunction={updateRoom}
          deleteFunction={deleteRoom}
        />
      </main>

      <Toaster position="top-right" />
    </>
  );
}
