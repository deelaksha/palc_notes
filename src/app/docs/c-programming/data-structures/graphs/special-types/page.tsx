
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { GitFork, Share2, Users } from 'lucide-react';
import { CodeBlock } from '@/components/markdown/CodeBlock';

const TreeDiagram = () => (
    <div className="text-center font-mono text-xs text-white">
        <div className="inline-block p-2 bg-blue-600 rounded-full">A</div>
        <div className="h-4 border-l border-dashed mx-auto w-0" style={{marginLeft: 'calc(50% - 1px)'}}></div>
        <div className="flex justify-around">
            <div className="h-4 border-r border-dashed w-1/2"></div>
            <div className="h-4 border-l border-dashed w-1/2"></div>
        </div>
        <div className="flex justify-around">
            <div>
                 <div className="inline-block p-2 bg-green-600 rounded-full">B</div>
                 <div className="h-4 border-l border-dashed mx-auto w-0" style={{marginLeft: 'calc(50% - 1px)'}}></div>
                 <div className="h-4 border-r border-dashed w-1/2"></div>
                 <div className="inline-block p-2 bg-teal-600 rounded-full">D</div>
            </div>
             <div>
                <div className="inline-block p-2 bg-green-600 rounded-full">C</div>
             </div>
        </div>
    </div>
);

const BipartiteDiagram = () => (
    <div className="flex justify-around items-center p-4">
        {/* Set U */}
        <div className="flex flex-col gap-8">
            <div className="p-3 bg-red-600 rounded-full">U1</div>
            <div className="p-3 bg-red-600 rounded-full">U2</div>
            <div className="p-3 bg-red-600 rounded-full">U3</div>
        </div>
        {/* Edges */}
        <div className="relative w-24 h-24">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                <line x1="0" y1="10" x2="100" y2="10" stroke="hsl(var(--muted-foreground))" strokeDasharray="4"/>
                <line x1="0" y1="50" x2="100" y2="90" stroke="hsl(var(--muted-foreground))" strokeDasharray="4"/>
                <line x1="0" y1="90" x2="100" y2="50" stroke="hsl(var(--muted-foreground))" strokeDasharray="4"/>
            </svg>
        </div>
        {/* Set V */}
        <div className="flex flex-col gap-8">
            <div className="p-3 bg-blue-600 rounded-full">V1</div>
            <div className="p-3 bg-blue-600 rounded-full">V2</div>
            <div className="p-3 bg-blue-600 rounded-full">V3</div>
        </div>
    </div>
)


export default function SpecialGraphsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
        <header className="text-center">
            <div className="inline-block bg-primary/10 p-4 rounded-full mb-4">
                <Users className="size-12 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-4 tracking-wide">Special Graph Types</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Discover important graph structures like Trees, DAGs, and Bipartite Graphs that model specific kinds of relationships.
            </p>
        </header>

        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="flex flex-col">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><GitFork />Trees</CardTitle>
                    <CardDescription>A familiar hierarchical structure.</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow space-y-4">
                    <p className="text-muted-foreground">A **Tree** is a special type of graph that is **undirected**, **connected**, and **acyclic** (contains no cycles). Because of these properties, there is exactly one unique, simple path between any two vertices.</p>
                    <ul className="list-disc list-inside text-muted-foreground text-sm space-y-2">
                        <li>**Rooted Trees:** Often, one vertex is designated as the 'root', creating a clear hierarchy (parent-child relationships). File systems are a perfect example.</li>
                        <li>**Binary Trees:** A common type of rooted tree where each node has at most two children.</li>
                    </ul>
                    <div className="p-4 bg-card-nested rounded-lg">
                        <TreeDiagram />
                    </div>
                </CardContent>
            </Card>

             <Card className="flex flex-col">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Share2 />Directed Acyclic Graphs (DAGs)</CardTitle>
                    <CardDescription>Graphs for dependencies and tasks.</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow space-y-4">
                    <p className="text-muted-foreground">A **DAG** is a directed graph that contains no directed cycles. It's one of the most important structures for modeling real-world processes that have a clear flow or dependency order.</p>
                    <ul className="list-disc list-inside text-muted-foreground text-sm space-y-2">
                        <li>**Use Cases:** Task scheduling (task B can't start until task A is done), version control history (commits build on previous commits), and academic course prerequisites.</li>
                        <li>**Topological Sort:** A key algorithm for DAGs is topological sorting, which provides a linear ordering of its vertices such that for every directed edge from vertex `u` to vertex `v`, `u` comes before `v` in the ordering.</li>
                    </ul>
                     <div className="p-4 bg-card-nested rounded-lg">
                         <CodeBlock>
{`// A -> B -> D
// |         ^
// ------> C -|

// Valid Topological Sorts:
// A, C, B, D
// A, B, C, D`}
                         </CodeBlock>
                    </div>
                </CardContent>
            </Card>
        </div>

        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Users />Bipartite Graphs</CardTitle>
                <CardDescription>Graphs of two sets, where connections are only between the sets.</CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                    <p className="text-muted-foreground mb-4">A **Bipartite Graph** is a graph whose vertices can be divided into two disjoint and independent sets, U and V, such that every edge connects a vertex in U to one in V. There are no edges between vertices within the same set.</p>
                     <ul className="list-disc list-inside text-muted-foreground text-sm space-y-2">
                        <li>**Key Property:** A graph is bipartite if and only if it does not contain any odd-length cycles.</li>
                        <li>**Use Cases:** Perfect for modeling matching problems, such as matching job applicants to jobs, students to projects, or users to items they've reviewed.</li>
                    </ul>
                </div>
                 <div className="p-4 bg-card-nested rounded-lg">
                    <BipartiteDiagram />
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
