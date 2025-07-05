interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo = ({ className = "", size = 'md' }: LogoProps) => {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16'
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`${sizeClasses[size]} aspect-square bg-gradient-primary rounded-xl flex items-center justify-center shadow-lg`}>
        <span className="text-white font-bold text-lg">TS</span>
      </div>
      <div className="flex flex-col">
        <h1 className="text-xl font-bold gradient-text">TalentSync</h1>
        <p className="text-xs text-muted-foreground">AI Interview Agent</p>
      </div>
    </div>
  );
};

export default Logo;