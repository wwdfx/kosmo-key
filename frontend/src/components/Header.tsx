import { Link } from "react-router-dom";
import Logo from "../assets/icons/logo.svg";
import { User, ShoppingBag } from "lucide-react";

function Header() {
  return (
    <header className="flex flex-col gap-2.5  px-[50px]  py-2.5 ">
      <div className="flex justify-between">
        <div></div>
        <div>
          <Link to="/">
            <img src={Logo} alt="Kosmo Key" className="mx-auto w-fit" />
          </Link>
        </div>
        <div className="flex items-center gap-3.5 pr-[15px]">
          <button className="cursor-pointer">
            <User size={34} color="white" />
          </button>
          <button className="cursor-pointer">
            <ShoppingBag size={28} color="white" />
          </button>
        </div>
      </div>
      <ul className="flex justify-between gap-2 text-[12px] uppercase tracking-widest">
        <li>
          <Link to="/servicios">Servicios</Link>
        </li>
        <li>
          <Link to="/terapias">Terapias</Link>
        </li>
        <li>
          <Link to="/programas">Programas</Link>
        </li>
        <li>
          <Link to="/productos">Productos</Link>
        </li>
        <li>
          <Link to="/experiencias">Experiencias</Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
