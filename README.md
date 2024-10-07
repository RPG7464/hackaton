
# Hackaton Api

Instalación de dependencias

npm install

Configuración del archivo .env

Crea un archivo .env en la raíz del proyecto con la siguiente configuración:

MONGODB= "uri para conectar a la base de datos"
DB_NAME= "nombre de la base de datos"

Para iniciar la aplicación en modo desarrollo:

npm run start:dev

Accede a la documentación interactiva de la API utilizando Swagger en el siguiente enlace:

http://localhost:3000/docs

Entidades:
Usuario

La entidad Usuario contiene las siguientes propiedades:

    name: Nombre del usuario.
    lastname: Apellido del usuario.
    email: Correo electrónico único.
    age: Edad del usuario.
    activity: ID de la actividad a la que está vinculado el usuario.
    isActive: Indica si el usuario está activo, utilizado para el soft delete.

Reglas del CRUD de Usuarios

    Se valida que el correo electrónico no esté duplicado al crear o actualizar un usuario.
    La actividad vinculada debe tener espacio disponible según su capacidad.
    Al eliminar un usuario, no se borra físicamente, sino que se establece la propiedad isActive a false (soft delete).

Actividad

La entidad Actividad contiene las siguientes propiedades:

    name: Nombre de la actividad.
    description: Descripción de la actividad.
    capacity: Capacidad máxima de participantes.

Funcionalidades adicionales:
Importar actividades desde un archivo JSON

Para importar actividades, debes crear un archivo .json dentro de la carpeta src/file y pasar el nombre del archivo (sin la extensión .json) al método de importación en el módulo correspondiente.

Exportar actividades
Para exportar todas las actividades en formato JSON, utiliza el método de exportación disponible en Swagger. Una vez ejecutado el método, tendrás la opción de descargar el archivo generado.