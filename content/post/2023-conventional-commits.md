---
title: "Conventional Commits"
date: 2023-10-11T17:56:52-06:00
hero: /uploads/content/2023/2023-conventional-commits.png
excerpt: "Los Conventional Commits son un enfoque de escritura de mensajes de commits que sigue un formato específico y establecido para describir los cambios realizados en un commit. Este enfoque se utiliza comúnmente en proyectos de código abierto y es una forma de estandarizar y hacer más comprensibles las descripciones de los commits en un repositorio de control de versiones, como Git."
draft: false
authors:
    - Angelo Ortiz Vega
---

## Introducción

Los "Conventional Commits" son un enfoque de escritura de mensajes de commits que sigue un formato específico y establecido para describir los cambios realizados en un commit. Este enfoque se utiliza comúnmente en proyectos de código abierto y es una forma de estandarizar y hacer más comprensibles las descripciones de los commits en un repositorio de control de versiones, como Git.

El formato de un commit convencional generalmente consta de tres partes principales:

* Tipo (Type): Esta parte describe el propósito del commit. 
* Área (Scope): Opcionalmente, puedes incluir un ámbito que indique la parte específica del proyecto en la que se realizó el cambio. Por ejemplo, si trabajas en un proyecto con múltiples componentes, el ámbito puede indicar en qué componente se realizó el cambio. 
* Descripción (Description): Una breve descripción del cambio que se realizó en el commit.

La estructura definida anteriormente se representa de la siguiente forma: 

```markdown
<type>[optional scope]: <description>
[optional body]
[optional footer(s)]
```

## Tipos comunes

Dentro de los principales tipos de mensajes para commits se encuentran:

| Tipo      | Acciones  | Descripción   |
|-----------|-----------|---------------|
| feat      | Funcionalidades - Features   | Una nueva funcionalidad.   |
| fix       | Arreglo de errores - Bug Fixes   | UNa corrección de errores.  |
| docs      | Documentación   | Cambios en la documentación (puede ser documentación de código o docs).   |
| style     | Estilos - styles   | Cambios que no afectan el sentido del código (espacios en blanco, formato, etc...)   |
| refactor  | Code refactoring   |  Cambio de código que no corrige un error ni agrega una nueva funcionalidad.  |
| perf      | Performance improvements  | Una pieza de código que mejora el rendimiento.   |
| test      | Pruebas   | Se agregan pruebas faltantes o se corrigen las pruebas existentes.   |
| build     | Builds  | Cambios que afectan el sistema de compilación (scopes: gulp, broccoli, npm, etc...)   |
| ci        | Continuos integrations  | Cambios en archivos o scripts de configuración de CI/CD (scopes: Travis, Circle, etc...)   |
| chore     | Chore - Estructura del proyecto   | No modifican los archivos src/ o test/. Pero pueden cambiar la estructura de archivos.   |
| revert    | Reverts   | Revierte los cambios a un commit anterior   |


## Especificaciones principales

1. Los commits DEBEN tener el prefijo de un tipo, que consta de un verbo: **feat, fix, refactor, etc.**, seguido de dos puntos y un espacio.
2. El tipo **feat** DEBE usarse cuando un commit agrega una nueva característica a la aplicación o biblioteca.
3. El tipo **fix** DEBE usarse cuando un commit representa una corrección de error para la aplicación.
4. PUEDE proporcionarse un alcance opcional después de un tipo. Un alcance es una frase que describe una sección del código base entre paréntesis, por ejemplo, **fix(parser):**
5. La descripción DEBE seguir inmediatamente al prefijo de tipo/alcance. La descripción es una breve descripción de la solicitud de extracción, por ejemplo, **fix: array parsing issue when multiple spaces were contained in string.**
6. PUEDE proporcionarse un cuerpo de confirmación (commit body) más largo después de la breve descripción. El cuerpo DEBE comenzar una línea en blanco después de la descripción.
7. SE PUEDE proporcionar un pie de página (footer) una línea en blanco después del commit body. El pie de página DEBE contener metainformación adicional sobre la solicitud de extracción (como los problemas que soluciona, por ejemplo, **fixes #13, #5**).
8. Los cambios importantes DEBEN indicarse al comienzo del footer o de la sección del commit body. Un cambio importante DEBE consistir en el texto en mayúsculas **BREAKING CHANGE**, seguido de dos puntos y un espacio.
9. DEBE proporcionarse una descripción después del **BREAKING CHANGE**: , que describa lo que ha cambiado en el API, por ejemplo, **BREAKING CHANGE: enviro­nment variables now take precedence over config files**.

## Razones para usar Conventional Commits:

1. Clara comunicación de cambios: Los mensajes de commit convencionales siguen una estructura consistente que facilita la comprensión de los cambios realizados en un proyecto. Esto es especialmente útil en equipos de desarrollo donde varios miembros colaboran en el mismo código.
2. Generación de registros de cambios (changelogs): Al seguir un formato predefinido, es más fácil generar automáticamente registros de cambios (changelogs) a partir de los mensajes de commit. Esto ayuda a mantener a los usuarios y otros colaboradores informados sobre las modificaciones realizadas en cada versión del software.
3. Facilita la automatización de tareas: Los mensajes de commit convencionales pueden utilizarse para automatizar tareas, como la generación de versiones del software, la ejecución de pruebas o la implementación continua. Las herramientas y scripts pueden analizar los mensajes de commit y realizar acciones específicas en función del tipo de cambio.
4. Mejora la trazabilidad: Al utilizar ámbitos opcionales en los mensajes de commit, es posible indicar en qué parte del proyecto se realizó un cambio. Esto mejora la trazabilidad y permite a los desarrolladores entender mejor el contexto de los cambios.
5. Facilita la revisión de código: Los mensajes de commit bien estructurados ayudan a los revisores a entender rápidamente el propósito de un cambio. Esto agiliza el proceso de revisión de código y garantiza que los cambios cumplan con los estándares del proyecto.
6. Fomenta buenas prácticas de desarrollo: Al seguir un estándar en la redacción de mensajes de commit, se fomentan buenas prácticas de desarrollo, como la división de cambios en unidades lógicas y la documentación adecuada.


## Ejemplos

```markdown
feat(login): agregar función de recuperación de contraseña
fix(api): solucionar error de desbordamiento en el módulo de autenticación
docs(readme): actualizar documentación de instalación
style(buttons): aplicar estilos de botones consistentes en todo el proyecto
refactor(api): reorganizar código para mejorar la legibilidad
test(login): agregar pruebas unitarias para el proceso de inicio de sesión
```

## Referencias

Conventional Commits: https://www.conventionalcommits.org/en/v1.0.0/#summary

Cheatography: https://cheatography.com/albelop/cheat-sheets/conventional-commits/#downloads

Git Interpreter: https://git-scm.com/docs/git-interpret-trailers

Semantic Versioning: https://semver.org/


[Foto de portada](https://unsplash.com/photos/G1N9kDHqBrQ) por **Arif Riyanto** en Unsplash.


{{< subscribe email="angelo2898@gmail.com" >}}