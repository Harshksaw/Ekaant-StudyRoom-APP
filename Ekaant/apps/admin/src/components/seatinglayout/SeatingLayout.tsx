

const SeatsLoader = () => {
  // Generate a 10x5 grid of seats
  const rows = 10;
  const columns = 5;
  const seats = Array.from({ length: rows }, (_, rowIndex) =>
    Array.from({ length: columns }, (_, columnIndex) => ({
      id: `row-${rowIndex + 1}-seat-${columnIndex + 1}`,
      occupied: false, // Initially, all seats are not occupied
    }))
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {seats.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: "flex", gap: "10px" }}>
          {row.map((seat) => (
            <div
              key={seat.id}
              style={{
                width: "60px",
                height: "60px",
                backgroundColor: seat.occupied ? "red" : "green",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
              }}
            >
              {seat.id}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SeatsLoader;
