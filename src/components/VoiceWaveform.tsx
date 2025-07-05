interface VoiceWaveformProps {
  isActive: boolean;
  className?: string;
}

export const VoiceWaveform = ({ isActive, className = "" }: VoiceWaveformProps) => {
  return (
    <div className={`flex items-center justify-center gap-1 ${className}`}>
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className={`voice-wave ${isActive ? 'animate-pulse' : 'opacity-30'}`}
          style={{
            animationDelay: isActive ? `${i * 0.1}s` : '0s',
            height: isActive ? '16px' : '4px'
          }}
        />
      ))}
    </div>
  );
};

export default VoiceWaveform;