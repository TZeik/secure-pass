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

• Haz un Fork del proyecto en github

• Clonar el repositorio: 
   
    $git clone https://github.com/TZeik/SecurePass-Backend-BCSOFT1-25.git

• Lista todas las ramas (locales y remotas):
    
    $git branch -a

• Crea una rama en tu repositorio local:

    En nuestro caso, por ejemplo:
    
    $git checkout -b feature/<tu rama>

    Recuerda utilizar los nombres sugeridos en nuestro grupo

• Verifica las ramas del repositorio local y remoto

    $git branch --all # verifica todas las ramas (locales y remotas)
    
    $git status # verifica el estado de los archivos en el repo

• Sube tus cambios al repositorio remoto desde tu rama:

    $git push origin feature/<tu rama>

    O puedes hacer

    $git push -u origin feature/<tu rama>

    Para setear el upstream y simplemente realizar un `$git push` para los siguientes push

• Finalmente, trabaja y sincroniza los cambios:
    
    $git add .   # añadir cambios
    
    $git commit -m "<mensaje>"   # commit
    
    $git push    # sube los cambios a la branch del repo remoto