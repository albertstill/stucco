const routes = [
  {
    method: 'get',
    pattern: '/hello',
    handler: (req, res) => res.send('hello'),
  },
];

export default routes;
