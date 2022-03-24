export default function initBugsController(db) {
  const create = async (request, response) => {
    request.body.userId = request.cookies.user;
    try {
      const insert = await db.Bug.create(request.body);
      const feature = await insert.getFeature();
      response.send([insert, feature]);
    } catch (error) {
      console.log(error);
    }
  };

  const index = async (request, response) => {
    try {
      const bugList = await db.Bug.findAll({
        order: [['id', 'ASC']],
        include: db.Feature,
      });
      response.send(bugList);
    } catch (error) {
      console.log(error);
    }
  };
  return {
    create, index,
  };
}
