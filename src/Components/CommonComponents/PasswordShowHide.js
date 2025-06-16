import React, { useState } from "react";
 import "../Assets/Styles/PasswordShowHide.css"
 import {  useAtom } from 'jotai';
 import { PrimeryColorSeclectorAtom, SecondryColorSeclectorAtom } from "./LandingPage"
 import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

const PasswordShowHide = ({ field, form, placeholder, onChange, value }) => {
    const [showHidePassword, changeShowHidePassword] = useState(false);
    const hasError = form.touched[field.name] && form.errors[field.name];
    const [Btnbgchange] = useAtom(PrimeryColorSeclectorAtom)
    return (
        <div className="input-container">
            <input
                style={{height:38}}
                type={showHidePassword ? "text" : "password"}
                {...field}
                className={hasError ? "input-error input-field" : "input-field"}
                placeholder={placeholder} onChange={onChange} value={value}
            />
            <i
                style={{borderColor:"#667085",height:38,textAlign:"center",background:Btnbgchange}}
                className={hasError ? "icon-error icon" : "fa fa-key icon"}
                onClick={() => changeShowHidePassword(!showHidePassword)}
            >
                {showHidePassword ? (
                    <EyeTwoTone
                        className="iconColor"
                        
                    />
                ) : (
                    <EyeInvisibleOutlined
                        className="iconColor"
                        
                    />
                )}

            </i>
        </div>
    );
};

export default PasswordShowHide;
