import {EventEmitter} from "events";


class FormationDetailsStore extends EventEmitter {
    constructor() {
        super();
    }
}


const formationDetailsStore = new FormationDetailsStore();
export default formationDetailsStore;