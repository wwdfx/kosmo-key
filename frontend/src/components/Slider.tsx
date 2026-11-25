import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { ArrowLeft, ArrowRight } from "lucide-react";
import "swiper/css";

import lluis from "../assets/images/team/LluísEspinosa.jpg";

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
    image: lluis,
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
    <div className="mx-auto w-full min-w-0 max-w-[1212px]">
      <Swiper
        modules={[Mousewheel]}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        mousewheel={{ releaseOnEdges: true }}
        spaceBetween={72}
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 3 },
        }}
      >
        {cards.map((card) => (
          <SwiperSlide key={card.id}>
            {card.image ? (
              <img
                src={card.image}
                alt={card.name}
                className="h-[420px] w-full rounded-3xl object-cover"
              />
            ) : (
              <div className="h-[420px] w-full rounded-3xl bg-gray-300" />
            )}
            <div className="mt-4 text-center">
              <h3>{card.name}</h3>
              <p className="mt-1 text-sm">{card.role}</p>
            </div>
            <div className="mt-4 flex justify-center gap-3">
              <button className="cursor-pointer rounded-full border border-white/40 px-5 py-1 text-xs">
                Más información
              </button>
              <button className="cursor-pointer rounded-full border border-[#b0ff32]/50 bg-[#b0ff32]/10 px-5 py-1 text-xs text-[#b0ff32]">
                Servicios
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="mt-7.5 flex justify-end gap-4">
        <button
          className="cursor-pointer"
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <ArrowLeft size={21} />
        </button>
        <button
          className="cursor-pointer"
          onClick={() => swiperRef.current?.slideNext()}
        >
          <ArrowRight size={21} />
        </button>
      </div>
    </div>
  );
}

export default Slider;
