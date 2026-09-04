import json
from pathlib import Path

from graphify.analyze import god_nodes, surprising_connections, suggest_questions
from graphify.build import build_from_json
from graphify.cluster import cluster, score_all
from graphify.export import to_json
from graphify.report import generate

root = "."
ast = json.loads(Path("graphify-out/.graphify_ast.json").read_text(encoding="utf-8"))
extraction = {
    "nodes": ast.get("nodes", []),
    "edges": ast.get("edges", []),
    "hyperedges": [],
    "input_tokens": 0,
    "output_tokens": 0,
}
Path("graphify-out/.graphify_extract.json").write_text(
    json.dumps(extraction, indent=2, ensure_ascii=False), encoding="utf-8"
)
detection = json.loads(
    Path("graphify-out/.graphify_detect.json").read_text(encoding="utf-8")
)
graph = build_from_json(extraction, root=root, directed=False)
if graph.number_of_nodes() == 0:
    raise SystemExit("ERROR: Graph is empty")
communities = cluster(graph)
cohesion = score_all(graph, communities)
labels = {community_id: f"Code community {community_id}" for community_id in communities}
gods = god_nodes(graph)
surprises = surprising_connections(graph, communities)
questions = suggest_questions(graph, communities, labels)
if not to_json(graph, communities, "graphify-out/graph.json"):
    raise SystemExit("ERROR: refused to write graph")
report = generate(
    graph,
    communities,
    cohesion,
    labels,
    gods,
    surprises,
    detection,
    {"input": 0, "output": 0},
    root,
    suggested_questions=questions,
)
Path("graphify-out/GRAPH_REPORT.md").write_text(report, encoding="utf-8")
Path("graphify-out/.graphify_analysis.json").write_text(
    json.dumps(
        {
            "communities": {str(key): value for key, value in communities.items()},
            "cohesion": {str(key): value for key, value in cohesion.items()},
            "gods": gods,
            "surprises": surprises,
            "questions": questions,
        },
        indent=2,
        ensure_ascii=False,
    ),
    encoding="utf-8",
)
print(
    f"Graph: {graph.number_of_nodes()} nodes, {graph.number_of_edges()} edges, "
    f"{len(set(communities.values()))} communities"
)
