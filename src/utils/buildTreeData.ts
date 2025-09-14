// src/utils/buildTreeData.ts
import type { Employee } from "../components/Sidebar";

export function buildTreeData(employees: Employee[]) {
  const map = new Map<string, any>();

  // create node skeletons
    employees.forEach(emp => {
      map.set(emp.id, {
        name: emp.name,
        attributes: {
          id: emp.id,
          designation: emp.designation,
          team: emp.team,
          photoUrl: emp.photoUrl,
        },
        children: [] as any[],
        parent: undefined
      });
    });

  // link children to managers
  const roots: any[] = [];
  employees.forEach(emp => {
    const node = map.get(emp.id);
    if (emp.manager && map.has(emp.manager)) {
      map.get(emp.manager).children.push(node);
        node.parent = emp.manager;
      } else {
        roots.push(node);
      }
    });

  // react-d3-tree accepts either an object or an array.
  // if multiple roots, wrap under a synthetic root to keep layout stable.
  if (roots.length === 1) return roots[0];
  return {
    name: "Company",
    attributes: { id: "root", designation: "", team: "" },
    children: roots,
  };
}
