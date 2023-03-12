import { useEffect, useRef, useState } from "react";
import * as Hangul from "hangul-js";

const CharBox = ({idx, val, onChange}) => {
    return(
        <div className="charBx">
            {val}
        </div>
    )
}

const Input = () => {
    const [inputValues, setInputValues] = useState("");
    const [inputArr, setInputArr] = useState(['', '','','','','']);
    const focusRef = useRef(null);

    useEffect(()=>{
        focusRef.current.focus();
    }, [])
    const onlyKorean = (e) => {
        const pattern = /[a-z0-9]|[ \[\]{}()<>?|`~!@#$%^&*-_+=,.;:\"'\\]/g;
        e.target.value = e.target.value.replace(pattern, '');
    };
    
    const handleChange = (e) => {
        if(e.target.value.length >=7 ) return;
        setInputValues(e.target.value);
    }
    useEffect(()=>{
        const changeInput = Hangul.disassemble(inputValues);
        setInputArr(changeInput);
    },[inputValues]);

    return (
        <div>
            <input type="text" ref={focusRef} value={inputValues} onChange={handleChange} className="txtInput" autoFocus />
            {inputArr.map((it, idx)=>{
                return <CharBox idx={idx} val={it}/>
            })}
        </div>
    );
};

export default Input;