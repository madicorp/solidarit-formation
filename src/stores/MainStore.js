import {EventEmitter} from "events";
import axios from 'axios';

class Maintore extends EventEmitter {

    constructor(){
        super();
        axios.defaults.baseURL = 'http://127.0.0.1/solidarit-prod/wp-json/';
        axios.defaults.headers.post['responseType'] = 'json';
    }
}


export default Maintore;