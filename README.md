# 🏠 Sistema de Gestión de Visitantes para Residencias

_Aplicación backend Secure Pass._

## 🚀 Tecnologías A Utilizar
- **Backend**: Node.js + Express
- **Base de datos**: MongoDB Atlas
- **Autenticación**: JWT (JSON Web Token)
- **Almacenamiento**: Cloudinary / File System
- **Notificaciones**: Nodemailer (Emails)
- **Generación de QR**: `qr-image` o `node-qrcode`

## 📌 Funcionalidades Principales
| Módulo               | Endpoints/Features                              |
|----------------------|------------------------------------------------|
| **Autenticación**    | Registro, login, roles (residente/guardia/admin) |
| **Visitas**          | Autorizaciones, entradas/salidas, validación QR |
| **Imágenes**         | Subida de fotos de vehículos/visitantes         |
| **Reportes**         | Historial de visitas y generación de PDFs       |

## 🤝 Cómo Contribuir

• Clonar el repositorio: 
   ```git clone https://github.com/TZeik/SecurePass-Backend-BCSOFT1-25.git```

• Lista todas las ramas (locales y remotas):
    ```git branch -a```

• Crea una rama en tu repositorio local, y vincúlalo con la rama correspondiente en el repositorio remoto:
    En nuestro caso, por ejemplo:
    ```git checkout -b feature/<topico> origin/feature/<topico>```
    Por ejemplo, si te toca la parte de QR-Generation:
    ```git checkout -b feature/4-qr-generation origin/feature/4-qr-generation```

• Verifica que estas en la rama correcta (Importante):
    ```git branch``` # verifica la rama actual
    ```git status``` # verifica el estado de los archivos en el repo

• Finalmente, trabaja y sincroniza los cambios:
    ```git add .```   # añadir cambios
    ```git commit -m "<mensaje>"```   # commit
    ```git push```    # sube los cambios a la branch del repo remoto