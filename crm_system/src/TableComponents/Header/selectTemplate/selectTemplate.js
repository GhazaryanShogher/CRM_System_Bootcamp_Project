import React, {Component} from 'react';
import './selectTemplate.css'

class SelectTemplate extends Component {
    

    render() {
        return (
            <div className="selectContainer">
               
                <select >
                    <option value="0">Select a Template</option>
                    <option value="1">Anniversary</option>
                    <option value="2">Birthday</option>
                    <option value="3">Christmas</option>
                </select>
            </div>
        );
    }

}
export default  SelectTemplate;
