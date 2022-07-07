const uri = "http://192.168.1.24:1337/api";

const routes = {
  listQuestions: {
    method: "GET",
    path: "/questions",
  },
};

const requestor = async (method) => {
  const match = routes[method];

  const resp = await fetch(`${uri}${match.path}`, { method: match.method });
  const data = await resp.json();
  return data;
};

export default requestor;
