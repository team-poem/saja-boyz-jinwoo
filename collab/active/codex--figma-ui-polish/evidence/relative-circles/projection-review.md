# 좌표계 읽기 검토

공식: https://navermaps.github.io/maps.js.ncp/docs/tutorial-Projection.html 및 https://navermaps.github.io/maps.js.ncp/docs/naver.maps.MapSystemProjection.html

공식문서는 offset을 SDK가삽입한지도DOM기준 CSS픽셀로설명하고 이동·줌으로 DOM위치가 바뀔수있다고알린다. overlayLayer에 offset을CSS좌표로배치하는예도있다. 따라서 raw offset과외부canvas0..width를같은원점으로단정할수없다. 현재카메라중심 projected offset을뺀후 canvas.width/2,height/2를더하는방식은 원점차이를상쇄하는정규화다. 이는문서와초기DOM실측에근거한해석이며 SDK내부를수정/계측한것이아니다.

초기pan상태의8건DOM중심x431은canvasright393바깥이지만4건지름54.59375가유지됐다. root의추가6.5초실측은제품RED로확인됐다. 별도로줌중0px임시DOM이잡히는QA대기문제는settled를보완해분리한다.
