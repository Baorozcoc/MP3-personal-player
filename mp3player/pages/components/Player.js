import { useEffect, useState } from "react";

function getTime(num){
    if(num<3600){
        return Math.trunc(num/60) + ":" + toStr(num%60)
    }
    else{
        return Math.trunc(num/3600) + ":" + toStr(Math.trunc(num/60)%60)  + ":" + toStr(num%60)
    }
}


function toStr(texto){
    return texto.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false
    })
}

const Player=({listado,Titulo, setTitulo,cancion,setCancion,Autor,setAutor,Categoria,setCategoria,Duracion,setDuracion,reproduciendo,setReproduciendo,repetir,setRepetir})=>{
    const [volume,setVolume]=useState(1);
    const [tiempo, setTiempo]=useState(0);
    const [maxTiempo, setMaxTiempo]=useState(100);
    const [pausado, setPausado]=useState(0);
    function handleChangeVolume(event){
        setVolume(event.target.value);
        cancion.volume=event.target.value;
    }
    function handleChangeTiempo(event){
        setTiempo(parseInt(event.target.value));
        cancion.currentTime=event.target.value;
    }
    useEffect(()=>{
        if(reproduciendo===0){
            cancion.volume=volume;
            cancion.play();
            setReproduciendo(1);
            setTiempo(0);
            setMaxTiempo(Duracion);
            setPausado(0);
        }   
        if(tiempo>=cancion.duration-1 || tiempo==maxTiempo){
            setTiempo(0);
            return siguienteCancion();
        }
        if(pausado===0&&tiempo<maxTiempo){
            const timerId = setInterval(refresh, 1);
            return function cleanup() {
            clearInterval(timerId);
            };
        }
        
        
    });
    function refresh(){
        var n= Math.trunc(cancion.currentTime);
        setTiempo(n)
    }
    function Pausar(){
        cancion.pause();
        setPausado(1);
    }
    function Seguir(){
        cancion.play();
        setPausado(0);
    }
    function anteriorCancion(){
        cancion.pause();
        var sigcancion=listado.map(function(s){
            return s.Titulo;
        }).indexOf(Titulo);
        if(repetir==="Song"){//Se Repite la canción
            setCancion(new Audio(listado[sigcancion].Ubicacion));
        }
        else if(repetir==="List"){//Se Repite la lista
            if(sigcancion!==0&&sigcancion!==-1){
                setCancion(new Audio(listado[sigcancion-1].Ubicacion));
                setTitulo(listado[sigcancion-1].Titulo);
                setAutor(listado[sigcancion-1].Autor);
                setCategoria(listado[sigcancion-1].Categoria);
                setDuracion(listado[sigcancion-1].Duracion);
            }
            else if(sigcancion===0&&sigcancion!==-1){
                setCancion(new Audio(listado[listado.length-1].Ubicacion));
                setTitulo(listado[listado.length-1].Titulo);
                setAutor(listado[listado.length-1].Autor);
                setCategoria(listado[listado.length-1].Categoria);
                setDuracion(listado[listado.length-1].Duracion);
            }
        }
        else{
            if(sigcancion!==0&&sigcancion!==-1){
                setCancion(new Audio(listado[sigcancion-1].Ubicacion));
                setTitulo(listado[sigcancion-1].Titulo);
                setAutor(listado[sigcancion-1].Autor);
                setCategoria(listado[sigcancion-1].Categoria);
                setDuracion(listado[sigcancion-1].Duracion);
            }
        }
        setReproduciendo(0);
    }
    function siguienteCancion(){
        cancion.pause();
        var sigcancion=listado.map(function(s){
            return s.Titulo;
        }).indexOf(Titulo);
        if(repetir==="Song"){//Se Repite la canción
            setCancion(new Audio(listado[sigcancion].Ubicacion));
        }
        else if(repetir==="List"){//Se Repite la lista
            if(sigcancion!==listado.length-1&&sigcancion!==-1){
                setCancion(new Audio(listado[sigcancion+1].Ubicacion));
                setTitulo(listado[sigcancion+1].Titulo);
                setAutor(listado[sigcancion+1].Autor);
                setCategoria(listado[sigcancion+1].Categoria);
                setDuracion(listado[sigcancion+1].Duracion);
            }
            else if(sigcancion===listado.length-1&&sigcancion!==-1){
                setCancion(new Audio(listado[0].Ubicacion));
                setTitulo(listado[0].Titulo);
                setAutor(listado[0].Autor);
                setCategoria(listado[0].Categoria);
                setDuracion(listado[0].Duracion);
            }
        }
        else{
            if(sigcancion!==listado.length-1&&sigcancion!==-1){
                setCancion(new Audio(listado[sigcancion+1].Ubicacion));
                setTitulo(listado[sigcancion+1].Titulo);
                setAutor(listado[sigcancion+1].Autor);
                setCategoria(listado[sigcancion+1].Categoria);
                setDuracion(listado[sigcancion+1].Duracion);
            }
        }
        setReproduciendo(0);
    }
    if(typeof window !== 'undefined'){
        for (let e of window.document.querySelectorAll('input[type="range"]')) {
            e.style.setProperty('--value', e.value);
            e.style.setProperty('--min', e.min == '' ? '0' : e.min);
            e.style.setProperty('--max', e.max == '' ? '100' : e.max);
            e.addEventListener('input', () => e.style.setProperty('--value', e.value));
        }
    }
    return(
        <div className="position-absolute d-flex flex-column align-items-center bottom-0 w-100">
            <div>
                <img className="btn btn-primary inf-button" onClick={()=> anteriorCancion()} src="/Prev.png"/>
                <img className="btn btn-primary inf-button" onClick={()=> Seguir()} src="/Play.png"/>
                <img className="btn btn-primary inf-button" onClick={()=> Pausar()} src="/Pause.png"/>
                <img className="btn btn-primary inf-button" onClick={()=> siguienteCancion()} src="/Next.png"/>
            </div>
            <div className="bg-primary py-2 w-100">
                <div className="text-light h5 text-center">
                    {Titulo} - {Autor}
                </div>
                <div className="w-100 d-flex justify-content-center align-items-center text-light h6" >
                {getTime(tiempo)} <input type="range" id="time" className="time w-75 px-3" min="0" max={maxTiempo} step="1" value={tiempo} onChange={handleChangeTiempo}></input> {getTime(maxTiempo)}
                </div>
                <div  className="w-100 d-flex justify-content-evenly align-items-center text-light h6">
                    <div className="d-flex justify-content-center align-items-center text-light h6 w-50">
                        <div className="Repetir">Repetir:</div> 
                        {repetir==="No"
                        ?<button className="btn btn-light mx-1 Repetir">No</button>
                        :<button className="btn btn-outline-light text-light mx-1 Repetir" onClick={()=> setRepetir("No")}>No</button>
                        }
                        {repetir==="List"
                        ?<button className="btn btn-light mx-1 Repetir">Lista</button>
                        :<button className="btn btn-outline-light text-light mx-1 Repetir" onClick={()=> setRepetir("List")}>Lista</button>
                        }
                        {repetir==="Song"
                        ?<button className="btn btn-light mx-1 Repetir">Canción</button>
                        :<button className="btn btn-outline-light text-light mx-1 Repetir" onClick={()=> setRepetir("Song")}>Canción</button>
                        }

                        {repetir==="No"
                        ?<img className="btn btn-light mx-1 RepetirIco" src="/NoRepB.png" />
                        :<img className="btn btn-outline-light text-light mx-1 RepetirIco" onClick={()=> setRepetir("No")} src="/NoRep.png" />
                        }
                        {repetir==="List"
                        ?<img className="btn btn-light mx-1 RepetirIco" src="/ReSongB.png"/>
                        :<img className="btn btn-outline-light text-light mx-1 RepetirIco" onClick={()=> setRepetir("List")} src="/ReFile.png"/>
                        }
                        {repetir==="Song"
                        ?<img className="btn btn-light mx-1 RepetirIco" src="/ReFileB.png"/>
                        :<img className="btn btn-outline-light text-light mx-1 RepetirIco" onClick={()=> setRepetir("Song")} src="/ReSong.png"/>
                        }
                    </div>
                    <div className="d-flex justify-content-center align-items-center text-light h6 w-50">
                        <img src="Volume.png"/>
                        <input type="range" id="volume" className="volume mx-2" min="0" max="1" step="0.01" value={volume} onChange={handleChangeVolume}></input> 
                        <b className="volumen">{Math.trunc(volume*100)}</b>
                    </div>
                    
                    
                </div>  
            </div>
        </div>
    )
}
export default Player;
/*
Duracion, Categoria
*/