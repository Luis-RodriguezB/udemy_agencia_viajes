import { Viaje } from "../model/Viaje.js";
import { Testimoniales } from "../model/Testimonales.js";

const paginaInicio = async (request, res) => {

  const promiseBD = [];
  promiseBD.push(Viaje.findAll({ limit: 3 }));
  promiseBD.push(Testimoniales.findAll({ limit: 3 }));
  try {
    const resultado = await Promise.all( promiseBD );
    
    res.render("inicio", {
      pagina: "Inicio",
      clase: "home",
      viajes: resultado[0],
      testimoniales: resultado[1]
    });
  } catch (error) {
    console.log(error);
  }
};

const paginaNosotros = (request, response) => {
  response.render("nosotros", {
    pagina: "Nosotros",
  });
};

const paginaViajes = async (request, response) => {
  const viajes = await Viaje.findAll();
  console.log(viajes);

  response.render("viajes", {
    pagina: "Próximos Viajes",
    viajes,
  });
};

const paginaTestimoniales = async (request, response) => {
  try {
    const testimoniales = await Testimoniales.findAll();

    response.render("testimoniales", {
      pagina: "Testimoniales",
      testimoniales,
    });
  } catch (error) {
    console.log(error);
  }
};

const paginaDetalleViaje = async (req, res) => {
  const { slug } = req.params;
  try {
    const viaje = await Viaje.findOne({ where: { slug } });

    res.render("viaje", {
      pagina: "Información Viaje",
      viaje,
    });
  } catch (error) {
    console.log(error);
  }
};

export {
  paginaInicio,
  paginaNosotros,
  paginaViajes,
  paginaTestimoniales,
  paginaDetalleViaje,
};
