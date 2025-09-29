/* eslint-disable @typescript-eslint/no-explicit-any */
import { Position, MarkerType } from "@xyflow/react";
import { SkillsOntology } from "@/types/organization";
import { random } from "lodash-es";
// this helper function returns the intersection point
// of the line between the center of the intersectionNode and the target node
function getNodeIntersection(intersectionNode: any, targetNode: any) {
  // https://math.stackexchange.com/questions/1724792/an-algorithm-for-finding-the-intersection-point-between-a-center-of-vision-and-a
  const { width: intersectionNodeWidth, height: intersectionNodeHeight } =
    intersectionNode.measured;
  const intersectionNodePosition = intersectionNode.internals.positionAbsolute;
  const targetPosition = targetNode.internals.positionAbsolute;

  const w = intersectionNodeWidth / 2;
  const h = intersectionNodeHeight / 2;

  const x2 = intersectionNodePosition.x + w;
  const y2 = intersectionNodePosition.y + h;
  const x1 = targetPosition.x + targetNode.measured.width / 2;
  const y1 = targetPosition.y + targetNode.measured.height / 2;

  const xx1 = (x1 - x2) / (2 * w) - (y1 - y2) / (2 * h);
  const yy1 = (x1 - x2) / (2 * w) + (y1 - y2) / (2 * h);
  const a = 1 / (Math.abs(xx1) + Math.abs(yy1));
  const xx3 = a * xx1;
  const yy3 = a * yy1;
  const x = w * (xx3 + yy3) + x2;
  const y = h * (-xx3 + yy3) + y2;

  return { x, y };
}

// returns the position (top,right,bottom or right) passed node compared to the intersection point
function getEdgePosition(node: any, intersectionPoint: any) {
  const n = { ...node.internals.positionAbsolute, ...node };
  const nx = Math.round(n.x);
  const ny = Math.round(n.y);
  const px = Math.round(intersectionPoint.x);
  const py = Math.round(intersectionPoint.y);

  if (px <= nx + 1) {
    return Position.Left;
  }
  if (px >= nx + n.measured.width - 1) {
    return Position.Right;
  }
  if (py <= ny + 1) {
    return Position.Top;
  }
  if (py >= n.y + n.measured.height - 1) {
    return Position.Bottom;
  }

  return Position.Top;
}

// returns the parameters (sx, sy, tx, ty, sourcePos, targetPos) you need to create an edge
export function getEdgeParams(source: any, target: any) {
  const sourceIntersectionPoint = getNodeIntersection(source, target);
  const targetIntersectionPoint = getNodeIntersection(target, source);

  const sourcePos = getEdgePosition(source, sourceIntersectionPoint);
  const targetPos = getEdgePosition(target, targetIntersectionPoint);

  return {
    sx: sourceIntersectionPoint.x,
    sy: sourceIntersectionPoint.y,
    tx: targetIntersectionPoint.x,
    ty: targetIntersectionPoint.y,
    sourcePos,
    targetPos,
  };
}

export function initialElements() {
  const nodes: any[] = [];
  const edges: any[] = [];
  const center = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

  nodes.push({ id: "target", data: { label: "Target" }, position: center });

  //   for (let i = 0; i < 8; i++) {
  //     const degrees = i * (360 / 8);
  //     const radians = degrees * (Math.PI / 180);
  //     const x = 250 * Math.cos(radians) + center.x;
  //     const y = 250 * Math.sin(radians) + center.y;

  //     nodes.push({ id: `${i}`, data: { label: "Source" }, position: { x, y } });

  //     edges.push({
  //       id: `edge-${i}`,
  //       target: "target",
  //       source: `${i}`,
  //       type: "floating",
  //       markerEnd: {
  //         type: MarkerType.Arrow,
  //       },
  //     });
  //   }

  return { nodes, edges };
}

export function getTreeHeight(root: any): number {
  if (!root) return 0;
  return 1 + Math.max(getTreeHeight(root.left), getTreeHeight(root.right));
}

export function initialOntologyElements(ontology: SkillsOntology) {
  const root = ontology.hierarchy[0].categories[0];
  const nodes: any[] = [];
  const edges: any[] = [];
  const center = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  nodes.push({
    id: root.name,
    data: { label: root.name },
    position: center,
    type: "default",
    style: {
      backgroundColor: "#3B82F6",
      borderRadius: "100%",
      width: "100px",
      height: "100px",
      textAlign: "center",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      fontWeight: "bold",
      fontSize: "12px",
    },
  });

  for (let i = 0; i < root.subcategories.length; i++) {
    const degrees = i * (360 / root.subcategories.length);
    const radians = degrees * (Math.PI / 180);
    const subcategoryX = 500 * Math.cos(radians) + center.x;
    const subcategoryY = 500 * Math.sin(radians) + center.y;

    nodes.push({
      id: root.subcategories[i].name,
      data: { label: root.subcategories[i].name, color: "#3B82F6" },
      position: { x: subcategoryX, y: subcategoryY },
      style: {
        backgroundColor: "#3B82F6",
        borderRadius: "100%",
        width: "100px",
        height: "100px",
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontWeight: "bold",
        fontSize: "12px",
      },
      type: "default",
    });

    edges.push({
      id: `${root.subcategories[i].name}-${root.name}`,
      target: root.name,
      source: root.subcategories[i].name,
      type: "floating",
      markerEnd: {
        type: MarkerType.Arrow,
      },
    });
    for (let j = 0; j < root.subcategories[i].skills.length; j++) {
      const degrees = j * (360 / root.subcategories[i].skills.length);
      const radians = degrees * (Math.PI / 180);
      const skillX = 300 * Math.cos(radians) + subcategoryX;
      const skillY = 300 * Math.sin(radians) + subcategoryY;

      nodes.push({
        id: root.subcategories[i].skills[j].name,
        data: { label: root.subcategories[i].skills[j].name, color: "#10B981" },
        type: "default",
        position: { x: skillX, y: skillY },
        style: {
          backgroundColor: "#10B981",
          borderRadius: "100%",
          width: "100px",
          height: "100px",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontWeight: "bold",
          fontSize: "12px",
        },
      });

      edges.push({
        id: `${root.subcategories[i].skills[j].name}-${root.subcategories[i].name}`,
        target: root.subcategories[i].name,
        source: root.subcategories[i].skills[j].name,
        type: "floating",
        markerEnd: {
          type: MarkerType.Arrow,
        },
      });
      for (
        let k = 0;
        k < root.subcategories[i].skills[j].subskills.length;
        k++
      ) {
        const degrees =
          k * (360 / root.subcategories[i].skills[j].subskills.length);
        const radians = degrees * (Math.PI / random(1, 180));
        const subskillX = 100 * Math.cos(radians) + skillX;
        const subskillY = 100 * Math.sin(radians) + skillY;

        nodes.push({
          id: root.subcategories[i].skills[j].subskills[k].name,
          data: {
            label: root.subcategories[i].skills[j].subskills[k].name,
            color: "#8B5CF6",
          },
          type: "default",
          position: { x: subskillX, y: subskillY },
          style: {
            backgroundColor: "#8B5CF6",
            borderRadius: "100%",
            width: "60px",
            height: "60px",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontWeight: "bold",
            fontSize: "10px",
          },
        });

        edges.push({
          id: `${root.subcategories[i].skills[j].subskills[k].name}-${root.subcategories[i].skills[j].name}`,
          target: root.subcategories[i].skills[j].name,
          source: root.subcategories[i].skills[j].subskills[k].name,
          type: "floating",
          markerEnd: {
            type: MarkerType.Arrow,
          },
        });
      }
    }
  }

  return { nodes, edges };
}

/*
cat -> 0
subcat -> 1
skills -> 2
subskills -> 3


*/
