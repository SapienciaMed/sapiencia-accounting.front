import * as React from "react";
import ContabilidadIcon from "../../../src/public/images/icons/application-icon-9.png";

function HomePage(): React.JSX.Element {
  return (
    <div className="dashboard-margin" style={{ justifyContent: "center" }}>
      <section className="welcome-container">
        <span className="text-dasboard huge text-center">Bienvenid@ al </span>
      </section>
      <div className="display-justify-flex-center home-aplications">
        <img src={ContabilidadIcon} alt="icono-contabilidad" />
      </div>
      <span className="text-dasboard large text-center">
        Módulo de contabilidad
      </span>
    </div>
  );
}

export default HomePage;
