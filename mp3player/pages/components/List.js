import Song from "./Song";

const List=({listado,setListado,orden,setOrden,cancionGlobal,setCancionGlobal,setReproduciendo, setTitulo, tituloActual, setAutor, setDuracion, setCategoria})=>{
    function OrdenarArtista(x,y){
        if(x.Autor<y.Autor){return -1}
        if(x.Autor>y.Autor){return 1}
        return 0;
    }
    function OrdenarAlfa(x,y){
        if(x.Titulo<y.Titulo){return -1}
        if(x.Titulo>y.Titulo){return 1}
        return 0;
    }
    function OrdenarReciente(x,y){
        if(x.ID<y.ID){return -1}
        if(x.ID>y.ID){return 1}
        return 0;
    }
    function CambiarOrden(i){
        setOrden(i);
        if(i==="Antiguo"){
            var arr1=listado;
            var arr2=arr1.sort(OrdenarReciente);
            setListado(arr2)
        }else if(i==="Inverso"){
            var arr=listado.reverse();
            setListado(arr);
        }else if(i==="Aleatorio"){
            var arr=listado;
            var arr2=arr.sort(function(){return Math.random()-0.5});
            setListado(arr2);
        }else if(i==="Artista"){
            var arr1=listado;
            var arr2=arr1.sort(OrdenarArtista);
            setListado(arr2)
        }else if(i==="Alfabetico"){
            var arr1=listado;
            var arr2=arr1.sort(OrdenarAlfa);
            setListado(arr2)
        }
    }
    return(
    <div>
        {listado!==[]&&
        <div>
            
            <div className='fondo fw-bolder d-flex justify-content-start align-items-center p-2 flex-wrap h5'>
                Ordenar por: 
                {orden==="Antiguo"
                    ?<button className="btn btn-primary m-1">Más Antiguo</button>
                    :<button className="btn btn-outline-primary m-1" onClick={()=> CambiarOrden("Antiguo")}>Más Antiguo</button>
                }
                {orden==="Inverso"
                    ?<button className="btn btn-primary m-1">Inverso</button>
                    :<button className="btn btn-outline-primary m-1" onClick={()=> CambiarOrden("Inverso")}>Inverso</button>
                }
                {orden==="Aleatorio"?<button className="btn btn-primary m-1" >Aleatorio</button>:<button className="btn btn-outline-primary m-1" onClick={()=> CambiarOrden("Aleatorio")}>Aleatorio</button>}
                {orden==="Artista"?<button className="btn btn-primary m-1">Por Artista</button>:<button className="btn btn-outline-primary m-1" onClick={()=> CambiarOrden("Artista")}>Por Artista</button>}
                {orden==="Alfabetico"?<button className="btn btn-primary m-1">Alfabético</button>:<button className="btn btn-outline-primary m-1" onClick={()=> CambiarOrden("Alfabetico")}>Alfabético</button>}
            </div>
            {listado?.map((cancion,index)=>(
                <Song key={index} ID={index} Titulo={cancion.Titulo} Autor={cancion.Autor} Duracion={cancion.Duracion} Categoria={cancion.Categoria} Ubicacion={cancion.Ubicacion} cancion={cancionGlobal} setCancion={setCancionGlobal} setReproduciendo={setReproduciendo} setTitulo={setTitulo} tituloActual={tituloActual} setAutor={setAutor} setDuracion={setDuracion} setCategoria={setCategoria}/>
            ))}
        </div>
        }
    </div>
    ) 
    
}
export default List;