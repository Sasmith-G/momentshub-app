// src/components/ui/AbstractIllustration.jsx

const AbstractIllustration = ({ variant }) => {
  // We only need the 'login' variant for now.
  const renderLoginIllustration = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      
      {/* BACKGROUND ACCENTS (Layered Behind) */}
      <div
        className="absolute w-8 h-8 rounded-full animate-float"
        style={{ top: '45%', left: '60%', background: 'var(--color-sky)', animationDelay: '0s' }}
      />
      <div
        className="absolute w-12 h-12 rounded-[50%_30%_70%_20%] bg-accent-coral opacity-80 animate-float"
        style={{ top: '15%', left: '35%', animationDelay: '1s' }}
      />

      {/* MAIN BLOBS */}
      <div
        className="absolute w-[300px] h-[330px] rounded-[50%_40%_60%_30%] opacity-90 animate-float"
        style={{
          top: '15%',
          right: '10%',
          background: 'linear-gradient(135deg, #A7F3D0 0%, #60E5A4 100%)',
          animationDelay: '0s'
        }}
      >
        <div className="w-full h-full bg-[radial-gradient(circle_at_20%_80%,rgba(255,255,255,0.3)_1px,transparent_1px)] bg-[size:15px_15px]"></div>
      </div>
      
      <div
        className="absolute w-[240px] h-[280px] rounded-[50%_40%_60%_30%] opacity-90 animate-float"
        style={{
          bottom: '15%',
          left: '15%',
          background: 'linear-gradient(45deg, #C4B5FD 0%, #A855F7 100%)',
          animationDelay: '2s'
        }}
      >
        <div className="w-full h-full bg-[radial-gradient(circle_at_20%_80%,rgba(255,255,255,0.3)_1px,transparent_1px)] bg-[size:15px_15px]"></div>
      </div>

      <div
        className="absolute w-[180px] h-[200px] rounded-[50%_40%_60%_30%] animate-float"
        style={{
          top: '70%',
          right: '35%',
          background: 'linear-gradient(45deg, #FBBF24 0%, #eaa93bff 100%)',
          animationDelay: '4s'
        }}
      />

      {/* FOREGROUND GEOMETRIC SHAPES */}
      <div
        className="absolute w-[30px] h-[30px] bg-text-primary rotate-45 rounded-md animate-rotate"
        style={{ top: '25%', left: '20%' }}
      />
      <div
        className="absolute w-[20px] h-[20px] bg-text-primary rotate-45 rounded-sm animate-rotate"
        style={{ top: '40%', right: '30%', animationDelay: '3s' }}
      />
      <div
        className="absolute w-[25px] h-[25px] bg-text-primary rotate-45 rounded-md animate-rotate"
        style={{ top: '60%', left: '30%', animationDelay: '1s' }}
      />
      <div
        className="absolute w-[35px] h-[35px] bg-text-primary rotate-45 rounded-lg animate-rotate"
        style={{ bottom: '20%', right: '20%', animationDelay: '5s' }}
      />
      <div
        className="absolute w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[17px] border-b-yellow-300 animate-float"
        style={{ top: '30%', left: '45%', animationDelay: '6s' }}
      />

      {/* HORIZONTAL LINES (Connecting lines) */}
      <div
        className="absolute h-[2px] bg-text-primary opacity-30 animate-float"
        style={{ top: '35%', left: '25%', width: '60px', transform: 'rotate(45deg)', animationDelay: '5s' }}
      />
      <div
        className="absolute h-[2px] bg-text-primary opacity-30 animate-float"
        style={{ bottom: '40%', right: '25%', width: '40px', transform: 'rotate(-30deg)', animationDelay: '7s' }}
      />
    </div>
  );

  if (variant === 'login') {
    return renderLoginIllustration();
  }
  return null;
};

export default AbstractIllustration;
