/* INTERFACES PARA Api.ts PRINCIPALMENTE */
/* Agregar el atributo id a todas tus interfaces, puedes exportarlas y utilizarlas en cualquier otro archivo de tu proyecto sin problema*/
// Tienen que tener id todoss


//INTERFACES ADAPTADAS AL PROYECTO
export interface PostRegisterS {
    //id: number | null;
    username: string;
    password: string;
    role: string;
}

export interface PostLoginS {
    //id: number | null;
    username: string;
    password: string;
}



//INTERFACES DE EJEMPLO - AXIOS
export interface PostBodyStructure {
    id: number;
    title: string;
    body: string;
    userId: number;
  }
  
  export interface PutBodyStructure {
    id: number;
    title: string;
    body: string;
    userId: number;
  }
  
  export interface PatchBodyStructure {
    id: number;
    title?: string;
    body?: string;
    userId?: number;
  }
  