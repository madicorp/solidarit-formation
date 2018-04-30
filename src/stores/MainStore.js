import {EventEmitter} from "events";
import axios from 'axios';
import crypto from 'crypto';
import OAuth from 'oauth-1.0a';

class MainStore extends EventEmitter {

    constructor(){
        super();
        const {baseURL} = process.env;
        axios.defaults.baseURL = baseURL;
        axios.defaults.headers.post['responseType'] = 'json';
    }

    authentication(){
        console.log(axios.defaults.baseURL, "baseurl");
        const oauth = OAuth({
            consumer: {
                key: process.env.oauth_consumer_key,
                secret: process.env.oauth_consumer_secret
            },
            signature_method: 'HMAC-SHA1',
            hash_function(base_string, key) {
                return crypto.createHmac('sha1', key).update(base_string).digest('base64');
            }
        });
        console.log(process.env.oauth_consumer_secret,"oauth_consumer_secret");
        const request_data = {
            url: process.env.baseURL + "oauth1/request",
            method: 'GET',
        };
        const authorization = oauth.toHeader(oauth.authorize(request_data)).Authorization;
        console.log(authorization, "auth data");
        axios.defaults.headers['Authorization'] = authorization;
        axios.get("/oauth1/request")
            .then(response => {
                const data = JSON.parse('{"' + decodeURI(response.data).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');

                console.log(response, "auth response");
                console.log(data, "data");
                process.env.oauth_token_key=data.oauth_token;
                process.env.oauth_token_secret=data.oauth_token_secret;
                this.emit("authenticated");
            })
            .catch((error) => {
                console.log("error", error)
            });
    }

}


export default MainStore;

const mainStore = new MainStore();
window.mainStore = mainStore;
