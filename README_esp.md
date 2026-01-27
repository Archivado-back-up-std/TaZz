# H


## ✨ Características

- Tabla organizada con información de hackathones
- Cuenta regresiva automática en días
- Diseño sakura azul bento
- 🚦 Indicadores de urgencia por colores:
  - 🟢 Verde: +30 días
  - 🟡 Amarillo: 8-30 días
  - 🔴 Rojo: ≤7 días (con animación)
  - ⚫ Gris: finalizado

## 🚀 Uso

1. Abre `index.html` en tu navegador
2. Los hackathones se cargan automáticamente desde `hc.txt`

## 📝 Agregar hackathones

Edita `hc.txt` con el formato:

```
fecha_envio,fecha_deadline,nombre_hackathon,premio,link
```

Ejemplo:
```
2026-02-01,2026-04-30,Hackathon Web3,$20,000,https://ejemplo.com
```

## 📁 Estructura

```
📂 horario
├── index.html          # Página principal
├── script.js           # Lógica de cuenta regresiva
├── style.css           # Estilos sakura azul bento
└── hc.txt      # Datos de hackathones
```

---
