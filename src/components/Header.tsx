import { FiSearch } from "react-icons/fi";
import { RoomModal } from "./Modals/RoomModal";
import { RoomModel } from "../api/quartos/RoomModel";

interface HeaderProps {
  title: PageNames;
  inputs?: Array<string>;
  action: (room: RoomModel) => void;
}

export enum PageNames {
  BOOKING = "Reserva",
  CLIENT = "Hóspede",
  ROOM = "Quarto",
}

export function Header({ title, action }: HeaderProps) {
  function setCreateModal() {
    switch (title) {
      case PageNames.BOOKING:
        break;
      case PageNames.CLIENT:
        break;
      case PageNames.ROOM:
        return <RoomModal isEdit={false} action={action} />;
      default:
        break;
    }
  }

  return (
    <header className="flex items-end justify-center w-full">
      <div className="flex flex-col gap-3 items-start justify-center w-full">
        <h1 className="font-black text-xl">{title}s</h1>

        <p className="text-base text-zinc-700">
          Gerencie {title === "Reserva" ? "todas as" : "todos os"}{" "}
          <span className="lowercase">{title}s</span> existentes ou adicione{" "}
          {title === "Reserva" ? "novas" : "novos"}{" "}
          <span className="lowercase">{title}s</span>.
        </p>
      </div>

      <div className="flex gap-3 items-center justify-end">
        {title === "Hóspede" && (
          <div className="border-2 border-zinc-300 flex gap-2 items-center justify-center py-2 px-3 rounded-lg">
            <FiSearch size={18} className="text-zinc-500" />

            <input
              type="text"
              name="search"
              id="search"
              placeholder="Busque aqui"
              className="bg-zinc-50 outline-0 placeholder-zinc-500 rounded-lg text-zinc-900"
            />
          </div>
        )}

        {setCreateModal()}

        {/* <button className="bg-amber-500 flex gap-2 items-center justify-center px-3 py-2 rounded-lg font-bold whitespace-nowrap">
          <FiPlus size={18} className="text-zinc-900" />
          Add <span className="lowercase">{title}</span>
        </button> */}
      </div>
    </header>
  );
}
