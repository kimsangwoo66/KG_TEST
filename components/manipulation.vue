<template>
  &nbsp &nbsp &nbsp
  <input type="text" v-model="nodeQuery" placeholder="Search nodes..." />
  <button @click="filterNodes">노드검색</button>
  &nbsp &nbsp &nbsp
  <input type="text" v-model="edgeQuery" placeholder="Search edges..." />
  <button @click="filterEdges">간선검색</button>
  &nbsp &nbsp &nbsp
  <select v-model="selectedLayout" @change="changeLayout">
    <option value="grid">Grid</option>
    <option value="circle">Circle</option>
    <option value="cola">Cola</option>
    <option value="concentric">Concentric</option>
    <option value="preset">Preset</option>
  </select>
  <div ref="mmContainer" style="width: 1400px; height: 1000px; border: black; border-inline-width: 3"></div>
  <hr />
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useNuxtApp } from "#app";
const mmContainer = ref(null);
const nodeQuery = ref("");
const edgeQuery = ref("");
const selectedLayout = ref("grid");
let cy = null;

onMounted(() => {
  const nuxtApp = useNuxtApp();
  const cytoscape = nuxtApp.$cytoscape;
  const generateUuid = nuxtApp.$uuid;

  cy = cytoscape({
    container: mmContainer.value,
    elements: getElements(),
    // 간선, 노드, 간선과 노드의 관계에 대한 스타일링 가능
    style: [
      {
        selector: "node",
        style: {
          "background-color": "#666",
          label: "data(name)",
          "text-valign": "center",
          "text-halign": "center",
          color: "#fff",
          "text-outline-width": 2,
          "text-outline-color": "#888"
        }
      },
      {
        selector: "node.highlight",
        style: {
          "background-color": "#F00",
          "border-color": "#FFF",
          "border-width": 2
        }
      },
      {
        selector: "edge",
        style: {
          width: 3,
          "line-color": "#ccc",
          label: "data(name)",
          "curve-style": "bezier",
          "target-arrow-color": "#ccc",
          "target-arrow-shape": "triangle"
        }
      },
      {
        selector: "edge.highlight",
        style: {
          width: 3,
          "line-color": "#F00",
          label: "data(name)",
          "target-arrow-color": "#F00",
          "target-arrow-shape": "triangle"
        }
      }
    ]

    //minZoom: 1, // 그래프 확대/축소 수준의 최소 한계 , 뷰포트는 이 확대/축소 수준보다 작게 조정할 수 없음
    //maxZoom: 2, // 그래프 확대/축소 수준의 최대 한계 . 뷰포트는 이 확대/축소 수준보다 크게 확장할 수 없음
  });

  // layout cola - 커스터마이징
  let colaOptions = {
    name: "cola",

    // cola default 옵션
    animate: true,
    maxSimulationTime: 4000, // max length in ms to run the layout
    ungrabifyWhileSimulating: false, // so you can't drag nodes during layout
    fit: true, // on every layout reposition of nodes, fit the viewport
    padding: 30, // padding around the simulation
    boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
    nodeDimensionsIncludeLabels: false, // whether labels should be included in determining the space used by a node

    // layout event callbacks
    ready: function () {}, // on layoutready
    stop: function () {}, // on layoutstop

    // positioning options
    randomize: false, // use random node positions at beginning of layout
    avoidOverlap: true, // if true, prevents overlap of node bounding boxes
    handleDisconnected: true, // if true, avoids disconnected components from overlapping
    convergenceThreshold: 0.01, // when the alpha value (system energy) falls below this value, the layout stops
    nodeSpacing: function (node) {
      return 10;
    }, // extra spacing around nodes
    flow: undefined, // use DAG/tree flow layout if specified, e.g. { axis: 'y', minSeparation: 30 }
    alignment: undefined, // relative alignment constraints on nodes, e.g. {vertical: [[{node: node1, offset: 0}, {node: node2, offset: 5}]], horizontal: [[{node: node3}, {node: node4}], [{node: node5}, {node: node6}]]}
    gapInequalities: undefined, // list of inequality constraints for the gap between the nodes, e.g. [{"axis":"y", "left":node1, "right":node2, "gap":25}]
    centerGraph: true, // adjusts the node positions initially to center the graph (pass false if you want to start the layout from the current position)

    // different methods of specifying edge length
    // each can be a constant numerical value or a function like `function( edge ){ return 2; }`
    edgeLength: undefined, // sets edge length directly in simulation
    edgeSymDiffLength: undefined, // symmetric diff edge length in simulation
    edgeJaccardLength: undefined, // jaccard edge length in simulation

    // iterations of cola algorithm; uses default values on undefined
    unconstrIter: undefined, // unconstrained initial layout iterations
    userConstIter: undefined, // initial layout iterations with user-specified constraints
    allConstIter: undefined // initial layout iterations with all constraints including non-overlap
  };

  var layout = cy.layout(colaOptions);
  layout.run();

  // 노드 클릭 이벤트 처리
  cy.on("tap", "node", function (evt) {
    const node = evt.target;

    // 노드 클릭시 클릭한 노드와 간선으로 연결된 노드들 생성
    if (node.data("name") === "Net Income") {
      var cnt = 0;
      for (var k = 16; k < 1016; k++) {
        cnt += 1;
        var nodeId = generateUuid();

        var i = Math.floor(Math.random() * 1000);
        var j = Math.floor(Math.random() * 1000);

        var x = node.position("x") + i;
        var y = node.position("y") + j;

        nodeId = nodeId.toString();

        cy.add({
          group: "nodes",
          data: { id: nodeId, name: "N" + nodeId },
          position: { x, y }
        });

        cy.add({
          group: "edges",
          data: { id: "e" + nodeId, source: nodeId, target: "14" }
        });
      }
      console.log("cnt1: ", cnt);
    }

    cy.elements().removeClass("highlight");
    node.addClass("highlight");

    node.connectedEdges().targets().addClass("highlight");
    node.connectedEdges().sources().addClass("highlight");

    // 연결된 간선들도 하이라이트
    //node.connectedEdges().addClass("highlight");
  });
});

function getElements() {
  const nodes = [
    { data: { id: "1", name: "Total Revenue" } },
    { data: { id: "2", name: "Product A Sales" } },
    { data: { id: "3", name: "Product B Sales" } },
    { data: { id: "4", name: "Service Fees" } },
    { data: { id: "5", name: "Online Sales" } },
    { data: { id: "6", name: "Retail Sales" } },
    { data: { id: "7", name: "Wholesale" } },
    { data: { id: "8", name: "International Market" } },
    { data: { id: "9", name: "Local Market" } },
    { data: { id: "10", name: "New Products" } },
    { data: { id: "11", name: "Promotions" } },
    { data: { id: "12", name: "Cost of Goods Sold" } },
    { data: { id: "13", name: "Operational Costs" } },
    { data: { id: "14", name: "Net Income" } },
    { data: { id: "15", name: "Taxes" } }
  ];

  const edges = [
    { data: { id: "e1-2", source: "1", target: "2", name: "contributes to" } },
    { data: { id: "e1-3", source: "1", target: "3", name: "contributes to" } },
    { data: { id: "e2-5", source: "2", target: "5", name: "channel sales" } },
    { data: { id: "e3-6", source: "3", target: "6", name: "channel sales" } },
    { data: { id: "e5-9", source: "5", target: "9", name: "market type" } },
    { data: { id: "e6-9", source: "6", target: "9", name: "market type" } },
    { data: { id: "e2-7", source: "2", target: "7", name: "bulk sales" } },
    { data: { id: "e3-8", source: "3", target: "8", name: "export sales" } },
    { data: { id: "e1-12", source: "1", target: "12", name: "affects" } },
    { data: { id: "e12-14", source: "12", target: "14", name: "reduces" } },
    { data: { id: "e14-15", source: "14", target: "15", name: "is taxed" } }
  ];

  return [...nodes, ...edges];
}

// 노드 검색 기능
function filterNodes() {
  cy.elements().removeClass("highlight");
  if (nodeQuery.value.trim() !== "") {
    // 찾은 노드를 빨간색으로 표시
    var targetNode = cy
      .nodes()
      .filter((node) => node.data("name") === nodeQuery.value.trim())
      .addClass("highlight")
      .first();

    // 검색된 노드로 뷰포트 이동
    if (targetNode.length !== 0) {
      cy.animate({
        center: { eles: targetNode },
        zoom: 2,
        duration: 500
      });
    }
  }
}

// 간선 검색 기능
function filterEdges() {
  cy.edges().removeClass("highlight");

  if (edgeQuery.value.trim() !== "") {
    cy.edges()
      .filter((edge) => edge.data("name") === edgeQuery.value.trim())
      .addClass("highlight");
  }
}

// 레이아웃 변경 기능
function changeLayout() {
  cy.layout({ name: selectedLayout.value }).run(); // 선택된 레이아웃으로 변경
}
</script>
<style lang=""></style>
