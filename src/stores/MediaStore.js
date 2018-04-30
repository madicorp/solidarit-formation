import MainStore from "./MainStore";
import axios from 'axios';

class MediaStore extends MainStore {

    constructor(){
        super();
        this.url= {};
    }
    geturl(){
        return this.url;
    }
    loadUrl(id){
        axios.get(`/wp-json/wp/v2/media/${id}`)
            .then(response => {
                this.url = response.data;
                this.emit("media", id);
            })
            .catch((error) => {
                console.log("error", error)
            });
    }

}

const mediaStore = new MediaStore();
export default mediaStore;