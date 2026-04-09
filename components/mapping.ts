import {
  AcidezOptions,
  amargorOptions,
  astringenciaOptions,
  bocaOptions,
  clasificadoresOptions,
  corteOptions,
  cuerpoOptions,
  estructuraOptions,
  integridadOptions,
  maestriasOptions,
  manufacturaOptions,
  metodosOptions,
  permanenciaOptions,
  purezaOptions,
  regionesOptions,
  saborOptions,
  sequedadOptions,
  simetriaOptions,
  tactoOptions,
  tecnicaOptions,
  terroirOptions,
  tiposOptions
} from "./schemas";

export const regionLabels: Record<string, string> = {
  "云南": "Yunnan", 
  "四川": "Sichuan", 
  "贵州": "Guizhou", 
  "广东": "Guangdong",
  "广西": "Guangxi", 
  "海南": "Hainan", 
  "福建": "Fujian", 
  "浙江": "Zhejiang",
  "江西": "Jiangxi", 
  "湖南": "Hunan", 
  "河南": "Henan", 
  "山西": "Shanxi",
  "甘肃": "Gansu", 
  "山东": "Shandong", 
  "安徽": "Anhui", 
  "江苏": "Jiangsu",
  "湖北": "Hubei", 
  "Kericho": "Kericho", 
  "Nandi": "Nandi", 
  "Makaibari": "Makaibari",
  "Assam": "Assam", 
  "Sikkim": "Sikkim", 
  "Darjeeling": "Darjeeling",
  "鹿児島": "Kagoshima", 
  "八女": "Yame", 
  "Uva": "Uva", 
  "Dimbula": "Dimbula",
  "Nuwara Eliya": "Nuwara Eliya", 
  "Njombe": "Njombe", 
  "Gicumbindi": "Gicumbindi",
  "Santosa": "Santosa", 
  "台湾": "Taiwan", 
  "桃園": "Taoyuan", 
  "南投": "Nantou", 
  "嘉義": "Chiayi"
};

export const tipoLabels: Record<string, string> = {
  "白茶": "Blanco", 
  "绿茶": "Verde", 
  "黃茶": "Amarillo", 
  "乌龙": "Oolong", 
  "红茶": "Negro",
  "Oscuro": "Oscuro / Puerh",
  "生普" : "Shengchá",
  "떡차" : "Tteokcha",
  "熟普" : "Shúchá", 
};

export const metodoLabels: Record<string, string> = {
  "生普": "Sheng Puerh", 
  "떡차": "Tteokcha", 
  "熟普": "Shu Puerh", 
  "Estándar": "Estándar"
};

export const terroirLabels: Record<string, string> = {
  "山韵": "Rima montañosa", 
  "岩韵": "Resonancia mineral", 
  "岩骨花香": "Yancha Excellence", 
  "山场气": "Reflejo Terroir"
};

export const bocaLabels: Record<string, string> = {
  "生津": "Salivación", 
  "回甘": "Dulzura persistente", 
  "喉韵": "Permanencia larga", 
  "顺滑": "Textura sedosa", 
  "绵柔": "Suavidad", 
  "醇厚": "Cuerpo redondo", 
  "持久": "Persistencia"
};

export const estructuraLabels: Record<string, string> = {
  "圆融": "Armonía", 
  "协调": "Equilibrio", 
  "层次感": "Capas aromáticas", 
  "厚韵": "Profundidad", 
  "韵": "Resonancia"
};

export const maestriaLabels: Record<string, string> = {
  "火功香": "Tostado magistral", 
  "转化好": "Evolución", "陈香": 
  "Añejamiento", "耐泡": 
  "Resistencia (耐泡)"
};

export const purezaLabels: Record<string, string> = {
  "清香": "Pureza", 
  "干净": "Perfil limpio", 
  "空灵": "Ligereza", 
  "高香": "Verticalidad", 
  "灵气": "Espíritu"
};

export const manufacturaLabels: Record<string, string> = {
  "Manual": "Manual", 
  "Mixta": "Mixta",
  "CTC": "CTC"
}

export const saborLabels = {
  "Dulce": "Dulce",
  "Salado": "Salado",
  "Amargo": "Amargo",
  "Ácido": "Ácido",
  "Umami": "Umami",
}

export const amargorLabels = {
  "Bajo": "Bajo",
  "Medio": "Medio",
  "Alto": "Alto",
  "Inexistente": "Inexistente",
}

export const acidezLabels = {
  "Baja": "Baja",
  "Media": "Media",
  "Alta": "Alta",
  "Inexistente": "Inexistente",
}

export const sequedadLabels = {
  "Baja": "Baja",
  "Media": "Media",
  "Alta": "Alta",
}

export const permanenciaLabels = {
  "Corta": "Corta",
  "Media": "Media",
  "Larga": "Larga",
}

export const tecnicaLabels = {
   "Gongfu Cha" : "Gongfu Cha",
   "Tetera" : "Tetera",
    "Cha Bei" : "Cha Bei",
    "Gaiwan" : "Gaiwan",
    "Zhu Cha" : "Zhu Cha",
    "Kyusu" : "Kyusu",
    "Matcha" : "Matcha",
    "Shiboridashi" : "Shiboridashi",
    "Koridashi" : "Koridashi",    
}

export const astringenciaLabels = {
  "Baja": "Baja",
  "Media": "Media",
  "Alta": "Alta",
}

export const cuerpoLabels = {
  "Denso": "Denso",
  "Medio": "Medio",
  "Ligero": "Ligero",
}

export const integridadLabels = {
  "Brotes enteros" : "Brotes enteros", 
  "Hojas abiertas" : "Hojas abiertas", 
  "Fragmentada (Broken)" : "Fragmentada (Broken)", 
  "Picadillo (CTC)" : "Picadillo (CTC)",
}

export const tactoLabels = {
    "Elástica" : "Elástica",   
    "Blanda" : "Blanda",     
    "Quebradiza" : "Quebradiza", 
    "Babosa" : "Babosa",
}

export const simetriaLabels = {
    "Simétrica" : "Simétrica", 
    "Irregular" : "Irregular", 
    "Bordes dentados" : "Bordes dentados", 
    "Bordes oxidados" : "Bordes oxidados",
  }

export const corteLabels = {
    "Solo brotes" : "Solo brotes",
    "Brote y primera hoja" : "Brote y primera hoja",
    "Brote y dos hojas" : "Brote y dos hojas",
    "Hojas maduras" : "Hojas maduras",
}

export const clasificadoresLabels = {
  "山场气"	: "Refleja el terroir",
  "生津" :	"Generación de saliva",
  "醇厚" :	"Cuerpo redondo",
  "圆融" :	"Armonía perfecta",
  "层次感" :	"Capas aromáticas",
  "陈香"	: "Añejamiento noble",
  "耐泡"	: "Muchas infusiones",
  "清香"	: "Aroma puro",
  "空灵" :	"Ligereza",
  "Ninguno" : "Ninguno",
}

export const clasificadoresData = clasificadoresOptions.map(c => ({ label: clasificadoresLabels[c] || c, value: c }));

export const corteData = corteOptions.map(c => ({ label: corteLabels[c] || c, value: c })); 

export const simetriaData = simetriaOptions.map(s => ({ label: simetriaLabels[s] || s, value: s }));

export const tactoData = tactoOptions.map(t => ({ label: tactoLabels[t] || t, value: t }));

export const integridadData = integridadOptions.map(i => ({ label: integridadLabels[i] || i, value: i }));

export const cuerpoData = cuerpoOptions.map(c => ({ label: cuerpoLabels[c] || c, value: c }));

export const astringenciaData = astringenciaOptions.map(a => ({ label: astringenciaLabels[a] || a, value: a }));

export const permanenciaData = permanenciaOptions.map(p => ({ label: permanenciaLabels[p] || p, value: p }));

export const tecnicaData = tecnicaOptions.map(t => ({ label: tecnicaLabels[t] || t, value: t }));

export const sequedadData = sequedadOptions.map(s => ({ label: sequedadLabels[s] || s, value: s }));

export const amargorData = amargorOptions.map(a => ({ label: amargorLabels[a] || a, value: a }));

export const acidezData = AcidezOptions.map(a => ({ label: acidezLabels[a] || a, value: a }));

export const saborData = saborOptions.map(s => ({ label: saborLabels[s] || s, value: s }));

export const regionData = regionesOptions.map(reg => ({ 
    label: regionLabels[reg] || reg, 
    value: reg 
}));

export const tipoData = tiposOptions.map(t => ({ 
    label: tipoLabels[t] || t, 
    value: t 
}));

export const metodoData = metodosOptions.map(m => ({ 
    label: metodoLabels[m] || m, 
    value: m 
}));

export const terroirData = terroirOptions.map(te => ({ 
    label: terroirLabels[te] || te, 
    value: te 
}));

export const bocaData = bocaOptions.map(b => ({ 
    label: bocaLabels[b] || b, 
    value: b 
}));

export const estructuraData = estructuraOptions.map(e => ({ 
    label: estructuraLabels[e] || e, 
    value: e 
}));

export const maestriaData = maestriasOptions.map(m => ({ label: maestriaLabels[m] || m, value: m }));

export const purezaData = purezaOptions.map(p => ({ 
    label: purezaLabels[p] || p, 
    value: p
}));

export const manufacturaData = manufacturaOptions.map(m => ({ 
    label: manufacturaLabels[m] || m, 
    value: m 
}));

