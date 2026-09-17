import BottomNav from "../components/BottomNav";

function HomePage() {
  return (
    <div className="relative flex flex-col justify-between h-screen w-full overflow-hidden">
      {/* Building / property image — absolute, sits behind content */}
      <img
        src="/UI IMG/Building.png"
        alt="Riviera Select property"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Top logo */}
      <div className="relative flex pl-[30px] pt-[30px] ">
        <img
          src="/UI IMG/top_logo.svg"
          alt="Riviera Select"
          className="object-contain"
        />
      </div>

      {/* Bottom Nav in natural flow */}
      <div className="relative w-full">
        <BottomNav />
      </div>
    </div>
  );
}

export default HomePage;
