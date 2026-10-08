export type Sexo = 'H' | 'M';
export type EstadoAnimal = 'Activo' | 'Vendido' | 'Baja';



export interface Pesaje {
  fecha: string;
  kg: number;
}

export interface Animal {
  id: string;
  arete: string;
  nombre: string;
  sexo: Sexo;
  raza: string;
  fechaNacimiento: string;
  estado: EstadoAnimal;
  pesajes: Pesaje[];
  potreroId: string;
}

export interface EventoSanidad {
  id: string;
  animalId: string | null;
  fecha: string;
  tipo: 'Vacuna aftosa' | 'Vacuna brucelosis' | 'Desparasitación' | 'Vitaminas' | 'Tratamiento' | 'Control de preñez' | 'Inseminacion' | 'Parto esperado';
  notas: string;
  hecho: boolean;
}

export interface Potrero {
  id: string;
  nombre: string;
  hectareas: number;
  capacidad: number;
}

export interface Movimiento {
  id: string;
  tipo: 'Ingreso' | 'Gasto';
  fecha: string;
  descripcion?: string;
  categoria: string;
  monto: number;
}