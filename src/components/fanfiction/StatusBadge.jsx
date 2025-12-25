const StatusBadge = ({ status }) => {
  const styles =
    status === "completed"
      ? "bg-green-500/20 text-green-300"
      : "bg-blue-500/20 text-blue-300";

  return (
    <span className={`text-xs px-2 py-1 rounded ${styles}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
