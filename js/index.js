window.onload = async () => {
    
    const data = await getStrings();

    hideLoadingSpinner("false");

    let lang = await loadLangURLs(); 
    loadNavbar(data[lang]);
    loadMain(data[lang]);
    loadFormacion(data[lang].formacion);
    loadExperiencia(data[lang].experiencia);
    loadHabilidades(data[lang].habilidades);

    hideLoadingSpinner("true");

};

function hideLoadingSpinner(status){
  
  const timeout = setTimeout( () => {$("#loading_spinner").attr("hidden", status)} , 200);
  
}

function getLanguage(){
    
  var usrlang = navigator.language || navigator.userLanguage;

    if (usrlang.toLowerCase().substring(0, 2) == 'es'){    
      return 'es';
    }else{  
      return 'en';
    };
};

async function loadLangURLs(){

  var lang = "";
  var sign = "";
  var url = "";
    
  var langIndex = window.location.search.indexOf("lang=");

  if(langIndex > -1){

      lang = window.location.search.substring(langIndex+5,langIndex+7);

      if(langIndex != 1){
        url = window.location.href.replace("&lang="+lang, "");
        sign='&';
      }else{
        url = window.location.href.replace("?lang="+lang, "");
        sign = '?';
      };

    }else{        

      lang = getLanguage();
      url = window.location.href;
      
      if (window.location.search.length>0){
          sign='&';
        }else{
          sign='?';
        }

    };    

    $('#section_title_anchor_es').attr('href', url + sign + 'lang=es');
    $('#section_title_anchor_en').attr('href', url + sign + 'lang=en');

    return lang;

};

async function loadNavbar(data){

    $("#section_title_anchor_formacion").text(data.left_menu.formacion);
    $("#section_title_anchor_experiencia").text(data.left_menu.experiencia);
    $("#section_title_anchor_habilidades").text(data.left_menu.habilidades);

};

async function loadMain(data){
    $("#main_name_subtitulo").text(data.main_name.subtitulo);    
    var content = "<p class='main_name_about_texto'>";
    for (var i = 0; i < data.about_home.texto.length; i++){
      content+=data.about_home.texto[i];
    }
    $("#main_name_about_blockquote").append(content + "</p>");    
    $("#main_name_about_details_tel_left").text(data.about_home.telefono);
    $("#main_name_about_details_tel_right").append(
      "<a href='"+data.about_home.data.telefonoWA+"' tabIndex=-1>" + data.about_home.data.telefono + "</a>" );
    $("#main_name_about_details_email_left").text(data.about_home.mail);
    $("#main_name_about_details_email_right").append(
        "<a href='mailto:" +data.about_home.data.mail+"' tabIndex=-1>" + data.about_home.data.mail + "</a>" );

    $("#main_name_about_details_linkedin_left").text(data.about_home.linkedin);    
    $("#main_name_about_details_linkedin_right").append(
      "<a href='"+data.about_home.data.linkedin+"' tabIndex=-1>" + data.about_home.data.linkedin + "</a>" );
    $("#main_name_about_details_file_left").text("PDF");    
    $("#about_home_details_button").text(data.about_home.textoBoton);   
    $('#about_home_details_button').attr('href', data.about_home.data.cvUrl);
    $('#about_home_details_button').attr('download', data.about_home.data.cvNombre);
    
};

async function loadFormacion(data){  
  $("#section_formacion_title").text(data.titulo);
  $("#section_formacion_row_title_anio").text(data.anio);
  $("#section_formacion_row_title_titulo").text(data.galardon);
  $("#section_formacion_row_title_lugar").text(data.lugar);

  var content = "";

  for (var i = 0; i < data.data.formacion.length; i++){

    var subContent = "";

    for (var j = 0; j < data.data.formacion[i].items.length; j++){

      subContent += "<div class='row '>"+
                      "<div class='col-md-4 align-self-center'>" + data.data.formacion[i].items[j].periodo + "</div>"+
                      "<div class='col-md-4 align-self-center'>"+ data.data.formacion[i].items[j].titulo + "</div>"+
                      "<div class='col-md-4 align-self-center'>"+ data.data.formacion[i].items[j].lugar + "</div>"+
                    "</div><br>";
    };
    
    content += "<div class='row section_formacion_row'>"+
                  "<div class='col align-self-center section_formacion_row_concept'>"+data.data.formacion[i].nombre+"</div>"+
               "</div>"+
               "<div class='row section_formacion_row'>"+
                    "<div class='col align-self-center section_formacion_row_content'>"+subContent+"</div>"+
              "</div>"+
                "</br>"+
                "</br>";

  };
              
  $("#section_formacion_container").append(content);

};




async function loadExperiencia(data){

  $("#content_xp_title").text(data.titulo);

  var content = "";  

  for (var i = data.data.roles.length-1; i >=0; i--){


     content+=      "<br>"+
                    "<div class='row section_experiencia_item'>"+
                          "<div class='col'>"+
                                "<div class='row section_experiencia_item_row_anio'>"+
                                    "<div class='col'><span id='section_experiencia_anio'>"+data.data.roles[i].periodo+"</span>"+
                                    "</div>"+
                                "</div>"+
                                "<div class='row section_experiencia_item_row section_experiencia_item_row_rol'>"+
                                    "<div class='col'><span id='section_experiencia_rol'>"+data.data.roles[i].rol+"</span>"+
                                    "</div>"+
                                "</div>"+
                                "<div class='row section_experiencia_item_row section_experiencia_item_row_empresa'>"+
                                    "<div class='col'><span id='section_experiencia_empresa'>"+data.data.roles[i].empresa+"</span></div>"+
                                "</div>"+
                                "<div class='row section_experiencia_item_row section_experiencia_item_row_descripcion'>"+
                                    "<div class='col'>"+
                                        "<h6 id='section_experiencia_descripcion'>"+data.data.roles[i].descripcion+"</h6>"+
                                    "</div>"+
                                "</div>"+
                          "</div>"+
                    "</div>";
  };

  $("#section_experiencia_container").append(content);

};



async function loadHabilidades(data){

  $("#content_skills_title").text(data.titulo);

  var content = "";

  for (var i = 0; i < data.data.areas.length ;i++){

    var subContent = "<div class='row  justify-content-center content_habilidades_row_content'>";
    var subContentC1 = "<div class='col-lg-5'>";
    var subContentC2 = "<div class='col-lg-5'>";

    for (var j = 0; j < data.data.areas[i].items.length; j++){

      var item = "<div class='row content_habilidades_row_content_row'>"+data.data.areas[i].items[j].nombre+"</div>";      

      if((j+1) % 2 > 0 ){
        subContentC1+=item;
      }else{
        subContentC2+=item;
      }
      
    }
    subContent+=subContentC1+"</div><div class='col-lg-2'></div>";
    subContent+=subContentC2+"</div>";

    content+=       "<div class='row content_habilidades_row'>"+
                        "<div class='col'>"+
                            "<div class='row'>"+
                                "<div class='col'>"+
                                    "<div class='row content_habilidades_row_title'>"+data.data.areas[i].nombre+"</div>"+
                                "</div>"+
                            "</div>"+
                            subContent+
                            "</div>"+
                        "</div>"+
                    "</div>";
  };


  $("#section_habilidades_container").append(content);

 
};
















async function loadData(fileName){
    const data = await fetch('./assets/data/' + fileName + '.json')
        .then( (response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error ${response.status}`);
                }
                return response.json();
        });    
    return data;
};

async function getStrings(){
    return {
        es: {   
          left_menu: {
            formacion: "(Formación)",
            experiencia: "(Experiencia)",
            habilidades: "(Habilidades)",
          },
          main_name: {
            subtitulo: "Analista Programador",
          },
          about_home: {
            titulo: "Sobre mí",
            texto: [
              "Soy Analista Funcional y Programador de Sistemas Informáticos.<br><br>",
              "Me considero afortunado al haber podido estudiar y además trabajar de lo que me apasiona.<br>",
              "Las tecnologías de la información permiten diseñar nuestro futuro y eso me parece fascinante.<br><br>",
              "Soy Argentino y vivo en Buenos Aires.",
            ],
            data: {
              mail: "juanpabloderoovers@hotmail.com",
              telefono: "+54 9 11 3525-2406",
              telefonoWA: "https://wa.me/5491135252406",
              linkedin: "https://www.linkedin.com/in/juan-pablo-de-roovers/",
              cvUrl: 'assets/files/Curriculum Vitae - Juan Pablo De Roovers - Mayo 2023.pdf',
              cvNombre:'Curriculum Vitae - Juan Pablo De Roovers - Mayo 2023.pdf',
            },
            mail: "E-mail",
            telefono: "Teléfono",
            linkedin: "LinkedIn",
            textoBoton: "Descargar C.V.",
          },
          formacion: {
            titulo: "(Formación)",
            anio: "Año",
            galardon: "Título",
            lugar: "Lugar",
            data: await loadData("formacion_es")
          },
          experiencia: {
            titulo: "(Experiencia)",
            data: await loadData("xp_es"),
            actualidad: "Actualidad",
          },
          habilidades: {
            titulo: "(Habilidades)",
            data: await loadData("habilidades_es")
          },
        },
        en: {
          left_menu: {
            formacion: "(Education)",
            experiencia: "(Experience)",
            habilidades: "(Skills)",            
          },
          main_name: {
            subtitulo: "Degree in Computer Science",
          },
          about_home: {
            titulo: "About me",
            texto: [                                          
              "I am a Functional Analyst and Programmer of Information Systems.<br><br>",
              "I consider myself blessed, having studied and then worked in something I am passionate about. <br>",
              "Information technologies allow us to shape the future, which is something I find amazing.<br><br>",
              "I'm Argentinian and I live in Buenos Aires. ",
            ],
            data: {
              mail: "juanpabloderoovers@hotmail.com",
              telefono: "+54 9 11 3525-2406",
              telefonoWA: "https://wa.me/5491135252406",
              linkedin: "https://www.linkedin.com/in/juan-pablo-de-roovers/",
              cvUrl: 'assets/files/Curriculum Vitae - Juan Pablo De Roovers - May 2023.pdf',
              cvNombre:'Curriculum Vitae - Juan Pablo De Roovers - May 2023.pdf',
            },
            mail: "Mail",
            telefono: "Phone",
            linkedin: "LinkedIn",
            textoBoton: "Download Resume",
          },
          formacion: {
            titulo: "(Education)",
            anio: "Year",
            galardon: "Degree/Certificate",
            lugar: "Place",
            data: await loadData("formacion_en")
          },
          experiencia: {
            titulo: "(Experience)",
            data: await loadData("xp_en"),
            actualidad: "Present",
          },
          habilidades: {
            titulo: "(Skills)",
            data: await loadData("habilidades_en"), 
          },
        },
      };
}