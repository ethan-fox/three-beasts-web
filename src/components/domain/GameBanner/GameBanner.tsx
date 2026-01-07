const GameBanner = () => {
  return (
    <div className="sticky top-0 z-50 bg-primary py-[clamp(3rem,8vh,6rem)]">
      <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-primary-foreground text-center max-w-[clamp(20rem,90vw,48rem)] mx-auto">
        The Three Beasts
      </h1>
    </div>
  );
};

export default GameBanner;
