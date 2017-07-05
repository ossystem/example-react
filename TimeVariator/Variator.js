import React,{Component} from 'react';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
import {StyledTextField as TextField} from '../MyTextField';
import MenuItem from 'material-ui/MenuItem';

export default class Variator extends Component{

    static defaultProps = {
        selectDisabled:true,
        textField:<TextField style={textFieldStyle}
                             inputStyle={textFieldInputStyle}
        />
    };

    static propTypes = {
        items:PropTypes.arrayOf(PropTypes.shape({value:PropTypes.string.isRequired,primaryText:PropTypes.string.isRequired})).isRequired,
        textField:PropTypes.element.isRequired,
        selectDisabled:PropTypes.bool,
        selected:PropTypes.any,
        style:PropTypes.object,
        onChange:PropTypes.func
    };

    constructor(props){
        super(props);
    }

    render(){
        const {style,textField,items,selected,selectDisabled,onChange} = this.props;
        return (
            <div style={{...style,...containerStyle}}>
                {textField}
                <SelectField style={selectFieldStyle}
                             value={selected?selected:items[0].value}
                             disabled={selectDisabled}
                             onChange={onChange}
                >
                    {items.map(item => <MenuItem primaryText={item.primaryText} value={item.value} />)}
                </SelectField>
            </div>
        );
    }
}

export const containerStyle = {
    display:'inline-flex',
    justifyContent:'center',
    alignItems:'center',
    flexWrap:'nowrap',
    alightContent:'flex-start'
};

export const childStyle = {
    margin:'0 1em 0 0'
};

export const textFieldStyle = {
    width:'3em',
    ...childStyle
};

export const textFieldInputStyle = {
    textAlign:'right'
};

export const selectFieldStyle = {
    width:'6em',
    ...childStyle,
    textAlign: 'right'
};
