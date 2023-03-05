import React, { useEffect, useState } from 'react'
import "./calc.moudule.css";
import "./Popup.moudule.css";
import { evaluate, isString, re } from 'mathjs'
import $ from "jquery"
export default function Calculator() {
    let [result , setResult] = useState("");
    let [resultscreenwidth , setResultScreenWidth] = useState(0);

    const root = document.documentElement;
    const [calcscreenwidth , setCalcScreenWidth] = useState (0);
    const [errmsg , setErrMsg] = useState("there is an error");

    useEffect(()=>{
        root.style.setProperty("--screen-width" , $(".result-screen").width() +"px");
        setResultScreenWidth($(".result-screen").width());
        setCalcScreenWidth($(".calc-screen").width())
    },[result])
    const pressed = (e) => {
        $(".calc-item .btn").removeClass("pressed")
        e.target.classList.toggle("pressed")
    }
    const handleclick = (e) => {
        pressed(e);
        if(resultscreenwidth < calcscreenwidth - 40)
            setResult(result += e.target.textContent)
        else{
            setErrMsg(`There are too much expressions`)
            $(".errorpage").fadeIn();
            $(".errorpage").css("display" , "flex")
        }
    }

    const handleResult = (e) => {
        pressed(e);
        if(result != "" && !isFinite(result)){
            let Finalresult = (Math.round(evaluate(result) * 100000000) / 100000000 ) ;
            if(Finalresult == Infinity){
                setErrMsg(`This operation is Invalid.`)
                $(".errorpage").fadeIn();
                $(".errorpage").css("display" , "flex")
            }
            else{
                setResult(Finalresult);
            }
        }
    }
    return (
        <>
        <div className='errorpage'>
        <div className='container'>
            <div className='errorbox'>
                <div className='errormess'>
                    <p>
                        {errmsg} <br/> please try another expression
                    </p>
                </div>
                <div className='btn'>
                    <button className='btn btn-primary w-auto' onClick={()=> $(".errorpage").fadeOut()}>cancle</button>
                </div>
            </div>
        </div>
        </div>
        <div className='container'>
            <div className='operatingbox'>
            <div className='gridcontainer'>
                <div className='calc-header'>
                    <div className="calc-title">
                        <h5>Calculator</h5>
                    </div>
                    <div className="calc-screen">
                        <p className='result-screen'>
                            {result}
                        </p>
                    </div>
                </div>
                <div className='calc-body'>
                    <div className="calc-item">
                        <button onClick={(e)=> {result != "" && setResult(""); pressed(e);}} className='btn'>AC</button> 
                    </div>
                    
                    <div className="calc-item">
                        <button onClick={handleclick} className='btn goldenbtn'> % </button>
                    </div>

                    <div className="calc-item">
                        <button onClick={handleclick} className='btn goldenbtn'> / </button>
                    </div>

                    <div className="calc-item">
                        <button onClick={(e)=>{isString(result)&&setResult(result.substring(0,result.length-1)); pressed(e)}} className='btn'><i className="fa-solid fa-delete-left"></i></button> 
                    </div>

                    <div className="calc-item">
                        <button onClick={handleclick} className='btn'>9</button>
                    </div>

                    <div className="calc-item">
                        <button onClick={handleclick} className='btn'>8</button>
                    </div>

                    <div className="calc-item">
                        <button onClick={handleclick} className="btn">7</button>
                    </div>
                    <div className="calc-item">
                        <button onClick={handleclick} className="btn goldenbtn">*</button>
                    </div>

                    <div className="calc-item">
                        <button onClick={handleclick} className="btn">6</button>
                    </div>

                    <div className="calc-item">
                        <button onClick={handleclick} className="btn">5</button>
                    </div>

                    <div className="calc-item">
                        <button onClick={handleclick} className="btn">4</button>
                    </div>

                    <div className="calc-item">
                        <button onClick={handleclick} className="btn goldenbtn">-</button>
                    </div>
                    
                    <div className="calc-item">
                        <button onClick={handleclick} className="btn">3</button>
                    </div>
                    <div className="calc-item">
                        <button onClick={handleclick} className="btn">2</button>
                    </div>
                    <div className="calc-item">
                        <button onClick={handleclick} className="btn">1</button>
                    </div>
                    <div className="calc-item">
                        <button onClick={handleclick} className="btn goldenbtn">+</button>
                    </div>
                    <div className="calc-item zerobtn">
                        <button onClick={handleclick} className="btn">0</button>
                    </div>
                    <div className="calc-item">
                        <button onClick={handleclick} className="btn">.</button>
                    </div>
                    <div className="calc-item">
                        <button onClick={handleResult} onKeyDown={handleResult} className="btn">=</button>
                    </div>
                </div>
            </div>
            </div>
        </div>
        </>
    )
}
