module.exports = {
  up: async (queryInterface) => {
    const featureList = [
      {
        feature: 'Navbar',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        feature: 'Dashboard',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        feature: 'Login/Logout',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    await queryInterface.bulkInsert('features', featureList);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('features', null, {});
  },
};
