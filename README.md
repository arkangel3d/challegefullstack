# challegefullstack
para ejecutar la app
si tienes docker puedes modificar el archivo docker-compose-example.yml, renombrarlo docker-compose.yml

      POSTGRES_USER: agregar un usuario
      POSTGRES_PASSWORD: agregar un password
      en la carpeta del proyecto ejecutar en consola docker-compose up -d 
      
configurar un archivo .env con las siguentes variables
      
 
#POSTGRES DATA BASE
DB_USER = 
DB_PASSWORD = 
DB_HOST =
DB_NAME = 

#JWT
JWT_SECRET = 

desde la consola ingresar en la carpeta api y ejecutar npm install y luego npm start, hacer lo mismo en la carpeta client.

el login es sencillo, no tiene funcion de recuperar contrasena. 
