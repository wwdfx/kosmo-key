import heroBg from "../assets/images/backgrounds/hero-bg.jpg";
import myceliumBg from "../assets/images/backgrounds/mycelium-bg.jpg";
import Slider from "../components/Slider";
import LiquidButton from "../components/LiquidButton";

function HomePage() {
  return (
    <>
      <section
        style={{ backgroundImage: `url(${heroBg})` }}
        className="flex flex-col min-h-screen bg-cover bg-center bg-no-repeat px-[50px] py-23"
      >
        <h1 className="text-[64px] font-bold uppercase leading-[1.41]">
          The <br /> Source
        </h1>
        <p className="max-w-md self-end text-right text-[36px] uppercase leading-[1.67]">
          Vuelve al lugar donde todo comienza
        </p>
        <LiquidButton className="text-[22px] uppercase px-14 py-7.5 mt-27.5 mx-auto">
          Conoce el programa
        </LiquidButton>
      </section>
      <div
        className="bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(
          to bottom,
          rgba(0, 0, 0, 1) 0%,
          rgba(0, 0, 0, 0.88) 50%,
          rgba(0, 0, 0, 0.88) 92%,
          rgba(0, 0, 0, 1) 100%
        ), url(${myceliumBg})`,
        }}
      >
        <section className="flex flex-col gap-14 mx-auto px-10 py-28 text-center text-[32px] max-w-[1300px]">
          <h2 className="uppercase">Kosmokey</h2>
          <p>Un ecosistema de desarrollo humano</p>
          <p>
            Que reúne profesionales, experiencias, conocimientos, productos y
            espacios para ampliar nuestra forma de comprender y vivir la vida
          </p>
        </section>
        <section className="flex flex-col gap-7.5 px-12.5 mb-100">
          <h2 className="text-[32px] font-bold uppercase">
            Conoce a la familia Kosmo
          </h2>
          <p className="text-[22px] text-(--accent-green)">
            Descubre todos los servicios &gt;
          </p>
          <Slider />
        </section>
      </div>
    </>
  );
}

export default HomePage;
