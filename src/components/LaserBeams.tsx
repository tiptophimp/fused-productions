export default function LaserBeams() {
  return (
    <div className="laser-sky pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <span className="laser-beam laser-beam-a" />
      <span className="laser-beam laser-beam-b" />
      <span className="laser-beam laser-beam-c" />
      <span className="laser-beam laser-beam-d" />
    </div>
  );
}
