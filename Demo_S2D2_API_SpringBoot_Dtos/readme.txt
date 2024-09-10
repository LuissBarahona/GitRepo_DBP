/*ESTADO DEL PROYECTO
	- Topic: Incorporar dos DTOs Demo_S2D2_API_SpringBoot  (RESTAPI)
		Incorporar un DTO para crear un nuevo artista
		Incorporar un DTO para mstrar la info de un artista y el id de sus canciones sin caer en un bucle 
		Es una mejora del proyecto Demo_S2D2_API_SpringBoot_Exceptions
	- Author: Prof. Noel Rabines, Mateo
	- Student: Barahona Valdivieso, Luis David
	- Status: Done
	- Path: /home/luisbarahona/Documents/CreatedByBarahona/Repositories_Code/DBP_Repository/Demo_S2D2_API_SpringBoot_DTOs
*/


1. Correr el contenedor que posee postgressSQL
	docker start 6f0a091ab6dd 
2. Crear el primer DTO (detalles en Notion y en el proyecto mismo)
	1ro dependencia mapper en pom.xml
	2do Crear un archivo NewArtistRequestDTO.java
	3ro CREAR UN ARCHIVO GlobalConfig.java a la altura de Application, domain y del ejecutor del proyecto.
	4to GO TO THE ArtistController.java → BUSCAOS UN PostMapping porque deseamos crear un artista con determinadas características
	
	OJO: DTO->Entidad Artista
	modelMapper.map(artist, newArtist);
	
3. Crear el segundo DTO (detalles en Notion y en el proyecto mismo)
	1ro Create GetArtistResponseDto.java → dentro de dto folder
	2do Go to the ArtistController.java para usar el DTO 
	
	OJO: Entidad Artist -> DTO
	modelMapper.map(artist, artistResponse);
	
4. Testeo con postman
	4.1 Crear un nuevo artista usando DTO
		POST -> http://localhost:8080/artist
		/*BODY OF POST
			{
			  "name": "Liliam Sandoval",
			  "bio": "ING",
			  "birthDate": "2024-01-01"
			}
		
		*/
		
		/*OUTPUT 201 Created
			{
			    "id": 702,
			    "name": "Liliam Sandoval",
			    "bio": "ING",
			    "birthDate": "2024-01-01",
			    "songs": null
			}
		
		
		*/
		
	4. 2 Hacer un get para obtener la info de un artista y el id de sus canciones
		Crear las canciones del artista usando la base de datos directamente
		
		GET -> http://localhost:8080/artist/702
		/*OUTPUT 200 OK
			{
			    "name": "Liliam Sandoval",
			    "bio": "ING",
			    "birthDate": "2024-01-01",
			    "songIdList": [
				303,
				304
			    ]
			}
			
		
		*/
		
		OJO SI HACEMOS GET ->  http://localhost:8080/artist
		Veremos el caso en el que se da un bucle infinito, al serializar,  debido a que no se emplea DTO

ADICONALMENTE SE COMAPRTE LO SIGUIENTE:
1. CREAR EL DIAGRAMA DE RELACIONES ENTRE ENTIDADES DESDE INTELLIJ
	go to the DataBase SYmbol
	select a table -> click rigth -> diagrams -> show diagram
	LISTO
	
2. CRER EXEPTIONS EN FUNCIÓN AL DIAGRANA DE FLUJO DE EXEPCIONES
	create a folder dentro de com.example, al mismo nive de controller, comain, dto
	inside, create a .java class
