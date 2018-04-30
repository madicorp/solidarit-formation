import MainStore from "./MainStore";
import axios from 'axios';
import crypto from 'crypto';
import OAuth from 'oauth-1.0a';
import request from 'request';

class FormationStore extends MainStore {


    constructor() {
        super();
        this.formations = {};
        this.formationTypes = {};
       /* const oauth = OAuth({
            consumer: {
                key: process.env.oauth_consumer_key,
                secret: process.env.oauth_consumer_secret
            },
            signature_method: 'HMAC-SHA1',
            hash_function(base_string, key) {
                return crypto.createHmac('sha1', key).update(base_string).digest('base64');
            }
        });
        const request_data = {
            url: process.env.baseURL + "wp-json/formation/v2/formation-api",
            method: 'GET',
        };
        const token = {
            key: 'bfId5Lpbt8xNjVS2RUwTbf2t',//process.env.oauth_token_key,
            secret: 'vHAP4zj718W0YfwUVdtB7T5nRS4lIZ5Z6z4kvhYMgQ6b291F'//process.env.oauth_token_secret
        };
        axios.defaults.headers['Authorization'] = oauth.toHeader(oauth.authorize(request_data, token));
        console.log(axios.defaults.headers['Authorization'],"Authorization");
        console.log(token,"token");
        request({
            url: request_data.url,
            method: request_data.method,
            form: request_data.data,
            headers: oauth.toHeader(oauth.authorize(request_data, token))
        }, (error, response, body) => {

            console.log(error, "error");
            console.log(response, "response");
            console.log(body, "body");
        });*/
    }

    getFormations() {
        return this.formations;
    }

    loadFormations() {
        axios.get("/wp-json/formation/v2/formation-api")
            .then(response => {
                this.formations = response.data;
                this.emit("formations");
            })
            .catch((error) => {
                console.log("error", error)
            });
    }

    getFormationTypes() {
        return this.formationTypes;
    }

    loadFormationTypes() {
        axios.get("/wp-json/formation/v2/formation-type-api")
            .then(response => {
                this.formationTypes = response.data;
                this.emit("formationTypes");
            })
            .catch((error) => {
                console.log("error", error)
            });
    }

    registration(data) {
        return axios.post("/wp-json/formation/v2/inscrit-api", data)
    }
}

const formationStore = new FormationStore();
export default formationStore;


/*OAuth
    oauth_consumer_key="GFxaNVhPZe2c",
    oauth_token="BlnRFNMTHRSB88tTr3xpMAnM",
    oauth_signature_method="HMAC-SHA1",
    oauth_timestamp="1524839308",
    oauth_nonce="n8DU5Vp24K5",
    oauth_version="1.0",
    oauth_signature="f92w7x2WU90kl8Oltmzu3g%2BmQAA%3D"*/