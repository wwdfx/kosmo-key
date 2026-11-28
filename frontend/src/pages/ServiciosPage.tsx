import myceliumBg from "../assets/images/backgrounds/mycelium-bg.jpg";
import sproutImg from "../assets/images/sprout.jpg";
import mossImg from "../assets/images/moss.jpg";
import mushroomImg from "../assets/images/mushroom.jpg";

function ServiciosPage() {
  return (
    <>
      <section className="split-section">
        <div className="order-2 flex items-center justify-center px-6 py-10 md:order-1 md:items-end md:pb-[60px] lg:pb-[170px]">
          <p className="max-w-[480px] text-right text-[14px] md:text-[16px] lg:text-[20px] leading-8 md:leading-[2.2] lg:leading-[3]">
            Estrategia de marca para dejar de tomar decisiones a ciegas y
            empieces a construir tu negocio con dirección.
          </p>
        </div>
        <div className="relative order-1 h-[250px] overflow-hidden md:order-2 md:h-auto">
          <img
            src={myceliumBg}
            alt="Mycelium"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <h2 className="absolute inset-0 flex items-center justify-center px-6 text-right font-bold uppercase leading-[1.25] md:px-8 lg:px-16 text-[28px] md:text-[32px] lg:text-[48px]">
            Kosmo architecture
          </h2>
        </div>
      </section>
      <section className="split-section">
        <div className="relative h-[250px] overflow-hidden md:h-auto">
          <img
            src={sproutImg}
            alt="Sprout"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <h2 className="absolute inset-0 flex justify-center items-center px-6 font-bold uppercase leading-[1.25] md:pb-[80px] lg:pb-[260px] md:px-8 lg:px-16 text-[28px] md:text-[32px] lg:text-[48px]">
            Digitalización de negocio
          </h2>
        </div>
        <div className="flex items-center justify-center px-6 py-10">
          <p className="max-w-[650px] text-[14px] text-right md:text-[16px] lg:text-[20px] leading-8 md:leading-[2.2] lg:leading-[3]">
            Transformamos tu negocio en una experiencia digital. Diseñamos tu
            web, desarrollamos tu presencia en redes sociales y conectamos tus
            canales digitales para que tu marca gane visibilidad, llegue a
            nuevas audiencias y crezca en el entorno online.
          </p>
        </div>
      </section>
      <section className="split-section">
        <div className="order-2 flex items-center justify-center px-6 py-10 md:order-1">
          <p className="max-w-[660px] text-[14px] text-right md:text-[16px] lg:text-[20px] leading-6 md:leading-[1.8] lg:leading-[2]">
            Diseñamos una estrategia de comunicación para que tus redes sociales
            trabajen a favor de tu negocio. Definimos tu mensaje, contenido y
            dirección creativa para conectar con tu audiencia, fortalecer tu
            marca y transformar tu presencia digital en oportunidades de
            crecimiento.
          </p>
        </div>
        <div className="relative order-1 h-[250px] overflow-hidden md:order-2 md:h-auto">
          <img
            src={mossImg}
            alt="Moss"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <h2 className="absolute inset-0 flex items-center justify-center px-6 font-bold uppercase leading-[1.25] text-right md:px-8 lg:px-16 text-[28px] md:text-[32px] lg:text-[48px]">
            Estrategia redes sociales
          </h2>
        </div>
      </section>
      <section className="split-section">
        <div className="relative h-[250px] overflow-hidden md:h-auto">
          <img
            src={mushroomImg}
            alt="Mushroom"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <h2 className="absolute inset-0 flex justify-center items-center px-6 font-bold uppercase leading-[1.25] md:pb-[80px] lg:pb-[260px] md:px-8 lg:px-16 text-[28px] md:text-[32px] lg:text-[48px]">
            Consultoría personalizada
          </h2>
        </div>
        <div className="flex items-center justify-center px-6 py-10">
          <p className="max-w-[650px] text-[14px] text-right md:text-[16px] lg:text-[20px] leading-6 md:leading-[1.8] lg:leading-[2]">
            Sesiones individuales de asesoramiento para resolver dudas, explorar
            oportunidades y encontrar soluciones a los retos de tu negocio.
            Claridad, orientación y acciones concretas para avanzar con
            confianza.
          </p>
        </div>
      </section>
      <section
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${myceliumBg})`,
        }}
        className="h-[180px] bg-cover bg-bottom bg-no-repeat md:h-[400px] lg:h-[800px]"
      >
        {/* Next possible section */}
      </section>
    </>
  );
}

export default ServiciosPage;
