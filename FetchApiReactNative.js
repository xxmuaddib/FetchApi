import { AsyncStorage } from 'react-native';
// You should implement your own middleware to work with asyncstorage per recommendations from https://facebook.github.io/react-native/docs/asyncstorage
// You can take a look at my minimal AsyncStorageHelper in my other repository. 

export default class FetchApi {
  static getUrl() {
    let YOUR_URL = '';
    // You should get URL from ENV or configs or somewhere else.
    return YOUR_URL;
  }

  static async getToken() {
    try {
      const token = await AsyncStorage.getItem('token');
      return token;
    } catch (e) {
      return null;
    }
  }

  static async setToken(token) {
    try {
      await AsyncStorage.setItem('token', token);
      return true;
    } catch (e) {
      return false;
    }
  }

  static async removeToken() {
    try {
      await AsyncStorage.removeItem('token');
      return true;
    } catch (e) {
      return false;
    }
  }

  static async post(path, data, options = {}) {
    return await FetchApi.request(path, 'POST', data, options);
  }

  static async get(path, data, options = {}) {
    return await FetchApi.request(path, 'GET', data, options);
  }

  static async put(path, data, options = {}) {
    return await FetchApi.request(path, 'PUT', data, options);
  }

  static async patch(path, data, options = {}) {
    return await FetchApi.request(path, 'PATCH', data, options);
  }

  static async delete(path, data, options = {}) {
    return await FetchApi.request(path, 'DELETE', data, options);
  }

  static async request(path, method, data, options = {}) {
    let headers = new Headers({
      'Content-Type': 'application/json',
    });

    if (!options.noToken) {
      const token = await FetchApi.getToken();
      if (token) headers.append('Authorization', `Bearer ${token}`);
    }

    const myInit = {
      method,
      headers,
      body: JSON.stringify(data),
    };
    
    //TODO: Generate the query for GET/DELETE queries using ? and & 

    return await fetch(`${FetchApi.getUrl()}${path}`, myInit).then(res => {
      return res.json().
        then(json => {
          if (res.status >= 200 && res.status < 300) {
            return Promise.resolve({data: json});
          } else {
            return Promise.reject({data: json});
          }
        }).
        catch(e => {
          return Promise.reject(e);
        });
    }).catch(e => {
      return Promise.reject(e);
    });
  }

  static async upload(path, data, options = {}) {
    let headers = new Headers({
      'Content-Type': 'multipart/form-data',
    });

    if (!options.noToken) {
      const token = await FetchApi.getToken();
      if (token) headers.append('Authorization', `Bearer ${token}`);
    }


    let body = new FormData();
    for(let key in data) {
      body.append(key, data[key]);
    }


    const myInit = {
      method: 'POST',
      headers,
      body,
    };

    return await fetch(`${FetchApi.getUrl()}/${path}`, myInit).then(res => {
      return res.json().
        then(json => {
          if (res.status >= 200 && res.status < 300) {
            return Promise.resolve({data: json});
          } else {
            return Promise.reject({data: json});
          }
        }).
        catch(e => {
          return Promise.reject(e);
        });
    }).catch(e => {
      return Promise.reject(e);
    });
  }
}