import Head from 'next/head'
import { useState } from 'react'
import Songs from '../public/Songs.json'
import List from './components/List';
import Folders from './components/Folders';
import Player from './components/Player';

export default function Home() {
  const [orden, setOrden]=useState("Antiguo"); //Orden de reproducción
  const [listado, setListado]=useState([]); //Listado de canciones
  const [cancion, setCancion]=useState(null); //Canción actual
  const [reproduciendo,setReproduciendo]=useState(0);
  const [titulo, setTitulo]=useState(""); //Titulo canción actual
  const [autor, setAutor]=useState(""); //Autor canción actual
  const [duracion, setDuracion]=useState(0); //Duración canción actual
  const [repetir, setRepetir]=useState("No"); //Repetir canción o lista
  const [categoria, setCategoria]=useState(1); //Categoría canción actual
  const[option, setOption]=useState(0);

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
function Orden(lista){
    if(orden==="Antiguo"){
        var arr1=lista;
        return arr1.sort(OrdenarReciente);
    }else if(orden==="Inverso"){
        return arr=lista.reverse();
    }else if(orden==="Aleatorio"){
        var arr=lista;
        return arr.sort(function(){return Math.random()-0.5});
    }else if(orden==="Artista"){
        var arr1=lista;
        return arr1.sort(OrdenarArtista);
    }else if(orden==="Alfabetico"){
        var arr1=lista;
        return arr1.sort(OrdenarAlfa);
    }
}
  function AllSongs(){
    setListado(Orden(Songs.songs));
    setOption(1);
    document.documentElement.style.setProperty('--first-color', '#fff');
                document.documentElement.style.setProperty('--second-color', '#584942');
  }
  return (
    <div className='fondo w-100 vh-100'>
      <Head>
        <title>MP3 Player</title>
        <meta name="description" content="MP3 Player to private use" />
        <link rel="icon" href="/icono.png" />
      </Head>
      <div className='p-2 Logo h1'>
        <img src='/logo.png' alt='Logo' className='mx-2'/>MP3 Player
      </div>
      <div className='position-absolute fw-bolder pres'>
        Creado por Berny Alejandro Orozco C. <br/> baorozcoc@unal.edu.co
      </div>
      {option===0?
      <div className='FondoSinOpcion w-100 h-75 d-flex flex-column justify-content-center align-items-center p-2'>
        <button type="button" onClick={()=> AllSongs()} className="btn btn-outline-primary w-100 fw-bolder initial p-2 m-2">Todas las canciones</button>
        <button type="button" onClick={()=> setOption(2)} className="btn btn-outline-primary w-100 fw-bolder initial p-2 m-2">Por Categorias</button>
        
      </div>:
      <div className='mx-4 h-75'>
        <button type="button" onClick={()=> AllSongs()} className="btn btn-outline-primary fw-bolder">Todas las canciones</button>
        <button type="button" onClick={()=> setOption(2)} className="btn btn-outline-primary fw-bolder">Por Categorias</button>
        
        {cancion!==null
        ?<div className='contenedor overflow-auto p-3 songs'>
            {option===1&&listado.length!==0&&
              <List listado={listado} setListado={setListado} orden={orden} setOrden={setOrden} cancionGlobal={cancion} setCancionGlobal={setCancion} setReproduciendo={setReproduciendo} setTitulo={setTitulo} tituloActual={titulo} setAutor={setAutor} setDuracion={setDuracion} setCategoria={setCategoria}/>
            }
            {option===2&&<Folders setCategoria={setCategoria} setListado={setListado} setOption={setOption} orden={orden}/>}

          </div>
          :<div className='contenedor overflow-auto p-3 h-100'>
            {option===1&&listado.length!==0&&
              <List listado={listado} setListado={setListado} orden={orden} setOrden={setOrden} cancionGlobal={cancion} setCancionGlobal={setCancion} setReproduciendo={setReproduciendo} setTitulo={setTitulo} tituloActual={titulo} setAutor={setAutor} setDuracion={setDuracion} setCategoria={setCategoria}/>
            }
            {option===2&&<Folders setCategoria={setCategoria} setListado={setListado} setOption={setOption} orden={orden}/>}

        </div>}
        
        
      </div>}
      {cancion!==null&&<Player listado={listado} cancion={cancion} setCancion={setCancion} reproduciendo={reproduciendo} setReproduciendo={setReproduciendo} Titulo={titulo} Autor={autor} Categoria={categoria} Duracion={duracion} setTitulo={setTitulo} tituloActual={titulo} setAutor={setAutor} setDuracion={setDuracion} setCategoria={setCategoria} repetir={repetir} setRepetir={setRepetir}/>}
    </div>
  )
}
