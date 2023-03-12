import { useState } from "react";

const CharBox = ({idx, val, onChange}) => {
    return(
        <div className="charBx">
            {val}   
        </div>
    )
}

const Input = () => {
    const [inputValues, setInputValues] = useState(['ㄱ', 'ㅇ','','','','']);

    const onlyKorean = (e) => {
        const pattern = /[a-z0-9]|[ \[\]{}()<>?|`~!@#$%^&*-_+=,.;:\"'\\]/g;
        e.target.value = e.target.value.replace(pattern, '');
    };
    
    const handleChange = () => {}

    const charBoxes = () => {
        const result = [];
        for (let i = 0; i < 6; i++) {
            result.push(
                <CharBox key={i} idx={i} val={inputValues[i]} onChange={handleChange} />
            );
        }
        return result;
    }
    return (
        <div>
            {charBoxes()}
        </div>
    );
};

export default Input;