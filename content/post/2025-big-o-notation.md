---
title: "Notación Big O"
date: 2025-10-27T09:17:22-06:00
hero: /uploads/content/2025/2025-big-o-notation.png
excerpt:  "En el vasto universo de la informática, no basta con que un algoritmo funcione; debe ser eficiente. La Notación Big O es la herramienta fundamental que los científicos de la computación y desarrolladores utilizan para cuantificar y describir la eficiencia y la escalabilidad de un algoritmo."
draft: false
authors:
    - Angelo Ortiz Vega
---


En el vasto universo de la informática, no basta con que un algoritmo funcione; debe ser eficiente. La Notación Big O es la herramienta fundamental que los científicos de la computación y desarrolladores utilizan para cuantificar y describir la eficiencia y la escalabilidad de un algoritmo.

**Big O notation** (Notación Gran O, simbolizada con la letra O mayúscula) es un poderoso simbolismo utilizado para describir el comportamiento asintótico de las funciones. Esencialmente, nos dice qué tan rápido crece el tiempo de ejecución (o el espacio de memoria requerido) de un algoritmo a medida que el tamaño de la entrada, $n$, aumenta.

Al comprender Big O, no solo podemos comparar la eficiencia de diferentes algoritmos o estructuras de datos, sino también predecir cómo se comportarán estos sistemas a medida que la entrada escale a tamaños masivos. Nos enfocamos principalmente en el escenario del **peor caso** para determinar la complejidad temporal en términos de Big O.

Este artículo servirá como una guía profesional y motivadora, que abarca desde la definición formal hasta ejemplos prácticos, proporcionando las bases necesarias para escribir código optimizado y de alto rendimiento.

## Conceptos básicos

La Notación Big O, a menudo denotada como $O(f(n))$, proporciona un **límite superior** en el tiempo (o espacio) que tomará un algoritmo en función del tamaño de la entrada, $n$.

### Definición Formal y Asintótica

Dado que la velocidad de ejecución real depende de factores como el *hardware* y el compilador, Big O se centra en la **tasa de crecimiento** (comportamiento asintótico) y no en el valor exacto.

Formalmente, si tenemos dos funciones $f(n)$ y $g(n)$, decimos que **$f(n)$ es $O(g(n))$** si existen constantes $c > 0$ y $n_0 \geq 0$ tales que $f(n) \leq c \cdot g(n)$ para todo $n \geq n_0$.

En términos más sencillos, esto significa que $f(n)$ (la complejidad real del algoritmo) no crece más rápido que $g(n)$ (la función de complejidad que usamos como límite superior) para entradas lo suficientemente grandes ($n \geq n_0$).

### Reglas de Análisis Simplificado

Para simplificar el análisis de la complejidad algorítmica y enfocarnos únicamente en el término dominante (el que más afecta el crecimiento), aplicamos dos reglas clave:

1.  **Ignorar los términos de orden inferior:** Los términos que crecen más lentamente se vuelven insignificantes cuando $n$ es muy grande.
2.  **Ignorar la constante asociada con el término de orden más alto:** Los coeficientes constantes no afectan la tasa de crecimiento asintótico.

**Ejemplo de Análisis Rápido:**

Si la función de pasos exactos de un algoritmo es $f(n) = 3n^2 + 2n + 5000$:

1.  El término de orden más alto es $3n^2$ (ignorando $2n$ y $5000$).
2.  Ignorando la constante $3$, obtenemos $n^2$.

Por lo tanto, la Notación Big O es **$O(n^2)$**.

## Tipos comunes de complejidad

A continuación, se describen los tipos de complejidad más comunes, ordenados de mejor (más rápido/eficiente) a peor (más lento/menos escalable).

| Notación | Nombre | Descripción de Crecimiento | Ejemplo de Algoritmo |
| :--- | :--- | :--- | :--- |
| **O(1)** | Constante | El tiempo no cambia con el tamaño de la entrada $n$. | Acceso a elemento en Array, Operaciones Hash Map (amortizadas). |
| **O($\log n$)** | Logarítmica | El tiempo se reduce a la mitad si la entrada se duplica. | Búsqueda Binaria. |
| **O(n)** | Lineal | El tiempo crece directamente proporcional a $n$. | Búsqueda Lineal. |
| **O($n \log n$)** | Loglineal (Superlineal) | Crecimiento eficiente, usado en algoritmos de comparación óptimos. | Merge Sort, Heap Sort. |
| **O($n^k$)** | Polinomial | El tiempo es proporcional a una potencia constante de $n$ (ej. $n^2$ o $n^3$). | Bubble Sort ($n^2$), Multiplicación Matriz Naive ($n^3$). |
| **O($c^n$)** | Exponencial | El tiempo se duplica (o aumenta exponencialmente) por cada adición a $n$. | Cálculo recursivo de Fibonacci, Generar todos los subconjuntos. |
| **O($n!$)** | Factorial | El tiempo crece factorialmente, extremadamente lento. | Generar todas las permutaciones, TSP por fuerza bruta. |

**Es importante notar que $O(n^c)$ (polinomial) y $O(c^n)$ (exponencial) son muy diferentes; la complejidad exponencial crece mucho, mucho más rápido**.

### Ejemplos Prácticos en Python

A continuación, adaptamos ejemplos comunes para ilustrar cómo se deduce la complejidad.

#### 1. Complejidad Constante: O(1)

Las operaciones de tiempo constante realizan el mismo número de pasos independientemente del tamaño de la entrada.

```python
def acceso_constante(arr, indice):
    # Acceder a un elemento de un array/lista por índice es O(1)
    # No importa si la lista tiene 10 o 10 millones de elementos.
    return arr[indice] 
    # Esta operación es O(1)
```

#### 2. Complejidad Logarítmica: O($\log n$)

La complejidad logarítmica es característica de algoritmos que dividen el problema a la mitad en cada paso, como la búsqueda binaria. A medida que el tamaño de la entrada se duplica (ej. de 8 a 16), el número de operaciones solo aumenta en uno.

```python
def busqueda_binaria(arr, clave):
    # La búsqueda binaria divide el espacio de búsqueda por 2 en cada iteración
    l = 0
    r = len(arr) - 1
    while l <= r:
        mid = l + (r - l) // 2
        
        if arr[mid] == clave:
            return mid
        elif arr[mid] < clave:
            # Descartamos la mitad izquierda del array
            l = mid + 1
        else:
            # Descartamos la mitad derecha del array
            r = mid - 1
            
    return -1
    # Complejidad: O(log n)
```

#### 3. Complejidad Lineal: O(n)

El tiempo de ejecución de un algoritmo lineal crece linealmente con el tamaño de la entrada $n$.

```python
def busqueda_lineal(arr, clave):
    n = len(arr)
    # En el peor caso, el bucle itera n veces, revisando cada elemento
    for i in range(n):
        if arr[i] == clave:
            return True
    return False
    # Complejidad: O(n)
```

#### 4. Complejidad Cuadrática: O($n^2$)

Esta complejidad es típica en algoritmos que usan bucles anidados donde ambos iteran a través de la misma entrada completa.

```python
def bubble_sort(arr):
    n = len(arr)
    # Bucle exterior se ejecuta n-1 veces (aproximadamente n)
    for i in range(n - 1):
        # Bucle interior también se ejecuta aproximadamente n veces
        # Total de operaciones internas: n * n = n^2
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j] # swap (O(1))
    return arr
    # Complejidad: O(n^2)
```

## Visualización

La visualización es una herramienta poderosa para entender cómo evoluciona la eficiencia con el tamaño de $n$.

Conceptualmente, al graficar las complejidades más comunes, se observa una clara jerarquía de crecimiento: O(1) y O($\log n$) son las más planas y deseables (excelente), seguidas por O(n) y O($n \log n$) (buenas/aceptables), y finalmente O($n^2$), O($2^n$) y O($n!$) (malas/horribles).

Existen herramientas interactivas, como **VisuAlgo**, que facilitan la comprensión profunda de las estructuras de datos y algoritmos a través de la animación. VisuAlgo cuenta con 24 módulos de visualización y permite a los usuarios utilizar sus propias entradas, lo cual es fundamental para ver la complejidad en acción.

Incluso se pueden yuxtaponer dos páginas de VisuAlgo para comparar visualmente dos algoritmos relacionados (como Kruskal vs. Prim para MST), lo que refuerza el entendimiento de por qué tienen complejidades similares o diferentes.

## Complejidad espacial

Mientras que la mayoría de las discusiones sobre Big O se centran en el tiempo de CPU (complejidad temporal), la notación también se utiliza para describir la **complejidad espacial** (uso de memoria).

La complejidad espacial evalúa cómo los requisitos de memoria de un programa se escalan a medida que el tamaño del problema que se resuelve se agranda. Por ejemplo, si un algoritmo requiere un *array* auxiliar cuyo tamaño crece linealmente con la entrada $n$, su complejidad espacial será $O(n)$.

**Ejemplos de Complejidad Espacial (Worst Case):**

| Estructura de Datos | Complejidad Espacial (Peor Caso) |
| :--- | :--- |
| Array | $O(n)$ |
| Stack (Pila) | $O(n)$ |
| Hash Table (Tabla Hash) | $O(n)$ |
| Heap Sort | $O(1)$ (In-place) |
| Merge Sort | $O(n)$ (Requiere memoria auxiliar para la fusión) |

A menudo, las soluciones recursivas (aunque su complejidad temporal Big O pueda ser buena) pueden ser menos preferibles a las soluciones iterativas, ya que las llamadas recursivas utilizan memoria de pila (*stack memory*), que suele ser más limitada que la memoria *heap*.

## Casos: Mejor, Promedio y Peor

El análisis de complejidad se puede realizar para tres escenarios clave, y Big O es solo una de las tres notaciones asintóticas que describen estos límites.

| Notación | Definición | Escenario que Describe |
| :--- | :--- | :--- |
| **Big O ($O$)** | $f(n) \leq C \cdot g(n)$ | **Límite Superior (Peor Caso)**. El tiempo de ejecución nunca será peor que esta tasa. (La más usada). |
| **Big Omega ($\Omega$)** | $f(n) \geq C \cdot g(n)$ | **Límite Inferior (Mejor Caso)**. El tiempo de ejecución nunca será mejor que esta tasa. |
| **Big Theta ($\Theta$)** | $C_1 \cdot g(n) \leq f(n) \leq C_2 \cdot g(n)$ | **Límite Ajustado (Caso Promedio)**. Describe tanto el límite superior como el inferior. (Preferida si se puede encontrar un límite exacto). |

**El Peor Caso (Worst Case):** Es el escenario que consideramos al usar Big O, ya que establece una garantía de que el algoritmo no tardará más allá de este límite superior, independientemente de la entrada. Por ejemplo, en la búsqueda lineal, el peor caso es cuando el elemento buscado está al final o no existe, forzando $O(n)$ operaciones.

**El Mejor Caso (Best Case):** Describe el escenario más favorable, capturado por la Notación Omega ($\Omega$). Por ejemplo, en el Bubble Sort, si el array ya está ordenado, solo se requiere una única pasada para verificarlo, resultando en $\Omega(n)$.

**El Caso Promedio (Average Case):** Suele ser el más difícil de calcular, pero ofrece la imagen más realista del rendimiento en la práctica. Por ejemplo, Quicksort tiene una complejidad en el peor caso de $O(n^2)$, pero en el caso promedio y mejor caso, su complejidad es $\Theta(n \log n)$.

## Errores comunes

Incluso los desarrolladores experimentados cometen errores al aplicar Big O. Evitar estas trampas asegura un análisis de complejidad preciso:

1.  **Confundir Complejidad con Rendimiento (Performance):** El rendimiento (*performance*) es el tiempo real utilizado (depende del hardware, lenguaje y compilador). La complejidad es cómo escalan los requisitos de recursos. Una operación $O(1)$ puede ser más lenta que una $O(n)$ pequeña si la constante oculta de $O(1)$ es muy grande. Big O no siempre cuenta la historia completa de la ejecución en el mundo real.
2.  **Ignorar el Caso Promedio cuando $\Theta$ es aplicable:** Aunque Big O ($O$) es el límite superior y se usa más, si se conoce la complejidad exacta, es más preciso usar Big Theta ($\Theta$). Decir que Heap Sort es $O(n \log n)$ es correcto, pero decir que es $\Theta(n \log n)$ es una afirmación más fuerte.
3.  **Asumir que todos los bucles anidados son $O(n^2)$:** Un par de bucles anidados donde el bucle interno no se ejecuta $n$ veces, sino logarítmicamente o de forma dependiente, no resulta en $O(n^2)$. Un ejemplo es el algoritmo de *Sliding Window* que, aunque usa bucles anidados, visita cada elemento a lo sumo dos veces, manteniendo una complejidad lineal $O(n)$.
4.  **No identificar el término dominante correctamente:** Al sumar complejidades, solo el término de mayor crecimiento domina la complejidad final. Por ejemplo, si un algoritmo realiza una búsqueda lineal ($O(n)$) seguida de una ordenación cuadrática ($O(n^2)$), la complejidad total es $O(n^2)$.

## Casos de uso reales

La Notación Big O es fundamental en el desarrollo de software escalable y es un punto crucial en las entrevistas técnicas.

**1. Selección de Estructuras de Datos:**
Elegir la estructura de datos correcta a menudo se reduce a sus complejidades de tiempo y espacio. Las Tablas Hash (*Hash Tables*, implementadas como `dict` en Python) son populares porque ofrecen una complejidad temporal promedio de $O(1)$ para operaciones clave como búsqueda, inserción y eliminación.

**2. Optimización de Algoritmos:**
Si un desarrollador se enfrenta a la necesidad de ordenar una lista grande, saber que el Bubble Sort es $O(n^2)$ y el Merge Sort es $O(n \log n)$ proporciona la información necesaria para elegir el algoritmo más eficiente. Una complejidad polinomial $O(n^k)$ (ej. $O(n^2)$ o $O(n^3)$) se considera eficiente, pero no lo suficiente para tareas que requieren una alta escalabilidad.

**3. Desarrollo de Agentes de IA y *Debugging*:**
Herramientas avanzadas pueden incluso asistir a los desarrolladores al analizar la complejidad algorítmica de su código, ayudando a depurar y entender el rendimiento potencial.

## Buenas prácticas

Un análisis riguroso de la complejidad algorítmica requiere seguir estas prácticas:

### 1. Análisis de Secuencias de Sentencias
Si una secuencia de sentencias se ejecuta una después de la otra, el tiempo total es la suma de los tiempos.
$$T_{total} = T(\text{sentencia } 1) + T(\text{sentencia } 2) + \ldots + T(\text{sentencia } k)$$
Si todas son operaciones básicas $O(1)$, la complejidad total es $O(1)$.

### 2. Análisis de Estructuras Condicionales (`If-Then-Else`)
La complejidad se determina por el bloque de código más lento, ya que representa el peor caso.
$$T_{\text{condicional}} = \max(T(\text{bloque 1}), T(\text{bloque 2}))$$

### 3. Análisis de Bucles Simples
Si un bucle se ejecuta $N$ veces y las sentencias internas son $O(1)$, la complejidad es $N \cdot O(1) = O(N)$.

```python
# Ejemplo de bucle simple O(n)
N = len(data)
for i in range(N):
    # Operación O(1)
    print(data[i]) 
# Tiempo total: N * O(1) = O(N)
```

### 4. Análisis de Bucles Anidados
Si un bucle externo se ejecuta $N$ veces y un bucle interno se ejecuta $M$ veces, el cuerpo interno se ejecuta $N \times M$ veces, resultando en $O(N \cdot M)$. Si $N=M$, es $O(N^2)$.

### 5. Priorizar Iteración en Recursión
Aunque no se relaciona directamente con la Big O temporal, es una buena práctica operativa: a menudo se prefieren las soluciones iterativas sobre las recursivas para evitar la sobrecarga y el límite potencial de la memoria de pila (*stack memory*).

## Conclusión

La Notación Big O es indispensable para cualquier profesional que aspire a la excelencia en el desarrollo de software. No es solo un concepto matemático; es una brújula que guía la toma de decisiones arquitectónicas y algorítmicas, garantizando que el código sea robusto y que mantenga un rendimiento aceptable a medida que la carga de trabajo crece. Al dominar el análisis de la complejidad algorítmica, usted está invirtiendo en la **escalabilidad** y la **sostenibilidad** de sus soluciones. ¡Siga explorando y optimizando!

## Recursos adicionales

Para profundizar en el estudio de la complejidad algorítmica y las estructuras de datos, se recomienda consultar los siguientes recursos:

1.  **Plataformas de Visualización Interactiva:** **VisuAlgo** proporciona animaciones interactivas de estructuras de datos y algoritmos, incluyendo el árbol de recursión y diagramas para DP. Es una excelente herramienta para el aprendizaje auto-dirigido.
2.  **Literatura Clave:** Libros fundamentales como *Introduction to Algorithms, 3rd Edition* y *Cracking the Coding Interview*.
3.  **Cursos de DSA:** Plataformas en línea que ofrecen tutoriales y cursos sobre Data Structures and Algorithms (DSA).


{{< subscribe email="angelo2898@gmail.com" >}}