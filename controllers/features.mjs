export default function initFeaturesController(db) {
  const index = async (request, response) => {
    try {
      const features = await db.Feature.findAll();
      response.send(features);
    } catch (error) {
      console.log(error);
    }
  };

  const create = async (request, response) => {
    try {
      const insert = await db.Feature.create(request.body);
      response.send(insert);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    index, create,
  };
}
