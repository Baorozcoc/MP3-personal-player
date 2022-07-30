
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
function Contenido(ID, Titulo,Autor,Duracion){
    var contenido=(
        <div className="m-2 p-1">
            <div className="h5">{ID+1}. {Titulo}</div>
            <div className="d-flex justify-content-between">
                <div>{Autor}</div>
                <div>{getTime(Duracion)}</div>
            </div>
        </div>
    )
    return contenido;
}
const Song=({ID, Titulo, Autor, Duracion, Categoria, Ubicacion,cancion,setCancion,setReproduciendo,setTitulo,tituloActual, setAutor, setDuracion, setCategoria})=>{
    function Sonar(){
        if(cancion!==null){
            cancion.pause();
        }
        setCancion(new Audio(Ubicacion));
        setReproduciendo(0);
        setTitulo(Titulo);
        setAutor(Autor);
        setCategoria(Categoria);
        setDuracion(Duracion);
    }
    return(
        <div onClick={()=> Sonar()}>
            {Categoria==="Salsa"&&tituloActual!==Titulo&&<div className="bg-dark rounded-3 text-light toChoose">{Contenido(ID,Titulo,Autor,Duracion)}</div>}
            {Categoria==="Romantica"&&tituloActual!==Titulo&&<div className="bg-secondary rounded-3 text-light toChoose">{Contenido(ID,Titulo,Autor,Duracion)}</div>}
            {Categoria==="Pop"&&tituloActual!==Titulo&&<div className="bg-success rounded-3 text-light toChoose">{Contenido(ID,Titulo,Autor,Duracion)}</div>}
            {Categoria==="RockEng"&&tituloActual!==Titulo&&<div className="bg-info rounded-3 text-light toChoose">{Contenido(ID,Titulo,Autor,Duracion)}</div>}
            {Categoria==="RockEsp"&&tituloActual!==Titulo&&<div className="bg-warning rounded-3 text-light toChoose">{Contenido(ID,Titulo,Autor,Duracion)}</div>}
            {Categoria==="Electrosw"&&tituloActual!==Titulo&&<div className="bg-danger rounded-3 text-light toChoose">{Contenido(ID,Titulo,Autor,Duracion)}</div>}
            {Categoria==="Instrumental"&&tituloActual!==Titulo&&<div className="bg-primary rounded-3 text-light toChoose">{Contenido(ID,Titulo,Autor,Duracion)}</div>}
            {tituloActual===Titulo&&<div className="bg-light rounded-3 toChoose">{Contenido(ID,Titulo,Autor,Duracion)}<div className="m-2 p-1 fw-bolder">Reproduciendo...</div></div>}
            
        </div>
    )
}
export default Song;