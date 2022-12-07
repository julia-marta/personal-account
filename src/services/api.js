const axios = require(`axios`);

const TIMEOUT = 10000;
const SERVER_URL =
  process.env.NODE_ENV === "development"
    ? `http://localhost:5000/api`
    : `https://personal-account-api.onrender.com/api`;

class API {
  constructor(baseURL, timeout) {
    this._http = axios.create({
      baseURL,
      timeout,
    });
  }

  async _load(url, options) {
    const response = await this._http.request({
      url,
      ...options,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Credentials": "true",
      },
    });
    return response.data;
  }

  getContacts() {
    return this._load(`/contacts`);
  }

  search(query) {
    return this._load(`/contacts?q=${query}`);
  }

  editContact(id, data) {
    return this._load(`/contacts/${id}`, {
      method: `PUT`,
      data,
    });
  }

  addContact(data) {
    return this._load(`/contacts`, {
      method: `POST`,
      data,
    });
  }

  deleteContact(id) {
    return this._load(`/contacts/${id}`, {
      method: `DELETE`,
    });
  }

  loginUser(data) {
    return this._load(`/users`, {
      method: `POST`,
      data,
    });
  }
}

const defaultAPI = new API(SERVER_URL, TIMEOUT);

const apiFactory = {
  API,
  getAPI: () => defaultAPI,
};

export default apiFactory;
