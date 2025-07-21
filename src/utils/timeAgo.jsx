import { formatDistanceToNow } from "date-fns";

const TimeAgo = ({ isoDate }) => {
  const relativeTime = formatDistanceToNow(new Date(isoDate), {
    addSuffix: true,
  });

  return (
    <time className="text-xs opacity-50" dateTime={isoDate}>
      {relativeTime}
    </time>
  );
};

export default TimeAgo;
