import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { MoveLeft, MoveRight } from "lucide-react";
import "swiper/css";
import LiquidButton from "./LiquidButton";

import Sylvia from "../assets/images/team/SylviaGon.jpeg";
import Viktor from "../assets/images/team/ViktorIhnatiev.jpeg";
import Lluis from "../assets/images/team/LluisEspinosa.jpeg";
import Jana from "../assets/images/team/JanaTransition.jpeg";

type Card = {
  id: number;
  name: string;
  role: string;
  image?: string;
};

const cards: Card[] = [
  {
    id: 1,
    name: "Ona di Stefano",
    role: "Fundadora y estrategia de marca",
  },
  {
    id: 2,
    name: "Sylvia Gon",
    role: "Diseño de marca y presencia digital",
    image: Sylvia,
  },
  {
    id: 3,
    name: "Daniela Rojas",
    role: "Edición de video y creación de contenido",
  },
  {
    id: 4,
    name: "Viktor Ihnatiev",
    role: "Desarrollo web y automatización de procesos",
    image: Viktor,
  },
  {
    id: 5,
    name: "Ani Basualdo",
    role: "Terapia integral y automatización de procesos",
  },
  {
    id: 6,
    name: "Lluis Espinosa",
    role: "Terapia en biodescodificación y transgeneracional",
    image: Lluis,
  },
  {
    id: 7,
    name: "Fernando Respira",
    role: "Instructor de breathwork y bienestar metabólico",
  },
  {
    id: 8,
    name: "Jana Transition",
    role: "Facilitadora de meditación y transformación energética",
    image: Jana,
  },
  {
    id: 9,
    name: "Laura Kattar",
    role: "Especialista en yoga y en bienestar integral",
  },
];

function Slider() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className="mx-auto w-full min-w-0 max-w-[1308px]">
      <Swiper
        modules={[Mousewheel]}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        mousewheel={{ releaseOnEdges: true }}
        spaceBetween={72}
        breakpoints={{
          0: { slidesPerView: 1, slidesPerGroup: 1 },
          640: { slidesPerView: 2, slidesPerGroup: 2 },
          1024: { slidesPerView: 3, slidesPerGroup: 3 },
        }}
      >
        {cards.map((card) => (
          <SwiperSlide key={card.id}>
            {card.image ? (
              <img
                src={card.image}
                alt={card.name}
                className="h-[420px] w-full rounded-4xl object-cover"
              />
            ) : (
              <div className="h-[420px] w-full rounded-4xl bg-gray-300" />
            )}
            <div className="mt-[33px] text-center text-[22px]">
              <h3>{card.name}</h3>
              <p className=" mx-auto max-w-[380px]">{card.role}</p>
            </div>
            <div className="mt-[37px] flex justify-center gap-8">
              <LiquidButton className="px-3 py-2.5 text-[13px]">
                Más información
              </LiquidButton>
              <LiquidButton className="px-8.75 py-2.5 text-[13px] border-(--accent-green)/50! bg-(--accent-green)/10! text-(--accent-green) hover:bg-(--accent-green)/20! hover:border-(--accent-green)! active:bg-(--accent-green)/30!">
                Servicios
              </LiquidButton>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="mt-7.5 flex justify-end gap-4">
        <LiquidButton
          ariaLabel="Back"
          className="flex size-12 items-center justify-center"
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <MoveLeft size={24} strokeWidth={1.5} />
        </LiquidButton>
        <LiquidButton
          ariaLabel="Next"
          className="flex size-12 items-center justify-center"
          onClick={() => swiperRef.current?.slideNext()}
        >
          <MoveRight size={24} strokeWidth={1.5} />
        </LiquidButton>
      </div>
    </div>
  );
}

export default Slider;
