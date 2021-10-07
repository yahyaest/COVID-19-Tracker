import React from "react";
import CountUp from "react-countup";

const Card = ({ data }) => {
  return (
    <div className="row">
      {data.map((state) => (
        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-9" key={state.name}>
          <div className={`card border-${state.cardColor} `}>
            <div
              className={`card-header bg-transparent border-${state.cardColor}`}
            >
              <h4>{state.headerText}</h4>
            </div>
            <div className={`card-body text-${state.cardColor}`}>
              <h3 className="card-title">
                <CountUp
                  start={0}
                  end={state.mainNumber}
                  duration={2.5}
                  separator=","
                />
              </h3>

              <h6 className="card-title">Last Update :{state.mainDate}</h6>
              <p className="card-text">{state.mainText}</p>
            </div>
            <div
              className={`card-footer bg-transparent border-${state.cardColor} ${state.footerColor}`}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
