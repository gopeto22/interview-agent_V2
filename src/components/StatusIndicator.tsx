interface StatusIndicatorProps {
  status: 'live' | 'ready' | 'waiting' | 'offline';
  label?: string;
  className?: string;
}

export const StatusIndicator = ({ status, label, className = "" }: StatusIndicatorProps) => {
  const statusClasses = {
    live: 'status-live',
    ready: 'status-ready', 
    waiting: 'status-waiting',
    offline: 'bg-muted'
  };

  const statusLabels = {
    live: 'Live',
    ready: 'Ready',
    waiting: 'Waiting',
    offline: 'Offline'
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={`status-indicator ${statusClasses[status]}`} />
      <span className="text-sm font-medium text-foreground">
        {label || statusLabels[status]}
      </span>
    </div>
  );
};

export default StatusIndicator;