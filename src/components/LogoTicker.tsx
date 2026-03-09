const logos = [
  { name: "Oladoc", icon: "◎" },
  { name: "Marham", icon: "✦" },
  { name: "Sehat", icon: "◈" },
  { name: "MedIQ", icon: "❖" },
  { name: "CareSync", icon: "⬡" },
  { name: "VitaAI", icon: "✧" },
];

const LogoTicker = () => {
  const renderLogos = () =>
    logos.map((logo, i) => (
      <div key={i} className="flex items-center gap-3 shrink-0">
        <span className="text-4xl text-foreground">{logo.icon}</span>
        <span className="text-2xl md:text-3xl font-heading font-bold text-foreground whitespace-nowrap">
          {logo.name}
        </span>
      </div>
    ));

  return (
    <div className="overflow-hidden">
      <div className="flex items-center gap-16 w-max animate-[ticker_12s_linear_infinite]">
        {renderLogos()}
        {renderLogos()}
      </div>
    </div>
  );
};

export default LogoTicker;