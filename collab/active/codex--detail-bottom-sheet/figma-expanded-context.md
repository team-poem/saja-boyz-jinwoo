const assetPathPrefix = "https://www.figma.com/api/mcp/asset/373d6677-524d-4833-872e-b81df7f1b541";
const imgScreenIncidentBottomSheet = `${assetPathPrefix}/a0907.png`;
const imgRectangle = `${assetPathPrefix}/8b591.png`;
const imgImage1 = `${assetPathPrefix}/90c36.png`;
const imgMyLocationIndicator = `${assetPathPrefix}/7ce01.svg`;
const imgFrame = `${assetPathPrefix}/c0cc0.svg`;
const imgIosSignal = `${assetPathPrefix}/0cce4.svg`;
const imgIosWifiSignal = `${assetPathPrefix}/1148f.svg`;
const imgIosBatteryFull = `${assetPathPrefix}/47253.svg`;
const imgBackBtn = `${assetPathPrefix}/94e32.svg`;

export default function ScreenIncidentBottomSheet() {
  return (
    <div className="content-stretch flex flex-col items-start justify-between relative size-full" data-node-id="504:269" data-name="screen-incident-bottom-sheet">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-[101.91%] left-[-10.5%] max-w-none top-[-1.81%] w-[121%]" src={imgScreenIncidentBottomSheet} />
      </div>
      <div className="absolute left-[160px] size-[24px] top-[520px]" data-node-id="504:299" data-name="my-location-indicator">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgMyLocationIndicator} />
      </div>
      <div className="absolute left-[180px] size-[24px] top-[299px]" data-node-id="504:302" data-name="Frame">
        <div className="absolute inset-[-8.33%]">
          <img alt="" className="block max-w-none size-full" src={imgFrame} />
        </div>
      </div>
      <div className="content-stretch flex items-center justify-between pb-[8px] pt-[12px] px-[24px] relative shrink-0 w-full" data-node-id="504:563" data-name="status-bar">
        <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#0f172a] text-[14px] whitespace-nowrap" data-node-id="504:564">
          9:41
        </p>
        <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-node-id="504:565" data-name="status-icons">
          <div className="h-[11px] relative shrink-0 w-[17px]" data-node-id="504:566" data-name="ios-signal">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIosSignal} />
          </div>
          <div className="h-[11px] relative shrink-0 w-[15px]" data-node-id="504:568" data-name="ios-wifi-signal">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIosWifiSignal} />
          </div>
          <div className="h-[12px] relative shrink-0 w-[25px]" data-node-id="504:570" data-name="ios-battery-full">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIosBatteryFull} />
          </div>
        </div>
      </div>
      <div className="bg-white border-[#e3e8f0] border-solid border-t content-stretch drop-shadow-[0px_-8px_16px_rgba(0,0,0,0.1)] flex flex-col gap-[16px] items-center justify-center p-[16px] relative rounded-tl-[24px] rounded-tr-[24px] shrink-0 w-[393px]" data-node-id="504:502" data-name="incident-bottom-sheet-panel">
        <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-node-id="504:503" data-name="sheet-header">
          <div className="bg-[#94a3b8] h-[4px] relative rounded-[2px] shrink-0 w-[36px]" data-node-id="504:504" data-name="Rectangle" />
        </div>
        <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="504:505" data-name="sheet-meta-row">
          <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-node-id="504:506" data-name="badge-wrapper">
            <div className="bg-[#f1f5f9] border border-[#e2e8f0] border-solid content-stretch flex items-start px-[6px] py-[2px] relative rounded-[4px] shrink-0" data-node-id="504:507" data-name="Frame">
              <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#64748b] text-[10px] whitespace-nowrap" data-node-id="504:508">
                소방
              </p>
            </div>
          </div>
          <div className="relative shrink-0 size-[24px]" data-node-id="504:511" data-name="back-btn">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgBackBtn} />
          </div>
        </div>
        <div className="[word-break:break-word] content-stretch flex flex-col gap-[12px] items-start leading-[normal] not-italic relative shrink-0 w-full" data-node-id="504:513" data-name="title-info">
          <p className="font-['Inter:Extra_Bold'] font-extrabold relative shrink-0 text-[#0f1729] text-[18px] w-full" data-node-id="504:514">
            마포구 서교동 상가 화재 대형 확산 우려
          </p>
          <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full whitespace-nowrap" data-node-id="504:515" data-name="location-date">
            <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-node-id="504:516" data-name="Frame">
              <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[14px] text-black" data-node-id="504:517">
                📍
              </p>
              <p className="font-['Inter:Medium'] font-medium relative shrink-0 text-[#64748b] text-[13px]" data-node-id="504:518">
                서울 마포구 서교동 365-2
              </p>
            </div>
            <div className="content-stretch flex font-['Inter:Regular'] font-normal gap-[4px] items-center relative shrink-0 w-full" data-node-id="504:519" data-name="Frame">
              <p className="relative shrink-0 text-[14px] text-black" data-node-id="504:520">
                📅
              </p>
              <p className="relative shrink-0 text-[#94a3b8] text-[12px]" data-node-id="504:521">
                2024.03.15 14:30
              </p>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-node-id="504:522" data-name="brief-details">
          <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-node-id="504:523">
            <div className="h-[140px] relative rounded-[8px] shrink-0 w-full" data-node-id="504:524" data-name="Rectangle">
              <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[8px] size-full" src={imgRectangle} />
            </div>
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.5] not-italic relative shrink-0 text-[#94a3b8] text-[10px] w-full" data-node-id="504:525">
              AI로 생성된 이미지 입니다.
            </p>
          </div>
          <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.5] not-italic relative shrink-0 text-[#64748b] text-[13px] w-full" data-node-id="504:526">
            현재 서교동 홍대입구 인근 가구 상가 2층에서 화재가 발생하여 검은 연기가 상공으로 자욱하게 퍼지고 있습니다. 현장 소방대원들이 진압 작전을 수행 중이며, 주변 교통이 통제되고 있습니다.
          </p>
        </div>
        <div className="content-stretch flex items-center justify-between py-[4px] relative shrink-0 w-full" data-node-id="504:527" data-name="source-row">
          <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-node-id="504:528" data-name="Frame">
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#94a3b8] text-[12px] whitespace-nowrap" data-node-id="504:529">
              출처:
            </p>
            <div className="h-[15px] relative shrink-0 w-[40px]" data-node-id="504:530" data-name="image 1">
              <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage1} />
            </div>
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[11px] text-black whitespace-nowrap" data-node-id="504:531">
              🔗
            </p>
          </div>
        </div>
        <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full" data-node-id="504:534" data-name="nearby-incidents-section">
          <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[normal] not-italic relative shrink-0 text-[#64748b] text-[12px] whitespace-nowrap" data-node-id="504:535">
            주변 핫한 사건
          </p>
          <div className="bg-[#f7fafc] border border-[#e3e8f0] border-solid content-stretch flex flex-col gap-[6px] items-start p-[10px] relative rounded-[8px] shrink-0 w-full" data-node-id="504:536" data-name="nearby-incident-item">
            <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-node-id="504:581">
              <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-node-id="504:537" data-name="badge-wrapper">
                <div className="bg-[#f1f5f9] border border-[#e2e8f0] border-solid content-stretch flex items-start px-[6px] py-[2px] relative rounded-[4px] shrink-0" data-node-id="504:538" data-name="Frame">
                  <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#64748b] text-[10px] whitespace-nowrap" data-node-id="504:539">
                    교통
                  </p>
                </div>
              </div>
              <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#94a3b8] text-[11px] whitespace-nowrap" data-node-id="504:579">
                22시간 전
              </p>
            </div>
            <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[normal] not-italic overflow-hidden relative shrink-0 text-[#0f1729] text-[13px] text-ellipsis w-full whitespace-nowrap" data-node-id="504:542">
              합정역 사거리 시내버스 추돌 사고
            </p>
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#64748b] text-[11px] w-full" data-node-id="504:543">
              마포구 합정동
            </p>
          </div>
          <div className="bg-[#f7fafc] border border-[#e3e8f0] border-solid content-stretch flex flex-col gap-[6px] items-start p-[10px] relative rounded-[8px] shrink-0 w-full" data-node-id="504:582" data-name="nearby-incident-item">
            <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-node-id="504:583">
              <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-node-id="504:584" data-name="badge-wrapper">
                <div className="bg-[#f1f5f9] border border-[#e2e8f0] border-solid content-stretch flex items-start px-[6px] py-[2px] relative rounded-[4px] shrink-0" data-node-id="504:585" data-name="Frame">
                  <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#64748b] text-[10px] whitespace-nowrap" data-node-id="504:586">
                    교통
                  </p>
                </div>
              </div>
              <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#94a3b8] text-[11px] whitespace-nowrap" data-node-id="504:589">
                22시간 전
              </p>
            </div>
            <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[normal] not-italic overflow-hidden relative shrink-0 text-[#0f1729] text-[13px] text-ellipsis w-full whitespace-nowrap" data-node-id="504:590">
              합정역 사거리 시내버스 추돌 사고
            </p>
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#64748b] text-[11px] w-full" data-node-id="504:591">
              마포구 합정동
            </p>
          </div>
          <div className="bg-[#f7fafc] border border-[#e3e8f0] border-solid content-stretch flex flex-col gap-[6px] items-start p-[10px] relative rounded-[8px] shrink-0 w-full" data-node-id="504:593" data-name="nearby-incident-item">
            <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-node-id="504:594">
              <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-node-id="504:595" data-name="badge-wrapper">
                <div className="bg-[#f1f5f9] border border-[#e2e8f0] border-solid content-stretch flex items-start px-[6px] py-[2px] relative rounded-[4px] shrink-0" data-node-id="504:596" data-name="Frame">
                  <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#64748b] text-[10px] whitespace-nowrap" data-node-id="504:597">
                    교통
                  </p>
                </div>
              </div>
              <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#94a3b8] text-[11px] whitespace-nowrap" data-node-id="504:600">
                22시간 전
              </p>
            </div>
            <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[normal] not-italic overflow-hidden relative shrink-0 text-[#0f1729] text-[13px] text-ellipsis w-full whitespace-nowrap" data-node-id="504:601">
              합정역 사거리 시내버스 추돌 사고
            </p>
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#64748b] text-[11px] w-full" data-node-id="504:602">
              마포구 합정동
            </p>
          </div>
        </div>
        <div className="border-[#e8192c] border-[1.5px] border-solid content-stretch flex h-[48px] items-center justify-center relative rounded-[12px] shrink-0 w-full" data-node-id="504:560" data-name="share-btn">
          <p className="[word-break:break-word] font-['Inter:Extra_Bold'] font-extrabold leading-[normal] not-italic relative shrink-0 text-[#e8192c] text-[15px] whitespace-nowrap" data-node-id="504:561">
            🔗 사건 공유하기
          </p>
        </div>
      </div>
    </div>
  );
}

SUPER CRITICAL: The generated React+Tailwind code MUST be converted to match the target project's technology stack and styling system.
1. Analyze the target codebase to identify: technology stack, styling approach, component patterns, and design tokens
2. Convert React syntax to the target framework/library
3. Transform all Tailwind classes to the target styling system while preserving exact visual design
4. Follow the project's existing patterns and conventions
DO NOT install any Tailwind as a dependency unless the user instructs you to do so.


Node ids have been added to the code as data attributes, e.g. `data-node-id="1:2"`.

The generated code contains image and SVG URL constants, e.g. const image = `${assetPathPrefix}/<asset file name>`, where assetPathPrefix is declared once at the top of the code and every asset URL interpolates it. These URLs are temporary download sources and expire after 7 days. Download each asset into the project with curl -L, then replace its URL in the generated code with a reference to the downloaded asset. Never use the temporary URLs as runtime image sources.