import React from 'react';
import MediaStore from '../../stores/MediaStore';


export default class Formation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {url: {}};
        this.mediaListener.bind(this);
        MediaStore.loadUrl(this.props.id);
    }

    componentWillMount() {
        MediaStore.on("media", this.mediaListener.bind(this))
    }

    componentWillUnmount(){
        MediaStore
            .removeListener("media",this.mediaListener.bind(this));
    }

    mediaListener(id){
        if (id === this.props.id) {
            this.setState({
                url: MediaStore.geturl()
            })
        }
    }


    render() {
        const {id, title} = this.props;
        const {source_url, media_details} = this.state.url;
        if (media_details) {
            return (
                <div key={id + Date.now()} className="photobox-img">
                    <img width="800" height="600"
                         src={source_url}
                         className="attachment-full" alt={title}
                         srcSet={media_details.sizes.full.source_url + " 800w, "
                         + media_details.sizes.medium.source_url + " 300w, "
                         + media_details.sizes.medium_large.source_url + " 768w"}
                         sizes="(max-width: 800px) 100vw, 800px"/>
                </div>
            )
        }
        else {
            return <div className="photobox-img"/>;
        }
    }
}