import React,{Component} from 'react';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {Translate,I18n} from 'react-redux-i18n';
import {
    TIME_VARIANT_MINUTES as MIN,
    TIME_VARIANT_HOURS as HOUR,
    TIME_VARIANT_DAYS as DAY,
    TIME_VARIANT_MULTIPLE_DAYS as DAY_MULT,
    TIME_VARIANT_MULTIPLE_HOURS as HOUR_MULT,
    TIME_VARIANT_MULTIPLE_MINUTES as MIN_MULT
} from '../../constants';
import {containerStyle,textFieldStyle,textFieldInputStyle,selectFieldStyle} from './Variator';
import TextField from 'material-ui/TextField';

const getMultiplyByVariant = variant => {
    switch (variant){
        case DAY:
            return DAY_MULT;
        case HOUR:
            return HOUR_MULT;
        case MIN:
        default:
            return MIN_MULT;
    }
};
const getVariantByValue = value => {
    if(value >= DAY_MULT)
        return DAY;

    if(value >= HOUR_MULT)
        return HOUR;

    return MIN;

};

export class TimeVariator extends Component{

    static defaultProps = {
        variants:[
            {value:MIN,primaryText:'min'},
            {value:HOUR,primaryText:'hour'},
            {value:DAY,primaryText:'day'},
        ],
        getVariantByValue,
        getMultiplyByVariant,
        textFieldStyle,
        textFieldInputStyle,
        selectFieldStyle
    };

    static propTypes = {
        variants:PropTypes.arrayOf(PropTypes.shape({
            value:PropTypes.string.isRequired,
            primaryText:PropTypes.string.isRequired
        })).isRequired,
        style:PropTypes.object,
        textFieldStyle:PropTypes.object,
        textFieldInputStyle:PropTypes.object,
        selectFieldStyle:PropTypes.object,
        onChange:PropTypes.func.isRequired,
        value:PropTypes.number.isRequired,
        getVariantByValue:PropTypes.func.isRequired,
        getMultiplyByVariant:PropTypes.func.isRequired
    };

    constructor(props){
        super(props);
        this.save = this.save.bind(this);
        const variant = props.getVariantByValue(props.value);
        const multiply = props.getMultiplyByVariant(variant);
        this.getValue = this.getValue.bind(this);
        let value = Math.round(props.value/multiply);
        this.state = {
            variant,
            value
        }
    }
    save = (value,variant) => {
        const {onChange} = this.props;
        const valInSec = this.getValue(value,variant);
        if(onChange && typeof onChange === 'function'){
            onChange(valInSec);
        };
        this.setState({value,variant});
    };
    getValue = (value,variant) => {
        const multiply = this.props.getMultiplyByVariant(variant);
        return value * multiply;
    };
    render(){
        const {style,variants,textFieldStyle,textFieldInputStyle,selectFieldStyle} = this.props;
        let {value, variant} = this.state;
        return(
            <div style={{...style,...containerStyle}}>
                <TextField value={value}
                           style={textFieldStyle}
                           inputStyle={textFieldInputStyle}
                           onBlur={event => {this.save(event.target.value,variant)}}
                           hintText={I18n.t('value')}
                           hintStyle={{textAlign:'center'}}
                />
                <SelectField value={variant}
                             style={selectFieldStyle}
                             onChange={(event,index,valueSelect) => {this.save(value,valueSelect)}}
                >
                    {variants.map((variant,key) => <MenuItem key={key} value={variant.value} primaryText={<Translate value={variant.primaryText}/>}/>)}
                </SelectField>
            </div>
        )
    }
}
export default TimeVariator;
