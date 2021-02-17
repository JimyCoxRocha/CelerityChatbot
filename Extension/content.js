let chats = document.getElementsByClassName("_3soxC _2aY82");

/*Porción de código*/
var valorFinal;

/*Contador nuevo Mensaje*/
var msjNew=0;
setInterval(function(){
chats[0].addEventListener("click", function(){
        msjNew = 0;
        if((document.getElementsByClassName("tSmQ1")[0].children.length >= 0) && (document.getElementsByClassName("btnCelerity").length==0)){
            function demon(){
                a=document.getElementsByClassName("tSmQ1");
                contador=0;
                elementFinal = 0;

                //Obtenemos el último elemento
                valorFinal = a[0].children[a[0].children.length-1];
                //console.log("Hola"+a[0].children[a[0].children.length-1]);
                var msjIniciales = [];
                msjIniciales = message_inicial();
                
                addElementsDOOM(msjIniciales);
            }
            demon();
        }

        document.getElementsByClassName("_3qpzV")[1].addEventListener("click", function(){
            msjEntrantes = document.getElementsByClassName("message-out");
            alert("ingresó")
            for(var i=0; i < msjEntrantes.length; i++){
                msjEntrantes[i].style.display="none";
            }
            
        });
});

//////////////////////////////////////////////////////////////////////////////////
/*Agregamos los elementos al DOOM*/
//////////////////////////////////////////////////////////////////////////////////
function addElementsDOOM(msjIniciales){
    contador = 0;
    for(var i=0; i < msjIniciales.length; i++){
        try{
            contador++;
            msjIniciales[i].style.marginBottom = "0px";

            //Colocamos el evento de borrar todo al último elemento
            if(i == msjIniciales.length - 1){
                elementFinal = 1;
                addElement(msjIniciales[i], contador, "blue", elementFinal);
            }else{
                elementFinal = 0;
                addElement(msjIniciales[i], contador, "blue", elementFinal);
            }
        }
        catch(Exception){
            console.log("Tenemos un mensaje que no podemos resolver");
        }
    }
}

//////////////////////////////////////////////////////////////////////////////////
/*Creamos los elementos*/
//////////////////////////////////////////////////////////////////////////////////
function addElement (mensaje, numero, color, elementFinal) {
    a=document.getElementsByClassName("tSmQ1");
    document.getElementsByClassName("_26MUt")[0].scrollTo(0, document.getElementsByClassName("_26MUt")[0].scrollHeight);
    var newDiv = document.createElement("div");
    newDiv.className = "btnCelerity";
    newDiv.style.backgroundColor= color;
    newDiv.style.display = "inline-block";
    newDiv.style.padding = "2px 2px 2px 2px";
    newDiv.style.color = "white";
    newDiv.style.marginLeft = "10%";
    newDiv.style.fontWeight = "800px";

    var newContent = document.createTextNode(numero);
    newDiv.appendChild(newContent); //añade texto al div creado.

    // añade el elemento creado y su contenido al DOM
    var currentDiv = a[0];
    currentDiv.insertBefore(newDiv, mensaje.nextSibling);
    
    if(elementFinal == 1){
        
        addEventElement(newDiv);
    }
    /**/
}

//////////////////////////////////////////////////////////////////////////////////
/*Borramos los elementos del DOOM*/
//////////////////////////////////////////////////////////////////////////////////
function delateElements () {
    var elementosCantidad = document.getElementsByClassName("btnCelerity");
    var elementos = [];
    padre=document.getElementsByClassName("tSmQ1")[0];
    
    for(var i = 0; i < elementosCantidad.length; i++){
        elementos.push(elementosCantidad[i]);
    }

    for(var i = 0; i < elementos.length; i++){
        padre.removeChild(elementos[i]);
    }
    /**/
}


//////////////////////////////////////////////////////////////////////////////////
/*Obtenemos el último elemento mensaje registrado y analizado*/
//////////////////////////////////////////////////////////////////////////////////
function finalElementRegister(newDiv){
    finalElement = newDiv.previousElementSibling;

    return finalElement;
}

//////////////////////////////////////////////////////////////////////////////////
/*Para comprobar si hay mensajes nuevos*/
//////////////////////////////////////////////////////////////////////////////////
function addEventElement(newDiv){
    document.getElementsByClassName("_26MUt")[0].scrollTo(0, document.getElementsByClassName("_26MUt")[0].scrollHeight);
    /*Cuando le demos click, debemos "borar" automáticamente la enumeración*/
    newDiv.addEventListener("click", function(){
        document.getElementsByClassName("_26MUt")[0].scrollTo(0, document.getElementsByClassName("_26MUt")[0].scrollHeight);
        msjIniciales = finalElementRegister(newDiv);//Antiguo
        ingresoChatNow = false;
        msjTotales = message_totales(ingresoChatNow);//Totales hasta la fecha sin limitación
        msjNew = 0;
        /* 
        Obtenemos todos los elementos hasta encontrar un mensaje que yo envíe
        Luego, se corta la parte que ya envié y la nueva se le coloca valores nuevos
        */

        //Eliminamos la información ya obtenida
        delateElements();

        msjNuevos = live_message(msjIniciales, msjTotales);
        console.log(msjNuevos);
        if(msjNuevos.length > 0){
            addElementsDOOM(msjNuevos);
        }
    });
}

//////////////////////////////////////////////////////////////////////////////////
/*Obtenemos todos los mensajes*/
//////////////////////////////////////////////////////////////////////////////////
function message_totales(ingresoChatNow){
    msjEntrantes = [];
    a=document.getElementsByClassName("tSmQ1");
    for(var i=a[0].children.length-1; i >= 0; i--){
        try{
            if(a[0].children[i].getAttribute("data-id").substr(0,5) == "false"){
                msjEntrantes.push(a[0].children[i]);
            }else
            {
                if(ingresoChatNow == true){
                    break;
                }
            }
        }
        catch(Exception){
            console.log("Tenemos un mensaje que no podemos resolver");
        }
    }
    return msjEntrantes;
}

//////////////////////////////////////////////////////////////////////////////////
/*Conteo de todos los mensajes que nos vienen*/
//////////////////////////////////////////////////////////////////////////////////
function message_inicial(){
    ingresoChatNow = true;
    msjEntrantes = message_totales(ingresoChatNow);
    msjNewAnalizar = []; //Mensajes nuevos para analizar

    //Obtener solo 15 elementos
    if(msjEntrantes.length > 15){
            for(var i=msjEntrantes.length - 15; i >= 0; i--){
                msjNewAnalizar.push(msjEntrantes[i]);//Mensajes ordenados
            }
    }else{
        /****************************** */
        //Ordenamos de todas forma
        /****************************** */
        for(var i=msjEntrantes.length -1; i >= 0; i--){
            msjNewAnalizar.push(msjEntrantes[i]);//Mensajes ordenados
        };
    }
    return msjNewAnalizar;
}

//////////////////////////////////////////////////////////////////////////////////
/*Vaciar elementos de que ya están repetidos*/
//////////////////////////////////////////////////////////////////////////////////
function live_message(msjIniciales, msjEntrantes){
    let msjNuevos = [];
    let msjAnalisis = [];

    for(var i=0; i < msjEntrantes.length; i++){
        try{
            if(msjEntrantes[i] != msjIniciales){
                /* 
                    -Porque msjEntrantes[i] está ordenado (El primero elemento del arreglo es el primer mensaje)
                    -Porque msjIniciales[msjIniciales.length-1] está desordenado (El primero elemento del arreglo es el último mensaje)
                    y se debe retroceder hasta encontrar el último mensaje de los msjEntrantes[i]
                */
                msjNuevos.push(msjEntrantes[i]);
                console.log("No Tope | Mensajes Iniciales");
                console.log(msjIniciales);

                console.log("No Tope | Mensajes Finales");
                console.log(msjEntrantes[i]);

            }else if(msjEntrantes[i] == msjIniciales){
                console.log("Tope | Mensajes Iniciales");
                console.log(msjIniciales);

                console.log("Tope | Mensajes Finales");
                console.log(msjEntrantes[i]);
                break;
            }else{
                alert("algó saslió muy mal y no hemo podido proceder a encontrar el últmo mensaje leído");
            }
            
        }catch(Exception){
            alert("algó saslió muy mal y no hemo podido proceder a encontrar el últmo mensaje leído");
        }
    }

    for(var i=msjNuevos.length-1; i >= 0; i--){
        msjAnalisis.push(msjNuevos[i]);
    }
    return msjAnalisis;
}

}, 100);