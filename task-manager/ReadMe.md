
# Taller: Servidor de Gestión de Tareas con ServerSocket

## Objetivo
Desarrollar un **servidor TCP** en Java utilizando `ServerSocket` que gestione tareas mediante un protocolo de mensajes en formato **JSON**.  
El servidor debe aplicar el **patrón DAO** para el manejo de los datos (en memoria o con JDBC).

---

## Descripción general

El propósito de este taller es que el estudiante implemente un servidor básico que reciba solicitudes de un cliente (por ejemplo, un cliente en Node.js o en consola) a través de **sockets TCP**.  

Cada solicitud corresponde a una **acción sobre tareas**, como crear, actualizar o listar.

Los datos se almacenarán mediante un **DAO**, el cual puede tener una implementación:

- **En memoria** (mínimo requerido)
- **Con JDBC y PostgreSQL** (puntuación extra)

---

## Protocolo de comunicación

El servidor recibirá mensajes en formato JSON **por línea** (`\n` al final).  
Cada mensaje contiene un comando y una estructura de datos asociada.

## Estructura de los mensajes y entidades

El servidor y el cliente se comunican **mediante mensajes JSON**.  
Cada mensaje tiene dos campos principales:
- `command`: indica la acción que el servidor debe ejecutar.
- `data`: contiene los datos necesarios para la operación.


### Ejemplos de mensajes

####  **Crear una tarea**
```json
{
  "command": "CREATE_TASK",
  "data": {
    "id": 0,
    "title": "Buy groceries",
    "description": "Milk, Bread, Eggs, Butter",
    "dueDate": "2023-10-01",
    "priority": "High"
  }
}
```
#### **Actualizar el estado o etapa de una tarea**

```json
{
  "command": "UPDATE_TASK",
  "data": {
    "stage": 2,
    "taskId": "1"
  }
}
```

#### **Obtener todas las tareas y etapas**

```json
{
  "command": "GET_TASKS",
  "data": {}
}

```

El servidor debe responder con la tarea creada en formato Json. Use gson para serializar los objetos.

---

###  Entidades principales

#### TaskStage (Etapa o lista de tareas)
Representa una agrupación de tareas, como "To Do", "In Progress" o "Done".

```json
{
  "id": 1,
  "name": "To Do",
  "description": "Tasks that need to be done",
  "tasks": [
    {
      "id": 1,
      "title": "Buy groceries",
      "description": "Milk, Bread, Eggs, Butter",
      "dueDate": "2023-10-01",
      "priority": "High"
    },
    {
      "id": 2,
      "title": "Read a book",
      "description": "Finish reading 'The Great Gatsby'",
      "dueDate": "2023-10-05",
      "priority": "Medium"
    }
  ]
}
```

**Task (Tarea individual)**

Representa una tarea que pertenece a una etapa específica.
```json
{
  "id": 1,
  "title": "Buy groceries",
  "description": "Milk, Bread, Eggs, Butter",
  "dueDate": "2023-10-01",
  "priority": "High"
}

```

## Ejecución de la aplicación

Para validar el funcionamiento de servidor tcp, se ha dejado la implementación de un cliente web para revisar las interacciones con el servicio. Para ejecutar estos elementos siga los siguientes pasos:

### Verificar herramientas

Para este la ejecución del proyecto se requiere **nodejs**, un **servidor web** (puede ser el Live Preview de vscode) y **java** instalado en la máquina.

### Instalación de dependencias.

```bash
cd web-client
npm install
```

### Ejecución del proxy web

dentro de la carpeta **web-client**

```bash
node proxy/index.js
```

### Ejecución del Servidor TCP.

Puede ejecutarlo desde el editor ó usando la CLI

```bash
java -jar managerServer/build/libs/managerServer.jar
```

### Visualización de la página.

Abrir el archivo **index.html** con el Servidor web instalado. Si usa **Live Preview** abra el archivo en vscode y en la parte superior derecha puede pre visualizarlo. Copie la URL a un  navegador para mayor comodidad. 

> **Importante:**  
> 1. El servidor TCP debe exponer el puerto **5000** por la interface de red **localhost**
> 2. Este taller está diseñado para fortalecer habilidades en programación de redes, manejo de JSON y aplicación de patrones de diseño como DAO.  
> 3. Se recomienda seguir buenas prácticas de organización de código y documentación para facilitar la comprensión y mantenimiento del proyecto.


## Estado inicial.

La aplicación debe contar con tres TaskStage por defecto:

```java

  TaskStage s = new TaskStage();
  s.setId(1);
  s.setName("TO DO");
  s.setDescription("Desc");

  TaskStage s1 = new TaskStage();
  s1.setId(2);
  s1.setName("Doing");
  s1.setDescription("Desc");

  TaskStage s2 = new TaskStage();
  s2.setId(3);
  s2.setName("Done");
  s2.setDescription("Desc");
  
```
