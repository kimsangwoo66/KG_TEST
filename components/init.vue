<template>
  <div ref="ccContainer" style="width: 1400px; height: 1000px"></div>
  <hr />
</template>
<script setup>
import { onMounted, ref } from "vue";
import { useNuxtApp } from "#app";
const ccContainer = ref(null);

onMounted(() => {
  const nuxtApp = useNuxtApp();
  const cytoscape = nuxtApp.$cytoscape;

  const cy = cytoscape({
    container: ccContainer.value,
    elements: [
      { data: { id: "a" } },
      { data: { id: "b" } },
      { data: { id: "ab", source: "a", target: "b" } },
      { data: { id: "c" } },
      { data: { id: "d" } },
      { data: { id: "cd", source: "d", target: "c" } }
    ],
    style: [
      {
        selector: "node",
        style: {
          "background-color": "#666",
          label: "data(id)"
        }
      },
      {
        selector: "edge",
        style: {
          width: 3,
          "line-color": "#ccc",
          "target-arrow-color": "#ccc",
          "target-arrow-shape": "triangle"
        }
      }
    ],
    layout: {
      name: "grid",
      rows: 1
    },

    // initial viewport state:
    zoom: 1,
    pan: { x: 3, y: 5 },

    // 상호작용 옵션
    minZoom: 1, // 그래프 확대/축소 수준의 최소 한계 , 뷰포트는 이 확대/축소 수준보다 작게 조정할 수 없음
    maxZoom: 2, // 그래프 확대/축소 수준의 최대 한계 . 뷰포트는 이 확대/축소 수준보다 크게 확장할 수 없음
    zoomingEnabled: true, // 사용자 이벤트 및 프로그래밍 방식으로 그래프 확대/축소가 활성화되는지 여부
    userZoomingEnabled: true, // 사용자 이벤트(ex) 마우스휠, 핀치 투 줌) 로 그래프를 확대/ 축소 할 수 있는 지 여부
    panningEnabled: true, // 이벤트 및 프로그래밍 방식으로 그래프 패닝을 활성화 할지 여부 ??
    userPanningEnabled: true, // 사용자 이벤트(예: 그래프 배경 드래그)가 그래프를 이동하도록 허용할지 여부
    boxSelectionEnabled: true, // 상자 선택(예: 상자 오버레이를 드래그했다가 놓아 선택)이 활성화되어 있는지 여부 ??
    selectionType: "single", // 사용자 입력의 선택 동작을 나타내는 문자열

    autoungrabify: false, // 기본적으로 노드를 잡을 수 없는지(사용자가 잡을 수 없음) 여부 ??
    autolock: false, // 기본적으로 노드를 잠글지 여부(전혀 드래그할 수 없음)(true 인 경우 개별 노드 상태를 재정의함)
    autounselectify: false, // 기본적으로 노드를 선택 해제해야 하는지(불변 선택 상태) 여부 (true 인 경우 개별 요소 상태를 재정의)
    multiClickDebounceTime: 250, // 이벤트 dblclick실행 전 이벤트 확인을 위한 디바우싱 시간(밀리초)

    // 랜더링 옵션
    headless: false, // 헤드리스로 실행되도록 인스턴스를 초기화
    styleEnabled: true, // 스타일을 사용해야 하는지 여부를 나타내는 부울

    hideEdgesOnViewport: true, // true로 설정되면 뷰포트가 조작되는 동안 렌더러가 가장자리를 렌더링하지 않도록 만드는 렌더링 힌트 -> 큰 그래프에 대한 이동, 확대/축소, 끌기 등의 반응성이 향상
    textureOnViewport: false, // true로 설정되면 렌더러가 요소를 그리는 대신 패닝 및 확대/축소 중에 텍스처를 사용하여 큰 그래프의 반응성을 높이는 렌더링 힌트
    motionBlur: true, // true로 설정되면 렌더러가 모션 블러 효과를 사용하여 프레임 간 전환이 더 부드럽게 보이도록 만드는 렌더링 힌트 -> 큰 그래프에 대한 인지된 성능이 향상
    motionBlurOpacity: 0.3, // 모션 블러 프레임의 불투명도를 제어 -> 값이 높을수록 모션 블러 효과가 뚜렷
    wheelSensitivity: 1, // 확대/축소 시 스크롤 휠 감도를 변경
    pixelRatio: "auto" // 수동으로 설정된 값으로 화면 픽셀 비율을 재정의
  });
});
</script>
<style lang=""></style>
