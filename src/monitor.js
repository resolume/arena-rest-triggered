import React, { useContext } from 'react'
import { ResolumeContext } from './resolume_provider.js'

/**
  * Component for rendering a clip, responds to clicks
  * to trigger the clip.
*/

class Monitor extends React.Component {

    constructor(props)
    {   
        super(props);
        this.state = {
            image : null
        }
    }

    componentDidMount()
    {
        this.ws = new WebSocket("ws://localhost:8080/api/v1/monitor");
        //this.ws.binaryType = "arraybuffer";

        this.ws.onmessage = (data) => {
            try {
                this.setState({ "image" : data.data });
                //console.log(data.data);
                //this.ws.close();
            } catch (error) {
                //
            }
        };
    }

    componentWillUnmount()
    {
        this.ws.close();
    }

    render() {
        if (this.state.image === null)
            return <h1>nu even niet</h1>;

        let img = URL.createObjectURL(this.state.image);
        
        return <div className="monitor"><img src={img}/></div>;
    }
}

// function Monitor(props) {
//     // get access to the resolume provider for triggering actions
//     const context = useContext(ResolumeContext);

//     //this.ws = new WebSocket("ws://"+host+":"+port+"/api/v1");
//     //const connected = props.connected.index >= 3;

//     return (
//         <div>              
//             <div className="monitor">

//             </div>              
//         </div>
//     )
// }


export default Monitor;
