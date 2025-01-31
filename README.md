# Disclaimer
- Este proyecto de prueba ha sido realizado para la vacante de QA Automation Engineer de Fravega Tech.
- Los nombres de los tests y comentarios están escritos en español, pero las variables, nombres de archivos y otros elementos están en inglés, para preservar las buenas prácticas de código 
- Si bien utilizar timeouts con tiempos explicitos en milisegundos no es una buena práctica, los mismos han sido incluidos de manera intencional para que el usuario pueda percibir lo que ocurre en los tests sin perderse detalles

# Stack tecnológico utilizado

- Para las pruebas de FrontEnd se utilizó Playwright, NodeJS y NPM para la administración de paquetes de Node
- Para las pruebas de API se utilizó Javascript con Mocha para los scripts y Axios para las llamadas a la API Rest de GoRest

# Estructura del proyecto
El proyecto ha sido estructurado utilizando el patrón de diseño Page Object Model. Para ello, se separaron en capas los Locators, los datos de prueba y los tests. De esa forma, si se necesitara modificar un locator porque el equipo de desarrolladores lo ha cambiado, o si hubiera que agregar más datos, basta con agregarlos en los archivos correspondientes una sola vez para todos los tests. Además, con el uso de Page Objects es más fácil documentar, mantener y ejecutar las pruebas, y por otro lado los datos sensibles como tokens y contraseñas no son expuestos en los tests.
Los directorios y archivos han sido distribuidos de la siguiente forma:
- pageLocators: Contiene los locators para las pruebas, dividido por páginas
- pages:Contiene las paginas en las que se escriben las funciones, que luego son llamadas desde los spec files/tests
- src: Contiene las pruebas de API, junto con el archivo utils para consumir los datos necesarios en la ejecución de la prueba
- tests: Contiene los 2 casos de uso solicitados. En el caso de uso 2, también se ha incluido un camino negativo, en el cual se realiza una búsqueda y se espera que el sistema muestre un error
- Otros archivos: 
    - teardownUtils: sirve para cerrar el navegador una vez finalizada la prueba, que también evita los errores en las mismas
    - testData.json: Contiene los datos que luego son llamados por los scripts, para evitar hardcodearlos dentro de las pruebas

# Ejecucion de la automatizacion
## Setup
- Asegurarse de que node.js y npm están instalados en el sistema
- Correr los tests mediante *npx playwright test* o utilizando el plugin de Playwright Test de VScode
- Para correr los tests de API, utilizar el siguiente comando en la terminal
*npx mocha -r ts-node/register src/apiTests.ts*
