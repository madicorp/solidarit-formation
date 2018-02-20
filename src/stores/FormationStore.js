import MainStore from "./MainStore";
import axios from 'axios';

class FormationStore extends MainStore {

    constructor() {
        super();
        this.formations = {};
        this.formationTypes = {};
    }

    getFormations(){
        return this.formations;
    }

    loadFormations() {
        axios.get("/formation/v2/formation-api")
            .then(response => {
                this.formations = response.data;
                this.emit("formations");
            })
            .catch((error) => {
                console.log("error", error)
            });
    }

    getFormationTypes(){
        return this.formationTypes;
    }

    loadFormationTypes() {
        axios.get("/formation/v2/formation-type-api")
            .then(response => {
                this.formationTypes = response.data;
                this.emit("formationTypes");
            })
            .catch((error) => {
                console.log("error", error)
            });
    }

    registration(data){
        return  axios.post("/formation/v2/inscrit-api",data)
    }
}

const formationStore = new FormationStore();
export default formationStore;