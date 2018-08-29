import React, { Component } from "react";
import {
    Animated,
    Image,
    Text,
    View,
    TouchableHighlight,
    TouchableOpacity
} from "react-native";
import  _  from 'lodash';


const layers = [require("../assets/HelpTalk/help_talk_anim_0000_Layer-1.png"),
                require("../assets/HelpTalk/help_talk_anim_0001_Layer-2.png"),
                require("../assets/HelpTalk/help_talk_anim_0002_Layer-3.png")]

stopTalking = () => {
    clearTimeout(this._showTalking);
    clearTimeout(this._showTalking1);
    clearTimeout(this._showTalking2);
}

showTalking = () => {
    clearTimeout(this._showTalking);
    this.setLayer(0);
    this._showTalking = setTimeout(() => { 
            this.setLayer(1);
            this._showTalking1 = setTimeout(() => { 
                    this.setLayer(2), 
                    this._showTalking2 = setTimeout(() => {
                        clearTimeout(this._showTalking);
                        this.showTalking()
                    }, 600)  
            }, 600)}
    ,600)
};


shouldShowTalking = () => {
    this.state.playing ? this.setState((prevState, props) => { return {playing: false}  } ) : this.setState((prevState, props) => { return {playing: true } });
    this.state.playing ? this.stopTalking() : this.showTalking(); 
    console.log("I got pressed", this.state.playing);
};
            

export default class HelpTalk extends Component {
    constructor(props){
        super(props); 
        this.state = {
            layer: 2,
            playing: false,
        };
    }
    
    onComponentDidMount() {
    }

    onComponentDidUnmount() {
        this.stopTalking; 
    };


    setLayer( num ) {
        this.setState({ layer: num });
        console.log("I'm on layer", this.state.layer);
    }

    
    onPress( ) {
        this.props.playing ? this.showTalking : this.stopTalking
    }
    
    render(){

    const helpLayer = layers[this.state.layer];

        return (
                <TouchableOpacity style={this.props.style}
                                  onPress={ () => this.props.playing ? this.showTalking : this.stopTalking } >
                    
                    <Image source={helpLayer} />
                
                </TouchableOpacity>
        )
    }
    

}








