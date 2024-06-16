window.addEventListener("scroll", revelar);

window.onbeforeunload = () => {
  window.scrollTo(0, 0);
};

window.onload = async () => {
  
    await hideLoadingSpinner(false);

    window.scrollTo(0, 0);

    revelar();
    
    const data = await getStrings();

    let lang = await loadLangURLs(); 
    loadNavbar(data[lang]);
    loadMain(data[lang]);
    
    await hideLoadingSpinner(true);

    loadFormacion(data[lang].formacion);
    loadExperiencia(data[lang].experiencia);
    loadHabilidades(data[lang].habilidades);

    if(false)
      loadICSVG();
  

};

async function hideLoadingSpinner(status){
  setTimeout( () => {$("#loading_spinner").attr("hidden", status)} , 750);  
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
              cvUrl: 'assets/files/Curriculum Vitae - Juan Pablo De Roovers - ES.pdf',
              cvNombre:'Curriculum Vitae - Juan Pablo De Roovers - ES.pdf',
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
            data: getFormacionStrings('es')
          },
          experiencia: {
            titulo: "(Experiencia)",
            data: getXpStrings('es'),
            actualidad: "Actualidad",
          },
          habilidades: {
            titulo: "(Habilidades)",
            data: getHabilidadesStrings('es')
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
              cvUrl: 'assets/files/Curriculum Vitae - Juan Pablo De Roovers - EN.pdf',
              cvNombre:'Curriculum Vitae - Juan Pablo De Roovers - EN.pdf',
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
            data: getFormacionStrings('en')
          },
          experiencia: {
            titulo: "(Experience)",
            data: getXpStrings('en'),
            actualidad: "Present",
          },
          habilidades: {
            titulo: "(Skills)",
            data: getHabilidadesStrings('en')
          },
        },
      };
};

function loadICSVG(){
  $("#section_footer_container").append(loadICSVGData());
}


function getFormacionStrings(lang){

  if (lang == 'es') {

    return {
      "formacion": [
        {
          "nombre": "Educación",
          "items": [
            {
              "titulo": "Licenciado en Informática",
              "lugar": "Universidad Católica de Salta",
              "periodo": "2004",
              "tipo": "Universitario"
            },
            {
              "titulo": "Técnico Superior en Programación",
              "lugar": "Universidad Tecnológica Nacional",
              "periodo": "2002",
              "tipo": "Terciario"
            },
            {
              "titulo": "Perito Mercantil con orientación en Computación",
              "lugar": "Instituto San Ramón Nonato",
              "periodo": "2000",
              "tipo": "Secundario"
            }
          ]
        },
        {
          "nombre": "Idiomas",
          "items": [
            {
              "titulo": "Business English Certificate (BEC) Higher",
              "lugar": "University of Cambridge",
              "periodo": "2014",
              "tipo": "Inglés"
            },
            {
              "titulo": "First Certificate in English (FEC)",
              "lugar": "University of Cambridge",
              "periodo": "2004",
              "tipo": "Inglés"
            }
          ]
        },
        {
          "nombre": "Capacitaciones",
          "items": [
            {
              "titulo": "The Complete 2022 Web Development Bootcamp",
              "lugar": "Udemy",
              "periodo": "2023",
              "tipo": "Curso"
            },
            {
              "titulo": "Achieve Mastery in Data Structures & Algorithms - Java",
              "lugar": "Udemy",
              "periodo": "2022",
              "tipo": "Curso"
            },
            {
              "titulo": "Java Multithreading, Concurrency & Performance Optimization",
              "lugar": "Udemy",
              "periodo": "2022",
              "tipo": "Curso"
            },
            {
              "titulo": "Design Patterns in Java",
              "lugar": "Udemy",
              "periodo": "2022",
              "tipo": "Curso"
            },
            {
              "titulo": "Full Stack Java Developer",
              "lugar": "Udemy",
              "periodo": "2022",
              "tipo": "Curso"
            },
            {
              "titulo": "Scrum Grand Master",
              "lugar": "Universidad Tecnológica Nacional (UTN)",
              "periodo": "2022",
              "tipo": "Curso"
            },
            {
              "titulo": "Machine Learning con Python",
              "lugar": "Universidad Tecnológica Nacional (UTN)",
              "periodo": "2021",
              "tipo": "Curso"
            },
            {
              "titulo": "Diplomatura en Programación Java",
              "lugar": "Universidad Tecnológica Nacional (UTN)",
              "periodo": "2020",
              "tipo": "Diplomatura"
            },
            {
              "titulo": "Python 3 - Nivel Avanzado",
              "lugar": "Universidad Tecnológica Nacional (UTN)",
              "periodo": "2020",
              "tipo": "Curso"
            },
            {
              "titulo": "Desarrollo en React JS",
              "lugar": "Universidad Tecnológica Nacional (UTN)",
              "periodo": "2020",
              "tipo": "Curso"
            },
            {
              "titulo": "Desarrollo en Android",
              "lugar": "Universidad Tecnológica Nacional (UTN)",
              "periodo": "2015",
              "tipo": "Curso"
            }
          ]
        }
      ]
    };

  }else{

    return {
      "formacion": [
        {
          "nombre": "Education",
          "items": [
            {
              "titulo": "Bachelor's Degree in Computer Science",
              "lugar": "Universidad Católica de Salta",
              "periodo": "2004",
              "tipo": "Academic"
            },
            {
              "titulo": "Associate Degree in Computer Programming",
              "lugar": "Universidad Tecnológica Nacional",
              "periodo": "2002",
              "tipo": "Tertiary"
            },
            {
              "titulo": "Bachillerato (equivalent to High School diploma)",
              "lugar": "Instituto San Ramón Nonato",
              "periodo": "2000",
              "tipo": "Secondary"
            }
          ]
        },
        {
          "nombre": "Languages",
          "items": [
            {
              "titulo": "Business English Certificate (BEC) Higher",
              "lugar": "University of Cambridge",
              "periodo": "2014",
              "tipo": "English"
            },
            {
              "titulo": "First Certificate in English (FEC)",
              "lugar": "University of Cambridge",
              "periodo": "2004",
              "tipo": "English"
            }
          ]
        },
        {
          "nombre": "Training",
          "items": [
            {
              "titulo": "The Complete 2022 Web Development Bootcamp",
              "lugar": "Udemy",
              "periodo": "2023",
              "tipo": "Training Course"
            },
            {
              "titulo": "Achieve Mastery in Data Structures & Algorithms - Java",
              "lugar": "Udemy",
              "periodo": "2022",
              "tipo": "Training Course"
            },
            {
              "titulo": "Java Multithreading, Concurrency & Performance Optimization",
              "lugar": "Udemy",
              "periodo": "2022",
              "tipo": "Training Course"
            },
            {
              "titulo": "Design Patterns in Java",
              "lugar": "Udemy",
              "periodo": "2022",
              "tipo": "Training Course"
            },
            {
              "titulo": "Full Stack Java Developer",
              "lugar": "Udemy",
              "periodo": "2022",
              "tipo": "Training Course"
            },
            {
              "titulo": "Scrum Grand Master",
              "lugar": "Universidad Tecnológica Nacional (UTN)",
              "periodo": "2022",
              "tipo": "Training Course"
            },
            {
              "titulo": "Machine Learning with Python",
              "lugar": "Universidad Tecnológica Nacional (UTN)",
              "periodo": "2021",
              "tipo": "Training Course"
            },
            {
              "titulo": "Undergraduate Degree in Java Programming",
              "lugar": "Universidad Tecnológica Nacional (UTN)",
              "periodo": "2020",
              "tipo": "Undergraduate Degree"
            },
            {
              "titulo": "Python 3 - Advanced Level",
              "lugar": "Universidad Tecnológica Nacional (UTN)",
              "periodo": "2020",
              "tipo": "Training Course"
            },
            {
              "titulo": "Development in React JS",
              "lugar": "Universidad Tecnológica Nacional (UTN)",
              "periodo": "2020",
              "tipo": "Training Course"
            },
            {
              "titulo": "Development in Android",
              "lugar": "Universidad Tecnológica Nacional (UTN)",
              "periodo": "2015",
              "tipo": "Training Course"
            },
            {
              "titulo": "Cisco CCNA (4° module)",
              "lugar": "ProYDesa",
              "periodo": "2009",
              "tipo": "Cisco CCNA"
            },
            {
              "titulo": "Motorola microcontrollers Programming",
              "lugar": "Private Teacher",
              "periodo": "2006",
              "tipo": "Training Course"
            }
          ]
        }
      ]
    };

  };

};

















function getXpStrings(lang){

  if(lang == 'es'){

    return {
      "roles": [
        {
          "empresa": "Accenture S.R.L para Institución Bancaria",
          "periodo": "2006-2008",
          "rol": "Programador",
          "descripcion": "Desarrollo en Cobol/JCL/CICS, documentación y prueba de componentes de aplicativos del Banco en plataforma Mainframe (IBM OS/2/Cobol/JCL/CICS). Manejo de archivos (Secuenciales/VSAM) y bases de datos (SQL/DB2). Resolución de incidentes y desarrollo de mejoras."
        },
        {
          "empresa": "Accenture S.R.L para Institución Bancaria",
          "periodo": "2008-2010",
          "rol": "Analista Junior",
          "descripcion": "Supervisión de equipo de programadores (2 personas). Análisis, diseño técnico, desarrollo en COBOL/JCL/CICS y pruebas en aplicativos del Banco. Resolución de incidentes productivos. Atención de guardias del sistema."
        },
        {
          "empresa": "Accenture S.R.L para Institución Bancaria",
          "periodo": "2010-2013",
          "rol": "Analista Senior",
          "descripcion": "Supervisión de equipo de mantenimiento (4 personas) de aplicativos del Banco. Desarrollo en COBOL/JCL/CICS, Testing, implementación y soporte postimplementación. Contacto directo con el cliente. Soporte a incidentes de sucursales y áreas centrales."
        },
        {
          "empresa": "Accenture S.R.L para Institución Bancaria",
          "periodo": "2013-2015",
          "rol": "Especialista",
          "descripcion": "Responsable de relevamientos para proyecto de migración de Core Bancario (Mainframe a SAP Banking). Responsable desarrollos en COBOL/CICS en plataforma Mainframe para integración con Web Services (SOA)."
        },
        {
          "empresa": "Banco Macro S.A.",
          "periodo": "2015-2022",
          "rol": "Analista Funcional",
          "descripcion": "Análisis y documentación funcional y técnica (C#/SQL/Sybase/SQR/Visual Basic 6). Interacción con usuarios del negocio y proveedores del software. Testing, implementación y mantenimiento de aplicaciones Core del Banco. Resolución de incidentes de sucursales y áreas centrales."
        },
        {
          "empresa": "Devsu LLC",
          "periodo": "2022-Presente",
          "rol": "Java Developer",
          "descripcion": "Desarrollo de microservicios REST en Java. Framework Spring Boot. MVC y Webflux. Contratos Open API. Bases de datos Microsoft SQL Server. Mensajería en Apache Kafka. Spring Cloud Gateway."
        }        
      ]
    };

  }else{

    return {
      "roles": [
        {
          "empresa": "Accenture S.R.L (working for main Argentinian bank)",
          "periodo": "2006",
          "rol": "Programmer",
          "descripcion": "Development with Cobol/JCL/CICS, documentation and testing of core banking applications (Mainframe platform - IBM OS/2). Files (sequential/VSAM) and database (SQL/DB2) handling. Incidents resolution and system upgrades development."
        },
        {
          "empresa": "Accenture S.R.L (working for main Argentinian bank)",
          "periodo": "2008",
          "rol": "Junior Analist",
          "descripcion": "Programmers team management (2 members). Analysis and technical designs documentation. Development with COBOL/JCL/CICS and testing of core banking applications. Resolution of production incidents. On-call support during overnight batch processing."
        },
        {
          "empresa": "Accenture S.R.L (working for main Argentinian bank)",
          "periodo": "2010",
          "rol": "Senior Analist",
          "descripcion": "Maintenance team management (4 members). Development with COBOL/JCL/CICS. Testing, production implementation and post-implementation support. Direct contact with clients. Production incidents resolution."
        },
        {
          "empresa": "Accenture S.R.L (working for main Argentinian bank)",
          "periodo": "2013",
          "rol": "Specialist",
          "descripcion": "Survey processes for core banking system migration project (Mainframe to SAP Banking). Mainframe programs development with COBOL/CICS, with Web Services integration (SOA)."
        },
        {
          "empresa": "Banco Macro S.A.",
          "periodo": "2015 2022",
          "rol": "Functional Analist",
          "descripcion": "Functional and technical analysis and documentation (C#/SQL/Sybase/SQR/Visual Basic 6). Interaction with users and software providers. Testing, production implementation and maintenance of core banking applications. Resolution of production incidents."
        },
        {
          "empresa": "Devsu LLC",
          "periodo": "2022-Present",
          "rol": "Java Developer",
          "descripcion": "REST Microservices development in Java. Spring Boot Framework. MVC and Webflux. Open API contracts. Microsoft SQL Server databases. Apache Kafka messaging. Spring Cloud Gateway."
        }         
      ]
    }

  };

};

function getHabilidadesStrings(lang){

if (lang == 'es'){

  return {
    "areas": [
      {
        "nombre": "Lenguajes de Programación",
        "items": [
          {
            "nombre": "Java",
            "valor": 90
          },
          {
            "nombre": "SQL",
            "valor": 80
          },
          {
            "nombre": "Javascript",
            "valor": 70
          },
          {
            "nombre": "C#",
            "valor": 70
          },
          {
            "nombre": "HTML / CSS ",
            "valor": 60
          },
          {
            "nombre": "Python",
            "valor": 60
          },
          {
            "nombre": "COBOL",
            "valor": 80
          },
          {
            "nombre": "C / C++",
            "valor": 60
          },
          {
            "nombre": "Visual Basic",
            "valor": 80
          },
          {
            "nombre": "Assembler (MCUs)",
            "valor": 50
          }
        ]
      },
      {
        "nombre": "Plataforma Sybase SQL Server (SAP ASE)",
        "items": [
          {
            "nombre": "Sybase Stored Procedures",
            "valor": 75
          },
          {
            "nombre": "Hyperion SQR",
            "valor": 60
          },
          {
            "nombre": "Unix",
            "valor": 70
          }
        ]
      },
      {
        "nombre": "Plataforma Mainframe  IBM z/OS",
        "items": [
          {
            "nombre": "Serena ChangeMan",
            "valor": 60
          },
          {
            "nombre": "IBM DB2",
            "valor": 70
          },
          {
            "nombre": "CICS",
            "valor": 70
          },
          {
            "nombre": "JCL",
            "valor": 60
          },
          {
            "nombre": "BMC Control-M",
            "valor": 50
          },
          {
            "nombre": "SORT",
            "valor": 50
          },
          {
            "nombre": "IBM FileAid",
            "valor": 60
          },
          {
            "nombre": "TSO",
            "valor": 70
          },
          {
            "nombre": "IBM FileAid para DB2",
            "valor": 60
          },
          {
            "nombre": "Archivos IBM VSAM",
            "valor": 60
          }
        ]
      },
      {
        "nombre": "Herramientas / Software",
        "items": [
          {
            "nombre": "Eclipse (IDE)",
            "valor": 80
          },
          {
            "nombre": "MS Excel-Word-Outlook-Powerpoint",
            "valor": 75
          },
          {
            "nombre": "Android Studio (IDE)",
            "valor": 50
          },
          {
            "nombre": "MS Powershell",
            "valor": 75
          },
          {
            "nombre": "MS Visual Studio & VS Code (IDE)",
            "valor": 70
          },
          {
            "nombre": "Rational ClearQuest",
            "valor": 70
          },
          {
            "nombre": "BMC Remedy ITSM",
            "valor": 70
          },
          {
            "nombre": "Rational ClearCase",
            "valor": 70
          },
          {
            "nombre": "DOS / Comandos Batch",
            "valor": 60
          },
          {
            "nombre": "FTP",
            "valor": 70
          },
          {
            "nombre": "GIT",
            "valor": 60
          }
        ]
      }
    ]
  };
}else{

  return {
    "areas": [
      {
        "nombre": "Programming Languages",
        "items": [
          {
            "nombre": "Java",
            "valor": 90
          },
          {
            "nombre": "SQL",
            "valor": 80
          },
          {
            "nombre": "Javascript",
            "valor": 70
          },
          {
            "nombre": "C#",
            "valor": 70
          },
          {
            "nombre": "HTML / CSS ",
            "valor": 60
          },
          {
            "nombre": "Python",
            "valor": 60
          },
          {
            "nombre": "COBOL",
            "valor": 80
          },
          {
            "nombre": "C / C++",
            "valor": 60
          },
          {
            "nombre": "Visual Basic",
            "valor": 80
          },
          {
            "nombre": "Assembler (MCUs)",
            "valor": 50
          }
        ]
      },
      {
        "nombre": "Sybase SQL Server (SAP ASE) Platform",
        "items": [
          {
            "nombre": "Sybase Stored Procedures",
            "valor": 75
          },
          {
            "nombre": "Hyperion SQR",
            "valor": 60
          },
          {
            "nombre": "Unix",
            "valor": 70
          }
        ]
      },
      {
        "nombre": "Mainframe Platform - IBM z/OS",
        "items": [
          {
            "nombre": "Serena ChangeMan",
            "valor": 60
          },
          {
            "nombre": "IBM DB2",
            "valor": 70
          },
          {
            "nombre": "CICS",
            "valor": 70
          },
          {
            "nombre": "JCL",
            "valor": 60
          },
          {
            "nombre": "BMC Control-M",
            "valor": 50
          },
          {
            "nombre": "SORT",
            "valor": 50
          },
          {
            "nombre": "IBM FileAid",
            "valor": 60
          },
          {
            "nombre": "TSO",
            "valor": 70
          },
          {
            "nombre": "IBM FileAid for DB2",
            "valor": 60
          },
          {
            "nombre": "IBM VSAM Files",
            "valor": 60
          }
        ]
      },
      {
        "nombre": "Tools / Software",
        "items": [
          {
            "nombre": "Eclipse (IDE)",
            "valor": 80
          },
          {
            "nombre": "MS Excel-Word-Outlook-Powerpoint",
            "valor": 75
          },
          {
            "nombre": "Android Studio (IDE)",
            "valor": 50
          },
          {
            "nombre": "MS Powershell",
            "valor": 75
          },
          {
            "nombre": "MS Visual Studio & VS Code (IDE)",
            "valor": 70
          },
          {
            "nombre": "Rational ClearQuest",
            "valor": 70
          },
          {
            "nombre": "BMC Remedy ITSM",
            "valor": 70
          },
          {
            "nombre": "Rational ClearCase",
            "valor": 70
          },
          {
            "nombre": "DOS / Batch Commands",
            "valor": 60
          },
          {
            "nombre": "FTP",
            "valor": 70
          },
          {
            "nombre": "GIT",
            "valor": 60
          }
        ]
      }
    ]
  };
};
};

function loadICSVGData(){

  return "<svg width='278' height='34' viewBox='0 0 278 34' fill='none' xmlns='http://www.w3.org/2000/svg'>"+
  "<rect x='0.5' y='0.5' width='277' height='33' rx='3.5' fill='#28282C' stroke='url(#paint0_linear_1724_79)'/>"+
  "<path d='M12.002 15.941V13.026H13.652C14.653 13.026 15.269 13.609 15.269 14.5C15.269 15.358 14.653 15.941 13.652 15.941H12.002ZM13.795 16.766C15.236 16.766 16.193 15.798 16.193 14.489C16.193 13.191 15.236 12.201 13.795 12.201H11.078V20H12.002V16.766H13.795ZM19.301 "+
  "14.577C17.783 14.577 16.661 15.743 16.661 17.36C16.661 18.988 17.783 20.154 19.301 20.154C20.819 20.154 21.941 18.988 21.941 17.36C21.941 15.743 20.819 14.577 19.301 14.577ZM19.301 15.369C20.247 15.369 21.061 16.084 21.061 17.36C21.061 18.647 20.247 19.362 19.301 19.362C18.355 19.362 17.541 18.647 17.541 17.36C17.541 16.084 18.355 15.369 19.301 15.369ZM26.3143 14.731L24.8623 18.9L23.5753 14.731H22.6293L24.3783 "+
  "20H25.3133L26.7653 15.798L28.2393 20H29.1633L30.8793 14.731H29.9443L28.6903 18.9L27.2273 14.731H26.3143ZM32.4952 16.854C32.5502 16.073 33.1662 15.358 34.0792 15.358C35.0802 15.358 35.6192 16.018 35.6412 16.854H32.4952ZM35.7622 18.229C35.5532 18.856 35.0692 19.362 34.1782 19.362C33.2322 19.362 32.4732 18.647 32.4732 17.646V17.602H36.5322C36.5432 17.525 36.5542 17.404 36.5542 17.294C36.5542 15.688 35.6632 14.577 34.0682 14.577C32.7372 14.577 31.5712 15.688 31.5712 17.349C31.5712 19.12 32.7702 20.154 34.1782 20.154C35.3992 20.154 36.2242 19.417 36.5212 18.504L35.7622 18.229ZM40.7123 14.698C40.6353 14.676 40.4813 14.654 40.3383 14.654C39.7553 14.654 39.0843 14.907 38.7433 15.677V14.731H37.8853V20H38.7653V17.272C38.7653 16.084 39.3703 15.578 40.2503 15.578C40.4043 15.578 40.5693 15.589 40.7123 15.633V14.698ZM42.1954 16.854C42.2504 16.073 42.8664 15.358 43.7794 15.358C44.7804 15.358 45.3194 16.018 45.3414 16.854H42.1954ZM45.4624 18.229C45.2534 18.856 44.7694 19.362 43.8784 19.362C42.9324 19.362 42.1734 18.647 42.1734 17.646V17.602H46.2324C46.2434 17.525 46.2544 17.404 46.2544 17.294C46.2544 15.688 45.3634 14.577 43.7684 14.577C42.4374 14.577 41.2714 15.688 41.2714 17.349C41.2714 19.12 42.4704 20.154 43.8784 20.154C45.0994 20.154 45.9244 19.417 46.2214 18.504L45.4624 18.229ZM51.4025 19.241C51.4025 19.582 51.4355 19.879 51.4575 20H52.3155C52.2935 19.89 52.2605 19.538 52.2605 19.01V12.047H51.3805V15.578C51.2045 15.138 50.6875 14.577 49.6755 14.577C48.2015 14.577 47.2335 15.831 47.2335 17.36C47.2335 18.922 48.1575 20.154 49.6755 20.154C50.5885 20.154 51.1605 19.615 51.4025 19.098V19.241ZM49.7525 19.362C48.7625 19.362 48.1135 18.526 48.1135 17.36C48.1135 16.194 48.7515 15.369 49.7525 15.369C50.7535 15.369 51.4025 16.194 51.4025 17.36C51.4025 18.526 50.7425 19.362 49.7525 19.362ZM57.6389 20V19.131C57.9469 19.703 58.5629 20.154 59.4429 20.154C60.9719 20.154 61.8629 18.933 61.8629 17.36C61.8629 15.82 61.0269 14.577 59.4649 14.577C58.5189 14.577 57.9029 15.094 57.6609 15.589V12.047H56.7809V20H57.6389ZM59.3109 19.362C58.2989 19.362 57.6389 18.526 57.6389 17.36C57.6389 16.194 58.2879 15.369 59.3109 15.369C60.3339 15.369 60.9829 16.194 60.9829 17.36C60.9829 18.526 60.3229 19.362 59.3109 19.362ZM64.3641 22.09L67.7411 14.731H66.7841L65.1451 18.46L63.4071 14.731H62.3951L64.6611 19.373L63.3851 22.09H64.3641Z' fill='white'/>"+
  "<path d='M114.945 19.8486C115.195 19.8486 115.399 19.6561 115.399 19.4187V13.5719C115.399 13.3344 115.195 13.1419 114.945 13.1419H114.454C114.203 13.1419 114 13.3344 114 13.5719V19.4187C114 19.6561 114.203 19.8486 114.454 19.8486H114.945Z' fill='white'/>"+
  "<path d='M125.641 19.8486C125.892 19.8486 126.095 19.6561 126.095 19.4187V13.5719C126.095 13.3344 125.892 13.1419 125.641 13.1419H125.171C124.92 13.1419 124.717 13.3344 124.717 13.5719V17.5784L121.903 13.3429C121.82 13.2178 121.675 13.1419 121.519 13.1419H120.505C120.254 13.1419 120.051 13.3344 120.051 13.5719V19.4187C120.051 19.6561 120.254 19.8486 120.505 19.8486H120.976C121.226 19.8486 121.43 19.6561 121.43 19.4187V15.0905L124.513 19.6505C124.596 19.774 124.74 19.8486 124.895 19.8486H125.641Z' fill='white'/>"+
  "<path d='M135.497 14.3811C135.748 14.3811 135.951 14.1886 135.951 13.9511V13.5719C135.951 13.3344 135.748 13.1419 135.497 13.1419H130.541C130.29 13.1419 130.087 13.3344 130.087 13.5719V13.9511C130.087 14.1886 130.29 14.3811 130.541 14.3811H132.324V19.4187C132.324 19.6561 132.528 19.8486 132.779 19.8486H133.259C133.51 19.8486 133.713 19.6561 133.713 19.4187V14.3811H135.497Z' fill='white'/>"+
  "<path d='M143.921 19.8486C144.171 19.8486 144.375 19.6561 144.375 19.4187V19.0489C144.375 18.8114 144.171 18.6189 143.921 18.6189H141.317V17.0676H143.631C143.882 17.0676 144.085 16.8751 144.085 16.6376V16.334C144.085 16.0966 143.882 15.9041 143.631 15.9041H141.317V14.3716H143.921C144.171 14.3716 144.375 14.1791 144.375 13.9416V13.5719C144.375 13.3344 144.171 13.1419 143.921 13.1419H140.393C140.142 13.1419 139.939 13.3344 139.939 13.5719V19.4187C139.939 19.6561 140.142 19.8486 140.393 19.8486H143.921Z' fill='white'/>"+
  "<path d='M152.092 19.6138C152.17 19.7579 152.326 19.8486 152.497 19.8486H153.006C153.348 19.8486 153.567 19.5054 153.408 19.2191L152.238 17.1054C153.167 16.85 153.747 16.1405 153.747 15.2041C153.747 14.0405 152.868 13.1419 151.489 13.1419H149.176C148.925 13.1419 148.722 13.3344 148.722 13.5719V19.4187C148.722 19.6561 148.925 19.8486 149.176 19.8486H149.656C149.907 19.8486 150.11 19.6561 150.11 19.4187V17.2662H150.83L152.092 19.6138ZM150.11 16.1405V14.277H151.229C151.929 14.277 152.338 14.6459 152.338 15.2135C152.338 15.7622 151.929 16.1405 151.229 16.1405H150.11Z' fill='white'/>"+
  "<path d='M163.602 19.8486C163.853 19.8486 164.056 19.6561 164.056 19.4187V13.5719C164.056 13.3344 163.853 13.1419 163.602 13.1419H163.132C162.881 13.1419 162.677 13.3344 162.677 13.5719V17.5784L159.864 13.3429C159.781 13.2178 159.635 13.1419 159.479 13.1419H158.466C158.215 13.1419 158.012 13.3344 158.012 13.5719V19.4187C158.012 19.6561 158.215 19.8486 158.466 19.8486H158.936C159.187 19.8486 159.391 19.6561 159.391 19.4187V15.0905L162.474 19.6505C162.557 19.774 162.701 19.8486 162.856 19.8486H163.602Z' fill='white'/>"+
  "<path d='M172.698 19.8486C172.949 19.8486 173.153 19.6561 173.153 19.4187V19.0489C173.153 18.8114 172.949 18.6189 172.698 18.6189H170.095V17.0676H172.409C172.659 17.0676 172.863 16.8751 172.863 16.6376V16.334C172.863 16.0966 172.659 15.9041 172.409 15.9041H170.095V14.3716H172.698C172.949 14.3716 173.153 14.1791 173.153 13.9416V13.5719C173.153 13.3344 172.949 13.1419 172.698 13.1419H169.171C168.92 13.1419 168.717 13.3344 168.717 13.5719V19.4187C168.717 19.6561 168.92 19.8486 169.171 19.8486H172.698Z' fill='white'/>"+
  "<path d='M182.241 14.3811C182.491 14.3811 182.695 14.1886 182.695 13.9511V13.5719C182.695 13.3344 182.491 13.1419 182.241 13.1419H177.284C177.033 13.1419 176.83 13.3344 176.83 13.5719V13.9511C176.83 14.1886 177.033 14.3811 177.284 14.3811H179.068V19.4187C179.068 19.6561 179.271 19.8486 179.522 19.8486H180.003C180.253 19.8486 180.457 19.6561 180.457 19.4187V14.3811H182.241Z' fill='white'/>"+
  "<path d='M194.984 19.9905C196.728 19.9905 197.726 19.0305 198.127 18.0989C198.218 17.8868 198.08 17.6588 197.848 17.5925L197.413 17.468C197.171 17.3986 196.919 17.5336 196.798 17.744C196.507 18.2475 195.939 18.7135 194.984 18.7135C193.845 18.7135 192.786 17.9284 192.786 16.5C192.786 14.977 193.905 14.2581 194.964 14.2581C195.923 14.2581 196.468 14.6896 196.742 15.1846C196.863 15.404 197.123 15.5479 197.373 15.4734L197.806 15.344C198.034 15.2759 198.171 15.0505 198.082 14.8401C197.682 13.8845 196.693 13 194.964 13C193.066 13 191.358 14.3622 191.358 16.5C191.358 18.6378 193.006 19.9905 194.984 19.9905Z' fill='white'/>"+
  "<path d='M203.335 16.4905C203.335 14.977 204.454 14.2581 205.543 14.2581C206.642 14.2581 207.761 14.977 207.761 16.4905C207.761 18.0041 206.642 18.723 205.543 18.723C204.454 18.723 203.335 18.0041 203.335 16.4905ZM201.906 16.5C201.906 18.6568 203.625 19.9905 205.543 19.9905C207.471 19.9905 209.19 18.6568 209.19 16.5C209.19 14.3338 207.471 13 205.543 13C203.625 13 201.906 14.3338 201.906 16.5Z' fill='white'/>"+
  "<path d='M220.87 19.8486C221.12 19.8486 221.324 19.6561 221.324 19.4187V13.5719C221.324 13.3344 221.12 13.1419 220.87 13.1419H219.751C219.566 13.1419 219.4 13.2479 219.331 13.41L217.368 17.9851L215.356 13.4067C215.285 13.2464 215.12 13.1419 214.937 13.1419H213.875C213.624 13.1419 213.421 13.3344 213.421 13.5719V19.4187C213.421 19.6561 213.624 19.8486 213.875 19.8486H214.286C214.537 19.8486 214.74 19.6561 214.74 19.4187V15.1851L216.662 19.5831C216.732 19.7438 216.898 19.8486 217.082 19.8486H217.622C217.807 19.8486 217.973 19.7433 218.043 19.5819L219.965 15.1473V19.4187C219.965 19.6561 220.168 19.8486 220.419 19.8486H220.87Z' fill='white'/>"+
  "<path d='M227.369 16.1973V14.277H228.457C229.147 14.277 229.566 14.6459 229.566 15.2419C229.566 15.8189 229.147 16.1973 228.457 16.1973H227.369ZM228.627 17.323C230.026 17.323 230.955 16.4527 230.955 15.2324C230.955 14.0216 230.026 13.1419 228.627 13.1419H226.434C226.183 13.1419 225.98 13.3344 225.98 13.5719V19.4187C225.98 19.6561 226.183 19.8486 226.434 19.8486H226.904C227.155 19.8486 227.359 19.6561 227.359 19.4187V17.323H228.627Z' fill='white'/>"+
  "<path d='M237.684 20C239.202 20 240.411 19.1203 240.411 17.4743V13.5719C240.411 13.3344 240.208 13.1419 239.957 13.1419H239.486C239.236 13.1419 239.032 13.3344 239.032 13.5719V17.3797C239.032 18.2595 238.523 18.723 237.684 18.723C236.864 18.723 236.345 18.2595 236.345 17.3797V13.5719C236.345 13.3344 236.142 13.1419 235.891 13.1419H235.42C235.169 13.1419 234.966 13.3344 234.966 13.5719V17.4743C234.966 19.1203 236.175 20 237.684 20Z' fill='white'/>"+
  "<path d='M249.75 14.3811C250.001 14.3811 250.204 14.1886 250.204 13.9511V13.5719C250.204 13.3344 250.001 13.1419 249.75 13.1419H244.794C244.543 13.1419 244.34 13.3344 244.34 13.5719V13.9511C244.34 14.1886 244.543 14.3811 244.794 14.3811H246.578V19.4187C246.578 19.6561 246.781 19.8486 247.032 19.8486H247.512C247.763 19.8486 247.966 19.6561 247.966 19.4187V14.3811H249.75Z' fill='white'/>"+
  "<path d='M258.174 19.8486C258.424 19.8486 258.628 19.6561 258.628 19.4187V19.0489C258.628 18.8114 258.424 18.6189 258.174 18.6189H255.571V17.0676H257.884C258.135 17.0676 258.338 16.8751 258.338 16.6376V16.334C258.338 16.0966 258.135 15.9041 257.884 15.9041H255.571V14.3716H258.174C258.424 14.3716 258.628 14.1791 258.628 13.9416V13.5719C258.628 13.3344 258.424 13.1419 258.174 13.1419H254.646C254.395 13.1419 254.192 13.3344 254.192 13.5719V19.4187C254.192 19.6561 254.395 19.8486 254.646 19.8486H258.174Z' fill='white'/>"+
  "<path d='M266.345 19.6138C266.423 19.7579 266.579 19.8486 266.75 19.8486H267.259C267.601 19.8486 267.82 19.5054 267.661 19.2191L266.491 17.1054C267.421 16.85 268 16.1405 268 15.2041C268 14.0405 267.121 13.1419 265.742 13.1419H262.975V19.4187C262.975 19.6561 263.178 19.8486 263.429 19.8486H263.909C264.16 19.8486 264.363 19.6561 264.363 19.4187V17.2662H265.083L266.345 19.6138ZM264.363 16.1405V14.277H265.482C266.182 14.277 266.591 14.6459 266.591 15.2135C266.591 15.7622 266.182 16.1405 265.482 16.1405H264.363Z' fill='white'/>"+
  "<path d='M99.6529 9C97.7587 9 95.694 9.97059 93.5117 11.8824C92.4764 12.7882 91.5823 13.7588 90.9117 14.5353C90.9117 14.5353 90.9117 14.5353 90.9176 14.5412V14.5353C90.9176 14.5353 91.9764 15.6882 93.147 16.9235C93.7764 16.1765 94.6823 15.1588 95.7234 14.2412C97.6646 12.5412 98.9293 12.1824 99.6529 12.1824C102.376 12.1824 104.588 14.3412 104.588 16.9941C104.588 19.6294 102.37 21.7882 99.6529 21.8059C99.5293 21.8059 99.3705 21.7882 99.1705 21.7471C99.9646 22.0882 100.818 22.3353 101.629 22.3353C106.618 22.3353 107.594 19.0823 107.659 18.8471C107.806 18.2529 107.882 17.6294 107.882 16.9882C107.882 12.5882 104.188 9 99.6529 9Z' fill='url(#paint1_linear_1724_79)'/>"+
  "<path d='M82.2294 24.9999C84.1235 24.9999 86.1882 24.0293 88.3706 22.1175C89.4059 21.2116 90.3 20.241 90.9706 19.4646C90.9706 19.4646 90.9706 19.4646 90.9647 19.4587V19.4646C90.9647 19.4646 89.9059 18.3116 88.7353 17.0763C88.1059 17.8234 87.2 18.841 86.1588 19.7587C84.2176 21.4587 82.9529 21.8175 82.2294 21.8175C79.5059 21.8116 77.2941 19.6528 77.2941 16.9999C77.2941 14.3646 79.5118 12.2057 82.2294 12.1881C82.3529 12.1881 82.5118 12.2057 82.7118 12.2469C81.9176 11.9058 81.0647 11.6587 80.2529 11.6587C75.2647 11.6587 74.2941 14.9116 74.2235 15.141C74.0765 15.741 74 16.3587 74 16.9999C74 21.4116 77.6941 24.9999 82.2294 24.9999Z' fill='url(#paint2_linear_1724_79)'/>"+
  "<path d='M101.618 22.2647C99.0647 22.2 96.4117 20.1882 95.8706 19.6882C94.4706 18.3941 91.2411 14.8941 90.9882 14.6176C88.6235 11.9647 85.4176 9 82.2294 9H82.2235H82.2176C78.347 9.01765 75.0941 11.6412 74.2235 15.1412C74.2882 14.9118 75.5647 11.5941 80.247 11.7118C82.8 11.7765 85.4647 13.8176 86.0117 14.3176C87.4117 15.6118 90.6411 19.1118 90.8941 19.3882C93.2588 22.0353 96.4647 25 99.6529 25H99.6588H99.6647C103.535 24.9823 106.794 22.3588 107.659 18.8588C107.588 19.0882 106.306 22.3765 101.618 22.2647Z' fill='#29ABE2'/>"+
  "<defs>"+
  "<linearGradient id='paint0_linear_1724_79' x1='39.8603' y1='4.875' x2='45.6744' y2='52.4139' gradientUnits='userSpaceOnUse'>"+
  "<stop stop-color='#A1A2A7'/>"+
  "<stop offset='1' stop-color='#565861'/>"+
  "</linearGradient>"+
  "<linearGradient id='paint1_linear_1724_79' x1='95.369' y1='10.055' x2='106.558' y2='21.6414' gradientUnits='userSpaceOnUse'>"+
  "<stop offset='0.21' stop-color='#F15A24'/>"+
  "<stop offset='0.6841' stop-color='#FBB03B'/>"+
  "</linearGradient>"+
  "<linearGradient id='paint2_linear_1724_79' x1='86.5133' y1='23.9449' x2='75.3244' y2='12.3585' gradientUnits='userSpaceOnUse'>"+
  "<stop offset='0.21' stop-color='#ED1E79'/>"+
  "<stop offset='0.8929' stop-color='#522785'/>"+
  "</linearGradient>"+
  "</defs>"+
  "</svg>";

};


function revelar() {
  var reveals = document.querySelectorAll(".revelar");

  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("activo");
    } else {
      reveals[i].classList.remove("activo");
    }
  }
}