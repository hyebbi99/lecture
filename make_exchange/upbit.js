async function getBalance(server_url) {
  const payload = {
    access_key: access_key,
    nonce: uuidv4(),
  };
  const token = sign(payload, secret_key);
  const options = {
    method: "GET",
    url: server_url + "/v1/accounts",
    headers: { Authorization: `Bearer ${token}` },
  };
  return new Promise(function (resolve, reject) {
    request(options, (error, response, body) => {
      if (error) reject();
      console.log(response.statusCode);
      resolve(body);
    });
  });
}

const request = require("request");
const { v4: uuidv4 } = require("uuid"); //npm install uuidv4 --save
const sign = require("jsonwebtoken").sign;
const crypto = require("crypto");
const queryEncode = require("querystring").encode;
const access_key = "MYACCESS_KEY";
const secret_key = "MYSECRET_KEY";
const server_url = "http://127.0.0.1";
