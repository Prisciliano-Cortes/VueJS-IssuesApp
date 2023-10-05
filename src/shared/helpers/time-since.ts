export const timeSince = (dateString: string ) => {
    const baseDate = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - baseDate.getTime()) / 1000);
  
    const intervals = [
        { label: 'year', seconds: 31536000 },
        { label: 'month', seconds: 2592000 },
        { label: 'day', seconds: 86400 },
        { label: 'hour', seconds: 3600 },
        { label: 'minute', seconds: 60 },
        { label: 'second', seconds: 1 },
    ];
  
    for (const { label, seconds: intervalSeconds } of intervals) {
        const interval = seconds / intervalSeconds;
        
        if (interval >= 1) {
            const roundedInterval = Math.floor(interval);
            return `${roundedInterval} ${label}${roundedInterval === 1 ? '' : 's'}`;
        }
    }
  
    return 'just now';
};