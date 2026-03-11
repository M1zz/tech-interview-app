const QUESTIONS_EN = [
{id:1,cat:"Algorithm",q:"What are Time Complexity and Space Complexity?",
a:`<strong>Time Complexity</strong> describes how the execution time of an algorithm grows as input size n increases. <strong>Space Complexity</strong> describes the memory usage required to run the algorithm. Both are expressed using <code>Big-O notation</code>, and are analyzed in terms of best (Ω), average (Θ), and worst (O) cases. Example: binary search has time <code>O(log n)</code> and space <code>O(1)</code>.`,
links:[{t:"Big-O Cheat Sheet",u:"https://www.bigocheatsheet.com"},{t:"Visualgo",u:"https://visualgo.net/ko"}],
fqs:[
{q:"How large is the performance difference between an O(n log n) and O(n²) algorithm at n=10,000?",a:`<strong>O(n log n)</strong>: approximately 133,000 operations. <strong>O(n²)</strong>: 100,000,000 operations — about 750× difference. As n grows, the gap widens exponentially; at n=1,000,000, O(n²) is practically infeasible.`},
{q:"Why can two O(n) algorithms have different real-world performance?",a:`Big-O <strong>ignores constant factors and lower-order terms</strong>. For example, <code>100n</code> and <code>2n</code> are both O(n) but differ by 50×. Also, <strong>cache locality</strong> matters: arrays have better memory access patterns than linked lists, so even with the same O(n) complexity, arrays are much faster.`}
],
trap:{wrong:`"O(log n) is always faster than O(n). Regardless of input or n value, an O(log n) algorithm is always the best choice."`,
explain:`<strong>Why it's wrong</strong>: When n is very small (e.g., n=5), constant factors dominate and O(n) can be faster. Big-O is <strong>asymptotic analysis</strong>, meaning it compares growth rates for sufficiently large n. In practice, input size, cache effects, and constant factors must all be considered.`}
},
{id:2,cat:"Algorithm",q:"Explain the differences between Quick Sort and Merge Sort.",
a:`<strong>Quick Sort</strong>: divide-and-conquer around a pivot, average <code>O(n log n)</code> but worst case <code>O(n²)</code> (already sorted). In-place, so space-efficient. <strong>Merge Sort</strong>: always guarantees <code>O(n log n)</code>, stable sort, but requires <code>O(n)</code> extra space. In practice, standard libraries use <strong>Timsort</strong>, which combines both.`,
links:[{t:"Sorting Visualizer",u:"https://visualgo.net/ko/sorting"},{t:"GeeksforGeeks QuickSort",u:"https://www.geeksforgeeks.org/quick-sort/"}],
fqs:[
{q:"Why is pivot selection important in Quick Sort, and what are good strategies?",a:`If the pivot is always the min/max, partitioning becomes 1:(n-1), degrading to <code>O(n²)</code>. Good strategies: <strong>Random Pivot</strong> (reduces worst-case probability), <strong>Median of Three</strong> (median of first, middle, last elements). Implementations use either Lomuto or Hoare partition schemes.`},
{q:"When is a stable sort required?",a:`When the <strong>original order of equal-key elements must be preserved</strong>. Example: sorting students first by name, then by score — with a stable sort, ties in score retain alphabetical order. This is why Java's <code>Arrays.sort(Object[])</code> uses Merge Sort.`}
],
trap:{wrong:`"Merge Sort is always better than Quick Sort because it guarantees O(n log n) while Quick Sort has worst-case O(n²)."`,
explain:`<strong>Why it's wrong</strong>: Real performance depends on cache locality, constant factors, and data characteristics. Quick Sort is in-place with good cache efficiency and small constants, so <strong>it is faster than Merge Sort on average</strong>. The worst case can be nearly eliminated with good pivot selection strategies, which is why Quick Sort is preferred in most practical implementations.`}
},
{id:3,cat:"Algorithm",q:"What is Dynamic Programming and when is it used?",
a:`DP is used to solve problems with <strong>Overlapping Subproblems</strong> and <strong>Optimal Substructure</strong>. It stores partial results (memoization) to avoid recomputation. There are two approaches: <strong>Top-down</strong> (recursion + memoization) and <strong>Bottom-up</strong> (iteration + table filling).`,
links:[{t:"LeetCode DP Study Plan",u:"https://leetcode.com/studyplan/dynamic-programming/"},{t:"BOJ DP Problems",u:"https://www.acmicpc.net/problemset?sort=ac_desc&algo=25"}],
fqs:[
{q:"What is the biggest difference between DP and Divide and Conquer?",a:`<strong>Divide and Conquer</strong>: subproblems are independent (non-overlapping). Like Merge Sort, each partial result is not reused. <strong>DP</strong>: subproblems overlap (duplicate computation occurs). Eliminating that duplication via memoization is the core of DP. Solving Fibonacci with pure recursion is exponential time; with DP it's linear.`},
{q:"Why does Bottom-up DP often outperform Top-down in practice?",a:`<strong>No function call overhead</strong>: no recursive stack accumulation, more memory-efficient. <strong>Cache locality</strong>: sequential array access yields high cache hit rates. <strong>No stack overflow risk</strong>: no recursion depth limits. However, Bottom-up computes all states while Top-down only computes actually needed states.`}
],
trap:{wrong:`"DP must always be implemented recursively, and without memoization it isn't DP."`,
explain:`<strong>Why it's wrong</strong>: DP can be implemented iteratively (<strong>Bottom-up</strong>) as well as recursively (Top-down). Bottom-up uses <strong>tabulation</strong> rather than memoization and is often more efficient. The essence of DP is "avoiding redundant computation," not "using recursion."`}
},
{id:4,cat:"Algorithm",q:"Explain the differences between BFS and DFS and their appropriate use cases.",
a:`<strong>BFS</strong>: uses a Queue, level-order traversal, best for <strong>shortest paths (unweighted graphs)</strong>. <strong>DFS</strong>: uses a Stack/recursion, explores deeply, best for <strong>cycle detection, topological sort, backtracking, maze solving</strong>. BFS finds solutions close to the goal; DFS is better when exploring all possibilities.`,
links:[{t:"BFS/DFS Visualization",u:"https://visualgo.net/ko/dfsbfs"},{t:"LeetCode Graph",u:"https://leetcode.com/tag/graph/"}],
fqs:[
{q:"Why does BFS guarantee the shortest path while DFS does not?",a:`BFS explores in <strong>level order</strong>, so when the target node is first discovered, the path to it is guaranteed to be the shortest. DFS goes deep first, so even finding the target may not yield the shortest path. Note: this only holds for <strong>unweighted or equal-weight graphs</strong>.`},
{q:"What information can be derived after completing DFS on a connected graph?",a:`The <strong>DFS tree (visit order)</strong> and <strong>back edges</strong> reveal whether cycles exist. The reverse of <strong>finish times</strong> gives the topological sort order. <strong>SCCs (Strongly Connected Components)</strong> can also be found with two DFS passes (Kosaraju or Tarjan's algorithm).`}
],
trap:{wrong:`"DFS is always more memory-efficient than BFS, because DFS only uses a stack while BFS stores all neighbors in a queue."`,
explain:`<strong>Why it's wrong</strong>: In the worst case, DFS requires <code>O(V)</code> stack space from recursive calls. BFS is also <code>O(V)</code>, but in a <strong>tree structure</strong>, BFS stores only one level (<code>O(width)</code>) while DFS stacks up to the maximum depth. DFS is more efficient on wide, shallow graphs; BFS on narrow, deep graphs.`}
},
{id:5,cat:"Algorithm",q:"Explain the mechanics and time complexity of Binary Search.",
a:`In a sorted array, compare the middle element to the target and halve the search range. Time complexity <code>O(log n)</code>, space <code>O(1)</code>. <strong>Key requirement: the array must be sorted.</strong> Applications: lower_bound, upper_bound, parametric search.`,
links:[{t:"LeetCode Binary Search",u:"https://leetcode.com/explore/learn/card/binary-search/"},{t:"BOJ Binary Search Problems",u:"https://www.acmicpc.net/problemset?sort=ac_desc&algo=12"}],
fqs:[
{q:"Why use `mid = left + (right - left) / 2` instead of `mid = (left + right) / 2`?",a:`<code>(left + right)</code> can exceed the maximum int value, causing <strong>integer overflow</strong>. <code>left + (right - left) / 2</code> avoids this. Since int range is about 2.1 billion in C/Java, this can cause real bugs with large indices. Google's binary search implementation once had this bug before it was fixed.`},
{q:"What is Parametric Search?",a:`A technique that <strong>transforms an optimization problem into a decision problem (feasible/infeasible)</strong> and applies binary search. Used for "minimize the maximum" or "maximize the minimum" problems. Example: in the tree-cutting problem, binary search on cut height H and ask "does cutting at H yield at least M units of wood?" as a decision problem.`}
],
trap:{wrong:`"Binary search is always O(log n). Comparing to the middle value halves the search range regardless of whether the array is sorted."`,
explain:`<strong>Why it's wrong</strong>: Binary search guarantees <code>O(log n)</code> only if the array is <strong>sorted</strong>. In an unsorted array, comparing to the middle gives no information about which half the target is in, so the search range cannot be reduced correctly. Applying it without sorting produces wrong answers.`}
},
{id:6,cat:"Algorithm",q:"Explain why greedy algorithms do not always guarantee an optimal solution.",
a:`Greedy algorithms make the <strong>locally best choice at each step</strong>, but a local optimum does not guarantee a global optimum. For greedy to be correct, two properties must hold: <strong>greedy choice property</strong> and <strong>optimal substructure</strong>. Works: activity selection, Huffman coding. Fails: certain coin-change problems.`,
links:[{t:"GeeksforGeeks Greedy",u:"https://www.geeksforgeeks.org/greedy-algorithms/"},{t:"LeetCode Greedy",u:"https://leetcode.com/tag/greedy/"}],
fqs:[
{q:"How do you determine if a problem can be solved greedily?",a:`You must prove <strong>two properties</strong>: ① <strong>Greedy choice property</strong>: the locally greedy choice is always part of some optimal solution. ② <strong>Optimal substructure</strong>: solving the remaining subproblem optimally gives the global optimum. Typically proved via an "exchange argument": swapping the greedy choice with another in an optimal solution does not worsen it.`},
{q:"Give a concrete example where greedy fails for the coin change problem.",a:`Coins: {1, 3, 4}, target: 6. Greedy: 4→1→1 = 3 coins. Optimal: 3→3 = 2 coins. <strong>Why greedy fails</strong>: choosing 4 first leaves 2, which cannot be made with the 3-coin. Korean coins ({10, 50, 100, 500}) work with greedy because each larger coin is a multiple of smaller ones.`}
],
trap:{wrong:`"Since greedy doesn't guarantee optimality, you should always use DP if possible."`,
explain:`<strong>Why it's wrong</strong>: When greedy is correct (e.g., Dijkstra, Huffman, Kruskal), it is much faster and simpler than DP. If the greedy approach is provably correct, it should be preferred over DP. DP considers all possibilities and often has higher time/space complexity than greedy.`}
},
{id:7,cat:"Algorithm",q:"Explain the differences between Dijkstra's and Bellman-Ford algorithms.",
a:`<strong>Dijkstra</strong>: no negative weights, uses a priority queue, <code>O((V+E) log V)</code>. <strong>Bellman-Ford</strong>: handles negative weights, detects negative cycles, <code>O(VE)</code> — slower. Dijkstra is used for GPS routing; Bellman-Ford for financial arbitrage detection or graphs with negative weights.`,
links:[{t:"Dijkstra Visualization",u:"https://visualgo.net/ko/sssp"},{t:"BOJ Shortest Path",u:"https://www.acmicpc.net/problem/1753"}],
fqs:[
{q:"Show a concrete example where Dijkstra fails with negative weights.",a:`A→B = 5, A→C = 2, C→B = -10. Dijkstra: first finalizes C(2), then B(5). But C→B = -10 means A→C→B = -8 is the shortest path. Since Dijkstra already <strong>finalized (visited)</strong> B at 5, it never discovers -8. Negative edges break the "finalization" guarantee.`},
{q:"What is SPFA (Shortest Path Faster Algorithm)?",a:`An optimization of Bellman-Ford using a queue — only relaxes from vertices currently in the queue. <strong>Average <code>O(E)</code></strong> but worst case is still <code>O(VE)</code>. Handles negative weights and is practically fast, making it popular in competitive programming communities. However, adversarial test cases targeting its worst case do exist.`}
],
trap:{wrong:`"Bellman-Ford can always find the shortest path in graphs with negative weights."`,
explain:`<strong>Why it's wrong</strong>: <strong>If a negative cycle exists, no shortest path is defined.</strong> Traversing a negative cycle indefinitely drives path length to -∞. Bellman-Ford can <strong>detect</strong> negative cycles but cannot compute shortest paths in their presence. Affected vertices are marked as -∞.`}
},
{id:8,cat:"Algorithm",q:"What are the methods for resolving hash collisions?",
a:`<strong>Open Addressing</strong>: store in another bucket on collision. Linear Probing, Quadratic Probing, Double Hashing. <strong>Separate Chaining</strong>: each bucket is a linked list. Java's HashMap switches to a Red-Black Tree when a bucket exceeds 8 entries. Keeping the load factor below 0.75 is important.`,
links:[{t:"Hash Table Visualization",u:"https://visualgo.net/ko/hashtable"},{t:"Java HashMap Internals",u:"https://d2.naver.com/helloworld/831311"}],
fqs:[
{q:"Explain the difference between Linear Probing and Double Hashing, and the clustering problem.",a:`<strong>Linear Probing</strong>: on collision, move to the next slot. Simple but causes <strong>Primary Clustering</strong>: consecutive filled buckets make collisions more frequent. <strong>Double Hashing</strong>: a second hash function determines the probe step size, reducing clustering but adding computation cost. Quadratic Probing is intermediate with <strong>Secondary Clustering</strong>.`},
{q:"How does Python's dict resolve hash collisions?",a:`Python 3.6+ dicts use <strong>Open Addressing + Compact Storage</strong>. Separate index and data arrays improve cache efficiency. Probing uses <code>i = (5*i + 1 + perturb) % size</code>, a pseudo-random probe sequence. Rehashing occurs when load factor exceeds 2/3. Python 3.7+ also guarantees insertion order.`}
],
trap:{wrong:`"Open Addressing is always more memory-efficient than Separate Chaining because chaining requires extra pointers."`,
explain:`<strong>Only conditionally true</strong>: at low load factors, Open Addressing is more memory-efficient. But at high load factors, Open Addressing performance degrades sharply and requires a much larger array. <strong>Separate Chaining</strong> degrades more gradually at high load. Actual memory usage depends on the situation.`}
},
{id:9,cat:"Algorithm",q:"Explain the differences and trade-offs between recursion and iteration.",
a:`<strong>Recursion</strong>: intuitive code, natural for divide-and-conquer/tree problems, but has function call stack overhead and stack overflow risk. <strong>Iteration</strong>: better performance and memory efficiency, but more complex code. Languages supporting tail call optimization (Haskell, Scala) can have the compiler convert recursion to iteration.`,
links:[{t:"Tail Call Optimization",u:"https://exploringjs.com/es6/ch_tail-calls.html"}],
fqs:[
{q:"Does tail call optimization (TCO) actually work in JavaScript?",a:`TCO is included in the ES6 spec, but <strong>most JS engines including V8 have not implemented it</strong>. Only Safari (JavaScriptCore) has. Therefore, deep recursion relying on TCO in real JS is unsafe. Instead, use the <strong>trampoline</strong> technique for manual iterative conversion, or use loops directly.`},
{q:"What data structure is needed to implement tree traversal iteratively without recursion?",a:`An <strong>explicit stack</strong> is needed — directly simulating the call stack that recursion uses internally. Pre-order, in-order, and post-order traversals can all be implemented with a stack. Level-order traversal (BFS) uses a queue. Morris Traversal performs in-order traversal with <code>O(1)</code> extra space.`}
],
trap:{wrong:`"Any recursive function can be converted to iterative form, and it will always be faster after conversion."`,
explain:`<strong>The first part is true, the second is not</strong>: any recursion can theoretically be converted to iteration + explicit stack. But converting simple recursion (e.g., factorial) to iteration offers negligible performance gain and only complicates the code. When TCO applies or the recursion is simple, performance difference is minimal. <strong>Optimize based on measurement</strong>.`}
},
{id:10,cat:"Algorithm",q:"Explain how to find the k-th largest element in an unsorted array in O(n).",
a:`<strong>Quick Select</strong>: use Quick Sort's partition; if the pivot lands at position k-1, return it; otherwise recurse on one side only. Average <code>O(n)</code>, worst <code>O(n²)</code>. Alternatively, a <strong>Min-Heap of size k</strong> solves it in <code>O(n log k)</code>. Median of Medians guarantees <code>O(n)</code> even in the worst case.`,
links:[{t:"LeetCode Kth Largest",u:"https://leetcode.com/problems/kth-largest-element-in-an-array/"},{t:"QuickSelect Algorithm",u:"https://www.geeksforgeeks.org/quickselect-algorithm/"}],
fqs:[
{q:"When is the Min-Heap-of-size-k approach preferable to Quick Select?",a:`It excels with <strong>streaming data</strong> (when the entire array doesn't fit in memory). Process data once sequentially while maintaining a heap of size k. Also, Quick Select <strong>modifies the array</strong>, whereas Min-Heap preserves the original. For read-only data or online algorithms (data arriving in order), Min-Heap is preferable.`},
{q:"How does Median of Medians guarantee O(n)?",a:`Divide the array into groups of 5, find each group's median, then use the median of those medians as the pivot. This guarantees the pivot is <strong>larger than at least 30% and smaller than at least 30%</strong> of all elements, so at least 3n/10 elements are eliminated per partition. Solving T(n) = T(n/5) + T(7n/10) + O(n) by the master theorem gives T(n) = O(n).`}
],
trap:{wrong:`"Quick Select's average time complexity is O(n log n), because it's based on the same algorithm as Quick Sort."`,
explain:`<strong>Why it's wrong</strong>: Quick Select recurses on <strong>only one side</strong> after partitioning. T(n) = T(n/2) + O(n) sums as a geometric series to T(n) = O(n). Quick Sort has T(n) = 2T(n/2) + O(n) giving O(n log n). The key difference: Quick Sort recurses on both sides; Quick Select on only one.`}
},
{id:11,cat:"Algorithm",q:"What is the Two Pointer technique and what problems does it solve?",
a:`A technique using two indices moving simultaneously to reduce search complexity. Used for <strong>finding pairs with a target sum in a sorted array</strong>, contiguous subarray sums, sliding window problems, etc. Can reduce O(n²) to O(n).`,
links:[{t:"BOJ Two Pointers",u:"https://www.acmicpc.net/problemset?sort=ac_desc&algo=80"},{t:"LeetCode Two Pointers",u:"https://leetcode.com/tag/two-pointers/"}],
fqs:[
{q:"What is the difference between Sliding Window and Two Pointers?",a:`<strong>Two Pointers</strong>: two pointers move independently, converging or crossing. Often requires sorting. <strong>Sliding Window</strong>: a fixed-size or condition-based window moves in one direction — a special case of Two Pointers. Difference: sliding window always moves in the same direction, while two pointers can move toward each other from both ends or in various ways.`},
{q:"Why can't Two Pointers be used on an unsorted array?",a:`Two Pointers require that <strong>the direction of pointer movement can be determined</strong>. Example: if the sum exceeds the target, move the right pointer left; if less, move the left pointer right. This is only valid because the array is sorted. In an unsorted array, there's no way to know which direction to move, so correct traversal is impossible.`}
],
trap:{wrong:`"Two Pointers always starts from both ends of an array and moves toward the center."`,
explain:`<strong>Why it's wrong</strong>: Two Pointers comes in many forms. Besides the converging-from-both-ends form, <strong>same-direction movement</strong> (left and right both move left to right, like a sliding window) is also Two Pointers. Cycle detection in linked lists (Fast & Slow pointers) is also a type of Two Pointers. The key is "managing two indices simultaneously."`}
},
{id:12,cat:"Algorithm",q:"Explain the concept of Divide and Conquer and give representative algorithm examples.",
a:`Solves problems in three steps: <strong>Divide → Conquer → Combine</strong>. Representative examples: Merge Sort <code>O(n log n)</code>, Quick Sort, Binary Search <code>O(log n)</code>, Karatsuba multiplication. The Master Theorem is used to analyze complexity.`,
links:[{t:"GeeksforGeeks D&C",u:"https://www.geeksforgeeks.org/divide-and-conquer/"}],
fqs:[
{q:"Explain the three cases of the Master Theorem T(n) = aT(n/b) + f(n).",a:`a = number of recursive calls, b = size reduction factor, f(n) = split+combine cost. <strong>Case 1</strong>: f(n) = O(n^(log_b(a) - ε)) → T(n) = Θ(n^log_b(a)). Recursion dominates. <strong>Case 2</strong>: f(n) = Θ(n^log_b(a)) → T(n) = Θ(n^log_b(a) · log n). Similar cost. <strong>Case 3</strong>: f(n) = Ω(n^(log_b(a) + ε)) → T(n) = Θ(f(n)). f(n) dominates. Merge Sort: T(n) = 2T(n/2) + O(n) → Case 2 → O(n log n).`},
{q:"What distinguishes a Divide and Conquer problem from a DP problem?",a:`The key is <strong>independence of subproblems</strong>. Divide and Conquer: subproblems are non-overlapping (each half of Merge Sort is fully independent). DP: subproblems overlap (fib(n-1) and fib(n-2) share fib(n-3)). Overlapping subproblems → DP; independent subproblems → Divide and Conquer.`}
],
trap:{wrong:`"Divide and Conquer must always split into two equal halves."`,
explain:`<strong>Why it's wrong</strong>: Split ratios vary. Quick Sort splits unevenly based on the pivot. Karatsuba splits at specific ratios. Binary search always splits 1:1, but this is not a requirement. What matters is <strong>"splitting into smaller subproblems"</strong>, not equal splitting.`}
},
{id:13,cat:"Algorithm",q:"What is Backtracking and what kinds of problems does it solve effectively?",
a:`A DFS-based technique that explores all possibilities but <strong>prunes (cuts off) unpromising paths</strong> to reduce the search space. Used for N-Queens, Sudoku, subset sum, permutation/combination generation. More efficient than brute force, but worst case is still exponential.`,
links:[{t:"BOJ N-Queens",u:"https://www.acmicpc.net/problem/9663"},{t:"LeetCode Backtracking",u:"https://leetcode.com/tag/backtracking/"}],
fqs:[
{q:"How is pruning applied to the N-Queens problem?",a:`When placing a queen, check three constraints: ① <strong>Same column</strong>: use a col[] array. ② <strong>Left diagonal</strong>: same (row - col) value. ③ <strong>Right diagonal</strong>: same (row + col) value. Before placing a queen in the next row, verify these three conditions and skip the position if violated. Using bitmasks enables constant-time checking.`},
{q:"What is the actual performance difference between Backtracking and Brute Force?",a:`N-Queens at n=8: Brute Force explores 8^8 = 16,777,216 cases. Backtracking explores only about 15,720 cases (~1000× reduction). Pruning effectiveness varies by problem, but good pruning conditions can dramatically reduce the search space. Adding <strong>heuristics</strong> (e.g., most-constrained variable first) improves it further.`}
],
trap:{wrong:`"Backtracking doesn't guarantee optimal solutions because the pruning process may eliminate paths containing the optimal."`,
explain:`<strong>Why it's wrong</strong>: Correct backtracking only eliminates <strong>provably non-promising paths</strong>. Paths containing optimal solutions are never removed. Properly designed pruning conditions guarantee the same result as brute force while being faster. Incorrectly designed pruning can miss optimal solutions, but that's a design flaw, not an inherent backtracking limitation.`}
},
{id:14,cat:"Algorithm",q:"Explain the differences between Kruskal's and Prim's algorithms for finding MSTs.",
a:`<strong>Kruskal's</strong>: sort edges by weight, select edges cycle-free using Union-Find, <code>O(E log E)</code>, better for sparse graphs. <strong>Prim's</strong>: start from any vertex, select the minimum-weight edge connecting the growing tree, uses a priority queue, <code>O((V+E) log V)</code>, better for dense graphs.`,
links:[{t:"MST Visualization",u:"https://visualgo.net/ko/mst"},{t:"BOJ MST Problem",u:"https://www.acmicpc.net/problem/1197"}],
fqs:[
{q:"Under what conditions can an MST be non-unique?",a:`When <strong>multiple edges share the same weight</strong>, multiple MSTs are possible because Kruskal's can choose equal-weight edges in different orders. However, if all edge weights are distinct, the MST is unique. The total weight (cost) of MSTs is always the same, but the edge composition may differ.`},
{q:"How fast is Union-Find with both path compression and rank-based union?",a:`With both optimizations, the time complexity is <strong>O(α(n))</strong>. α is the inverse Ackermann function, practically a constant (α(n) ≤ 4 even for n = 10^80). Path compression makes every node on the find path a direct child of root; rank-based union attaches the lower-rank tree under the higher-rank one.`}
],
trap:{wrong:`"Prim's algorithm is always slower than Kruskal's because it adds vertices one at a time, which is inefficient."`,
explain:`<strong>Why it's wrong</strong>: On dense graphs (E ≈ V²), Prim's is more efficient. Kruskal's must sort all edges: <code>O(E log E) = O(V² log V)</code>, but Prim's with a Fibonacci heap runs in <code>O(E + V log V)</code>. <strong>For sparse graphs</strong>, Kruskal's is better; <strong>for dense graphs</strong>, Prim's wins.`}
},
{id:15,cat:"Algorithm",q:"Explain how bit manipulation is used in algorithm optimization.",
a:`Bit operations run in O(1) and are useful for performance optimization. Odd/even check <code>n&1</code>, power of 2 check <code>n&(n-1)==0</code>, set bit k <code>n|(1<<k)</code>, find duplicate with XOR. Bitmask DP represents visited states as integers to save memory.`,
links:[{t:"Bit Tricks",u:"https://graphics.stanford.edu/~seander/bithacks.html"},{t:"LeetCode Bit Manipulation",u:"https://leetcode.com/tag/bit-manipulation/"}],
fqs:[
{q:"How do you swap two variables using XOR without extra memory, and what are the caveats?",a:`<code>a ^= b; b ^= a; a ^= b;</code>. Principle: XOR with self gives 0; XOR with 0 gives self. <strong>Caveat</strong>: if both variables reference the same memory address (a and b are the same variable), it becomes 0. Always apply with <code>if (a != b)</code>. Modern compilers auto-optimize temp-variable swaps, so this has little practical value.`},
{q:"How is bitmask DP used to represent state in the Traveling Salesman Problem (TSP)?",a:`The visited/unvisited status of n cities is encoded as an <strong>n-bit integer</strong>. dp[mask][i] = minimum cost to have visited the cities in mask and be currently at city i. Bit j in mask is 1 if city j has been visited. Total states: 2^n × n; time complexity <code>O(2^n × n²)</code>. Practical for up to about n=20.`}
],
trap:{wrong:`"If n & (n-1) equals 0, then n is a power of 2. Since n=0 also satisfies this, 0 is a power of 2."`,
explain:`<strong>Why it's wrong</strong>: <code>0 & (0-1) = 0 & (-1) = 0</code> is correct, but 0 is not a power of 2 mathematically. The correct check is <code>n > 0 && (n & (n-1)) == 0</code>. Similarly, negative numbers can give incorrect results, so ensure you're working with a positive integer first.`}
},
{id:16,cat:"Data Structures",q:"Explain the differences between Arrays and Linked Lists.",
a:`<strong>Array</strong>: contiguous memory, index access <code>O(1)</code>, insert/delete <code>O(n)</code>, fixed size. <strong>Linked List</strong>: node+pointer, random access <code>O(n)</code>, insert/delete (at known position) <code>O(1)</code>, pointer overhead. Arrays have the advantage of better cache locality.`,
links:[{t:"Array vs LinkedList",u:"https://www.geeksforgeeks.org/linked-list-vs-array/"},{t:"Linked List Visualization",u:"https://visualgo.net/ko/list"}],
fqs:[
{q:"Explain concretely why arrays have better cache performance than linked lists.",a:`CPUs read memory in cache line units (typically 64 bytes). With arrays, loading one cache line <strong>already brings adjacent elements into cache</strong> (spatial locality). In a linked list, each node is scattered somewhere in the heap, causing a cache miss every time a next pointer is followed. Experimentally, linked list traversal can be 5–10× slower than array traversal.`},
{q:"When should you choose Java's ArrayList vs LinkedList?",a:`<strong>Choose ArrayList</strong>: frequent random access, sequential reads, adding/removing at the end (amortized O(1)). <strong>Choose LinkedList</strong>: very frequent mid-list insertions/deletions with rare index access, using as a Deque (insert/delete at both ends). In practice, due to cache effects on modern hardware, <strong>ArrayList is faster in most cases</strong>. LinkedList use cases are very limited.`}
],
trap:{wrong:`"Linked lists use less memory than arrays because you don't need to specify the size in advance."`,
explain:`<strong>Why it's wrong</strong>: Each linked list node must store <strong>extra pointers</strong>. A singly linked list has one pointer per node; doubly linked has two. An integer array element is 4 bytes, but a linked list node is 8–20 bytes (with pointers). The advantage of not pre-allocating is real, but the pointer overhead means linked lists are not always more memory-efficient.`}
},
{id:17,cat:"Data Structures",q:"Explain the characteristics and use cases of Stacks and Queues.",
a:`<strong>Stack</strong>: LIFO, used in recursive call stacks, browser back button, bracket matching, DFS. <strong>Queue</strong>: FIFO, used in process scheduling, print queues, BFS. <strong>Deque</strong>: supports insertion/deletion at both ends. All operations <code>O(1)</code>.`,
links:[{t:"Stack/Queue Visualization",u:"https://visualgo.net/ko/list"},{t:"BOJ Stack Problem",u:"https://www.acmicpc.net/problem/10828"}],
fqs:[
{q:"What is a Monotonic Stack and what problems does it solve efficiently?",a:`A stack that always maintains monotonically increasing or decreasing order. Solves the <strong>Next Greater Element (NGE)</strong> problem in <code>O(n)</code>. Process elements in order; when an element larger than the stack top arrives, pop until the top is larger — the current element is the NGE of each popped element. Also used for largest rectangle in histogram and trapping rainwater.`},
{q:"Why should you mark a node as visited at enqueue time (not dequeue time) in BFS?",a:`If you mark visited at dequeue time, the same node can be added to the queue multiple times. Example: in graph A→B, A→C, B→C, node C could be queued by both B and A. <strong>Marking at enqueue time</strong> ensures C is only added once, preventing duplicates. This guarantees O(V+E) time complexity.`}
],
trap:{wrong:`"Stacks and queues are different structures and cannot be converted to each other."`,
explain:`<strong>Why it's wrong</strong>: <strong>Implementing a queue with two stacks</strong> (inbox/outbox pattern) is possible with amortized O(1) operations. Conversely, <strong>implementing a stack with two queues</strong> is also possible (one of push or pop is O(n)). They can be mutually converted — a common coding interview question.`}
},
{id:18,cat:"Data Structures",q:"Explain the characteristics of Binary Search Trees (BST) and why balanced BSTs are needed.",
a:`BST has the property <strong>left &lt; root &lt; right</strong>, with average <code>O(log n)</code> for search/insert/delete. Inserting sorted data produces a skewed tree (worst case <code>O(n)</code>). Solutions: <strong>AVL Tree</strong> (strict balance), <strong>Red-Black Tree</strong> (relaxed balance, practical). Java's TreeMap and C++'s std::map are Red-Black Tree based.`,
links:[{t:"BST Visualization",u:"https://visualgo.net/ko/bst"},{t:"Red-Black Tree",u:"https://www.cs.usfca.edu/~galles/visualization/RedBlack.html"}],
fqs:[
{q:"Which is more practical, AVL Tree or Red-Black Tree, and why?",a:`<strong>Red-Black Tree</strong> is more practical. AVL trees maintain a max height difference of 1 (stricter balance), but require <strong>more rotations</strong> per insert/delete. Red-Black Trees allow up to 2log(n+1) height (slightly relaxed) but limit insert/delete rotations to at most 2–3. AVL is better for read-heavy workloads; Red-Black for write-heavy ones.`},
{q:"Why does in-order traversal of a BST always produce a sorted array?",a:`In-order traversal visits nodes in <strong>left → root → right</strong> order. By BST property, all values in the left subtree are less than the root, which is less than all in the right subtree. This property holds recursively for every node, so in-order traversal always visits in ascending order — usable for BST-based sorting.`}
],
trap:{wrong:`"Inserting n elements into a balanced BST is always O(n log n), since each insertion is O(log n)."`,
explain:`<strong>This is correct</strong>, but with an important caveat: it includes <strong>the overhead of rotation to maintain balance</strong>. Inserting sorted data into a plain BST produces a skewed tree at O(n²). Balanced BSTs (AVL, Red-Black) restore balance on each insertion in O(log n), but the rotation cost should not be overlooked.`}
},
{id:19,cat:"Data Structures",q:"What is a Heap, and what is its relationship to Priority Queues?",
a:`<strong>Heap</strong>: a complete binary tree where each parent is greater (Max-Heap) or smaller (Min-Heap) than its children. Implemented as an array; parent of index i is at <code>(i-1)/2</code>. When a priority queue is implemented with a heap, insert/delete is <code>O(log n)</code> and min/max query is <code>O(1)</code>. Used in Dijkstra's algorithm and heap sort.`,
links:[{t:"Heap Visualization",u:"https://visualgo.net/ko/heap"},{t:"LeetCode Heap Problems",u:"https://leetcode.com/tag/heap-priority-queue/"}],
fqs:[
{q:"Why can heapification be done in O(n)?",a:`Naively inserting n elements takes <code>O(n log n)</code>, but given an array, a heap can be built in <code>O(n)</code>. Method: apply <strong>sift-down</strong> from the last internal node to the root in reverse order. Analysis: leaf nodes (n/2 of them) need no sift-down; sift-down cost at height h nodes is O(h). The total sum converges to O(n) (geometric series sum).`},
{q:"What is an efficient approach to finding the Median of a Stream in real time?",a:`Use <strong>two heaps</strong>: a Max-Heap (lower half) and a Min-Heap (upper half). Maintain a size difference of at most 1. Median: if total count is odd, return the top of the larger heap; if even, average the two tops. After each insertion, O(log n) suffices to maintain the median.`}
],
trap:{wrong:`"Priority queues can only be implemented with heaps."`,
explain:`<strong>Why it's wrong</strong>: A priority queue is an <strong>ADT (Abstract Data Type)</strong>; a heap is just one implementation. It can also be implemented with a sorted array, sorted linked list, Fibonacci heap, or B-Tree. Heaps are most practical, but not the only option. Fibonacci heaps support insert/decrease-key in <code>O(1)</code>, theoretically superior.`}
},
{id:20,cat:"Data Structures",q:"Explain how a Hash Table works.",
a:`<strong>Map a key through a hash function to an array index</strong>, giving average <code>O(1)</code> lookup/insert/delete. Good hash functions: uniform distribution, fast computation, deterministic. When load factor exceeds a threshold (usually 0.75), rehash by expanding the array.`,
links:[{t:"Hash Table Visualization",u:"https://visualgo.net/ko/hashtable"},{t:"HashMap Internal Structure",u:"https://d2.naver.com/helloworld/831311"}],
fqs:[
{q:"What are the criteria for evaluating hash function quality?",a:`① <strong>Uniform distribution</strong>: keys should be evenly spread across buckets. ② <strong>Determinism</strong>: same key always produces the same hash. ③ <strong>Speed</strong>: should be close to O(1). ④ <strong>Avalanche effect</strong>: a small change in input should greatly change the hash, reducing collisions. MurmurHash, FNV-1a, SipHash satisfy these criteria.`},
{q:"When is rehashing necessary and what does it cost?",a:`Rehashing occurs when the load factor (stored items / bucket count) exceeds the threshold (usually 0.75). A new array (usually 2× the size) is allocated and all items are re-inserted with new hash values. Cost: <code>O(n)</code>. But since rehashing happens once per n insertions, amortized analysis shows average insert cost is <code>O(1)</code>.`}
],
trap:{wrong:`"Hash table lookup is always O(1)."`,
explain:`<strong>Average O(1), but worst case O(n)</strong>. With many collisions or a biased hash function, all items may end up in one bucket, degrading lookup to <code>O(n)</code>. Java's HashMap converts to a Red-Black Tree when a bucket exceeds 8 entries, capping it at <code>O(log n)</code>. "Average O(1)" is the accurate claim.`}
},
{id:21,cat:"Data Structures",q:"Explain the Trie data structure, its characteristics, and use cases.",
a:`A tree that stores strings, where each root-to-leaf path represents one string. Search is <code>O(m)</code> (m = string length), with no hash collisions. Uses significant memory. Used for autocomplete, dictionary lookup, IP routing. Compressed Tries can reduce memory.`,
links:[{t:"Trie Visualization",u:"https://www.cs.usfca.edu/~galles/visualization/Trie.html"},{t:"LeetCode Trie",u:"https://leetcode.com/tag/trie/"}],
fqs:[
{q:"What are the methods for memory optimization in Tries?",a:`① <strong>Compressed Trie (Radix Tree)</strong>: merge nodes with only one child. Used in URL routing. ② <strong>HashMap for children</strong>: use HashMap instead of arrays to store only existing characters. ③ <strong>Double Array Trie</strong>: represent a trie with two arrays. ④ <strong>Bit vector</strong>: represent existence with a bitmask. Go's httprouter uses a Radix Tree.`},
{q:"Compare string search performance between a Trie and a HashSet.",a:`<strong>Search</strong>: Trie O(m), HashSet O(m) (computing hash takes O(m) too). <strong>Memory</strong>: HashSet is generally smaller. <strong>Trie advantages</strong>: prefix search (Trie O(m), HashSet impossible), memory savings when many strings share prefixes, natural alphabetical enumeration. HashSet is better for exact match; Trie for prefix-based search.`}
],
trap:{wrong:`"Trie search time complexity is O(n), because n strings are stored."`,
explain:`<strong>Why it's wrong</strong>: Trie search time depends only on the <strong>length m of the query string</strong>, not on the number of stored strings n. It's O(m). This is a key advantage. Even with 1 million stored strings, searching for a 7-letter word takes only 7 steps. The n-dependent quantity is the total memory used during construction.`}
},
{id:22,cat:"Data Structures",q:"Explain the Union-Find (Disjoint Set) data structure.",
a:`A data structure for managing disjoint sets, with Find (finding the set) and Union (merging sets) operations. With path compression + rank-based union optimizations, effectively <code>O(1)</code> per operation (inverse Ackermann function). Used in Kruskal's MST and cycle detection.`,
links:[{t:"Union-Find Visualization",u:"https://visualgo.net/ko/ufds"},{t:"BOJ Union-Find",u:"https://www.acmicpc.net/problem/1717"}],
fqs:[
{q:"Explain the code for implementing path compression.",a:`<code>int find(int x) { if (parent[x] != x) parent[x] = find(parent[x]); return parent[x]; }</code>. During the recursive call, on the way back, every node is directly connected to the root as a child. The next find <strong>reaches the root in one step</strong>. Non-recursive version: find root with a while loop, then traverse again to update all parents to root.`},
{q:"How can Union-Find detect cycles?",a:`When adding edge (u, v), if <code>find(u) == find(v)</code>, both are already in the same set, so a cycle would form. Kruskal's algorithm performs this check before adding an edge. If no cycle, perform union(u, v). For directed graphs, DFS-based back edge detection is more common.`}
],
trap:{wrong:`"Union-Find only supports merging (Union) sets and cannot split a set once merged."`,
explain:`<strong>This is correct</strong>: standard Union-Find does not support splitting. But this is a design choice. Advanced data structures like Link-Cut Trees do support splitting. The key limitation of standard Union-Find is "no split," and this should be kept in mind. An offline workaround exists by processing time in reverse order.`}
},
{id:23,cat:"Data Structures",q:"What is a Segment Tree and what problems does it solve?",
a:`A complete binary tree that efficiently handles <strong>range queries</strong> on arrays. Query/update range sum, min, or max in <code>O(log n)</code>. Preprocessing <code>O(n log n)</code>, space <code>O(n)</code>. Lazy Propagation enables range updates in <code>O(log n)</code> as well.`,
links:[{t:"BOJ Segment Tree",u:"https://www.acmicpc.net/problem/2042"},{t:"CP-Algorithms",u:"https://cp-algorithms.com/data_structures/segment_tree.html"}],
fqs:[
{q:"When is Lazy Propagation needed and how does it work?",a:`Applying range updates (e.g., add v to all elements in [l, r]) individually would cost <code>O(n log n)</code>. <strong>Lazy Propagation</strong>: store a lazy tag at each node and only propagate when actually needed (when accessing children). When visiting a node, apply the lazy value and pass it down to children. Range updates become <code>O(log n)</code>.`},
{q:"What is the difference between a Fenwick Tree (BIT) and a Segment Tree?",a:`<strong>Fenwick Tree</strong>: simpler implementation (one array), memory-efficient (O(n)), supports only range sum queries and point updates. Faster thanks to bit operations. <strong>Segment Tree</strong>: more complex but versatile (min, max, GCD, any associative operation), supports range updates via Lazy Propagation. For range sums only, a Fenwick Tree is simpler and faster.`}
],
trap:{wrong:`"Segment Trees can only be used for static (unchanging) arrays."`,
explain:`<strong>Why it's wrong</strong>: One of the core strengths of a Segment Tree is supporting <strong>dynamic updates</strong>. Point updates (changing a single element) are handled in <code>O(log n)</code>. For truly static arrays needing only range min/max, a Sparse Table is more efficient (O(1) query, no updates).`}
},
{id:24,cat:"Data Structures",q:"Compare adjacency matrix and adjacency list graph representations.",
a:`<strong>Adjacency Matrix</strong>: V×V array, space <code>O(V²)</code>, edge check <code>O(1)</code>, neighbor scan <code>O(V)</code>, suited for dense graphs. <strong>Adjacency List</strong>: space <code>O(V+E)</code>, neighbor scan <code>O(degree(v))</code>, suited for sparse graphs. Most real-world graphs are sparse, so adjacency lists are generally preferred.`,
links:[{t:"Graph Representation",u:"https://www.geeksforgeeks.org/graph-and-its-representations/"}],
fqs:[
{q:"Why is adjacency list better than adjacency matrix for social networks?",a:`Social networks have hundreds of millions of users, but the average number of friends per person is in the hundreds or thousands. <strong>Adjacency Matrix</strong>: 1B × 1B = 10^18 cells → practically infeasible. <strong>Adjacency List</strong>: O(V + E), ideal for sparse graphs. In practice, Facebook stores graphs as adjacency lists and uses graph databases like Neo4j.`},
{q:"How are adjacency matrix and adjacency list represented for weighted graphs?",a:`<strong>Adjacency Matrix</strong>: adj[i][j] = weight (0 or INF if no edge). <strong>Adjacency List</strong>: each entry is a (neighbor, weight) pair. In C++: <code>vector&lt;vector&lt;pair&lt;int,int&gt;&gt;&gt;</code>. Dijkstra's is more efficient with an adjacency list.`}
],
trap:{wrong:`"Finding all neighbors of a vertex in an adjacency matrix is O(1)."`,
explain:`<strong>Why it's wrong</strong>: To find all neighbors of vertex v in an adjacency matrix, you must scan v's entire row. That is <strong>O(V)</strong>. The O(1) operation is checking whether two specific vertices u and v are directly connected (adj[u][v] != 0). This difference is the core reason BFS/DFS prefer adjacency lists.`}
},
{id:25,cat:"Data Structures",q:"Explain how to implement a Queue using two Stacks.",
a:`Use two stacks: <strong>inbox and outbox</strong>. Enqueue: push to inbox. Dequeue: if outbox is empty, move all from inbox to outbox, then pop. <strong>Amortized O(1) for dequeue</strong>. Each element is moved at most twice (inbox→outbox).`,
links:[{t:"LeetCode - Queue using Stacks",u:"https://leetcode.com/problems/implement-queue-using-stacks/"}],
fqs:[
{q:"Prove using amortized analysis that dequeue has O(1) average cost.",a:`<strong>Potential function Φ = inbox stack size</strong>. Enqueue: actual cost 1 + ΔΦ = 1 + 1 = 2 (amortized). Dequeue (outbox not empty): cost 1 + ΔΦ = 1 + 0 = 1. Dequeue (outbox empty, k items in inbox): actual cost k+1, ΔΦ = -k. Amortized cost = k+1-k = 1. Therefore all operations have amortized cost <code>O(1)</code>.`},
{q:"When implementing a stack with two queues, is it better to make push or pop O(n)?",a:`Making <strong>push O(n)</strong> is generally preferred. On push: enqueue to the empty queue, then move all elements from the other queue. Pop: O(1) dequeue from front. Peek is also O(1) this way. The alternative (pop O(n)) allows O(1) push but requires moving on every pop. Since pop/peek are called more frequently, keeping them O(1) is advantageous.`}
],
trap:{wrong:`"Implementing a queue with two stacks is inefficient because dequeue has O(n) worst-case time."`,
explain:`<strong>True for worst case but practically wrong</strong>: dequeue's worst case is O(n), but <strong>amortized average is O(1)</strong>. Each element is moved from inbox to outbox at most once. Amortized O(1) is highly efficient in production systems, and Java's ArrayDeque operates similarly.`}
},
{id:26,cat:"Data Structures",q:"Why are B-Trees primarily used for database indexes?",
a:`B-Trees are balanced multi-way search trees where all leaves are at the same depth. <strong>Node size matches disk block size (4KB)</strong> to minimize disk I/O. B+Trees store data only in leaf nodes, and leaves are linked for efficient range queries. MySQL InnoDB uses B+Trees.`,
links:[{t:"B-Tree Visualization",u:"https://www.cs.usfca.edu/~galles/visualization/BTree.html"},{t:"B+Tree vs B-Tree",u:"https://www.geeksforgeeks.org/difference-between-b-tree-and-b-tree/"}],
fqs:[
{q:"Explain from a disk I/O perspective why B-Trees are preferred over BSTs.",a:`Each BST node requires following a pointer — random access — which is very slow on disk (HDD: ~10ms). B-Trees store <strong>hundreds of keys per node</strong>, keeping tree height low (3–4 for 1 million records). One I/O per page load processes many keys. Even on SSDs, sequential I/O is more efficient than random, so B+Trees remain advantageous.`},
{q:"Why are range queries fast in B+Trees?",a:`B+Tree leaf nodes are connected as a <strong>doubly linked list</strong>. After finding the start key in the tree, simply read leaves in order. No need to re-traverse the tree — O(range_size) sequential scan. Plain B-Trees (not B+) store data in internal nodes too, requiring in-order traversal, which is more complex.`}
],
trap:{wrong:`"B-Tree and B+Tree are the same data structure. B+Tree is just an optimized B-Tree."`,
explain:`<strong>Why it's wrong</strong>: They are structurally different. <strong>B-Tree</strong>: actual data stored in all nodes (internal + leaf). <strong>B+Tree</strong>: internal nodes store only keys (acting as index); actual data is only in leaf nodes, which are linked. This structural difference makes B+Trees far better for range queries and allows more keys per internal node, producing a wider tree.`}
},
{id:27,cat:"Data Structures",q:"What is a Bloom Filter and when is it useful?",
a:`A probabilistic data structure using a bit array and multiple hash functions to check set membership. <strong>False positives possible, false negatives impossible</strong>. Deletions not supported. Uses: Redis cache miss prevention, Chrome malicious URL filtering. Saves enormous memory.`,
links:[{t:"Bloom Filter Visualization",u:"https://llimllib.github.io/bloomfilter-tutorial/"},{t:"GeeksforGeeks Bloom Filter",u:"https://www.geeksforgeeks.org/bloom-filters-introduction-and-python-implementation/"}],
fqs:[
{q:"How can the false positive rate be reduced?",a:`① <strong>Increase bit array size</strong>: larger array reduces bit collision probability. ② <strong>Optimize the number of hash functions</strong>: optimal k = <code>(m/n) × ln2</code> (m = bit count, n = element count). Too many hash functions fill bits quickly; too few reduce discrimination. Approximately 10 bits per element are needed for a 1% FP rate.`},
{q:"Why can't Bloom Filters support deletions, and what data structures solve this?",a:`A bit position may be <strong>shared by multiple elements</strong>, so clearing a bit for deletion would also clear it for other elements. Solution: <strong>Counting Bloom Filter</strong>: use counters instead of bits; increment on insert, decrement on delete. Increases memory usage. <strong>Cuckoo Filter</strong>: supports deletion with lower FP rate and better space efficiency.`}
],
trap:{wrong:`"A Bloom Filter cannot definitively confirm that an element is absent from a set."`,
explain:`<strong>Why it's wrong</strong>: This is actually one of Bloom Filter's key strengths. <strong>False negatives never occur</strong>. If the filter says "absent" (bit is 0), the element is definitively absent. The uncertainty is on the "present" side (bits are 1 — false positive possible). This property makes it perfect for "quickly filtering out definitely-absent cases."`}
},
{id:28,cat:"Data Structures",q:"Explain how to implement an LRU Cache in O(1).",
a:`Combine a <strong>HashMap + doubly linked list</strong>. HashMap provides O(1) key→node access. Doubly linked list maintains usage order and supports O(1) insert/delete. get: find node and move to front. put: if exists, update+move; if new, insert at front and remove from tail if over capacity.`,
links:[{t:"LeetCode LRU Cache",u:"https://leetcode.com/problems/lru-cache/"},{t:"Redis Eviction Policy",u:"https://redis.io/docs/manual/eviction/"}],
fqs:[
{q:"Why use dummy head/tail (sentinel) nodes in the doubly linked list?",a:`Without sentinel nodes, adding/removing at the head or tail of an empty list requires <strong>many null checks</strong> and complex edge cases. With dummy head and tail, all real nodes always sit between the two sentinels, allowing consistent logic without null checks. Code becomes cleaner and less bug-prone.`},
{q:"How do you implement LFU (Least Frequently Used) in O(1)?",a:`Combine HashMap&lt;key, (value, freq)&gt; + HashMap&lt;freq, LinkedHashSet&lt;key&gt;&gt; + minFreq variable. Manage a LinkedHashSet (ordered set) per frequency. get: increment key's freq, move in per-freq sets, update minFreq. put: new key → freq=1, set minFreq=1. On overflow, remove the oldest key at minFreq. All operations <code>O(1)</code>.`}
],
trap:{wrong:`"An LRU cache can be implemented in O(1) using only a HashMap by storing access timestamps."`,
explain:`<strong>Why it's wrong</strong>: HashMap + timestamps gives O(1) for get/put, but <strong>eviction (removing the oldest entry) is O(n)</strong> — you'd need to compare all timestamps. The doubly linked list keeps items in order so the oldest is always at the tail, enabling O(1) eviction. The linked list is essential for O(1) guarantees.`}
},
{id:29,cat:"Database",q:"Explain the differences between RDBMS and NoSQL and the criteria for choosing between them.",
a:`<strong>RDBMS</strong>: fixed schema, ACID guarantees, SQL, vertical scaling. Best when data integrity and complex joins are needed (finance, ERP). <strong>NoSQL</strong>: flexible schema, easy horizontal scaling, BASE model. Types: Document/Key-Value/Column/Graph. Good for fast development and large-scale unstructured data.`,
links:[{t:"RDBMS vs NoSQL",u:"https://www.ibm.com/think/topics/sql-vs-nosql"},{t:"CAP Theorem",u:"https://www.ibm.com/topics/cap-theorem"}],
fqs:[
{q:"What is the BASE model and how does it differ from ACID?",a:`<strong>BA</strong>sically Available: always responds but some data may be stale. <strong>S</strong>oft state: system state can change without external input (during synchronization). <strong>E</strong>ventually consistent: all replicas will eventually converge. While ACID trades availability/performance for strong consistency, BASE sacrifices strong consistency to gain availability and scalability.`},
{q:"What is NewSQL and what problem does it solve?",a:`Systems aiming to provide RDBMS ACID + NoSQL horizontal scalability together. Examples: Google Spanner, CockroachDB, TiDB, VoltDB. Support distributed transactions while scaling horizontally. Google Spanner uses TrueTime API to guarantee external consistency across global distribution. Not a complete solution — CAP theorem constraints still apply.`}
],
trap:{wrong:`"NoSQL doesn't use SQL at all."`,
explain:`<strong>Why it's wrong</strong>: NoSQL stands for "Not Only SQL" — it doesn't mean avoiding SQL, but using different data models from traditional RDBMS. In fact, <strong>many NoSQL systems support SQL or SQL-like languages</strong>: Apache Cassandra's CQL, Amazon DynamoDB PartiQL, MongoDB's Aggregation Pipeline, etc.`}
},
{id:30,cat:"Database",q:"Explain the ACID properties of transactions.",
a:`<strong>Atomicity</strong>: All or Nothing. <strong>Consistency</strong>: DB integrity maintained before and after transaction. <strong>Isolation</strong>: concurrent transactions don't interfere with each other. <strong>Durability</strong>: committed transactions persist even after failures. Implemented via WAL (Write-Ahead Logging), locking, and MVCC.`,
links:[{t:"ACID Properties",u:"https://www.geeksforgeeks.org/acid-properties-in-dbms/"},{t:"PostgreSQL Transactions",u:"https://www.postgresql.org/docs/current/tutorial-transactions.html"}],
fqs:[
{q:"Explain WAL (Write-Ahead Logging), the technique for implementing Atomicity.",a:`<strong>WAL (Redo Log)</strong>: <strong>write the log before writing actual data to disk</strong>. On failure, replay the log to recover committed transactions and roll back incomplete ones. <strong>Undo Log</strong>: used to restore the previous state when rolling back a transaction. PostgreSQL uses WAL; MySQL InnoDB uses Redo Log + Undo Log.`},
{q:"Why must 'Consistency' also be guaranteed at the application level?",a:`DB-level Consistency means maintaining <strong>integrity constraints (PK, FK, NOT NULL, UNIQUE)</strong>. But business rules (e.g., "account balance must not go negative") cannot be automatically enforced by the DB. Incorrect transaction logic can produce states that satisfy DB constraints but violate business requirements. Full consistency requires cooperation between DB and application.`}
],
trap:{wrong:`"Isolation in ACID means all transactions are completely isolated and can never see results of concurrently running transactions."`,
explain:`<strong>Why it's wrong</strong>: Isolation depends on the <strong>isolation level</strong>. Only SERIALIZABLE guarantees full isolation. Lower levels like READ COMMITTED and REPEATABLE READ allow some concurrency anomalies (Dirty Read, Phantom Read, etc.) for performance. Most databases default to a lower isolation level than SERIALIZABLE for performance.`}
},
{id:31,cat:"Database",q:"Explain how database indexes work, their advantages and disadvantages.",
a:`An index is a separate data structure (B+Tree or Hash) for speeding up searches. Improves SELECT from <code>O(n)</code> to <code>O(log n)</code>. <strong>Disadvantages</strong>: extra storage space, write performance degradation on INSERT/UPDATE/DELETE due to index maintenance. Create indexes on high-cardinality columns used in WHERE, JOIN, and ORDER BY clauses.`,
links:[{t:"Use The Index, Luke!",u:"https://use-the-index-luke.com/"},{t:"MySQL Index Guide",u:"https://dev.mysql.com/doc/refman/8.0/en/optimization-indexes.html"}],
fqs:[
{q:"Why should you avoid creating an index on a low-cardinality column (e.g., gender)?",a:`Even after using the index to find rows, you still end up reading 50% of the entire table. The MySQL optimizer will determine that a <strong>full table scan is more efficient</strong> in this case. Using an index causes many random I/Os, which can be slower than sequential scanning. Selectivity = unique values / total rows — the higher the selectivity, the more effective the index.`},
{q:"Why does column order matter in a composite index?",a:`A composite index on (A, B, C) sorts by A first, then B when A is equal, then C when B is equal. <strong>Leftmost Prefix Rule</strong>: WHERE A=? → uses index. WHERE A=? AND B=? → uses index. WHERE B=? → cannot use index without A. The general strategy is to place frequently-used condition columns first and high-cardinality columns first.`}
],
trap:{wrong:`"More indexes means better SELECT performance, so it's best to create indexes on as many columns as possible."`,
explain:`<strong>Why it's wrong</strong>: Over-indexing significantly degrades INSERT/UPDATE/DELETE performance. Every write operation must update all indexes. It also increases storage usage, and too many indexes makes it harder for the optimizer to choose the best one. Analyze read/write ratios and actual query patterns, then selectively create only necessary indexes.`}
},
{id:32,cat:"Database",q:"Explain the purpose of normalization and describe 1NF, 2NF, and 3NF.",
a:`Eliminates redundancy and prevents update anomalies. <strong>1NF</strong>: all columns are atomic (no repeating groups). <strong>2NF</strong>: 1NF + no partial functional dependencies. <strong>3NF</strong>: 2NF + no transitive functional dependencies. BCNF is stricter than 3NF.`,
links:[{t:"Database Normalization",u:"https://www.geeksforgeeks.org/normal-forms-in-dbms/"},{t:"Normalization Guide",u:"https://www.studytonight.com/dbms/database-normalization.php"}],
fqs:[
{q:"When is intentional denormalization a valid design choice?",a:`When read performance is critically important. Complex JOINs on normalized tables can hurt performance. Example: if every query joins 5 tables, you might precompute a combined table. <strong>Downsides</strong>: data redundancy, risk of update anomalies. Generally, <strong>OLAP (analytics)</strong> data warehouses use denormalization; <strong>OLTP (transactional)</strong> operational DBs use normalization.`},
{q:"Give an example of a transitive dependency.",a:`In table Student(StudentID, DeptCode, DeptName): StudentID → DeptCode → DeptName. DeptName depends on the primary key (StudentID) only indirectly through DeptCode (transitive dependency). <strong>Problem</strong>: changing a department name requires updating all rows in that department (update anomaly). <strong>3NF fix</strong>: split into Student(StudentID, DeptCode) and Department(DeptCode, DeptName).`}
],
trap:{wrong:`"Normalization always means better database design. All tables should satisfy at least 3NF."`,
explain:`<strong>Context-dependent</strong>: normalization isn't always optimal. Over-normalization can require many JOINs even for simple reads. In practice, normalize to 3NF first, then intentionally denormalize only where performance issues arise. The decision should be guided by <strong>read/write patterns, data volume, and performance requirements</strong>.`}
},
{id:33,cat:"Database",q:"Explain the types of SQL Joins: INNER, LEFT, RIGHT, and FULL OUTER.",
a:`<strong>INNER JOIN</strong>: matching rows on both sides. <strong>LEFT JOIN</strong>: all rows from left + matching rows from right (NULL if no match). <strong>RIGHT JOIN</strong>: all rows from right + matching rows from left. <strong>FULL OUTER JOIN</strong>: all rows from both (with NULLs). <strong>CROSS JOIN</strong>: Cartesian product. MySQL doesn't support FULL OUTER JOIN — use LEFT + RIGHT JOIN with UNION.`,
links:[{t:"SQL Join Visualizer",u:"https://joins.spathon.com/"},{t:"W3Schools SQL Joins",u:"https://www.w3schools.com/sql/sql_join.asp"}],
fqs:[
{q:"What criteria does the query optimizer use to determine JOIN order?",a:`The optimizer evaluates multiple strategies: ① <strong>Row count</strong>: smaller tables first (for Nested Loop Join). ② <strong>Index presence</strong>: use indexes on JOIN columns. ③ <strong>Join method</strong>: Nested Loop (small data), Hash Join (large data), Merge Join (sorted data). Use EXPLAIN to see the plan; force order with hints (STRAIGHT_JOIN). Accurate statistics (row counts, cardinality) are essential for good optimizer decisions.`},
{q:"Give a real use case requiring a Self Join.",a:`Used when a table has a hierarchical structure. Employee table (id, name, manager_id): retrieve each employee and their manager's name: <code>SELECT e.name, m.name FROM employees e JOIN employees m ON e.manager_id = m.id</code>. Also useful for finding pairs meeting a condition within the same table — e.g., pairs of customers in the same city.`}
],
trap:{wrong:`"LEFT JOIN is always slower than INNER JOIN because it returns more rows."`,
explain:`<strong>Not always true</strong>: performance depends more heavily on indexes, data distribution, and query patterns. LEFT JOIN may return more rows, but can sometimes be faster than INNER JOIN if it can early-exit for unmatched right-side rows. Real performance must be verified with EXPLAIN. Judging performance by JOIN type alone is inaccurate.`}
},
{id:34,cat:"Database",q:"Explain transaction isolation levels and the anomalies they can produce.",
a:`<strong>READ UNCOMMITTED</strong>: Dirty Read possible. <strong>READ COMMITTED</strong>: prevents Dirty Read (Oracle default). <strong>REPEATABLE READ</strong>: prevents Non-Repeatable Read (MySQL default — also prevents Phantom Read via MVCC). <strong>SERIALIZABLE</strong>: prevents all anomalies, slowest. Higher isolation = lower concurrency.`,
links:[{t:"Transaction Isolation",u:"https://www.postgresql.org/docs/current/transaction-iso.html"},{t:"MySQL InnoDB Isolation",u:"https://dev.mysql.com/doc/refman/8.0/en/innodb-transaction-isolation-levels.html"}],
fqs:[
{q:"Explain the difference between Phantom Read and Non-Repeatable Read with examples.",a:`<strong>Non-Repeatable Read</strong>: reading the same row twice in the same transaction yields different values — because transaction B modified/deleted it in between. <strong>Phantom Read</strong>: running the same query twice in a transaction returns a different number of rows — because transaction B inserted new rows in between. REPEATABLE READ prevents row modifications being seen but not new insertions (though MySQL InnoDB prevents this too via Gap Lock).`},
{q:"How does MySQL InnoDB prevent Phantom Reads at REPEATABLE READ level?",a:`Two mechanisms are used: ① <strong>MVCC (Consistent Snapshot Read)</strong>: regular SELECTs read from a snapshot taken at transaction start, not seeing other transactions' INSERTs. ② <strong>Gap Lock</strong>: with SELECT FOR UPDATE or locking reads, a gap lock is placed on the search range, blocking other transactions' INSERTs. These two mechanisms together prevent Phantom Reads at REPEATABLE READ.`}
],
trap:{wrong:`"Higher isolation levels are always safer, so SERIALIZABLE should be the default."`,
explain:`<strong>Why it's wrong</strong>: SERIALIZABLE processes transactions as if they run sequentially, drastically reducing throughput and increasing deadlock risk. In most applications, Phantom Reads and Non-Repeatable Reads don't actually cause problems. Choose an isolation level based on a <strong>trade-off between performance and safety</strong> matching business requirements.`}
},
{id:35,cat:"Database",q:"What is the N+1 problem and how do you fix it?",
a:`A phenomenon where fetching N records with one query is followed by N additional queries — one per record. <strong>Solutions</strong>: JOIN in a single query, ORM Eager Loading, batch fetching, DataLoader (GraphQL). Easily occurs when using ORMs.`,
links:[{t:"N+1 Problem",u:"https://www.geeksforgeeks.org/n1-query-problem-in-orm/"},{t:"JPA N+1 Solution",u:"https://jojoldu.tistory.com/165"}],
fqs:[
{q:"When does the N+1 problem occur in JPA and how does @EntityGraph solve it?",a:`Occurs when iterating a collection on a <code>@ManyToOne(fetch = LAZY)</code> relation. Example: fetching 100 posts then calling <code>post.getAuthor().getName()</code> → 100 extra queries. Solutions: ① <code>@EntityGraph(attributePaths = "author")</code> for Fetch Join. ② JPQL <code>JOIN FETCH</code>. ③ Batch Size setting. Note: Fetch Join + Collection can cause Cartesian Products.`},
{q:"Explain the DataLoader pattern for solving N+1 in GraphQL.",a:`DataLoader uses <strong>batching + caching</strong> to solve N+1. It collects individual requests and processes them together. Example: instead of querying the author for each of 100 posts individually, it gathers all 100 author IDs and runs <code>SELECT * FROM users WHERE id IN (1,2,...,100)</code> once. Developed by Facebook and released as open source.`}
],
trap:{wrong:`"The N+1 problem only occurs when using an ORM."`,
explain:`<strong>Why it's wrong</strong>: N+1 occurs more subtly with ORMs, but it also <strong>happens with hand-written SQL</strong>. Example: calling a query inside a loop in application code causes the same problem. ORMs just hide it. The root cause is "not fetching all needed data in one request."`}
},
{id:36,cat:"Database",q:"Explain the difference between Sharding and Partitioning.",
a:`<strong>Partitioning</strong>: physically splitting a table within a single DB server (horizontal/vertical). <strong>Sharding</strong>: distributing data across multiple DB servers (horizontal partitioning). Shard key selection is critical; cross-shard queries/transactions are complex. Watch out for hot spot issues.`,
links:[{t:"Database Sharding",u:"https://aws.amazon.com/blogs/database/sharding-with-amazon-relational-database-service/"},{t:"MongoDB Sharding",u:"https://www.mongodb.com/docs/manual/sharding/"}],
fqs:[
{q:"What factors should be considered when choosing a shard key?",a:`① <strong>Cardinality</strong>: diverse values enable even distribution. ② <strong>Write distribution</strong>: writes must not concentrate on one shard (problem with time-based shard keys). ③ <strong>Query patterns</strong>: data frequently queried together should be on the same shard to minimize cross-shard queries. ④ <strong>Immutability</strong>: changing a shard key value requires moving data to a different shard. Good: user ID. Bad: date (writes concentrate on latest date).`},
{q:"Why are distributed transactions difficult in a sharded environment?",a:`Cross-shard transactions require <strong>2PC (Two-Phase Commit)</strong>. Phase 1: all participants confirm ready (Prepare). Phase 2: coordinator commits or rolls back all. Problems: coordinator failure can block participants; network latency degrades performance. CAP theorem makes strong consistency difficult in distributed environments. In practice, the <strong>Saga pattern</strong> is often used to replace distributed transactions.`}
],
trap:{wrong:`"Applying sharding solves all database performance problems."`,
explain:`<strong>Why it's wrong</strong>: Sharding is a technique for <strong>horizontal scaling</strong>, not a silver bullet. Cross-shard queries can actually hurt performance. Complex joins, aggregations, and distributed transactions become harder after sharding. Before sharding, try index optimization, query tuning, replication, and caching.`}
},
{id:37,cat:"Database",q:"Explain how to analyze query execution plans with EXPLAIN.",
a:`Key columns: <strong>type</strong> (ALL is worst, const/eq_ref is best), <strong>key</strong> (index used), <strong>rows</strong> (estimated row count), <strong>Extra</strong> (Using filesort, Using temporary are performance warning signs). EXPLAIN ANALYZE provides actual execution statistics. If type=ALL appears, consider adding an index.`,
links:[{t:"MySQL EXPLAIN Guide",u:"https://dev.mysql.com/doc/refman/8.0/en/execution-plan-information.html"},{t:"EXPLAIN Visualizer",u:"https://explain.depesz.com/"}],
fqs:[
{q:"Explain the differences between ALL, range, ref, eq_ref, and const in the EXPLAIN type column.",a:`Performance order: <strong>const</strong> (single row via PK/unique key) > <strong>eq_ref</strong> (exactly one row via PK in a JOIN) > <strong>ref</strong> (multiple rows via index) > <strong>range</strong> (index range scan) > <strong>index</strong> (full index scan) > <strong>ALL</strong> (full table scan). Range or better is acceptable; ref or better is good; const/eq_ref is ideal.`},
{q:"How do you optimize when 'Using filesort' appears in Extra?",a:`Filesort occurs when there's no index on the ORDER BY column or the index can't be used. <strong>Optimization</strong>: add an index on the ORDER BY column; a composite index covering both WHERE and ORDER BY columns is efficient. Increase <code>sort_buffer_size</code> to enable in-memory sorting. A <code>covering index</code> can replace filesort with an index scan.`}
],
trap:{wrong:`"A small 'rows' value in EXPLAIN means the query is fast."`,
explain:`<strong>Not always</strong>: rows is the <strong>optimizer's estimate</strong> and may differ from reality — especially if statistics are stale. Also, a small rows count with type=ALL is still problematic. Conversely, a large rows count with a covering index can be very fast. Use EXPLAIN ANALYZE (actual execution results) for accuracy.`}
},
{id:38,cat:"Database",q:"Explain Redis caching strategies such as Cache-Aside and Write-Through.",
a:`<strong>Cache-Aside (Lazy Loading)</strong>: on cache miss, query DB and store in cache. <strong>Write-Through</strong>: on write, update both cache and DB simultaneously. <strong>Write-Back</strong>: write to cache only, async flush to DB (fast but risk of data loss). <strong>Read-Through</strong>: cache handles DB queries. TTL settings and cache stampede prevention are also important.`,
links:[{t:"AWS Caching Strategies",u:"https://aws.amazon.com/caching/best-practices/"},{t:"Redis Caching",u:"https://redis.io/topics/introduction"}],
fqs:[
{q:"What is a Cache Stampede and how do you prevent it?",a:`When cache expires, many concurrent requests flood the DB at once (Thundering Herd). <strong>Prevention</strong>: ① <strong>Mutex Lock</strong>: only the first request accesses DB, others wait. ② <strong>Early Expiration</strong>: refresh cache in the background before it expires. ③ <strong>Probabilistic Early Recomputation</strong>: probabilistically refresh as expiration approaches (XFetch algorithm). ④ <strong>Add random jitter to TTL</strong>: stagger simultaneous expirations.`},
{q:"Explain Redis key expiration (TTL) policies and eviction policies when memory is full.",a:`<strong>Key expiration</strong>: Lazy Expiration (check on access) + Active Expiration (periodically sample and delete expired keys). <strong>Eviction policies</strong>: <code>noeviction</code> (error on overflow), <code>allkeys-lru</code> (LRU across all keys), <code>volatile-lru</code> (LRU only on keys with TTL), <code>allkeys-random</code> (random). For cache servers, <code>allkeys-lru</code> or <code>allkeys-lfu</code> is generally recommended.`}
],
trap:{wrong:`"Write-Through always has better cache consistency than Cache-Aside, so Write-Through should be the default."`,
explain:`<strong>There are trade-offs</strong>: Write-Through offers good cache-DB consistency but <strong>increases write latency</strong> (must write to both DB and cache). Also, data that's never read gets cached unnecessarily, wasting space. Cache-Aside only caches data that's actually read. Choose a strategy based on read patterns and write frequency.`}
},
{id:39,cat:"Database",q:"What is a Deadlock and how is it handled in databases?",
a:`A state where two transactions wait indefinitely for resources held by each other. Conditions: mutual exclusion, hold and wait, no preemption, circular wait. <strong>Prevention</strong>: always acquire locks in the same order, use timeouts. <strong>Detection and resolution</strong>: DB analyzes the wait-for graph and rolls back a victim transaction.`,
links:[{t:"MySQL Deadlock Handling",u:"https://dev.mysql.com/doc/refman/8.0/en/innodb-deadlocks.html"}],
fqs:[
{q:"Write a concrete SQL scenario where a deadlock can occur.",a:`Transaction A: <code>UPDATE accounts SET balance=balance-100 WHERE id=1; UPDATE accounts SET balance=balance+100 WHERE id=2;</code>. Transaction B: <code>UPDATE accounts SET balance=balance-50 WHERE id=2; UPDATE accounts SET balance=balance+50 WHERE id=1;</code>. A holds id=1 lock, waits for id=2; B holds id=2 lock, waits for id=1 → deadlock. <strong>Solution</strong>: always acquire locks in ascending id order.`},
{q:"How does MySQL InnoDB automatically detect and handle deadlocks?",a:`InnoDB maintains a <strong>wait-for graph</strong>. When a transaction waits for a lock, it updates the graph. If a cycle is detected, it's declared a deadlock, and the transaction that has <strong>modified the fewest rows is chosen as the victim</strong> and rolled back. The application receives <code>Error 1213: Deadlock found</code> and should retry the transaction.`}
],
trap:{wrong:`"The only way to completely prevent deadlocks is to not use transactions."`,
explain:`<strong>Why it's wrong</strong>: Deadlocks can be managed via <strong>prevention, avoidance, and detection/resolution</strong>. Keeping lock acquisition order consistent, setting timeouts, or relying on DB auto-detection are all valid approaches. Without transactions, ACID cannot be guaranteed and data integrity is compromised. Eliminating transactions out of fear of deadlocks creates bigger problems.`}
},
{id:40,cat:"Database",q:"Explain replication and High Availability (HA) architectures.",
a:`<strong>Primary-Replica replication</strong>: writes go to Primary, reads distributed to Replicas. <strong>Asynchronous replication</strong>: fast but risk of data loss. <strong>Synchronous replication</strong>: safe but slower. <strong>HA</strong>: Heartbeat + automatic failover promotes a Replica when the Primary fails.`,
links:[{t:"MySQL Replication",u:"https://dev.mysql.com/doc/refman/8.0/en/replication.html"},{t:"PostgreSQL HA Guide",u:"https://www.postgresql.org/docs/current/high-availability.html"}],
fqs:[
{q:"Explain the causes and impact of replication lag.",a:`<strong>Causes</strong>: in async replication, the Primary's writes take time to reach Replicas. Bulk writes, slow network, and Replica overload are causes. <strong>Impact</strong>: reading from a Replica may return stale data. Immediately reading after a write can produce Write-After-Read inconsistency. <strong>Solutions</strong>: read critical data from Primary, apply session consistency, monitor replication lag.`},
{q:"What is the difference between MySQL Group Replication and regular Primary-Replica?",a:`<strong>Regular replication</strong>: unidirectional, manual failover, async. <strong>Group Replication</strong>: multi-primary or single-primary, automatic failover, Paxos-based consensus for conflict detection. Allows writes to all primaries while maintaining consistency. However, conflicting transactions may be rolled back. MySQL InnoDB Cluster is built on Group Replication.`}
],
trap:{wrong:`"In a Primary-Replica setup, Replicas are read-only, so the service goes down when Primary fails."`,
explain:`<strong>Why it's wrong</strong>: With <strong>automatic failover</strong> configured, a Replica is automatically promoted to Primary when the Primary fails. Tools like Orchestrator, MHA, and AWS RDS Multi-AZ automate this. While a brief downtime may occur during failover (seconds to tens of seconds), the service does not completely stop.`}
},
{id:41,cat:"Database",q:"Explain the difference between GROUP BY and HAVING in SQL.",
a:`<strong>GROUP BY</strong>: groups rows with the same specified column values. <strong>HAVING</strong>: applies conditions to grouped results. Execution order: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY. WHERE filters before grouping; HAVING filters after.`,
links:[{t:"SQL Execution Order",u:"https://www.geeksforgeeks.org/sql-query-processing-order/"},{t:"W3Schools HAVING",u:"https://www.w3schools.com/sql/sql_having.asp"}],
fqs:[
{q:"How does SQL execution order affect performance optimization?",a:`<strong>WHERE vs HAVING</strong>: WHERE runs before GROUP BY, reducing the number of rows to be grouped. HAVING runs after. Move HAVING conditions to WHERE when possible (aggregate function conditions cannot be moved). <strong>JOIN order</strong>: the optimizer adjusts order, but designing WHERE conditions to use indexes effectively is key. <strong>LIMIT</strong> is applied last, after ORDER BY.`},
{q:"What makes Window Functions different from GROUP BY?",a:`<strong>GROUP BY</strong>: compresses each group into one row. <strong>Window Functions</strong>: preserve all rows while computing aggregates per row. Example: <code>SELECT name, salary, AVG(salary) OVER (PARTITION BY dept) FROM employees</code>. Shows each employee's row along with their department average. Provides powerful analytics: ROW_NUMBER, RANK, LAG, LEAD, etc.`}
],
trap:{wrong:`"HAVING and WHERE do the same thing. Since HAVING is more flexible, it can always be used instead of WHERE."`,
explain:`<strong>Why it's wrong</strong>: Using HAVING instead of WHERE causes a <strong>significant performance hit</strong>. WHERE filters rows before grouping, reducing the data to aggregate. HAVING filters after grouping all rows. Also, WHERE can use indexes but HAVING cannot (it operates on post-aggregation results). Only use HAVING for aggregate function conditions.`}
},
{id:42,cat:"Database",q:"What is MVCC (Multi-Version Concurrency Control)?",
a:`A concurrency control technique that maintains multiple versions of data so reads and writes don't block each other. Reads use a snapshot from when the transaction started. PostgreSQL keeps old versions in the heap; MySQL InnoDB stores them in Undo logs. Reads proceed without locks, improving concurrency.`,
links:[{t:"PostgreSQL MVCC",u:"https://www.postgresql.org/docs/current/mvcc.html"},{t:"MySQL InnoDB MVCC",u:"https://dev.mysql.com/doc/refman/8.0/en/innodb-multi-versioning.html"}],
fqs:[
{q:"Explain why PostgreSQL needs VACUUM, connected to MVCC.",a:`PostgreSQL's MVCC doesn't delete old rows on update — it <strong>adds a new version alongside the old one</strong>. Old row versions no longer referenced by any transaction (Dead Tuples) accumulate on disk. <strong>VACUUM</strong> cleans up Dead Tuples and reclaims space. AUTOVACUUM runs automatically, but manual VACUUM ANALYZE may be needed after bulk updates.`},
{q:"Why can MVCC not completely prevent deadlocks?",a:`MVCC resolves <strong>read-write conflicts</strong> but not <strong>write-write conflicts</strong>. If two transactions simultaneously try to modify the same row, locking is still required. Example: if transaction A modifies row 1 while B modifies row 2, then A tries to modify row 2 and B tries to modify row 1 — deadlock. MVCC eliminates read-write blocking but write-write deadlocks still occur.`}
],
trap:{wrong:`"MVCC always reads the most recent data. For consistency, reads should return the latest committed data."`,
explain:`<strong>Why it's wrong</strong>: The core of MVCC is <strong>snapshot isolation</strong>. A transaction sees the snapshot from its start time, so data committed by other transactions afterward is not visible. This guarantees Repeatable Read but means you're not reading the latest data. To always read the latest, use SELECT FOR UPDATE or the READ COMMITTED isolation level.`}
},
{id:43,cat:"Database",q:"Explain full-text search principles and the role of Elasticsearch.",
a:`Uses an inverted index to map each word to the documents it appears in. MySQL FULLTEXT is far less powerful than Elasticsearch for morphological analysis, TF-IDF/BM25 scoring, autocomplete, and typo correction. Typically used alongside an RDBMS.`,
links:[{t:"Elasticsearch Guide",u:"https://www.elastic.co/guide/en/elasticsearch/reference/current/getting-started.html"},{t:"Korean Nori Analyzer",u:"https://www.elastic.co/guide/en/elasticsearch/plugins/current/analysis-nori.html"}],
fqs:[
{q:"Explain the structure of an inverted index and how search works.",a:`An inverted index is a <strong>word → document list</strong> mapping. Example: "database": [doc1, doc3, doc5], "index": [doc1, doc2, doc4]. When indexing a document, tokenize and normalize the text (lowercase, stemming) then add to the inverted index. On search, apply the same processing to the query, find the document sets in the index, and perform set intersection/union for multi-word queries.`},
{q:"Explain TF-IDF scoring.",a:`<strong>TF (Term Frequency)</strong>: how often the term appears in the document — higher is more relevant. <strong>IDF (Inverse Document Frequency)</strong>: log(total docs / docs containing the term) — rarer terms are more important. Common words like "the" have low IDF; specialized terms like "elasticsearch" have high IDF. Final score = TF × IDF. Recent Elasticsearch versions use <strong>BM25</strong> by default instead of TF-IDF.`}
],
trap:{wrong:`"Elasticsearch can completely replace a database. Just store all data in Elasticsearch."`,
explain:`<strong>Why it's wrong</strong>: Elasticsearch is optimized for search but <strong>is not suitable as a primary data store (Source of Truth)</strong>. Transaction support is limited, strong consistency is hard to guarantee, and it handles complex relational data poorly. Typically, the original data is stored in an RDBMS, and Elasticsearch is kept in sync for search purposes via dual write or CDC (Change Data Capture).`}
},
{id:44,cat:"Network",q:"Explain the differences between TCP and UDP and their respective use cases.",
a:`<strong>TCP</strong>: connection-oriented, 3-way handshake, reliability (ordering/retransmission/flow control/congestion control), high overhead. HTTP, FTP, email. <strong>UDP</strong>: connectionless, 8-byte header, fast but unreliable. Real-time streaming, gaming, VoIP, DNS. HTTP/3 (QUIC) implements reliability on top of UDP.`,
links:[{t:"TCP vs UDP",u:"https://www.cloudflare.com/learning/ddos/glossary/tcp-vs-udp/"},{t:"QUIC Protocol",u:"https://www.chromium.org/quic/"}],
fqs:[
{q:"What is the difference between TCP's Flow Control and Congestion Control?",a:`<strong>Flow Control</strong>: the sender adjusts transmission rate to match the receiver's processing capacity. Uses a sliding window; receiver buffer size is included in ACK. <strong>Congestion Control</strong>: prevents overloading the network itself. Packet loss signals congestion and triggers rate reduction. Uses Slow Start and AIMD (Additive Increase Multiplicative Decrease). Flow control is between sender and receiver; congestion control considers the whole network.`},
{q:"Why does DNS use UDP rather than TCP by default?",a:`Most DNS queries/responses are very short (under 512 bytes) and require fast responses. UDP can send immediately without connection setup overhead (no 3-way handshake). DNS clients retry after a timeout if no response is received — providing reliability implicitly. However, DNS uses TCP when responses exceed 512 bytes (DNSSEC, large responses).`}
],
trap:{wrong:`"Since UDP is unreliable, packet loss in real-time games is always a problem."`,
explain:`<strong>Why it's wrong</strong>: Real-time games actually handle packet loss better with UDP than TCP. TCP blocks later packets while retransmitting a lost one (HOL Blocking). Games don't need stale position data. UDP skips lost packets and keeps sending the latest state, maintaining <strong>low latency</strong>.`}
},
{id:45,cat:"Network",q:"Explain the differences between HTTP and HTTPS and the TLS handshake process.",
a:`HTTP: plaintext transmission. HTTPS: SSL/TLS encryption. <strong>TLS 1.3 Handshake</strong>: Client Hello → Server Hello + Certificate → Certificate Verification → Pre-Master Secret Exchange → Session Key Generation → Finished. TLS 1.3 uses 1-RTT (0-RTT for reconnections).`,
links:[{t:"TLS Handshake",u:"https://www.cloudflare.com/learning/ssl/what-happens-in-a-tls-handshake/"},{t:"How HTTPS Works",u:"https://howhttps.works/"}],
fqs:[
{q:"How are symmetric and asymmetric key encryption used together in TLS?",a:`<strong>Asymmetric (Public Key)</strong>: slow but allows secure key exchange. Used in TLS handshake for server authentication and session key exchange. <strong>Symmetric</strong>: fast but hard to share securely. Used for actual data encryption. TLS uses asymmetric keys to <strong>securely exchange a symmetric session key</strong>, then encrypts all subsequent communication with fast symmetric encryption (AES-256, etc.) — combining asymmetric security with symmetric speed.`},
{q:"Explain the Certificate Chain and the role of Root CAs.",a:`<strong>Root CAs</strong> (Comodo, DigiCert, etc.) are pre-installed in OS/browser trust stores. Root CA signs the Intermediate CA, which signs the server certificate. Browsers verify the <strong>Chain of Trust</strong>: server cert → Intermediate CA → Root CA. Root CAs don't directly sign server certs for security — the Root CA's private key is kept offline in an air-gapped facility.`}
],
trap:{wrong:`"Using HTTPS makes man-in-the-middle (MITM) attacks completely impossible."`,
explain:`<strong>Why it's wrong</strong>: Without certificate pinning, MITM is possible. Cases: corporate SSL inspection (proxy re-issues certificate), a fake CA cert added to the trust store, a user ignoring warnings and accepting a self-signed cert. HSTS (HTTP Strict Transport Security) and Certificate Transparency provide additional defenses.`}
},
{id:46,cat:"Network",q:"Explain the differences between HTTP/1.1, HTTP/2, and HTTP/3.",
a:`<strong>HTTP/1.1</strong>: Keep-Alive, HOL Blocking, text-based. <strong>HTTP/2</strong>: binary, multiplexing, header compression (HPACK), server push. TCP HOL Blocking still exists. <strong>HTTP/3</strong>: UDP-based QUIC, eliminates TCP HOL Blocking, 0-RTT, robust on mobile network switches.`,
links:[{t:"HTTP/1 vs 2 vs 3",u:"https://www.cloudflare.com/learning/performance/http2-vs-http1.1/"},{t:"HTTP/3 Explained",u:"https://http3-explained.haxx.se/"}],
fqs:[
{q:"How does HTTP/2 multiplexing differ from HTTP/1.1 pipelining?",a:`<strong>HTTP/1.1 pipelining</strong>: sends multiple requests without waiting for responses, but responses must arrive in <strong>request order</strong> (HOL Blocking). Rarely used in browsers. <strong>HTTP/2 multiplexing</strong>: multiple streams over one TCP connection, each independent, no response ordering constraint — no HOL Blocking. However, TCP-level HOL Blocking still occurs on packet loss.`},
{q:"How does QUIC solve TCP's Head-of-Line Blocking?",a:`QUIC <strong>manages multiple streams independently</strong>. On top of UDP, each stream has its own packet sequence. If stream A's packet is lost and awaiting retransmission, streams B and C continue processing. In TCP, all data after a lost packet is blocked (TCP HOL Blocking). HTTP/3 uses QUIC's stream independence to solve the remaining HOL Blocking issue from HTTP/2.`}
],
trap:{wrong:`"HTTP/2 is always faster than HTTP/1.1 because multiplexing reduces the number of connections."`,
explain:`<strong>Not always</strong>: in high-packet-loss environments, HTTP/2 can be slower due to TCP HOL Blocking — one blocked stream blocks all others. Server push can waste bandwidth if misused. HTTP/2 excels on stable low-loss networks; HTTP/3 may be better in mobile environments.`}
},
{id:47,cat:"Network",q:"Explain how DNS works step by step.",
a:`① Browser cache → ② OS cache/hosts → ③ Recursive Resolver (ISP) → ④ Root DNS → ⑤ TLD DNS (.com/.kr) → ⑥ Authoritative DNS → ⑦ Return IP → ⑧ Cache with TTL. DNS primarily uses UDP port 53.`,
links:[{t:"How DNS Works",u:"https://howdns.works/"},{t:"Cloudflare DNS",u:"https://www.cloudflare.com/learning/dns/what-is-dns/"}],
fqs:[
{q:"What problems occur when DNS TTL is too low or too high?",a:`<strong>TTL too low</strong>: cache expires frequently, resulting in frequent queries to DNS servers. Increased latency, higher DNS server load. But IP changes (server migrations) propagate quickly. <strong>TTL too high</strong>: cache persists, fewer queries, better performance. But IP changes may take a long time to propagate as the old IP remains cached until TTL expires. Typical practice: 3600 seconds normally, 300 seconds before planned server migration.`},
{q:"Why are DNS over HTTPS (DoH) and DNS over TLS (DoT) needed?",a:`Regular DNS uses UDP plaintext, so <strong>ISPs and network intermediaries can see DNS queries</strong> (knowing which sites you visit). DoH encrypts DNS queries via HTTPS, making ISP tracking harder. DoT encrypts with TLS. Note: with DoH/DoT, the DNS resolver (Cloudflare 1.1.1.1, Google 8.8.8.8) can still see the queries — trust is shifted, not eliminated.`}
],
trap:{wrong:`"DNS is a service that converts IP addresses to domain names."`,
explain:`<strong>That's backwards</strong>: DNS (Domain Name System) <strong>converts domain names (human-readable) to IP addresses (computer-readable)</strong>. Example: google.com → 142.250.x.x. The reverse (IP → domain) is called <strong>Reverse DNS Lookup</strong> and uses PTR records — it is not DNS's primary function.`}
},
{id:48,cat:"Network",q:"Explain the 6 REST API design principles.",
a:`<strong>1. Uniform Interface</strong>: identify resources via URI, manipulate via representations. <strong>2. Stateless</strong>: server stores no client state. <strong>3. Cacheable</strong>: responses indicate cacheability. <strong>4. Client-Server</strong>: separation of concerns. <strong>5. Layered System</strong>: intermediate layers are allowed. <strong>6. Code on Demand (optional)</strong>: executable code can be transmitted.`,
links:[{t:"REST API Design",u:"https://restfulapi.net/"},{t:"Microsoft REST Guidelines",u:"https://github.com/microsoft/api-guidelines/blob/vNext/azure/Guidelines.md"}],
fqs:[
{q:"Explain the idempotency characteristics of HTTP methods (GET, POST, PUT, PATCH, DELETE).",a:`<strong>Idempotent</strong>: same request multiple times yields the same result. <code>GET</code>: idempotent and safe (no side effects). <code>PUT</code>: idempotent (full replacement; same data multiple times = same outcome). <code>DELETE</code>: idempotent (re-deleting an already-deleted resource returns 404, but state is the same). <code>POST</code>: not idempotent (creates a new resource each time). <code>PATCH</code>: usually not idempotent (depends on the partial update). Critical for retry strategies on network failures.`},
{q:"Explain the trade-off between REST's Stateless principle and performance optimization.",a:`Stateless means the server holds no client state, making <strong>horizontal scaling easy</strong> (any server can handle any request). Downside: each request must include auth info (JWT, etc.), adding overhead proportional to token size. Stateful (session) keeps state on server for lightweight requests, but requires session sharing (Redis) or Sticky Sessions, complicating scaling.`}
],
trap:{wrong:`"In REST APIs, GET requests can never have a request body."`,
explain:`<strong>HTTP spec doesn't forbid a GET body</strong>, but RFC 7231 allows implementations to ignore it. Many servers (nginx, Apache) and libraries ignore or reject GET request bodies. Elasticsearch allows GET with a body, but REST API best practices recommend against it. For complex search conditions, use POST or query parameters.`}
},
{id:49,cat:"Network",q:"Explain the differences between WebSockets and HTTP polling.",
a:`<strong>HTTP Polling</strong>: client makes periodic requests — inefficient. <strong>Long Polling</strong>: server holds the connection until data is available. <strong>WebSocket</strong>: upgrades from HTTP, then maintains a full-duplex bidirectional connection. Suitable for real-time chat, games. <strong>SSE</strong>: server-to-client unidirectional.`,
links:[{t:"WebSocket vs Polling",u:"https://ably.com/blog/websockets-vs-long-polling"},{t:"MDN WebSocket",u:"https://developer.mozilla.org/en-US/docs/Web/API/WebSocket"}],
fqs:[
{q:"How do you implement automatic reconnection when a WebSocket connection drops?",a:`Use an <strong>Exponential Backoff + Jitter</strong> strategy. Increase retry intervals exponentially (1s, 2s, 4s, 8s...) and add random jitter (0–1s). Code: <code>delay = min(cap, base * 2^attempt) + random(0, 1000)</code>. Also use <strong>Heartbeat (ping/pong)</strong> to periodically check connection health. Distinguish intentional disconnects (beforeunload event) from network errors.`},
{q:"What is the difference between Socket.IO and raw WebSocket?",a:`<strong>Socket.IO</strong>: WebSocket + fallback (polling), auto-reconnect, namespaces/rooms, event-based API, broadcasting, Redis adapter for multi-server support. <strong>Raw WebSocket</strong>: standard protocol, less overhead, faster, client uses browser API directly. Socket.IO server and raw WebSocket client are incompatible. Use Socket.IO for complex real-time features; raw WebSocket for simplicity and performance.`}
],
trap:{wrong:`"WebSocket is always faster than HTTP because it doesn't open a new connection each time."`,
explain:`<strong>Depends on the scenario</strong>: WebSocket is better for continuous bidirectional communication. For simple request-response patterns, HTTP is more appropriate. WebSocket maintains a persistent connection, continuously consuming server resources. When thousands of users frequently connect and disconnect, HTTP can be more efficient. <strong>Choose based on usage patterns</strong>.`}
},
{id:50,cat:"Network",q:"Explain the differences between Cookies, Sessions, and JWT for authentication.",
a:`<strong>Cookie</strong>: stored in browser, auto-sent with every request, 4KB limit. <strong>Session</strong>: state stored on server, session ID stored in cookie. Difficult to scale horizontally. <strong>JWT</strong>: stateless, self-contained (user info in payload), signature verification. Good scalability, but difficult to revoke and payload is Base64-encoded (not encrypted).`,
links:[{t:"JWT.io",u:"https://jwt.io/"},{t:"Session vs JWT",u:"https://www.geeksforgeeks.org/session-vs-token-based-authentication/"}],
fqs:[
{q:"Why is it hard to revoke JWT tokens and what are the solutions?",a:`JWT is stateless — the server doesn't keep a list of issued tokens. Before expiry, the server can only verify, not block a token (hard to handle account compromise or logout). <strong>Solutions</strong>: ① Short expiry (15 min) + <strong>Refresh Token</strong> combo. ② <strong>Blacklist</strong> (store invalidated tokens in Redis — sacrifices statelessness). ③ <strong>Token version</strong>: store token_version field in user DB, include in JWT; reject if versions don't match.`},
{q:"Why should sensitive data not be placed in the JWT payload?",a:`JWT is <strong>Base64URL-encoded</strong>, not encrypted. The header.payload.signature structure means anyone can decode the header and payload and read them. The signature is for <strong>tamper detection</strong>, not content hiding. Never include passwords or personal information in the payload. If content must be hidden, use JWE (JSON Web Encryption).`}
],
trap:{wrong:`"Using sessions makes it impossible to scale the server horizontally (Scale Out)."`,
explain:`<strong>Sessions can scale horizontally too</strong>: ① <strong>Sticky Session (Session Affinity)</strong>: load balancer routes the same client to the same server. ② <strong>Shared session store</strong>: store sessions in Redis so all servers share state. It's not only JWT that supports scaling — sessions properly designed can scale horizontally too.`}
},
{id:51,cat:"Network",q:"What is CORS and how do you resolve it?",
a:`CORS (Cross-Origin Resource Sharing) is a mechanism that allows browsers to access resources from different origins, bypassing the Same-Origin Policy (SOP). A Preflight (OPTIONS) request verifies the server first, then the actual request is sent. <strong>Solution</strong>: set <code>Access-Control-Allow-Origin</code> header on the server, use Nginx proxy, or JSONP (legacy).`,
links:[{t:"MDN CORS",u:"https://developer.mozilla.org/ko/docs/Web/HTTP/CORS"},{t:"CORS Explained",u:"https://cors-test.codehappy.dev/"}],
fqs:[
{q:"What conditions trigger a Preflight request and how can it be optimized?",a:`<strong>Simple Request</strong> (no Preflight): GET/POST/HEAD + basic headers + application/x-www-form-urlencoded or text/plain. <strong>Preflight triggers</strong>: PUT/DELETE/PATCH, custom headers (Authorization, Content-Type: application/json), PATCH, etc. <strong>Optimization</strong>: cache Preflight results with <code>Access-Control-Max-Age</code> header (default 5s, max 7200 or 86400s). During this period, the same request skips Preflight.`},
{q:"What are the security risks of Access-Control-Allow-Origin: * and how should it be set correctly?",a:`<code>*</code> allows all origins, creating <strong>CSRF (Cross-Site Request Forgery)</strong> risk. Also, <code>*</code> cannot be combined with <code>Access-Control-Allow-Credentials: true</code> (no cookies or auth headers). <strong>Correct approach</strong>: maintain a whitelist of allowed origins, check the request's Origin header, and respond with the matching origin dynamically; include no CORS headers if the origin isn't in the whitelist.`}
],
trap:{wrong:`"CORS is a server-side security feature. If the server doesn't allow it, the request never reaches the server."`,
explain:`<strong>Why it's wrong</strong>: CORS is a <strong>browser security feature</strong>. The actual request (including Preflight) does reach the server. The server returns a response, but the <strong>browser blocks it</strong>. CORS does not apply in curl or server-to-server communication. Therefore, CORS alone cannot protect the server — server-side authentication/authorization is separately required.`}
},
{id:52,cat:"Network",q:"Explain the types of load balancing algorithms.",
a:`<strong>Round Robin</strong>: sequential. <strong>Weighted Round Robin</strong>: weighted by performance. <strong>Least Connections</strong>: route to server with fewest active connections. <strong>Least Response Time</strong>: route by response time. <strong>IP Hash</strong>: client IP-based (for session persistence). Divided into L4 (TCP/UDP-based) and L7 (HTTP header/URL-based).`,
links:[{t:"Load Balancing Algorithms",u:"https://www.nginx.com/resources/glossary/load-balancing/"},{t:"AWS ELB Guide",u:"https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/what-is-load-balancing.html"}],
fqs:[
{q:"What are the specific differences and use cases between L4 and L7 load balancers?",a:`<strong>L4 (Transport Layer)</strong>: TCP/UDP port-based, doesn't inspect packet contents, fast. Simple IP:Port routing. AWS NLB, HAProxy. <strong>L7 (Application Layer)</strong>: routes by HTTP headers, URL, cookies. Different servers per URL path (/api → API server, /images → static server), A/B testing, blue-green deployments. Also supports SSL termination, compression, caching. AWS ALB, nginx. L7 offers more features but has higher processing overhead than L4.`},
{q:"Why are health checks important in load balancers?",a:`The load balancer periodically checks server health. <strong>Active Health Check</strong>: periodically sends requests and checks responses. <strong>Passive Health Check</strong>: monitors real traffic responses. Unhealthy servers are automatically removed from the pool; re-added when recovered. Without health checks, requests keep going to downed servers and errors occur. Health check endpoints should also verify dependencies like DB connections and cache status.`}
],
trap:{wrong:`"Round Robin should only be used when all servers have the same processing capacity."`,
explain:`<strong>Round Robin is simple and widely used in practice</strong>. When servers have different specs, use Weighted Round Robin to assign weights. Modern cloud environments often run uniformly-specced servers via autoscaling, making Round Robin a natural fit. Least Connections is better when request processing times vary significantly or connection count matters.`}
},
{id:53,cat:"Network",q:"Explain how a CDN (Content Delivery Network) works and its benefits.",
a:`Caches content on globally distributed edge servers and serves it from the closest server to the user. Benefits: reduced latency, lower origin server load, reduced bandwidth costs, DDoS mitigation. Cloudflare, AWS CloudFront, and Fastly are representative CDNs.`,
links:[{t:"How CDN Works",u:"https://www.cloudflare.com/learning/cdn/what-is-a-cdn/"},{t:"AWS CloudFront",u:"https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html"}],
fqs:[
{q:"How is CDN cache invalidation done and why is it difficult?",a:`Cache invalidation is notoriously hard. <strong>Methods</strong>: ① URL versioning (<code>style.css?v=2</code>): reliable but changes the URL. ② Content hash in filename (<code>style.abc123.css</code>): same content = same URL, cache reuse. ③ Manual CDN API purge: takes immediate effect but propagation across all edges takes time. <strong>Why it's hard</strong>: "cache invalidation and naming things are the two hardest problems in CS" — a famous saying for good reason.`},
{q:"How do modern CDNs handle dynamic content?",a:`Traditionally CDNs cached static content (images, CSS, JS), but modern CDNs also handle dynamic content. ① <strong>Edge Computing</strong> (Cloudflare Workers, Lambda@Edge): run code at the edge to generate dynamic responses without origin requests. ② <strong>Dynamic Acceleration</strong>: routes requests to origin via an optimized path without caching. ③ <strong>API caching</strong>: cache API responses with Vary headers. Even for dynamic content, CDNs provide network path optimization benefits.`}
],
trap:{wrong:`"With a CDN, the origin server is no longer needed."`,
explain:`<strong>Why it's wrong</strong>: CDNs cache and distribute content from the origin server. The <strong>origin server is still required</strong>. On cache miss or expiry, the CDN fetches from the origin. Origin stability and performance remain important even with a CDN. The CDN reduces origin load — it doesn't replace it.`}
},
{id:54,cat:"Network",q:"Explain the OAuth 2.0 Authorization Code Flow.",
a:`① App redirects to Authorization Server → ② User consents → ③ Authorization Code sent to redirect_uri → ④ App server exchanges Code + client_secret for Access Token → ⑤ Access Token used to call Resource Server. Security is high when combined with PKCE.`,
links:[{t:"OAuth 2.0 Simplified",u:"https://www.oauth.com/"},{t:"Auth0 OAuth 2.0",u:"https://auth0.com/docs/get-started/authentication-and-authorization-flow/authorization-code-flow"}],
fqs:[
{q:"Explain why PKCE (Proof Key for Code Exchange) is needed.",a:`Mobile apps and SPAs cannot safely store a <code>client_secret</code> (it can be extracted from client-side code). PKCE prevents Authorization Code Injection attacks without a secret. Flow: ① generate random <code>code_verifier</code> → ② include SHA256 hash (<code>code_challenge</code>) in authorization request → ③ send original <code>code_verifier</code> in token request → ④ server verifies the hash. Even if an attacker steals the code, they can't exchange it for a token without the <code>code_verifier</code>.`},
{q:"Why is Implicit Flow no longer recommended?",a:`Implicit Flow passes the Access Token directly via URL fragment (#token=...) to SPAs without an Authorization Code step. <strong>Security issues</strong>: ① Token exposed in URL, logged in browser history and server logs. ② Token can leak via Referer header. ③ Vulnerable to token injection attacks. OAuth 2.0 Security BCP (RFC 9700) prohibits Implicit Flow and recommends Authorization Code Flow with PKCE.`}
],
trap:{wrong:`"OAuth 2.0 is an authentication protocol."`,
explain:`<strong>Why it's wrong</strong>: OAuth 2.0 is an <strong>authorization</strong> framework — it delegates "permission to access a specific resource." For authentication (verifying identity), use <strong>OpenID Connect (OIDC)</strong>. OIDC is an authentication layer built on top of OAuth 2.0 that provides user identity via ID Tokens (JWT). "Sign in with Google" uses OIDC built on OAuth 2.0, not OAuth 2.0 alone.`}
},
{id:55,cat:"Network",q:"Explain the TCP 3-way and 4-way handshakes.",
a:`<strong>3-way (connection establishment)</strong>: ① SYN → ② SYN-ACK → ③ ACK. <strong>4-way (connection termination)</strong>: ① FIN → ② ACK → ③ FIN → ④ ACK. After the final ACK, the client enters <strong>TIME_WAIT</strong> state and waits for 2MSL.`,
links:[{t:"TCP Handshake",u:"https://www.cloudflare.com/learning/ddos/glossary/tcp-ip/"}],
fqs:[
{q:"Why is the TIME_WAIT state necessary?",a:`Two reasons: ① <strong>Reliable connection termination</strong>: if the final ACK is lost, the server retransmits FIN. Waiting in TIME_WAIT allows handling this retransmitted FIN. ② <strong>Handling delayed packets</strong>: prevents stray delayed packets from being processed by a new connection. The TIME_WAIT duration (2MSL, typically 60–120 seconds) gives enough time for all packets from the old connection to disappear. Excess TIME_WAIT can exhaust ports, requiring <code>SO_REUSEADDR</code>.`},
{q:"What problems occur if a server doesn't properly close TCP connections on shutdown?",a:`Sending a <strong>TCP RST (Reset)</strong> or abruptly closing can cause: client to lose in-flight data (e.g., download interrupted). Client receives a Connection Reset error. <strong>Proper Graceful Shutdown</strong>: stop accepting new requests → wait for existing requests to complete → send FIN. This is why Kubernetes sets a sufficient <code>terminationGracePeriodSeconds</code> when terminating pods.`}
],
trap:{wrong:`"After the client sends SYN in the 3-way handshake, the server can start transmitting data."`,
explain:`<strong>Why it's wrong</strong>: Data can only be transmitted <strong>after the 3-way handshake is fully complete</strong> (after the final ACK). However, TLS 1.3 shortens this to 1-RTT, and QUIC (HTTP/3) supports 0-RTT reconnection. TCP Fast Open embeds data in the SYN packet as an optimization, but is disabled by default due to security concerns.`}
},
{id:56,cat:"Network",q:"Explain the principles and defenses for SQL Injection and XSS attacks.",
a:`<strong>SQL Injection</strong>: inject SQL syntax into user input. Defense: Prepared Statements, ORM. <strong>XSS (Cross-Site Scripting)</strong>: inject malicious scripts. Defense: input validation/escaping, CSP headers, HttpOnly cookies. OWASP Top 10 essential knowledge.`,
links:[{t:"OWASP Top 10",u:"https://owasp.org/www-project-top-ten/"},{t:"SQL Injection Prevention",u:"https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html"}],
fqs:[
{q:"Explain how Prepared Statements defend against SQL Injection.",a:`Prepared Statements <strong>separate SQL structure from data</strong>. <code>SELECT * FROM users WHERE name = ?</code> compiles the SQL first, then binds parameters. Bound values are <strong>never interpreted as SQL code</strong>. Even if input is <code>'; DROP TABLE users; --</code>, it's treated as string data only. ORMs often use Prepared Statements internally, but raw queries require explicit application.`},
{q:"Explain the differences between Stored XSS, Reflected XSS, and DOM-based XSS.",a:`<strong>Stored XSS</strong>: malicious script stored in DB, executes every time another user views the page. Comments, posts. Most dangerous. <strong>Reflected XSS</strong>: malicious URL parameter reflected directly in the server response. Only affects users who click the URL. <strong>DOM-based XSS</strong>: occurs client-side without going through the server, when JS directly manipulates the DOM — e.g., <code>document.write(location.hash)</code>. Defense: CSP, use innerText instead of innerHTML.`}
],
trap:{wrong:`"Escaping alone can completely defend against SQL Injection."`,
explain:`<strong>Insufficient</strong>: escaping reduces vulnerabilities but is not complete. Multi-byte character encoding vulnerabilities, bugs in the escaping function, or developers forgetting to escape all leave room for bypass. <strong>Prepared Statements + least privilege principle</strong> is a safer combination. Escaping is a supplementary measure, not the primary defense.`}
},
{id:57,cat:"OS",q:"Explain the differences between a Process and a Thread.",
a:`<strong>Process</strong>: the OS resource allocation unit; has independent memory space (code/data/heap/stack). <strong>Thread</strong>: an execution unit within a process; shares code/data/heap but has its own stack. Context switching between threads is cheaper. Shared memory among threads requires careful synchronization.`,
links:[{t:"Process vs Thread",u:"https://www.geeksforgeeks.org/difference-between-process-and-thread/"}],
fqs:[
{q:"What are the criteria for choosing between multiprocessing and multithreading?",a:`<strong>Multiprocessing</strong>: when isolation is needed, uses IPC, more memory. Example: browser tabs as separate processes. <strong>Multithreading</strong>: fast shared-memory communication, complex synchronization, good for CPU-intensive parallel tasks. Python's GIL prevents multithreading from using multiple CPU cores for computation → use multiprocessing instead.`},
{q:"Why are coroutines more efficient than threads?",a:`Threads are OS-managed, consume 1MB–8MB of stack, and have high creation/switching costs. <strong>Coroutines</strong>: user-space scheduling, stack is just a few KB, switching cost is on the order of a function call. Go's goroutines can run hundreds of thousands concurrently.`}
],
trap:{wrong:`"Multithreading always speeds things up by a factor equal to the number of cores."`,
explain:`<strong>Why it's wrong</strong>: Amdahl's Law: the serial portion of code limits the maximum parallel speedup. There are also synchronization overhead and cache coherence contention.`}
},
{id:58,cat:"OS",q:"Explain the types and characteristics of CPU scheduling algorithms.",
a:`<strong>FCFS</strong>: first come first served, Convoy Effect. <strong>SJF</strong>: shortest job first, optimal average wait. <strong>Round Robin</strong>: time quantum, fair. <strong>Priority</strong>: priority-based, starvation problem. <strong>MLFQ</strong>: multiple queues + feedback, used by most modern OSes.`,
links:[{t:"CPU Scheduling",u:"https://www.geeksforgeeks.org/cpu-scheduling-in-operating-systems/"}],
fqs:[
{q:"What happens when the time quantum in Round Robin is too small or too large?",a:`<strong>Too small</strong>: context switching overhead spikes dramatically. <strong>Too large</strong>: degrades to FCFS and response time suffers. Linux's modern CFS dynamically adjusts based on workload.`},
{q:"Why isn't SJF used in real operating systems?",a:`The execution time of the next job cannot be known in advance. Real OSes approximate it with prediction based on past execution times (Exponential Averaging) or MLFQ.`}
],
trap:{wrong:`"SJF is widely used in real operating systems."`,
explain:`<strong>Why it's wrong</strong>: Knowing the next job's execution time in advance is impossible, so a perfect implementation is infeasible. It serves as a theoretical benchmark.`}
},
{id:59,cat:"OS",q:"Explain the differences between Mutex and Semaphore.",
a:`<strong>Mutex</strong>: binary lock (0/1), has ownership (only the locking thread can unlock). <strong>Semaphore</strong>: counter (N), allows N simultaneous accesses, no ownership. Semaphores are suited for the producer-consumer pattern.`,
links:[{t:"Mutex vs Semaphore",u:"https://www.geeksforgeeks.org/mutex-vs-semaphore/"}],
fqs:[
{q:"What are the 4 conditions for deadlock and how can each be prevented?",a:`① Mutual exclusion: make resources shareable. ② Hold and wait: request all resources at once. ③ No preemption: release and re-request resources. ④ Circular wait: always acquire locks in the same order. In practice, preventing circular wait + timeouts is the most common approach.`},
{q:"When is a spinlock better than a regular mutex?",a:`When lock hold time is very short, avoiding context switch cost. Advantageous in multi-core environments. Wastes CPU on single-core or with long lock times.`}
],
trap:{wrong:`"Semaphore can do everything a mutex can, so semaphore is always better."`,
explain:`<strong>Semantically different</strong>: mutex has ownership for priority inversion prevention and supports recursive locking. Semaphores are better suited for signaling patterns. Choose based on use case.`}
},
{id:60,cat:"OS",q:"Explain Virtual Memory and Paging.",
a:`<strong>Virtual Memory</strong>: provides an address space larger than physical memory. Only the actively used portion is loaded into physical memory. <strong>Paging</strong>: divides virtual addresses into fixed-size pages, maps to physical addresses via a page table. <strong>TLB</strong> caches the page table.`,
links:[{t:"Virtual Memory",u:"https://pages.cs.wisc.edu/~remzi/OSTEP/vm-intro.pdf"}],
fqs:[
{q:"What is the page fault handling process?",a:`① Access virtual address → ② Present bit = 0 → ③ OS exception raised → ④ Load page from disk into physical memory → ⑤ Update page table → ⑥ Restart instruction. Major Fault (disk read) is slow; too many can cause Thrashing.`},
{q:"How much does performance degrade without a TLB?",a:`x86-64's 4-level page tables require 4 extra memory accesses per 1 memory access. With 99% TLB hit rate, average is 1.01×; without TLB, it would be 5× slower.`}
],
trap:{wrong:`"The primary purpose of virtual memory is to run programs larger than physical memory."`,
explain:`<strong>Why it's wrong</strong>: The primary purpose is to give each process a contiguous, large address space and provide memory isolation between processes. Using swap degrades performance severely.`}
},
{id:61,cat:"OS",q:"What is a System Call and why is it needed?",
a:`The interface through which user programs request OS kernel functions. CPU distinguishes User Mode and Kernel Mode to strengthen security. File I/O (<code>read/write</code>), process creation (<code>fork/exec</code>), memory allocation (<code>mmap</code>). A system call triggers a software interrupt and switches to kernel mode.`,
links:[{t:"Linux System Calls",u:"https://man7.org/linux/man-pages/man2/syscalls.2.html"}],
fqs:[
{q:"Why are User/Kernel Mode separated and what is the switching cost?",a:`Prevents user programs from directly accessing hardware or reading other processes' memory. Switching cost is hundreds of nanoseconds to a few microseconds. io_uring provides kernel bypass optimization.`},
{q:"How does vDSO reduce system call overhead?",a:`Read-only system calls like <code>gettimeofday()</code> execute without switching to kernel mode. The kernel maps a virtual library into user space, allowing direct access to read-only kernel memory. Reduces cost by 1/10.`}
],
trap:{wrong:`"Making many system calls always degrades performance."`,
explain:`<strong>Context-dependent</strong>: reading one byte at a time involves many system calls, but buffering can reduce them. The balance between system call count and data size is what matters.`}
},
{id:62,cat:"OS",q:"Compare page replacement algorithms: LRU, LFU, and FIFO.",
a:`<strong>FIFO</strong>: replaces the oldest-loaded page. Can exhibit Belady's Anomaly. <strong>LRU</strong>: replaces the least recently used page. <strong>LFU</strong>: replaces the least frequently referenced page. <strong>Optimal (OPT)</strong>: based on future references — a theoretical benchmark.`,
links:[{t:"Page Replacement",u:"https://www.geeksforgeeks.org/page-replacement-algorithms-in-operating-systems/"}],
fqs:[
{q:"Why does Belady's Anomaly occur in FIFO?",a:`Increasing frames can change FIFO's eviction pattern, removing frequently used pages. LRU has the Stack Property, so it never exhibits Belady's Anomaly.`},
{q:"How does Linux approximate LRU in practice?",a:`Each page has an Access bit and the Clock Algorithm cycles through them. Evict pages with Access bit = 0; reset bit to 0 and pass pages with bit = 1. Not pure LRU, but practically sufficient.`}
],
trap:{wrong:`"LRU always delivers performance close to the Optimal algorithm."`,
explain:`<strong>Cyclic access patterns are worst case</strong>: with 5 frames and 6 pages accessed in cycle, LRU always evicts the page needed next.`}
},
{id:63,cat:"OS",q:"What is Context Switching and what costs does it incur?",
a:`The CPU stops the current process/thread and switches to another. <strong>Costs</strong>: saving/restoring PCB, saving/restoring CPU registers, TLB flush (on process switch), cache invalidation. Thread switch < Process switch < Coroutine switch.`,
links:[{t:"Context Switching",u:"https://www.geeksforgeeks.org/context-switch-in-operating-system/"}],
fqs:[
{q:"How can context switching be minimized?",a:`① Thread pools: reuse threads. ② Async I/O + event loop: Node.js approach. ③ Coroutines: user-space scheduling. ④ CPU pinning: bind threads to specific cores to reuse cache.`},
{q:"What information is stored in a PCB (Process Control Block)?",a:`PID, process state, program counter, CPU registers, memory management info (page table address), I/O state, accounting info. Saved and restored during context switches.`}
],
trap:{wrong:`"Minimizing context switches always improves performance."`,
explain:`<strong>Not always</strong>: reducing threads in I/O-bound programs leaves the CPU idle while waiting. An appropriate number of threads and context switches maximizes CPU utilization.`}
},
{id:64,cat:"OS",q:"Explain the types of interrupts and the handling process.",
a:`<strong>Hardware Interrupts</strong>: from external devices like keyboard, network card. <strong>Software Interrupts (Traps)</strong>: system calls, overflow, division by zero. Handling: ① suspend execution → ② save registers → ③ run ISR → ④ restore → ⑤ resume.`,
links:[{t:"Interrupts",u:"https://www.geeksforgeeks.org/interrupts/"}],
fqs:[
{q:"What is the difference between interrupts and polling?",a:`<strong>Polling</strong>: CPU periodically checks device status, wastes CPU, advantageous for ultra-fast I/O (DPDK). <strong>Interrupt</strong>: device notifies CPU when an event occurs, efficient, better for infrequent events.`},
{q:"Why must interrupt handlers (ISR) be short?",a:`Interrupts of equal or lower priority are blocked while the ISR runs. Linux uses Top Half / Bottom Half separation: Top Half does minimal work; Bottom Half (softirq, workqueue) handles the rest.`}
],
trap:{wrong:`"Interrupts are always triggered only by external hardware."`,
explain:`<strong>Why it's wrong</strong>: Software interrupts (exceptions, traps) also exist. Division by zero, page faults, and system calls (int 0x80) are software interrupts.`}
},
{id:65,cat:"OS",q:"Explain the differences between synchronous/asynchronous and blocking/non-blocking.",
a:`<strong>Sync/Async</strong>: whether the next operation waits for the current result. <strong>Blocking/Non-blocking</strong>: whether the called function immediately returns control. <strong>Async + Non-blocking</strong> (most efficient): the Node.js event loop model.`,
links:[{t:"Async vs Blocking",u:"https://www.baeldung.com/cs/async-vs-multi-threading"}],
fqs:[
{q:"Give real examples of async + non-blocking.",a:`Node.js, Python asyncio, io_uring. Issue an I/O request and immediately do other work. When I/O completes, receive a callback/event notification. Sync + non-blocking is O_NONBLOCK flag; async + blocking is select/poll.`},
{q:"How does Node.js handle high concurrency with a single thread?",a:`Event loop + libuv library. I/O is delegated to a thread pool/OS async API (epoll). While waiting for I/O, the event loop handles other requests. However, CPU-intensive work requires Worker Threads.`}
],
trap:{wrong:`"Async programming is the same concept as multithreading."`,
explain:`<strong>Different concepts</strong>: async handles completion via callbacks/events and works on a single thread. Multithreading aims to leverage CPU cores in parallel.`}
},
{id:66,cat:"OS",q:"Explain the major Garbage Collection algorithms.",
a:`<strong>Reference Counting</strong>: immediate deallocation, cannot handle circular references. <strong>Mark and Sweep</strong>: mark reachable objects from roots, then free the rest; causes STW. <strong>Generational GC</strong>: separates young/old generations. Used by JVM and V8. Based on the Weak Generational Hypothesis.`,
links:[{t:"JVM GC",u:"https://www.oracle.com/webfolder/technetwork/tutorials/obe/java/gc01/index.html"}],
fqs:[
{q:"Why does STW (Stop The World) occur and how is it minimized?",a:`All threads are paused during GC to prevent concurrent heap modification. Minimized by: incremental GC, Concurrent GC, parallel GC. Java G1GC, ZGC, and Shenandoah minimize STW.`},
{q:"Why can memory leaks still occur in GC-managed languages?",a:`GC only collects unreachable objects. Continuously adding to static collections, not removing event listeners, and closures holding references to outer variables all prevent GC from collecting them. Use WeakReference/WeakMap to prevent leaks.`}
],
trap:{wrong:`"Languages with GC never have memory leaks."`,
explain:`<strong>Why it's wrong</strong>: Unintentionally keeping references alive prevents GC from collecting objects. Unremoved event listeners and uncleaned caches are common leak causes.`}
},
{id:67,cat:"OOP/Patterns",q:"Explain the 4 core principles of Object-Oriented Programming.",
a:`<strong>Encapsulation</strong>: bundle data and behavior, restrict external access. <strong>Inheritance</strong>: child class reuses parent attributes/methods. <strong>Polymorphism</strong>: same interface, different behavior (overriding, overloading). <strong>Abstraction</strong>: hide unnecessary details (interfaces, abstract classes).`,
links:[{t:"OOP Concepts",u:"https://www.geeksforgeeks.org/object-oriented-programming-oops-concept-in-java/"}],
fqs:[
{q:"What is the difference between compile-time and runtime polymorphism?",a:`<strong>Compile-time</strong>: overloading; the compiler determines which method to call (Early Binding). <strong>Runtime</strong>: overriding; the actual object's method is called at runtime (Late Binding, Dynamic Dispatch). In <code>Animal a = new Dog(); a.speak();</code>, Dog's speak() is called.`},
{q:"Are encapsulation and information hiding the same concept?",a:`Related but different. Encapsulation is bundling data and methods together (structural). Information hiding is intentionally concealing implementation details. Making all fields public means you have encapsulation but not information hiding.`}
],
trap:{wrong:`"Inheritance always improves code reusability."`,
explain:`<strong>Not always</strong>: improper inheritance increases coupling and causes the fragile base class problem. The principle "prefer composition over inheritance" exists for this reason.`}
},
{id:68,cat:"OOP/Patterns",q:"Explain the 5 SOLID principles.",
a:`<strong>S (SRP)</strong>: Single Responsibility. <strong>O (OCP)</strong>: Open-Closed. <strong>L (LSP)</strong>: Liskov Substitution. <strong>I (ISP)</strong>: Interface Segregation. <strong>D (DIP)</strong>: Dependency Inversion.`,
links:[{t:"SOLID Principles",u:"https://refactoring.guru/solid"}],
fqs:[
{q:"Give a concrete example of an LSP violation.",a:`Rectangle subclassed by Square: setWidth and setHeight should be independent, but in Square, changing one changes both. Replacing the parent type with the child breaks tests. Multiple instanceof checks throughout code are a signal of LSP violation.`},
{q:"What is the connection between OCP implementation and the Strategy Pattern?",a:`OCP means open for extension, closed for modification. Implement with Strategy Pattern: extract algorithms into interfaces, add new behavior by adding new strategy classes. Extend behavior without modifying existing code.`}
],
trap:{wrong:`"Applying all SOLID principles perfectly always produces better software."`,
explain:`<strong>Over-application is harmful</strong>: applying all SOLID to a small project adds unnecessary complexity. SOLID is most valuable when changes are frequent and teams are large.`}
},
{id:69,cat:"OOP/Patterns",q:"Explain the design pattern categories (creational, structural, behavioral) and representative patterns.",
a:`<strong>Creational</strong>: Singleton, Factory, Builder, Prototype. <strong>Structural</strong>: Adapter, Decorator, Facade, Proxy. <strong>Behavioral</strong>: Strategy, Observer, Command, Iterator, Template Method. The GoF's 23 patterns are foundational.`,
links:[{t:"Refactoring Guru",u:"https://refactoring.guru/design-patterns"}],
fqs:[
{q:"What is the difference between the Facade and Proxy patterns?",a:`<strong>Facade</strong>: provides a simplified interface to a complex subsystem. <strong>Proxy</strong>: a surrogate for the original object that adds access control, lazy loading, or caching. The proxy's interface must match the original.`},
{q:"Why can learning design patterns be risky?",a:`Pattern Fever: the urge to solve every problem with a pattern. Over-applying, like converting a simple if-statement to a Strategy Pattern. Patterns are solutions to recurring design problems, not rules to always apply.`}
],
trap:{wrong:`"Design patterns are language-agnostic so they're implemented identically in every language."`,
explain:`<strong>Implementations differ by language</strong>: Python functions are first-class objects, so Strategy can simply be a function. Kotlin's object keyword supports Singleton at the language level. Prefer language idioms first.`}
},
{id:70,cat:"OOP/Patterns",q:"Explain the Singleton pattern, how to implement it, and its problems.",
a:`Only one instance of the class. Private constructor, static instance, public static getInstance(). Enum Singleton recommended for thread safety. <strong>Problems</strong>: global state, difficulty testing, hidden dependencies.`,
links:[{t:"Singleton Pattern",u:"https://refactoring.guru/design-patterns/singleton"}],
fqs:[
{q:"Why is Enum Singleton the safest approach?",a:`Serialization-safe (deserialization cannot create a new instance), Reflection-safe (JVM prevents it), thread-safe (guaranteed by class loading). A complete singleton in 4 lines.`},
{q:"Why use DI instead of Singleton?",a:`Singletons make it hard to inject Mock objects in tests. A DI container (Spring) manages singleton-scoped beans while relying on interfaces, making implementation swapping and testing easy.`}
],
trap:{wrong:`"Using the Singleton pattern always guarantees the same instance in a multithreaded environment."`,
explain:`<strong>Depends on the implementation</strong>: simple lazy initialization can create multiple instances in multithreaded environments. Enum-based or static inner class holder approaches are safe.`}
},
{id:71,cat:"OOP/Patterns",q:"Explain the difference between Factory Method and Abstract Factory patterns.",
a:`<strong>Factory Method</strong>: delegates object creation to a subclass, one product type. <strong>Abstract Factory</strong>: an interface for creating a family of related objects; multiple product types created consistently. Example: a UI kit (Windows/Mac style).`,
links:[{t:"Factory Patterns",u:"https://refactoring.guru/design-patterns/abstract-factory"}],
fqs:[
{q:"How does a Factory Method differ from direct use of the new keyword?",a:`<code>new ConcreteProduct()</code> directly depends on the concrete class. Factory Method separates creation logic, complying with OCP, enabling Mock factories in tests, and allowing validation in the creation process.`},
{q:"When is the Builder pattern needed?",a:`When a constructor has many parameters, some of which are optional. Effective Java Builder: <code>Person.Builder("John").age(30).email("...").build()</code>. Creates immutable objects, improves readability, distinguishes required from optional parameters. Lombok's @Builder generates it automatically.`}
],
trap:{wrong:`"Abstract Factory is always better than Factory Method."`,
explain:`<strong>Why it's wrong</strong>: when you only need to create one type of object, Factory Method is simpler and more appropriate. Choose the pattern that fits the problem at hand.`}
},
{id:72,cat:"OOP/Patterns",q:"Explain the Observer pattern and give real usage examples.",
a:`Subject (publisher) and Observer (subscriber). When Subject state changes, all Observers are automatically notified. Loose coupling. Examples: event listeners, MVC (View observes Model), RxJS, notification systems. Always handle Observer deregistration to prevent memory leaks.`,
links:[{t:"Observer Pattern",u:"https://refactoring.guru/design-patterns/observer"}],
fqs:[
{q:"How do you prevent memory leaks in the Observer pattern?",a:`Subject holds strong references to Observers. Prevention: ① call unsubscribe() when the component is destroyed. ② Use WeakReference for Observers. ③ RxJS's takeUntil(destroy$). React's useEffect cleanup function handles this.`},
{q:"What is the difference between the Observer pattern and Pub/Sub pattern?",a:`<strong>Observer</strong>: Subject and Observer know each other directly. <strong>Pub/Sub</strong>: a broker/event channel sits in between — publisher and subscriber don't know each other. Looser coupling. Kafka and RabbitMQ are Pub/Sub.`}
],
trap:{wrong:`"The Observer pattern and Pub/Sub pattern are exactly the same."`,
explain:`<strong>Similar but different</strong>: Observer has a direct relationship; Pub/Sub uses a message broker to decouple them. Structure and coupling degree differ.`}
},
{id:73,cat:"OOP/Patterns",q:"What is Dependency Injection and why is it used?",
a:`A technique where a class receives its dependencies from outside rather than creating them itself. Constructor/setter/interface injection. <strong>Benefits</strong>: loose coupling, testability (inject Mocks), code reusability. Spring, Angular, and NestJS have built-in DI containers.`,
links:[{t:"Dependency Injection",u:"https://www.freecodecamp.org/news/a-quick-intro-to-dependency-injection-what-it-is-and-when-to-use-it-7578c84fa88f/"}],
fqs:[
{q:"Why is constructor injection preferred over field injection?",a:`① Enables immutability with final fields. ② Required dependencies are explicitly expressed (prevents null). ③ Circular dependencies are detected at startup. ④ Can inject directly without a DI container (easier to test). Spring's official docs also recommend constructor injection.`},
{q:"Give an example of code that is difficult to test without DI.",a:`<code>class OrderService { private DB db = new MySQL(); }</code>: cannot test without MySQL. With DI: <code>new OrderService(new MockDB())</code> injects a Mock. Testable code = good design.`}
],
trap:{wrong:`"DI cannot be implemented without a framework like Spring."`,
explain:`<strong>Why it's wrong</strong>: passing dependencies via a constructor is manual DI. Frameworks merely automate management at scale.`}
},
{id:74,cat:"OOP/Patterns",q:"Explain the difference between the Strategy Pattern and the State Pattern.",
a:`<strong>Strategy Pattern</strong>: defines a family of algorithms and swaps them at runtime. Client chooses the strategy. <strong>State Pattern</strong>: object behavior changes based on internal state. State transition logic lives inside state objects. Structurally similar but different in intent.`,
links:[{t:"Strategy vs State",u:"https://refactoring.guru/design-patterns/strategy"}],
fqs:[
{q:"Show an example of removing if-else chains with the Strategy Pattern.",a:`Map&lt;String, PaymentStrategy&gt; maps type to strategy. <code>strategies.get(type).pay(amount)</code>. Adding a new payment method only requires adding a new strategy class without modifying existing code (OCP compliance).`},
{q:"What is the guideline for deciding whether Context or State manages transitions?",a:`If there are many complex states and transition rules, State objects manage them — Context stays simple and only the relevant State class needs modification. If there are few states, having Context manage them is easier to follow.`}
],
trap:{wrong:`"Strategy and State patterns have the same structure, so either can be used."`,
explain:`<strong>Intent differs</strong>: Strategy is chosen by the client; State depends on Context's internal state. Use the contextually correct pattern so teammates can clearly understand the intent when reading the code.`}
},
{id:75,cat:"OOP/Patterns",q:"Explain the core concepts of Functional Programming (FP) and how it differs from OOP.",
a:`<strong>Pure functions</strong> (same input → same output, no side effects), <strong>immutability</strong>, <strong>first-class functions</strong>, <strong>higher-order functions</strong> (map/filter/reduce), <strong>referential transparency</strong>. OOP models state+methods as objects; FP models data transformation via function composition.`,
links:[{t:"FP Concepts",u:"https://www.geeksforgeeks.org/functional-programming-paradigm/"}],
fqs:[
{q:"How do you update data while maintaining immutability?",a:`Create new data instead of mutating. JS: <code>{...oldObj, field: newValue}</code>, <code>[...arr, newItem]</code>. For deep nesting, use the Immer library. Benefits: no side effects, concurrency-safe, easy undo.`},
{q:"What are the benefits of pure functions and when are side effects necessary?",a:`<strong>Pure functions</strong>: easy to test, memoizable, safe for parallel execution. <strong>Side effects required</strong>: DB saves, network calls, file I/O. FP strategy: push side effects to the boundaries (edges) of the program.`}
],
trap:{wrong:`"Functional Programming is always a better paradigm than OOP."`,
explain:`<strong>Each excels at different problems</strong>: FP is strong for data transformations and mathematical computation; OOP excels at complex state management and domain modeling. Modern languages are multi-paradigm and use both.`}
},
{id:76,cat:"OOP/Patterns",q:"Explain the differences between interfaces and abstract classes and when to use each.",
a:`<strong>Abstract Class</strong>: can have shared implementation, single inheritance, IS-A relationship, can have state (fields). <strong>Interface</strong>: pure contract (Java 8+ allows default methods), multiple implementations, CAN-DO relationship. Use abstract class for "is a" relationships; interface for "can do" relationships.`,
links:[{t:"Interface vs Abstract",u:"https://www.geeksforgeeks.org/difference-between-abstract-class-and-interface-in-java/"}],
fqs:[
{q:"Why were default methods added to interfaces in Java 8?",a:`Adding a new method to an existing interface would break all implementing classes with a compile error. Default methods allow extending an interface while maintaining backward compatibility. Introduced to add forEach and stream() to the Collection framework.`},
{q:"What are sealed classes in Java used for?",a:`Java 17's sealed class/interface restricts which classes can inherit it. <code>sealed interface Shape permits Circle, Rectangle {}</code>. The compiler checks all cases are covered in switch expressions. Similar to Kotlin's sealed class.`}
],
trap:{wrong:`"Java interfaces cannot have state."`,
explain:`<strong>Partially wrong</strong>: fields declared in an interface are automatically public static final (constants). Instance state is not allowed, but constants are.`}
},
{id:77,cat:"OOP/Patterns",q:"Explain the differences between MVC, MVP, and MVVM architectural patterns.",
a:`<strong>MVC</strong>: Controller updates Model, View observes Model directly. Better for server-side. <strong>MVP</strong>: Presenter mediates between View and Model — more testable. <strong>MVVM</strong>: ViewModel manages View state, synchronized via data binding. Suited for Angular and SwiftUI.`,
links:[{t:"MVC vs MVP vs MVVM",u:"https://www.geeksforgeeks.org/difference-between-mvc-mvp-and-mvvm-architecture-pattern-in-android/"}],
fqs:[
{q:"Why is MVVM preferred over MVC in iOS development?",a:`Traditional MVC leads to the Massive View Controller problem — UIViewController handles all logic and grows to thousands of lines. In MVVM, the ViewModel doesn't need to know UIKit, making unit testing straightforward.`},
{q:"How is data binding implemented in MVVM?",a:`View observes ViewModel properties. ① RxSwift Observable + subscribe. ② Kotlin StateFlow/LiveData. ③ SwiftUI's @Published/@ObservedObject. ④ Angular's [(ngModel)] two-way binding.`}
],
trap:{wrong:`"In MVC, the Controller mediates all communication between View and Model."`,
explain:`<strong>Wrong for original MVC</strong>: in the original MVC, the View observes the Model directly. The Controller handles user input. Modern server-side MVC has diverged from this.`}
},
{id:78,cat:"OOP/Patterns",q:"What is the Decorator pattern and how does it differ from inheritance?",
a:`Dynamically adds new responsibilities to an object. Wraps the original in a wrapper object implementing the same interface. <strong>Difference from inheritance</strong>: inheritance is fixed at compile time; decorators can be composed at runtime. Java's BufferedReader and Python's @decorator are classic examples.`,
links:[{t:"Decorator Pattern",u:"https://refactoring.guru/design-patterns/decorator"}],
fqs:[
{q:"How does Python's @decorator syntax work internally?",a:`@log_time before def my_func() is equivalent to <code>my_func = log_time(my_func)</code>. log_time accepts a function and returns a new one. Adds logging, caching, authentication without modifying the original. Use functools.wraps to preserve original metadata.`},
{q:"Why is the Decorator pattern used in Java I/O?",a:`<code>new BufferedReader(new InputStreamReader(new FileInputStream(...)))</code> layers wrappers. Using inheritance for all combinations causes class explosion. Decorators handle n combinations with n classes.`}
],
trap:{wrong:`"The Decorator pattern and Proxy pattern are the same."`,
explain:`<strong>Intent differs</strong>: Decorator aims to add/extend functionality. Proxy aims at access control and lazy loading. The client may not even know it's using a Proxy.`}
},
{id:79,cat:"OOP/Patterns",q:"Explain Event Sourcing and CQRS patterns.",
a:`<strong>Event Sourcing</strong>: stores a sequence of state-change events instead of current state. Complete history, audit log, time-travel debugging. <strong>CQRS</strong>: separate Read (Query) and Write (Command) models. Each can use an optimized store. Especially useful in microservices.`,
links:[{t:"Event Sourcing",u:"https://microservices.io/patterns/data/event-sourcing.html"}],
fqs:[
{q:"What are the downsides of Event Sourcing and when should it not be used?",a:`<strong>Downsides</strong>: replaying events to get current state is slow; schema changes are hard; implementation is complex. <strong>Don't use it</strong>: for simple CRUD or when history tracking is unnecessary. Best suited for domains where history is critical, like financial transactions.`},
{q:"How are read/write models synchronized in CQRS?",a:`Eventually Consistent: write → publish event → event handler updates read model. Async processing via message queue (Kafka). CDC can automate synchronization.`}
],
trap:{wrong:`"Applying CQRS eliminates data consistency problems."`,
explain:`<strong>Actually the opposite</strong>: CQRS trades Strong Consistency for Eventual Consistency. The read model may always be slightly behind.`}
},
{id:80,cat:"Web/Frontend",q:"Explain the browser rendering process step by step.",
a:`① HTML parsing → DOM tree ② CSS parsing → CSSOM tree ③ Render Tree construction ④ Layout (Reflow): compute positions/sizes ⑤ Paint: fill pixels ⑥ Composite: combine layers. CSS transform/opacity only trigger Composite, which is why they're performant.`,
links:[{t:"Critical Rendering Path",u:"https://web.dev/articles/critical-rendering-path"}],
fqs:[
{q:"How do you minimize Reflow and Repaint?",a:`<strong>Reduce Reflow</strong>: batch style changes, use DocumentFragment, avoid layout thrashing (separate reads from writes), use transform/opacity. <strong>Reduce Repaint</strong>: use will-change: transform to promote to its own layer.`},
{q:"Why does rendering block when JavaScript is encountered?",a:`JS can modify the DOM, so the parser pauses HTML parsing and executes JS. <strong>Solutions</strong>: async (async download, execute immediately) or defer (execute in order after parsing is complete).`}
],
trap:{wrong:`"CSS has nothing to do with render blocking."`,
explain:`<strong>Why it's wrong</strong>: CSS is a Render Blocking Resource. The first paint is delayed until the CSSOM is complete.`}
},
{id:81,cat:"Web/Frontend",q:"What is the Virtual DOM and how does it work in React?",
a:`A lightweight JavaScript copy of the real DOM. When state changes, a new Virtual DOM is created, diffed against the previous one, and only the changed parts are applied to the real DOM (Reconciliation). React 18's Fiber allows rendering to be paused and resumed.`,
links:[{t:"React Reconciliation",u:"https://legacy.reactjs.org/docs/reconciliation.html"}],
fqs:[
{q:"Why is the key prop important in React?",a:`React uses key to identify which items in a list have changed. Without key (or using index as key): inserting in the middle re-renders all subsequent items. With unique id as key: only the changed item re-renders.`},
{q:"How do React 18's Concurrent Features improve UX?",a:`Previously, once rendering started it couldn't be interrupted until complete. Concurrent Rendering splits rendering into interruptible small units. startTransition marks low-priority updates.`}
],
trap:{wrong:`"Using Virtual DOM is always faster than direct DOM manipulation."`,
explain:`<strong>Why it's wrong</strong>: Virtual DOM is an abstraction for developer convenience and predictability. It has diffing algorithm overhead. Svelte uses compile-time optimization without Virtual DOM.`}
},
{id:82,cat:"Web/Frontend",q:"Explain web performance optimization techniques.",
a:`<strong>Loading</strong>: code splitting, lazy loading, image optimization (WebP), CDN, HTTP/2. <strong>Rendering</strong>: inline critical CSS, JS async/defer. <strong>Runtime</strong>: debouncing/throttling, virtual scroll, Web Workers. <strong>Measurement</strong>: Core Web Vitals (LCP, INP, CLS).`,
links:[{t:"Web.dev Performance",u:"https://web.dev/explore/fast"}],
fqs:[
{q:"Explain the three Core Web Vitals metrics.",a:`<strong>LCP</strong>: Largest Contentful Paint, should be under 2.5 seconds. <strong>INP</strong>: Interaction to Next Paint, responsiveness under 200ms. <strong>CLS</strong>: Cumulative Layout Shift, visual stability under 0.1. Reserve space for images/ads upfront; shorten JS execution time.`},
{q:"How does virtual scrolling work?",a:`Only render items visible in the viewport (10–30 items) in the DOM. Dynamically swap items as the scroll position changes. Top/bottom padding maintains correct scrollbar behavior. React-Window and TanStack Virtual are popular implementations.`}
],
trap:{wrong:`"Page load optimization is entirely about reducing JavaScript file size."`,
explain:`<strong>Images are usually more important</strong>: images typically account for 60–70% of page weight. Server response time, font loading, and CSS also matter. Measure first, optimize second.`}
},
{id:83,cat:"Web/Frontend",q:"Explain event bubbling, capturing, and event delegation.",
a:`<strong>Capturing</strong>: event travels from document down to target. <strong>Bubbling</strong>: event travels from target up to document. <strong>Event Delegation</strong>: register one handler on a parent and use event.target to identify the actual source element. Effective for dynamically created elements and memory-efficient.`,
links:[{t:"Event Delegation",u:"https://javascript.info/event-delegation"}],
fqs:[
{q:"What is the difference between stopPropagation() and preventDefault()?",a:`<strong>stopPropagation()</strong>: stops event bubbling/capturing; the action still happens. <strong>preventDefault()</strong>: cancels the browser's default action (anchor navigation, form submission, etc.); event propagation continues.`},
{q:"Why is event delegation memory-efficient?",a:`Adding a handler to each of 1000 items = 1000 function references. Event delegation: only one handler on the parent. No need to register/deregister handlers when items are dynamically added or removed.`}
],
trap:{wrong:`"Event delegation is always better in every situation."`,
explain:`<strong>Exceptions exist</strong>: focus/blur don't bubble (focusin/focusout do). mouseenter/mouseleave don't bubble either. Calling stopPropagation() in a child prevents delegation from working.`}
},
{id:84,cat:"Web/Frontend",q:"Explain the JavaScript Event Loop.",
a:`JS is single-threaded; async processing is handled by the event loop. Synchronous code runs on the Call Stack; when async operations complete, callbacks are added to the Task Queue. When the Call Stack is empty, items from the Queue are picked up. <strong>Microtask Queue</strong> (Promises) runs before the Task Queue.`,
links:[{t:"JavaScript Event Loop",u:"https://javascript.info/event-loop"},{t:"Loupe Visualizer",u:"http://latentflip.com/loupe/"}],
fqs:[
{q:"What is the output order of: console.log(1); setTimeout(()=>console.log(2),0); Promise.resolve().then(()=>console.log(3)); console.log(4);",a:`<strong>1, 4, 3, 2</strong>. 1 and 4 are synchronous. setTimeout goes to Task Queue. Promise.then goes to Microtask Queue. Microtasks run before Tasks: 3 prints before 2.`},
{q:"How does async/await work internally?",a:`An async function always returns a Promise. await pauses function execution until the Promise resolves, returning control to the event loop. Internally transformed to Promise .then() chains.`}
],
trap:{wrong:`"setTimeout(fn, 0) executes immediately."`,
explain:`<strong>Why it's wrong</strong>: It's added to the Task Queue and runs only after both the Call Stack and Microtask Queue are empty. Browsers enforce a minimum 4ms delay for nested setTimeouts.`}
},
{id:85,cat:"Web/Frontend",q:"Explain the CSS box model and display properties (block, inline, flex, grid).",
a:`<strong>Box model</strong>: content → padding → border → margin. box-sizing: border-box is more intuitive. <strong>block</strong>: new line, full width. <strong>inline</strong>: stays in flow, width/height don't apply. <strong>Flexbox</strong>: one-dimensional. <strong>Grid</strong>: two-dimensional layout.`,
links:[{t:"Flexbox Froggy",u:"https://flexboxfroggy.com/"},{t:"CSS Grid Garden",u:"https://cssgridgarden.com/"}],
fqs:[
{q:"When should you use Flexbox vs CSS Grid?",a:`<strong>Flexbox</strong>: one direction (row/column), aligning/distributing items. Navigation bar, button groups. <strong>Grid</strong>: two directions, full page layout, handling overlaps. In practice: use Grid for overall structure, Flex for internal component alignment.`},
{q:"What are the 5 CSS position values?",a:`static: default. relative: positioned relative to original location, space preserved. absolute: positioned relative to nearest positioned ancestor, removed from flow. fixed: relative to viewport, stays on scroll. sticky: acts like relative until scroll threshold, then like fixed.`}
],
trap:{wrong:`"With box-sizing: content-box, width: 100px displays as 100px on screen."`,
explain:`<strong>Why it's wrong</strong>: in content-box, width is only the content area. Padding and border are added on top. With padding: 10px and border: 2px, the actual rendered size is 124px.`}
},
{id:86,cat:"Web/Frontend",q:"Explain the importance of web accessibility and how to implement it.",
a:`Ensures users with disabilities can use the web. WCAG 2.1's 4 principles: <strong>Perceivable, Operable, Understandable, Robust</strong>. Implementation: semantic HTML, ARIA attributes, keyboard navigation, sufficient color contrast (4.5:1), alt text.`,
links:[{t:"WCAG 2.1",u:"https://www.w3.org/TR/WCAG21/"},{t:"A11y Checklist",u:"https://www.a11yproject.com/checklist/"}],
fqs:[
{q:"When should ARIA attributes be used and when should they be avoided?",a:`<strong>First rule: use semantic HTML whenever possible.</strong> Use ARIA for: complex widgets that cannot be expressed with semantic HTML (tabs, modals, sliders). "No ARIA is better than bad ARIA."`},
{q:"How do you implement keyboard navigation accessibility?",a:`① Focus order matches visual order. Use tabindex="0" to add custom elements. ② Preserve focus styles. ③ Trap focus inside modals. ④ Close modals/dropdowns with Escape key.`}
],
trap:{wrong:`"alt='image' and alt='' are the same."`,
explain:`<strong>Completely different</strong>: alt="image" just reads a meaningless word to screen readers. alt="" signals "decorative image, skip reading." Meaningful images need a specific description.`}
},
{id:87,cat:"Web/Frontend",q:"Explain the differences between SSR, CSR, and SSG.",
a:`<strong>CSR</strong>: browser renders with JS, slow initial load, suited for SPAs. <strong>SSR</strong>: HTML generated on server, fast initial load, SEO-friendly. <strong>SSG</strong>: HTML generated at build time, fastest, difficult with dynamic data. <strong>ISR</strong>: SSG + periodic regeneration.`,
links:[{t:"Rendering Patterns",u:"https://www.patterns.dev/react/rendering-introduction/"}],
fqs:[
{q:"What is the difference between Server Components and Client Components in Next.js App Router?",a:`<strong>Server Component</strong>: runs only on server, not in JS bundle, can access DB directly, useState/useEffect not allowed. <strong>Client Component</strong>: 'use client', supports interaction/events/browser APIs. Strategy: maximize server components, use Client only when interactivity is needed.`},
{q:"What causes Hydration Mismatch?",a:`Occurs when the server-rendered HTML differs from what React expects on the client. Causes: values that differ between server and client (new Date(), random values, browser-only APIs). Solutions: suppressHydrationWarning, delay client-only rendering with useEffect.`}
],
trap:{wrong:`"Using SSR always improves SEO."`,
explain:`<strong>Conditionally true</strong>: Google's crawler also indexes CSR. Even with SSR, slow server responses, incorrect meta tags, and missing structured data hurt SEO.`}
},
{id:88,cat:"Web/Frontend",q:"Explain TypeScript generics and give usage examples.",
a:`A feature that accepts types as parameters to create reusable components. <code>function identity&lt;T&gt;(arg: T): T</code>. Uses: Array&lt;T&gt;, Promise&lt;T&gt;, generic constraints (T extends Serializable), utility types (Partial&lt;T&gt;, Pick&lt;T,K&gt;).`,
links:[{t:"TypeScript Generics",u:"https://www.typescriptlang.org/docs/handbook/2/generics.html"}],
fqs:[
{q:"Explain TypeScript conditional types and the infer keyword.",a:`<code>type ReturnType&lt;T&gt; = T extends (...args: any[]) => infer R ? R : never</code>. Extracts the return type of a function. Awaited&lt;T&gt; and Parameters&lt;T&gt; are also implemented using conditional types.`},
{q:"What are the main differences between TypeScript type and interface?",a:`<strong>interface</strong>: supports declaration merging, specialized for object/class types. Useful for extending library types. <strong>type</strong>: more expressive for union types, tuples, and utility type combinations. Cannot be merged via declaration.`}
],
trap:{wrong:`"Using TypeScript prevents runtime errors."`,
explain:`<strong>Why it's wrong</strong>: TypeScript only type-checks at compile time. At runtime it's compiled to JS and type information is erased. Runtime errors can still occur from any usage, external API casting, etc.`}
},
{id:89,cat:"Web/Frontend",q:"Explain the differences between React's useCallback and useMemo and when to use them.",
a:`<strong>useMemo</strong>: memoizes an expensive computed value. <strong>useCallback</strong>: memoizes a function. Prevents unnecessary re-renders when passed as props to child components. Warning: applying everywhere can actually hurt performance.`,
links:[{t:"React useMemo",u:"https://react.dev/reference/react/useMemo"}],
fqs:[
{q:"When can a child still re-render even with useCallback?",a:`If the child isn't wrapped in React.memo, it has no effect. Also, passing object literals {} or arrays [] directly as props creates new references on every render. Correct usage: React.memo + useCallback together.`},
{q:"When is useMemo/useCallback unnecessary?",a:`When the component doesn't re-render often, computation cost is low, or dependencies change frequently (constantly invalidating memoization). Golden rule: measure with Profiler first, then apply only to actual bottlenecks.`}
],
trap:{wrong:`"The more useMemo and useCallback you use, the faster your app will be."`,
explain:`<strong>Why it's wrong</strong>: memoization has a cost (dependency comparison, cache storage). If computation isn't expensive enough, it only adds overhead.`}
},
{id:90,cat:"System Design",q:"Explain the differences between Microservices Architecture (MSA) and Monolithic and their trade-offs.",
a:`<strong>Monolithic</strong>: single codebase, simple deployment, fast initial development. Complexity grows with scale. <strong>MSA</strong>: independent services per feature, independent deployment/scaling, technology diversity. Distributed complexity, high operational cost. Start with monolithic, migrate using the Strangler Fig pattern.`,
links:[{t:"Microservices Patterns",u:"https://microservices.io/patterns/index.html"}],
fqs:[
{q:"What criteria determine service boundaries when migrating to MSA?",a:`<strong>DDD's Bounded Context</strong> is the primary criterion. Divide along business domain boundaries. Good boundaries: can be deployed independently, clear data ownership, teams can develop independently. Poor boundaries create excessive cross-service calls.`},
{q:"Why is Distributed Tracing needed?",a:`When a single request passes through multiple services, it's hard to locate problems. Assign a unique Trace ID and add a Span at each service. Tools: Jaeger, Zipkin, AWS X-Ray. OpenTelemetry is the standard instrumentation framework.`}
],
trap:{wrong:`"MSA is always better than monolithic."`,
explain:`<strong>Why it's wrong</strong>: for small teams, MSA's operational burden actually slows development. Shopify still processes billions in revenue with a Rails monolith.`}
},
{id:91,cat:"System Design",q:"Explain the role of message queues and the difference between Kafka and RabbitMQ.",
a:`Used for <strong>async communication, traffic buffering, and system decoupling</strong> between services. <strong>RabbitMQ</strong>: complex routing, messages deleted after consumption, low latency. <strong>Kafka</strong>: distributed log streaming, permanent message storage, high throughput, suited for event sourcing.`,
links:[{t:"Kafka vs RabbitMQ",u:"https://www.cloudamqp.com/blog/when-to-use-rabbitmq-or-apache-kafka.html"}],
fqs:[
{q:"Explain how Kafka's Consumer Groups and Partitions enable parallel processing.",a:`<strong>Partitions</strong>: a topic is split into multiple partitions; order is guaranteed within a partition. <strong>Consumer Group</strong>: consumers in the same group each process different partitions. Max parallelism when Consumer count ≤ Partition count. Adding consumers scales throughput linearly.`},
{q:"What is the difference between At-Least-Once, At-Most-Once, and Exactly-Once?",a:`<strong>At-Most-Once</strong>: possible loss, prioritizes speed. <strong>At-Least-Once</strong>: possible duplicates, most common. <strong>Exactly-Once</strong>: full accuracy, complex with performance overhead. In practice, At-Least-Once + idempotent Consumer is the realistic approach.`}
],
trap:{wrong:`"Using a message queue guarantees messages are never lost."`,
explain:`<strong>Depends on configuration</strong>: default settings allow loss. Producer acks settings, replication factor, and DLQ (Dead Letter Queue) configuration are required.`}
},
{id:92,cat:"System Design",q:"Explain the role and functions of an API Gateway.",
a:`A single entry point between clients and microservices. Key functions: <strong>authentication/authorization, Rate Limiting, load balancing, logging, SSL termination, routing, API versioning, circuit breaker</strong>. AWS API Gateway, Kong, and NGINX are representative.`,
links:[{t:"API Gateway Pattern",u:"https://microservices.io/patterns/apigateway.html"}],
fqs:[
{q:"What is the difference between an API Gateway and a Service Mesh (Istio)?",a:`<strong>API Gateway</strong>: North-South traffic, external → internal entry point, API management. <strong>Service Mesh</strong>: East-West traffic, inter-service communication, implements mTLS/distributed tracing without code changes. Both are typically used together.`},
{q:"When is the BFF (Backend For Frontend) pattern needed?",a:`When mobile and web have different data requirements. Create a separate gateway layer tailored to each client. GraphQL is one form of BFF, allowing clients to selectively request only the data they need.`}
],
trap:{wrong:`"Using an API Gateway solves all security problems in microservices."`,
explain:`<strong>Why it's wrong</strong>: the API Gateway only handles auth/authorization for external requests. Internal service-to-service security is handled by Service Mesh (mTLS). Defense in depth is required.`}
},
{id:93,cat:"System Design",q:"Explain the CAP Theorem and give real-world system examples.",
a:`In a distributed system, you cannot simultaneously guarantee all three of <strong>Consistency (C), Availability (A), and Partition Tolerance (P)</strong>. P cannot be sacrificed, so the choice is <strong>CP vs AP</strong>. <strong>CP</strong>: HBase, ZooKeeper — finance. <strong>AP</strong>: Cassandra, DynamoDB — social media.`,
links:[{t:"CAP Theorem",u:"https://www.ibm.com/topics/cap-theorem"}],
fqs:[
{q:"What are the limitations of the CAP theorem and what is a more useful framework?",a:`CAP only applies during a partition. <strong>PACELC</strong>: also considers the Latency vs Consistency trade-off in normal operation. Real systems (Cassandra, DynamoDB) allow tuning consistency level per operation.`},
{q:"Give real-world examples of Eventual Consistency vs Strong Consistency.",a:`<strong>Strong Consistency</strong>: financial transactions, inventory management. <strong>Eventual Consistency</strong>: social media likes, view counts, DNS. Allows slight inconsistency in exchange for higher availability and performance.`}
],
trap:{wrong:`"Distributed databases can never provide both consistency and availability simultaneously."`,
explain:`<strong>They can when there's no partition</strong>: CAP only forces choosing between C and A when a network partition occurs. During normal operation, both can be provided.`}
},
{id:94,cat:"System Design",q:"Explain Rate Limiting algorithm types and implementation approaches.",
a:`<strong>Token Bucket</strong>: requests allowed only when tokens are available; bursts permitted. <strong>Leaky Bucket</strong>: processes requests at a fixed rate; uniform output. <strong>Fixed Window</strong>: fixed count within a time window; boundary burst problem. <strong>Sliding Window Log/Counter</strong>: more accurate but uses more memory. Redis is used for distributed implementation.`,
links:[{t:"Rate Limiting Algorithms",u:"https://blog.cloudflare.com/counting-things-a-lot-of-different-things/"},{t:"System Design Rate Limiting",u:"https://bytebytego.com/courses/system-design-interview/design-a-rate-limiter"}],
fqs:[
{q:"Explain how to implement Token Bucket Rate Limiting with Redis.",a:`Use Redis <strong>Lua scripts</strong> for atomic execution. Key: <code>rate_limit:{user_id}</code>. Value: current token count. <code>GET</code> to check tokens → if sufficient, <code>DECRBY</code> → if not, return 429. Periodically replenish: <code>INCR</code> + <code>EXPIRE</code>. Lua script guarantees atomicity of INCR → EXPIRE. In Redis Cluster, hashing must ensure the same user's requests go to the same node.`},
{q:"Why is accurate Rate Limiting difficult in a distributed environment?",a:`If each server applies Rate Limiting locally, the actual allowed throughput is multiplied by the server count (e.g., 3 servers × 100/sec = 300/sec effective). <strong>Solution</strong>: ① share counter via centralized store (Redis). ② Downside: Redis failure disables Rate Limiting or blocks all requests. ③ Race condition: two servers simultaneously reading and updating the counter can allow excess. Use Lua scripts or Redis transactions (WATCH+MULTI+EXEC) to ensure atomicity.`}
],
trap:{wrong:`"Fixed Window counter is simple to implement and accurate enough for all Rate Limiting needs."`,
explain:`<strong>Has accuracy issues</strong>: bursts occur at window boundaries. With a 100 requests/minute limit: sending 100 at second 59, then 100 at second 61 (new window) processes 200 requests in 2 seconds. Sliding Window is more accurate but has higher memory and computation cost. Choose based on requirements: Fixed Window for simple protection; Sliding Window Log or Token Bucket for precise control.`}
},
{id:95,cat:"System Design",q:"Explain the key considerations when designing a distributed cache.",
a:`<strong>Cache hit rate</strong>, <strong>expiration policy (TTL)</strong>, <strong>consistency (cache-DB sync)</strong>, <strong>eviction (LRU/LFU)</strong>, <strong>cache stampede</strong> prevention, <strong>hot key</strong> problem. Layered caching (L1 local + L2 distributed). Choose between Read-Through, Write-Through, Write-Back strategies.`,
links:[{t:"Redis Best Practices",u:"https://redis.io/docs/manual/patterns/"},{t:"Distributed Caching",u:"https://aws.amazon.com/caching/best-practices/"}],
fqs:[
{q:"What is the Hot Key problem and how do you solve it?",a:`When requests concentrate on a specific key (e.g., a celebrity's profile, a trending product), causing overload on that Redis node. <strong>Solutions</strong>: ① <strong>Local cache (In-Process Cache)</strong>: cache the most popular data in each server's memory, reducing Redis requests. ② <strong>Key replication</strong>: distribute the hot key as multiple copies (user:123:1, user:123:2...). ③ <strong>Read replicas</strong>: distribute reads via Redis Replicas. ④ Consistent Hashing for even distribution.`},
{q:"What strategies increase cache hit rate?",a:`<strong>Cache candidate selection</strong>: data that is frequently read, rarely changed, and expensive to compute. <strong>Appropriate TTL</strong>: match the data update cycle. Too short negates caching; too long serves stale data. <strong>Cache warming</strong>: preload frequently accessed data into cache at server startup. <strong>Segmentation</strong>: separate caches by user/region to prevent unrelated data from causing eviction. Monitor hit rates and remove low-value keys.`}
],
trap:{wrong:`"Adding a cache always improves system performance."`,
explain:`<strong>Not always</strong>: frequent cache misses make the system slower than without a cache (cache lookup + DB lookup). Frequently changing data incurs constant invalidation costs. Write-heavy systems don't benefit from caching. Cache servers themselves become a single point of failure. <strong>Correct approach</strong>: analyze read/write ratio, data change frequency, and response time requirements before deciding to add a cache.`}
},
{id:96,cat:"System Design",q:"Explain the Circuit Breaker pattern.",
a:`Prevents <strong>cascade failures</strong> by blocking requests when consecutive failures occur in microservices. Three states: <strong>Closed</strong> (normal), <strong>Open</strong> (blocking, fast fail), <strong>Half-Open</strong> (probe some requests to check recovery). Resilience4j, Hystrix, and Sentinel are representative. Used together with Timeout + Retry + Fallback.`,
links:[{t:"Circuit Breaker Pattern",u:"https://microservices.io/patterns/reliability/circuit-breaker.html"},{t:"Resilience4j Docs",u:"https://resilience4j.readme.io/docs/circuitbreaker"}],
fqs:[
{q:"Explain the specific state transition conditions for a circuit breaker.",a:`<strong>Closed → Open</strong>: failure rate exceeds threshold (e.g., > 50% with at least 20 calls) within the configured window. Subsequent requests immediately return exceptions (Fast Fail). <strong>Open → Half-Open</strong>: after a wait time (e.g., 30 seconds), automatically transitions. Some requests (e.g., 10%) are forwarded to the real service to check recovery. <strong>Half-Open → Closed</strong>: probe requests succeed → back to normal. <strong>Half-Open → Open</strong>: probe requests fail → back to Open.`},
{q:"Why should Fallback always be used alongside a circuit breaker?",a:`In Open state, blocking requests means clients receive errors. Fallback responds with <strong>degraded mode (graceful degradation)</strong>. Examples: return a default recommendation list when recommendation service fails; use cached inventory when inventory service fails; show "please try again later" when payment service fails. Without Fallback, users only see errors. Netflix's Hystrix integrated Fallback with circuit breakers and popularized the pattern.`}
],
trap:{wrong:`"Applying circuit breakers to all service calls makes the system more stable."`,
explain:`<strong>Over-application creates problems</strong>: incorrect threshold and timeout settings can block healthy services. Intermittent network delays can open the circuit unnecessarily. Unnecessary circuit breakers only add complexity. <strong>Where it's appropriate</strong>: external service calls, slow DB queries, third-party API integrations — selectively apply where failures are likely and cascade failure is a concern.`}
},
{id:97,cat:"System Design",q:"Explain how to design a URL shortening service (like bit.ly).",
a:`<strong>Hash generation</strong>: MD5/SHA-1 + Base62 (a-z, A-Z, 0-9) encoding. 7 characters = 62^7 = 3.5 trillion URLs. <strong>Storage</strong>: key-value DB (Redis/DynamoDB). <strong>Redirect</strong>: HTTP 301 (permanent) vs 302 (temporary). <strong>Collision handling</strong>: add counter or random value on collision. Custom URLs, expiration, and analytics are additional features.`,
links:[{t:"URL Shortener System Design",u:"https://bytebytego.com/courses/system-design-interview/design-a-url-shortener"}],
fqs:[
{q:"Between 301 and 302 Redirect, which is more appropriate for a URL shortening service?",a:`<strong>301 (Permanent)</strong>: browser caches it; subsequent visits bypass the server. Reduces server load, faster. But URL visit statistics cannot be collected. <strong>302 (Temporary)</strong>: browser doesn't cache; every visit goes through the server. Click statistics, A/B testing, and URL destination changes are possible. <strong>Decision criteria</strong>: use 302 if statistics matter; 301 if performance matters and statistics aren't needed. Services like bit.ly, where click analytics is core value, use 302.`},
{q:"What problems arise from using random UUIDs instead of Base62 encoding for URL shortening?",a:`<strong>UUID problems</strong>: UUIDs (128-bit) are too long for URLs. Being non-sequential random values, they cause frequent B-Tree page splits, <strong>degrading write performance</strong>. 7-character Base62 codes are much shorter and more readable. <strong>Security consideration</strong>: sequential IDs make URLs easy to enumerate — a security risk. Therefore, generate random Base62 with sufficient entropy, or apply HMAC to sequential IDs.`}
],
trap:{wrong:`"Hash collisions in URL shortening are nearly impossible, so collision handling is unnecessary."`,
explain:`<strong>Why it's wrong</strong>: 7-character Base62 has 3.5 trillion combinations, but by the Birthday Problem, storing <strong>about 1 million</strong> URLs raises the collision probability above 0.01%. Services like bit.ly process billions of URLs, so collisions definitely occur. Collision handling is mandatory: detect collision (check key in DB) → on collision, add counter/random value and retry, or pre-check with a Bloom Filter.`}
},
{id:98,cat:"System Design",q:"Explain how to design a real-time chat system.",
a:`<strong>Connection</strong>: WebSocket (bidirectional). <strong>Message storage</strong>: Cassandra (write-optimized, time-series). <strong>Delivery</strong>: Redis Pub/Sub or Kafka. <strong>Services</strong>: separate Connection, Chat, Presence, Notification services. <strong>Scaling</strong>: horizontal WebSocket server scaling + Redis for inter-server message routing.`,
links:[{t:"Chat System Design",u:"https://bytebytego.com/courses/system-design-interview/design-a-chat-system"},{t:"Slack Architecture",u:"https://slack.engineering/flannel-an-application-level-edge-cache-to-make-slack-scale/"}],
fqs:[
{q:"How do you guarantee message ordering in a chat system?",a:`Client timestamps are unreliable (clock drift). <strong>Solutions</strong>: ① <strong>Server timestamp</strong>: server records reception time. Distributed servers need time synchronization (NTP). ② <strong>Sequence Number</strong>: assign a monotonically increasing sequence number per chat room. Snowflake ID (Twitter-style): composed of time + server ID + sequence for distributed environments. ③ <strong>Lamport Clock</strong>: guarantees distributed event ordering. Message ordering is critical to chat UX.`},
{q:"How do you deliver messages to offline users?",a:`For offline users without a WebSocket connection, use alternative methods: ① <strong>Push Notification</strong>: send via APNS (iOS) or FCM (Android). ② <strong>Store in DB and deliver on reconnect</strong>: when user connects, fetch messages since last read. ③ <strong>Unread message counter</strong>: display as badge on app icon. Store cursor/last-read position per user-chatroom combination.`}
],
trap:{wrong:`"Using Kafka in a chat system automatically guarantees message ordering."`,
explain:`<strong>Only conditionally true</strong>: Kafka <strong>guarantees order only within a partition</strong>. Routing messages from the same chat room to the same partition (using room ID as partition key) guarantees ordering within that room. But global ordering across multiple partitions is not guaranteed. Also, Consumer processing order may differ from Kafka order, so final sorting by message ID/timestamp is still needed.`}
},
{id:99,cat:"System Design",q:"Explain how to design a search autocomplete system.",
a:`<strong>Trie + Top-K</strong>: cache top K search terms at each node. <strong>Large-scale</strong>: MapReduce for search frequency aggregation → build Trie. <strong>CDN caching</strong>: cache popular prefix responses. <strong>Redis</strong>: Sorted Set for prefix-based frequency-ordered terms. Periodically rebuild Trie via offline batch. Performance matters more than real-time accuracy.`,
links:[{t:"Typeahead Design",u:"https://bytebytego.com/courses/system-design-interview/design-a-search-autocomplete-system"}],
fqs:[
{q:"Explain how to implement autocomplete with a Redis Sorted Set.",a:`Create a Sorted Set per search term prefix and store search frequency as score. Example: searching "java" → increment score in Sorted Sets with keys "j", "ja", "jav", "java". Autocomplete query: <code>ZREVRANGE autocomplete:java 0 9</code> returns top 10. <strong>Problem</strong>: a key is created for every prefix, consuming a lot of memory. <strong>Optimization</strong>: only cache frequently searched prefixes, set TTL. Simpler to implement than a Trie and easy to scale horizontally with a cluster.`},
{q:"How do you add personalization to autocomplete?",a:`Combine global popular searches + personal search history. <strong>Approach</strong>: ① Store per-user search history separately. ② Autocomplete result = global result × global weight + personal result × personal weight. ③ Store recent searches (Last N Searches) locally on the client — provides personalization without server load. <strong>Note</strong>: only provide personal data after user authentication; comply with privacy regulations like GDPR. Google provides personalized autocomplete using user search history and location.`}
],
trap:{wrong:`"Trie is the only optimal data structure for autocomplete, so all autocomplete systems should use a Trie."`,
explain:`<strong>Why it's wrong</strong>: Tries are efficient on a single server but hard to share in a distributed environment. Real large-scale systems combine <strong>Redis Sorted Sets, Elasticsearch, and dedicated search servers (Algolia)</strong>. Google's autocomplete doesn't use a Trie — it uses an inverted index and ML models. Choose the data structure based on requirements (scale, real-time needs, personalization).`}
},
{id:100,cat:"System Design",q:"Explain how to design a video streaming service like YouTube.",
a:`<strong>Upload</strong>: Object Storage (S3) + async encoding (multiple resolutions). <strong>Streaming</strong>: HLS/DASH protocol, CDN distribution. <strong>Recommendation</strong>: collaborative filtering ML model. <strong>Metadata</strong>: RDS (video info) + Elasticsearch (search). <strong>View count</strong>: counter service (batch updates to reduce DB load). Design starting from 1M DAU.`,
links:[{t:"YouTube System Design",u:"https://bytebytego.com/courses/system-design-interview/design-youtube"},{t:"Netflix Tech Blog",u:"https://netflixtechblog.com/"}],
fqs:[
{q:"Explain why and how video transcoding pipelines use async processing.",a:`Original video upload (several GB) and encoding (minutes to hours) would make users wait a very long time if synchronous. <strong>Async pipeline</strong>: ① Upload original to S3 → ② publish upload-complete event to message queue → ③ transcoder workers encode in parallel at 240p, 360p, 720p, 1080p, 4K, etc. → ④ on completion, update metadata DB + send notification → ⑤ distribute to CDN. Failures are retryable and transcoders can be scaled independently.`},
{q:"Explain how HLS (HTTP Live Streaming) works.",a:`<strong>HLS</strong> is Apple's HTTP-based streaming protocol. Video is split into small segment files (2–10 seconds, <code>.ts</code>) and a <strong>playlist file (<code>.m3u8</code>)</strong> describes the segment list. The client reads the m3u8 and downloads segments in sequence. <strong>ABR (Adaptive Bitrate)</strong>: automatically changes quality based on network conditions. The same content has multiple quality versions; a Master Playlist lists them. CDNs cache segments like static files, providing high scalability.`}
],
trap:{wrong:`"TCP should not be used for video streaming. UDP is always better for real-time streaming."`,
explain:`<strong>Why it's wrong</strong>: Netflix, YouTube, and Twitch all use <strong>HTTP (TCP)-based streaming (HLS/DASH)</strong>. CDN infrastructure is well-optimized for HTTP, it passes firewalls easily, and ABR (Adaptive Bitrate) handles packet loss. UDP/RTP is used for ultra-low-latency <strong>live video calls</strong> (WebRTC, Zoom, Google Meet). The few-second delay in VOD or live streaming is handled perfectly by TCP.`}
},
];
