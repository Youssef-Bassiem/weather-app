const Details = ({ text, value, unit }) => {
  return (
    <div className="flex items-center gap-2">
      <img src={`Assets/${text}.png`} className="h-7 w-7" alt={text} />
      <p>
        <span>{value + unit + " "}</span>
        <span>{text}</span>
      </p>
    </div>
  );
};

export default Details;
