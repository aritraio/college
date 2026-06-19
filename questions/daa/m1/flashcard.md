# Flashcards

**Flashcard 1**
*Front:* $\Theta(g(n))$ Mathematical Definition
*Back:* $c_1 \cdot g(n) \le f(n) \le c_2 \cdot g(n)$ for all $n \ge n_0$ (where $c_1, c_2, n_0 > 0$). It is a tight bound.

**Flashcard 2**
*Front:* Master Theorem Standard Form
*Back:* $T(n) = aT(n/b) + f(n)$, where $a \ge 1$ (number of subproblems) and $b > 1$ (division factor of the problem size).

**Flashcard 3**
*Front:* $o(g(n))$ vs $O(g(n))$
*Back:* Big-O ($O$) is an inclusive upper bound ($\le$). Little-o ($o$) is a *strict* upper bound ($<$). In Little-o, $f(n)$ becomes insignificant relative to $g(n)$ as $n$ approaches infinity.

**Flashcard 4**
*Front:* Recurrence Tree Method Application
*Back:* Best used to generate a good "guess" for the time complexity bound, which must then usually be proven rigorously using the Substitution Method.

**Flashcard 5**
*Front:* $\Omega(g(n))$ Mathematical Definition
*Back:* $0 \le c \cdot g(n) \le f(n)$ for all $n \ge n_0$. It represents an asymptotic lower bound.

**Flashcard 6**
*Front:* Time-Space Trade-off Example
*Back:* Lookup tables or caching (Memoization). You use extra space (memory) to store precomputed results, saving time (CPU cycles) by not recalculating them.
