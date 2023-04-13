import React, { useContext } from "react";
import { WildersContext } from "../../utils/context/wildersContext";
import Wilder from "../Wilder/Wilder";

const WildersList = () => {
  const { wilders } = useContext(WildersContext);
  return (
    <section>
      <h2>Wilders</h2>
      <div className="card-row">
        {wilders &&
          wilders.map((wilder) => {
            const { id } = wilder;
            return <Wilder key={id} {...wilder} />;
          })}
      </div>
    </section>
  );
};

export default WildersList;
