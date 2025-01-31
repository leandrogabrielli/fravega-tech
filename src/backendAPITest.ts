import axios, { AxiosResponse } from 'axios';
import { expect } from 'chai';
import { getToken, baseUrl } from './environmentUtils';


const personalToken = getToken();
const baseURL = baseUrl();
const BASE_URL = baseURL;
const TOKEN = personalToken;
const HEADERS = {
    "Authorization": `Bearer ${TOKEN}`
};

// Definir la estructura del usuario
interface User {
    id?: number;
    name: string;
    email: string;
    gender: string;
    status: string;
}

describe('Tests API GoRest', function () {
    let createdUserId: number | null = null;

    //Crear un usuario
    it('Crear un usuario', async function () {
        const user: User = {
            name: "Leandro Gabrielli",
            email: "leandro.gabrielli@ejemplo.com",
            gender: "masculino",
            status: "habilitado"
        };

        const response: AxiosResponse = await axios.post(BASE_URL, user, { headers: HEADERS });

        // Verificar el codigo 201 (creado)
        expect(response.status).to.equal(201);

        // Verificar que la respuesta contenga el atributo 'id' 
        expect(response.data).to.have.property('id');
        
        // Guardar el atributo 'id' del usuario creado
        createdUserId = response.data.id;
    });

    // Obtener la lista de usuarios
    it('Obtener la lista de usuarios', async function () {
        const response: AxiosResponse = await axios.get(BASE_URL, { headers: HEADERS });

        // Verificar el estado 200 (OK)
        expect(response.status).to.equal(200);

        // Verificar que la respuesta es un arreglo y que no esta vacio
        expect(response.data).to.be.an('array').that.is.not.empty;
    });

    // Obtener los detalles de un usuario específico
    it('Obtener los detalles de un usuario específico', async function () {
        // Asegurarse que se haya creado un usuario
        expect(createdUserId).to.not.be.null;

        const url = `${BASE_URL}/${createdUserId}`;
        const response: AxiosResponse = await axios.get(url, { headers: HEADERS });

        // Verificar que el codigo es 200 (OK)
        expect(response.status).to.equal(200);

        // Verificar que el usuario obtenido es el mismo que el creado
        expect(response.data.id).to.equal(createdUserId);
        
        // Verificar que el resto de los datos son iguales al creado
        expect(response.data.name).to.equal("Leandro Gabrielli");
        expect(response.data.email).to.equal("leandro.gabrielli@ejemplo.com");
    });
});