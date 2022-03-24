import jsSHA from 'jssha';

const getHash = (str) => {
  // eslint-disable-next-line new-cap
  const shaObj = new jsSHA('SHA-512', 'TEXT', { encoding: 'UTF8' });
  shaObj.update(str);
  const hash = shaObj.getHash('HEX');
  return hash;
};

export default function initUsersController(db) {
  const check = async (request, response) => {
    try {
      if (request.cookies.loggedIn) {
        response.send(true);
      } else {
        response.send(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (request, response) => {
    try {
      const { email, password } = request.body;
      const hashPassword = getHash(password);
      const user = await db.User.findOne({
        where: {
          email,
          password: hashPassword,
        },
      });
      if (user) {
        response.cookie('loggedIn', true);
        response.cookie('user', user.id);
        response.send(true);
      } else {
        response.send(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return {
    check, login,
  };
}
