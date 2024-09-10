/*ESTADO DEL PROYECTO
	- Topic: Incorporar dos exceptions al proyecto Demo_S2D2_API_SpringBoot 
	- Author: Prof. Noel Rabines, Mateo
	- Student: Barahona Valdivieso, Luis David
	- Status: Done
	- Path: /home/luisbarahona/Documents/CreatedByBarahona/Repositories_Code/DBP_Repository/Demo_S2D2_API_SpringBoot_Exceptions
*/
	

0. Correr docker desde cualquier ruta desde la terminal de linux
		docker run hello-world
		docker start 6f0a091ab6dd //correr contenedor que posee postgresSQL
1. CONECTARNOS A LA BASE DE DATOS DE POSTGRESS CREADA EN DOCKER
2. RUN -> funciona

3. IMPLEMENTAR UNA EXCEPCIÓN "BÚSQUEDA DE UNA CANCIÓN POR NOMBRE DE ARTISTA"
	//Debería arrojar un 409 Conclict al querer crear un artista que ya está en la base de datos

4. IMPLEMENTAR UNA EXCEPCIÓN "RETORNO CON GET DE LA INFORMACIÓN DE UN DTERMINADO ARTISTA"
	//Si se manda el id, nos tendría que retornar la info del artista.
	//SI el artista no existe, entonces debería retornar un 404 Not Found


TESTEO DESDE POSTMAN
1. INSERTAR UN ARTISTA
	http://localhost:8080/artist
	{
	  "name": "Jose Granados",
	  "bio": "ING",
	  "birthDate": "2024-01-01"
	}
2. TEST EXCEPTION 1
	POST -> http://localhost:8080/artist
	/*BODY
		{
		  "name": "Alex Gutierrez",
		  "bio": "ING",
		  "birthDate": "2024-01-01"
		}
	*/
	
	/* OUTPUT
		{
		    "message": "Artist already exist",
		    "status": "409 CONFLICT"
		}
	
	*/
3. TEST EXCEPTION 2

	GET -> http://localhost:8080/artist/800
	/*OUTPUT
		{
		    "message": "Artista con id 800 no encontrado.",
		    "status": "404 NOT_FOUND"
		}
	
	*/
	
	
	
	
