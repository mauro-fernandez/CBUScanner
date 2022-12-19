#  Scanner de CBU/CVU

## Objetivos del Proyecto

Esta app es una demo para ver cómo funciona el scanner de texto. Cuenta con un input para ingresar el cbu manualmente, un cuadro con un scanner de texto que se activa una vez que aceptan dar permisos para la cámara del mismo, y un botón de copiar lo que esté escrito en el input, y otro para mostrar el último texto copiado al portapapeles.

Además le agregue una funcionalidad para chequear si la aplicación esta activa o no, es decir, si la estas usando en el momento o estas usando una diferente. El objetivo de esto es poder chequar cada vez que este "activa" la app, vér que tenes guardado en el portapapeles, y validar si fue un cbu o no lo último que copiaste. Si lo es, automáticamente completa el input. Como complemento, si la app no está activa, se renderiza un componente diferente que el mostrado en la app. Esta práctica será utilizada para evitar mostrar datos sensibles mientras se navega de app en app.

__Dato de color a tener en cuenta:__
Originalmente intenté utilizar varios plugin de la librería react-native-vision-camera, pero crasheaba al usar más de uno en su config (scanear QR y reconocimiento facial). Me vi forzado a desinstalar sus plugin, porque aunque no los usase, la app, se cerraba sin tirar errores.

## Iniciar la app

La app no está pensada para utilizar con el emulador, debido a que no cuentan con una cámara real para testear este tipo de librerías. Hay una forma de mockear y configurar el emulador, pero no es el objetivo del proyecto. Por ende, es necesario un dispositivo físico para testar la app.

En el dispositivo físico, habilitar las "opciones del desarrollador" (este modo esta escondido y deben seguir unos pasos sencillos para que aparezcan, googlear cómo). Luego entrar y verificar que diga "Activado", si no es así, activenlo. También deben ir para abajo y activar la "depuración por USB". (si su celular está en modo desarrollador puede que genere conflicto si intentan actualizar o instalar alguna app, por eso solo deben activar este modo cuando vayan a codear o testear, luego vuelvan a deshabilitarlo)
Conectar el dispositivo a la computadora, aceptar los permisos.

Abrir una consola y ejecutar "npm start -- --reset-cache".

Abrir una consola y hacer "npm run android". No debería iniciarse la app en el emulador, sino el dispositivo físico. Si esto sucede, reinicien el metro y/o vuelvan a correr npm run android.

