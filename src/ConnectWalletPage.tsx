import React, {useState} from "react";
import backspace from "./img/backspace.png"
import crypto from 'crypto'

const bip39 = require('bip39');

function ConnectWalletPage() {

    const [curentPage, setCurentPage] = useState(0);
    const [curentPageLogin, setCurentPageLogin] = useState(0);
    
    const [check, setCheck] = useState(false);

    const [input1, setInput1] = useState("");
    const [input2, setInput2] = useState("");
    const [input3, setInput3] = useState("");
    const [input4, setInput4] = useState("");

    const [inputV1, setInputV1] = useState("");
    const [inputV2, setInputV2] = useState("");
    const [inputV3, setInputV3] = useState("");
    const [inputV4, setInputV4] = useState("");

    const [seed, setSeed] = useState("");

    const [errorModal, setErrorModal] = useState([{
        hidden: false,
        message: ""
    }]);


    function NextPage() {
        if(curentPage === 0 ) {
            setCurentPageLogin(99);
            setCurentPage(1);
        }
        if(curentPage === 1) {
            if(check){
                setCurentPage(curentPage+1);
            } else {
                setErrorModal([{
                    hidden: true,
                    message: "Accept the user agreement"
                }]);
            }
            
        }
        if(curentPage === 2) {
            if(input1 !== "" && input2 !== "" && input3 !== "" && input4 !== ""){
                setCurentPage(curentPage+1);
            } else {
                setErrorModal([{
                    hidden: true,
                    message: "Set full pin code"
                }]);
            }
        }
        if(curentPage === 3) {
            if(input1 === inputV1 && input2 === inputV2 && input3 === inputV3 && input4 === inputV4){
                setCurentPage(curentPage+1);
                genSeed();
            } else {
                setErrorModal([{
                    hidden: true,
                    message: "PIN codes do not match"
                }]);
            }
        }
        if (curentPage === 4) {
            setCurentPage(99);
            setCurentPageLogin(1);
        }
        
    }

    function NextPageLogin() {
        if(curentPageLogin === 0) {
            setCurentPageLogin(1);
            setCurentPage(99);
        }
    }

    function closeError() {
        setErrorModal([{
            hidden: false,
            message: ""
        }]);
    }

    function setValueInput(num: string) {
        if(input1 === "") {
            setInput1(num);
            return;
        }
        if(input2 === "") {
            setInput2(num);
            return;
        }
        if(input3 === "") {
            setInput3(num);
            return;
        }
        if(input4 === "") {
            setInput4(num);
            return;
        }
    }

    function setValueInputV(num: string) {
        if(inputV1 === "") {
            setInputV1(num);
            return;
        }
        if(inputV2 === "") {
            setInputV2(num);
            return;
        }
        if(inputV3 === "") {
            setInputV3(num);
            return;
        }
        if(inputV4 === "") {
            setInputV4(num);
            return;
        }
    }

    function deletevalueInput() {
        if(input4 !== "") {
            setInput4("");
            return;
        }
        if(input3 !== "") {
            setInput3("");
            return;
        }
        if(input2 !== "") {
            setInput2("");
            return;
        }
        if(input1 !== "") {
            setInput1("");
            return;
        }
    }

    function deletevalueInputV() {
        if(inputV4 !== "") {
            setInputV4("");
            return;
        }
        if(inputV3 !== "") {
            setInputV3("");
            return;
        }
        if(inputV2 !== "") {
            setInputV2("");
            return;
        }
        if(inputV1 !== "") {
            setInputV1("");
            return;
        }
    }

    function genSeed(){

        const mnemonic = bip39.generateMnemonic();
        console.log(mnemonic);
        
        // const mnemonicHash = bip39.mnemonicToSeedSync(mnemonic).toString('hex');
        // console.log(mnemonicHash);

        const mnemonicHash = bip39.mnemonicToEntropy(mnemonic);
        console.log(mnemonicHash);
       

        const unmnemonic = bip39.entropyToMnemonic(mnemonicHash);
        console.log(unmnemonic);
        
        setSeed(mnemonic);
    }


    return(
        <div className={(curentPage===0  || curentPageLogin===1 )?"modal-connect modal-connect-first": "modal-connect"}>
            <div className={(curentPage===0 && errorModal[0].hidden===false)?"page": "hide"}>
                <a className="close" href="#/">
                    <span></span>
                    <span></span>
                </a>
                <div className="title">Welcome to DefiSpace!</div>
                <div className="content content-first">
                    <button className="connect-btn zeropage-btn" onClick={NextPageLogin}>Log In</button>
                    <button className="connect-btn zeropage-btn" onClick={NextPage}>Sign Up</button>
                </div>

            </div>
            <div className={(curentPageLogin===1 && errorModal[0].hidden===false)?"page": "hide"}>
                <a className="close" href="#/">
                    <span></span>
                    <span></span>
                </a>
                <div className="title">Enter your seed phrase.</div>
                <div className="content">
                    <textarea name="" id="" cols={35} rows={4}></textarea>
                    <div className="break"></div>
                    <a href="#/welcome-did"><button className="connect-btn zeropage-btn" onClick={NextPageLogin}>Connect</button></a>
                </div>

            </div>
            <div className={(curentPage===1 && errorModal[0].hidden===false)?"page": "hide"}>
                <a className="close" href="#/">
                    <span></span>
                    <span></span>
                </a>
                <div className="title">Welcome to DefiSpace!</div>
                <div className="subtitle">Just read the user`s agreement and set pin for registration</div>
                <div className="content">
                    <div className="checkbox">
                        <input type="checkbox" checked={check} onChange={()=>setCheck(!check)}/>
                    </div>
                    <div className="text">
                        I accept the terms <br/> in the <a href="https://defispace.com/">Users`s Agreement</a>
                    </div>
                </div>

            </div>
            <div className={(curentPage===2 && errorModal[0].hidden===false)?"page": "hide"}>
                <div className="title">Set PIN for quick login</div>
                <div className="pin-inputs">
                    <input type="text" value={input1} maxLength={1}/>
                    <input type="text" value={input2} maxLength={1}/>
                    <input type="text" value={input3} maxLength={1}/>
                    <input type="text" value={input4} maxLength={1}/>
                    <button onClick={deletevalueInput}><img src={backspace} alt="backspace" /></button>
                </div>
                <div className="pin-board">
                    <div className="board">
                        <button onClick={() =>setValueInput("1")}>1</button>
                        <button onClick={() =>setValueInput("2")}>2</button>
                        <button onClick={() =>setValueInput("3")}>3</button>
                        <div className="break"></div>
                        <button onClick={() =>setValueInput("4")}>4</button>
                        <button onClick={() =>setValueInput("5")}>5</button>
                        <button onClick={() =>setValueInput("6")}>6</button>
                        <div className="break"></div>
                        <button onClick={() =>setValueInput("7")}>7</button>
                        <button onClick={() =>setValueInput("8")}>8</button>
                        <button onClick={() =>setValueInput("9")}>9</button>
                        <div className="break"></div>
                        <button onClick={() =>setValueInput("0")}>0</button>
                    </div>
                </div>
            </div>
            <div className={(curentPage===3 && errorModal[0].hidden===false)?"page": "hide"}>
                <div className="title">Repeat PIN</div>
                    <div className="pin-inputs">
                        <input type="text" value={inputV1} autoFocus maxLength={1}/>
                        <input type="text" value={inputV2} maxLength={1}/>
                        <input type="text" value={inputV3} maxLength={1}/>
                        <input type="text" value={inputV4} maxLength={1}/>
                        <button onClick={deletevalueInputV}><img src={backspace} alt="backspace" /></button>
                    </div>
                    <div className="pin-board">
                        <div className="board">
                            <button onClick={() =>setValueInputV("1")}>1</button>
                            <button onClick={() =>setValueInputV("2")}>2</button>
                            <button onClick={() =>setValueInputV("3")}>3</button>
                            <div className="break"></div>
                            <button onClick={() =>setValueInputV("4")}>4</button>
                            <button onClick={() =>setValueInputV("5")}>5</button>
                            <button onClick={() =>setValueInputV("6")}>6</button>
                            <div className="break"></div>
                            <button onClick={() =>setValueInputV("7")}>7</button>
                            <button onClick={() =>setValueInputV("8")}>8</button>
                            <button onClick={() =>setValueInputV("9")}>9</button>
                            <div className="break"></div>
                            <button onClick={() =>setValueInputV("0")}>0</button>
                        </div>
                    </div>
            </div>
            <div className={(curentPage===4 && errorModal[0].hidden===false)?"page": "hide"}>
                <div className="title">Congrats!</div>
                    <div className="subtitle">You are registered in Defi Space</div>
                    <div className="content">
                        <div className="text-seed">
                            Don`t forget to save the seed-phrase <br/> from your <a href="https://defispace.com/">account recovery settings</a>
                            <div className="seed">
                                {seed}
                            </div>
                        </div>
                    </div>
            </div>
            <div className={errorModal[0].hidden===true?"page": "hide"}>
                <button className="close" onClick={closeError}>
                    <span></span>
                    <span></span>
                </button>
                <div className="message">
                    {errorModal[0].message}
                </div>
            </div>
            <div className={(errorModal[0].hidden===false && curentPage > 0 && curentPageLogin !== 1)?"pagination": "hide"}>
                <div className="dots">
                    <button className={curentPage===1?"active dot": "dot"} onClick={()=>setCurentPage(1)}></button>
                    <button className={curentPage===2?"active dot": "dot"} onClick={()=>setCurentPage(2)}></button>
                    <button className={curentPage===3?"active dot": "dot"} onClick={()=>setCurentPage(3)}></button>
                    <button className={curentPage===4?"active dot": "dot"} onClick={()=>setCurentPage(4)}></button>
                </div>
                <div className="break"></div>
                <div className="next">
                    <button className={curentPage===4?"hide": "connect-btn"} onClick={NextPage}>Next</button>
                    <button className={curentPage!==4?"hide": "connect-btn"} onClick={NextPage}>Great!</button>
                </div>
            </div>
        </div>
    );
}

export default ConnectWalletPage;