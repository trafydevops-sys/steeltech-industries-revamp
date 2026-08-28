import { Reveal } from "./Reveal";
import { stats } from "@/data/site";

export default function StatStrip() {
  return (
    <Reveal className="stat-strip">
      {stats.map((stat) => (
        <div key={stat.value}>
          <strong>{stat.value}</strong>
          <span>
            {stat.label.split("\n").map((line, i) => (
              <span key={i}>
                {line}
                <br />
              </span>
            ))}
          </span>
        </div>
      ))}
    </Reveal>
  );
}
