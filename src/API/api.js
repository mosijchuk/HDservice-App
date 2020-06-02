import React from "react";
import * as axios from "axios";

const instanceProfObivka = axios.create({
  baseURL: "https://prof-obivka.com/api/v1/"
});

const yandexApiKey = "b2a43d5b-2b42-4172-a6cf-a21c3c466e77";
const instanceYandex = axios.create({
  baseURL: `https://geocode-maps.yandex.ru/1.x/`
});

const serialize = obj => {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
};

export const YandexAPI = {
  findAddress(address) {
    return instanceYandex
      .get(`?apikey=${yandexApiKey}&format=json&geocode=${address}`)
      .then(data => {
        return data.data;
      });
  }
};

export const ObivkaAPI = {
  getAddressParams(baseAddress, clientAddress) {
    const data = {
      origin: baseAddress,
      destination: clientAddress
    };
    return instanceProfObivka
      .post(`address`, serialize(data))
      .then(response => {
        return response;
      });
  },
  getMeetings(userId) {
    return instanceProfObivka.get(`meetings?userId=${userId}`);
  }
};

//old
export const AuthAPI = {
  authMe(token) {
    return instanceProfObivka
      .post(`authme`, serialize({ token }))
      .then(response => {
        return response.data;
      });
  },
  login(email, password) {
    return instanceProfObivka
      .post(`login`, serialize({ email, password }))
      .then(response => {
        return response.data;
      });
  },
  logout() {
    return instanceProfObivka.delete(`auth/login`).then(response => {
      return response.data;
    });
  }
};
