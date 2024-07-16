import "./BoxDesign.css";
const BoxSetupDesign = () => {
  const imgSlider = [
    {
      url: "/boxes/black-blue-ribbon.png",
    },
    {
      url: "/boxes/black-gold-bow.png",
    },
    {
      url: "/boxes/black-gold-ribbon.png",
    },
    {
      url: "/boxes/black-red-ribbon.png",
    },
    {
      url: "/boxes/black-ribbon.png",
    },
    {
      url: "/boxes/black-w&g-angled.png",
    },
    {
      url: "/boxes/black-w&g-ribbon.png",
    },
    {
      url: "/boxes/black-white-ribbon.png",
    },
  ];
  return (
    <>
      <h1>Box design setup</h1>
      {imgSlider.map((img, index) => {
        return (
          <div className="slide-photos">
            <img src={img.url} />
          </div>
        );
      })}
    </>
  );
};
export default BoxSetupDesign;
