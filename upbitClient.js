const request = require("request");
const { v4: uuidv4 } = require("uuid"); //npm install uuidv4 --save
const sign = require("jsonwebtoken").sign;
const crypto = require("crypto");
const queryEncode = require("querystring").encode;

const access_key = "hyebbi99";
const secret_key = "pzXL7G5A37ifjSVFAN9tCVFk9ypnD14MZ5Y6Og2n+e0=";
const server_url = "http://ubuntu.securekim.com";
const sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};
async function getBalance() {
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

//얼마너치살건지
async function API_buyImmediate(market, price) {
  const body = {
    market: market,
    side: "bid",
    volume: null,
    price: price.toString(),
    ord_type: "price",
  };
  const query = queryEncode(body);
  const hash = crypto.createHash("sha512");
  const queryHash = hash.update(query, "utf-8").digest("hex");
  const payload = {
    access_key: access_key,
    nonce: uuidv4(),
    query_hash: queryHash,
    query_hash_alg: "SHA512",
  };
  const token = sign(payload, secret_key);
  const options = {
    method: "POST",
    url: server_url + "/v1/orders",
    headers: { Authorization: `Bearer ${token}` },
    json: body,
  };
  return new Promise(function (resolve, reject) {
    request(options, (error, response, body) => {
      if (error) reject();
      console.log(response.statusCode);
      resolve(body);
    });
  });
}

//몇개팔건지
async function API_sellImmediate(market, volume) {
  const body = {
    market: market,
    side: "ask",
    volume: volume.toString(),
    price: null,
    ord_type: "market",
  };
  const query = queryEncode(body);
  const hash = crypto.createHash("sha512");
  const queryHash = hash.update(query, "utf-8").digest("hex");
  const payload = {
    access_key: access_key,
    nonce: uuidv4(),
    query_hash: queryHash,
    query_hash_alg: "SHA512",
  };
  const token = sign(payload, secret_key);
  const options = {
    method: "POST",
    url: server_url + "/v1/orders",
    headers: { Authorization: `Bearer ${token}` },
    json: body,
  };
  return new Promise(function (resolve, reject) {
    request(options, (error, response, body) => {
      if (error) reject();
      console.log(response.statusCode);
      resolve(body);
    });
  });
}

async function get(url) {
  return new Promise(function (resolve, reject) {
    request(url, (error, response, body) => {
      if (error) reject();
      console.log(response.statusCode);
      resolve(body);
    });
  });
}

// // 전부다 팔아버리는
// async function main() {
//   _balance = await getBalance();
//   _balance = JSON.parse(_balance);
//   for (let i in _balance) {
//     market = "KRW-" + _balance[i].currency;
//     balance = _balance[i].balance;
//     if (market != "KRW-KRW" && balance > 0) {
//       API_sellImmediate(market, balance);
//     }
//   }
// }

async function main() {
  //   body = await getBalance();
  //   console.log(body);
  // }

  // async function main() {
  //   // 트레이딩 메인(반복문사용)
  //   while (true) {
  //     ret = await get("http://kali.securekim.com:3082/view");
  //     retJSON = JSON.parse(ret);

  //     for (var i in retJSON) {
  //       market = i;
  //       // if (market == "KRW-DAWN" || market == "KRW-CVC") continue;
  //       rsiSignal = retJSON[i].rsiSignal;
  //       rsiSignal5 = retJSON[i].rsiSignal_target;
  //       if (rsiSignal == "LONG" || rsiSignal5 == "BIGLONG") {
  //         console.log("!!!!BUY!!!! MARKET : " + market);
  //         body = await API_buyImmediate(market, 5000000);
  //         // _volume[market] = body.volume;
  //       } else if (rsiSignal == "SHORT") {
  //         try {
  //           balance = await getBalance();
  //           let volume;
  //           for (var i in balance) {
  //             if ("KRW-" + balance[i].currency == market) {
  //               volume = balance[i].balance;
  //             }
  //           }
  //           await API_sellImmediate(market, volume[market]);
  //           console.log(API_sellImmediate + "팔아버렸어요");
  //         } catch (E) {
  //           console.log(E);
  //         }
  //       }
  //     }
  //     await sleep(1000 * 30);
  //   }
  // }

  // body = await API_buyImmediate("KRW-BTC", 500000);   // 정상 구매
  // body = await API_buyImmediate("KRW-BTC", -1);       // 범위 에러
  // body = await API_buyImmediate("KRW-BTC", 1);        // 최소 에러
  // body = await API_buyImmediate("KRW-BTC", 5234);     // 단위 에러..안남
  // body = await API_buyImmediate("KRW-BTC", "");       // 가격 에러
  // body = await API_buyImmediate("KRW-BTC", 100000000);  // 가격 에러
  // body = await API_buyImmediate("KRW-ABC", 10000);    // 마켓 에러
  // body = await API_buyImmediate("", 10000);           // 마켓 에러
  // body = await API_buyImmediate("KRW-ABC-BTC", 10000);// 마켓 에러
  // body = await API_sellImmediate("KRW-BTC", 100);      // 개수 에러

  body = await API_buyImmediate("KRW-BORA", 4800000);
} // 정상 구매
//body = await API_sellImmediate("KRW-ETH", 0.04604051565377532);     // 정상 판매

main();
