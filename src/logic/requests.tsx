import axios from 'axios';

function post(url: string, data: any) {
  axios
    .post(url, data)
    .then((response) => {
      if (response.data.status == 200) {
        const json = JSON.parse(response.data);
        return json;
      }
    })
    .catch((error) => {
      console.error(error);
      return null;
    });
}

function get(url: string, params: []) {
  const parameters = params
    .map((param: [string, any]) => {
      const [label, value] = param;
      return label.concat('=', value);
    })
    .join('&');
  url += '?' + parameters;
  axios
    .get(url)
    .then((response) => {
      if (response.data.status == 200) {
        const json = JSON.parse(response.data);
        return json;
      }
    })
    .catch((error) => {
      console.error(error);
      return null;
    });
}

function put(url: string, data: any) {
  axios
    .put(url, data)
    .then((response) => {
      if (response.data.status == 200) {
        const json = JSON.parse(response.data);
        return json;
      }
    })
    .catch((error) => {
      console.error(error);
      return null;
    });
}

function del(url: string, data: any) {
  axios
    .delete(url, data)
    .then((response) => {
      if (response.data.status == 200) {
        const json = JSON.parse(response.data);
        return json;
      }
    })
    .catch((error) => {
      console.error(error);
      return null;
    });
}
