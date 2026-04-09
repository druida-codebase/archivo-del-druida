import { z } from "zod";

export const aromas = [
    "Tostado",
    "Animales", 
    "Especiado", 
    "Frutal", 
    "Marino", 
    "Mineral", 
    "Herbal", 
    "Terroso", 
    "Defectos", 
    "Floral", 
    "Lácteo", 
    "Frutos secos", 
    "Dulce"
] as const;

export const aromaTree = {
    "Tostado": [ "Tostado", "Ahumado", "Tabaco", "Café"],
     "Animales": ["Establo", "Cuero"], 
    "Especiado": ["Regaliz", "Jengibre", "Anís estrellado", "Clavo", "Cardamomo", "Nuez moscada", "Pimienta", "Canela"], 
    "Frutal": {
        "De hueso": ["Pera", "Melocotón", "Manzana", "Albaricoque"],
        "Tropical": ["Piña", "Banana", "Mango", "Lichi", "Guayaba"],
        "Cítrico": ["Mandarina", "Limón", "Naranja", "Bergamota"],
        "Baya": ["Arándano", "Frambuesa", "Fresa", "Mora", "Grosella"]
    },
    "Marino": ["Algas/Pescado", "Mariscos", "Sal marina"], 
    "Mineral": ["Volcánico", "Tiza", "Granito", "Rio", "Alquitrán"], 
    "Herbal": {
        "Césped": ["Clorofila", "Heno", "Bambú"],
        "Vegetal": ["Calabaza", "Espinaca", "Guisante", "Brotes de soja", "Espárrago", "Alfalfa"],
        "Hierbas aromáticas": ["Albahaca", "Perejil", "Menta", "Lavanda", "Salvia", "Tomillo", "Hinojo", "Camomila"]
    }, 
    "Terroso": {
        "Bosque": ["Suelo forestal", "Musgo", "Hojas mojadas"],
        "Madera": ["Pino", "Madrea húmeda", "Aserrín", "Cedro", "Roble", "Caoba", "Eucalipto", "Alcanfor", "Corteza"]
    }, 
    "Defectos": ["Corcho", "Azufre", "Cebolla", "Vinagre", "Metálico"], 
    "Floral": {
        "Flores silvestres": ["Osmanto", "Jazmín", "Crisantemo"],
        "Flores ornamentales": ["Rosa", "Peonía", "Madreselva", "Gardenia", "Flor de cerezo", "Orqídea", "Azahar"]
    }, 
    "Lácteo": ["Mantequilla", "Leche", "Crema"], 
    "Frutos secos": ["Almendras", "Castañas", "Nueces tostadas", "Cacahuete", "Avellana"], 
    "Dulce": ["Malta", "Miel", "Caramelo", "Jarabe", "Tofe", "Azúcar moreno", "Vainilla", "Frutas asadas", "Chocolate"]
} as const

export const terroirOptions = [
    "山韵", //Rima montañosa
    "岩韵", //Resonancia mineral estructural
    "岩骨花香", //Excelencia en yancha
    "山场气"//Refleja el terroir
] as const;

export const bocaOptions = [
    "生津",//Generacion de saliva
    "回甘",//Dulzura persistente
    "喉韵",//Permanencia dulce larga
    "顺滑",//Textura sedosa
    "绵柔",//Suavidad algodonada
    "醇厚",//Cuerpo redondo
    "持久"//Persistencia larga
] as const;

export const estructuraOptions = [
    "圆融",//Armonía perfecta
    "协调",//Equilibrio perfecto
    "层次感",//Capas aromaticas
    "厚韵",//Profundidad
    "韵"//Resonancia estructural
] as const;

export const maestriasOptions = [
    "火功香",//Tostado magistral
    "转化好",//Evolución armoniosa
    "陈香",//Añejamiento noble
    "耐泡"//Muchas infusiones
] as const;

export const purezaOptions = [
    "清香",//Aroma puro
    "干净",//Perfil limpio
    "空灵",//Ligereza 
    "高香",//Aroma vertical
    "灵气"//Espíritu aromático
] as const;

export const regionesOptions = [
    "云南",//Yunnan
    "四川",//Sichuan
    "贵州",//Guizhou
    "广东",//Guangdong
    "广西",//Guangxi
    "海南",//Hainan
    "福建",//Fujian
    "浙江",//Zhejiang
    "江西",//Jiangxi
    "湖南",//Hunan
    "河南",//Henan
    "山西",//Shanxi
    "甘肃",//Gansu
    "山东",//Shandong
    "安徽",//Anhui
    "江苏",//Jiangsu
    "湖北",//Hubei
    "Kericho",
    "Nandi",
    "Makaibari",
    "Assam",
    "Sikkim",
    "Darjeeling",
    "鹿児島",//Kagoshima
    "八女",//Yame
    "Uva",
    "Dimbula",
    "Nuwara Eliya",
    "Njombe",
    "Gicumbindi",
    "Santosa",
    "台湾",//Taiwan
    "桃園",//Taoyuan
    "南投",//Nantou
    "嘉義",//Chiayi
] as const;

export const regionesTree = {
    China: [ 
        "云南",//Yunnan
        "四川",//Sichuan
        "贵州",//Guizhou
        "广东",//Guangdong
        "广西",//Guangxi
        "海南",//Hainan
        "福建",//Fujian
        "浙江",//Zhejiang
        "江西",//Jiangxi
        "湖南",//Hunan
        "河南",//Henan
        "山西",//Shanxi
        "甘肃",//Gansu
        "山东",//Shandong
        "安徽",//Anhui
        "江苏",//Jiangsu
        "湖北",//Hubei
    ],
    Kenia: [
        "Kericho"
    ],
    India: [
        "Nandi",  
        "Makaibari",
        "Assam",
        "Sikkim",
        "Darjeeling"
    ],
    Japón: [
        "鹿児島",//Kagoshima
        "八女",//Yame
    ],
    SriLanka: [
        "Uva",
        "Dimbula",
        "Nuwara Eliya",
    ],
    Tanzania: [
        "Njombe",
    ],
    Ruanda: [
        "Gicumbindi",
    ],
    Java: [
        "Santosa",
    ],
    Taiwán: [
        "台湾",//Taiwan
        "桃園",//Taoyuan
        "南投",//Nantou
        "嘉義",//Chiayi
    ]
} as const

export const permanenciaOptions = [
    "Corta", 
    "Media", 
    "Larga",
] as const

export const cuerpoOptions = [
    "Denso",
    "Medio",
    "Ligero",
] as const

export const tecnicaOptions = [
    "Gongfu Cha",
    "Tetera",
    "Cha Bei",
    "Gaiwan",
    "Zhu Cha",
    "Kyusu",
    "Matcha",
    "Shiboridashi",
    "Koridashi",    
] as const

export const astringenciaOptions = [
    "Baja", 
    "Media", 
    "Alta",
] as const

export const tiposOptions = [
    "白茶", "绿茶", "黃茶", "乌龙", "红茶", "Oscuro",
    "生普", "熟普", "떡차", "Ryukyucha", "Hwangcha" 
] as const;

export const tiposTree = {
   白茶: ["白茶"], //Blanco
   绿茶: ["绿茶", "Ryukyucha"],//Verde, Ryukyucha
   黃茶: ["黃茶", "Hwangcha"],//Amarillo, Hwangcha
   乌龙: [ "乌龙"],//Oolong
   红茶: ["红茶"],//Negro
   Oscuro : ["生普", "떡차", "熟普"] //Shēngchá, Tteokcha, Shúchá
 } as const;

export const manufacturaOptions = [
    "Manual",
    "Mixta",
    "CTC"
] as const

export const metodosOptions = [
    "生普", // Sheng
    "떡차", //Tteokcha
    "熟普",// Shu Puerh
    "Estándar"
] as const;

export const sequedadOptions = [
    "Baja",
    "Media",
    "Alta"
] as const

export const saborOptions = [
    "Dulce",
    "Salado",
    "Amargo",
    "Ácido",
    "Umami"
] as const

export const amargorOptions = [
    "Bajo",
    "Medio",
    "Alto",
    "Inexistente"

] as const

export const AcidezOptions = [
    "Baja",
    "Media",
    "Alta",
    "Inexistente"
] as const

// OPCIONES DE POSTNFUSION
export const integridadOptions = [
    "Brotes enteros", 
    "Hojas abiertas", 
    "Fragmentada (Broken)", 
    "Picadillo (CTC)"
] as const;

export const tactoOptions = [
    "Elástica",   
    "Blanda",     
    "Quebradiza", 
    "Babosa"      
] as const;

export const simetriaOptions = [
    "Simétrica", 
    "Irregular", 
    "Bordes dentados", 
    "Bordes oxidados" 
] as const;

export const corteOptions = [
    "Solo brotes",
    "Brote y primera hoja",
    "Brote y dos hojas",
    "Hojas maduras"
] as const

export const clasificadoresOptions = [
    "山场气",
    "生津",
    "醇厚",
    "圆融",
    "层次感",
    "陈香",
    "耐泡",
    "清香",
    "空灵",
    "Ninguno"
] as const


//Here's the data structure per infusion
export const InfusionSchema = z.object({
    aroma: z.array(z.string()).min(1).default([]),
    aromaPersonalizado: z.array(z.string()).default([]),
    tiempo: z.number().min(1).default(0),
    colorAro: z.string().default(""),
    sabor: z.array(z.string()).min(1).default([]),
    terroir: z.array(z.enum(terroirOptions)).default([]).optional(),
    boca: z.array(z.enum(bocaOptions)).optional(),
    estructura: z.array(z.enum(estructuraOptions)).default([]).optional(),
    temperatura: z.number().min(1).default(90),
    colorLicor : z.string().default(""),
    pureza: z.array(z.enum(purezaOptions)).optional(),
    score: z.number().default(0),
    amargor: z.enum(amargorOptions).default("Inexistente"),
    acidez: z.enum(AcidezOptions).default("Inexistente"),
    sensacion: z.string().default(""),
    permanencia : z.enum(permanenciaOptions).default("Corta"),
    astringencia: z.enum(astringenciaOptions).default("Baja"),
    cuerpo : z.enum(cuerpoOptions).default("Ligero"),
})

//Here's the analysis sdata structure
export const AnalysisSchema = z.object({
    nombre: z.string().default(""),
    corte: z.enum(corteOptions).default("Solo brotes"),
    formaHierba: z.string().default(""),
    granulometria: z.string().default(""),
    tipo: z.enum(tiposOptions).default("白茶"),
    aromaHebra: z.array(z.string()).min(1).default([]),
    sequedadHebra: z.enum(sequedadOptions).default("Baja"),
    metodo: z.enum(tecnicaOptions).default("Gongfu Cha"),
    maestrias: z.array(z.enum(maestriasOptions)).default([]),
    region: z.string().default("云南"),
    colorHebra: z.string().default(""),
    manufactura: z.enum(manufacturaOptions).default("Manual"),
    cantidad: z.number().min(1).default(0)
})

// Here's the postinfusion schema
export const PostinfusionSchema = z.object({
    // colorHojas: z.string().default(""), 
    // integridad: z.array(z.enum(integridadOptions)).default(["Hojas abiertas"]),
    tacto: z.enum(tactoOptions).default("Elástica"),
    simetria: z.enum(simetriaOptions).default("Simétrica"),
    aromaFondo: z.array(z.string()).min(1).default([]), 
    maridaje: z.string().default(""),
    observaciones: z.string().default(""),
    clasificadores: z.enum(clasificadoresOptions).default("Ninguno").optional(),
});


//Here we have both for a final report
export const ReportSchema = z.object({
    analisis: AnalysisSchema,
    infusiones: z.array(InfusionSchema).default([]),
    postinfusion: PostinfusionSchema,
    fecha: z.date(),
    reviewer: z.string().optional().default("")
})

export type AnalysisType = z.infer<typeof AnalysisSchema >
export type InfusionType = z.infer<typeof InfusionSchema >
export type PostinfusionType = z.infer<typeof PostinfusionSchema >
export type ReportType = z.infer<typeof ReportSchema >

//Here's an empty report to start
export const emptyTeaReport : ReportType = {
    analisis: {
        nombre: "",
        corte: "Solo brotes",
        formaHierba: "",
        granulometria: "",
        tipo: "白茶",
        aromaHebra: [],
        sequedadHebra: "Baja",
        metodo: "Gongfu Cha",
        maestrias: [],
        region: "云南",
        colorHebra: "",
        manufactura: "Manual",
        cantidad: 0,
    },
    infusiones: [
       {
        aroma: [],
        aromaPersonalizado: [],
        tiempo: 0,
        colorAro: "",
        sabor: [],
        terroir: [],
        boca: [],
        estructura: [],
        temperatura: 70,
        colorLicor: "",
        pureza: [],
        score: 0,
        amargor: "Inexistente",
        acidez: "Inexistente",
        sensacion: "",
        permanencia : "Corta",
        astringencia: "Baja",
        cuerpo: "Ligero"
    }
    ],
    postinfusion: {
        // colorHojas: "",
        // integridad: [],
        tacto: "Elástica",
        simetria: "Simétrica",
        aromaFondo: [],
        observaciones: "",
        maridaje: "",
        clasificadores: "山场气",
    },
    fecha: new Date(),
    reviewer: ""
}

export const emptyInfusion: InfusionType = {
    aroma: [],
    aromaPersonalizado: [],
    tiempo: 0,
    colorAro: "",
    sabor: [],
    terroir: [],
    boca: [],
    estructura: [],
    temperatura: 70,
    colorLicor: "",
    pureza: [],
    score: 0,
    amargor: "Inexistente",
    acidez: "Inexistente",
    sensacion: "",
    permanencia : "Corta",
    astringencia: "Baja",
    cuerpo: "Ligero"
}