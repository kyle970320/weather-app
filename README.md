## Weather App

### 프로젝트 실행 방법

1. **환경 변수 설정**  
   루트에 `.env` 또는 `.env.local` 파일을 만들고 다음 값을 설정합니다.

```bash
VITE_KAKAO_API_KEY=카카오_REST_API_KEY
VITE_KAKAO_API_ADDRESS_URL=카카오_주소로_좌표변환
VITE_KAKAO_API_GEO_URL=카카오_좌표로_주소변환
VITE_WEATHER_API_KEY=기상청_또는_사용중인_날씨_API_KEY
VITE_WEATHER_API_URL=날씨_API_URL
```

2. **의존성 설치**

```bash
pnpm install
```

3. **개발 서버 실행**

```bash
pnpm dev
```

4. 브라우저에서 `http://localhost:3001`, 혹은 `https://weather-app-rust-one-52.vercel.app/`(배포주소)로 들어갑니다.

---

### 구현한 기능 설명

#### 1. 홈 페이지

- **앱 첫 진입 시 현재 위치 기반 날씨 조회**
  - `navigator.geolocation`으로 현재 위도/경도를 얻고, 기상청 API 격자 좌표로 변환해
    - 현재 기온
    - 당일 최저/최고 기온
    - 시간대별 기온
    - 바람/습도/강수 형태 등 부가 정보
  - 을 홈 화면 카드로 보여줍니다.
  - 현재 위치정보를 얻지 못하면 서울특별시 용산구가 default로 적용됩니다.
- **검색 위젯**
  - 상단 검색 바에서 시/구/동 단위로 검색 가능 (`서울특별시`, `종로구`, `청운동` 등).
  - 입력 시 `koreaDistricts.json`을 기반으로 **자동완성 리스트**를 보여주고, 리스트 선택/Enter키로 검색 실행.
  - 검색 성공 시 해당 주소의 날씨를 홈 카드에 표시합니다.
- **검색 실패 / 데이터 없음 처리**
  - 선택한 주소의 날씨 API가 데이터를 주지 않는 경우, 상세 페이지에서  
    “해당 장소의 정보가 제공되지 않습니다.”라는 문구로 명시적으로 안내합니다.

#### 2. 상세 페이지 (`/:address`)

- 즐겨찾기 카드나 검색을 통해 특정 주소를 클릭하면 `/:address` 경로로 이동.
- 상세 페이지에서는 해당 위치에 대해:
  - 현재 기온
  - 당일 최저/최고 기온
  - 바람/습도/강수 형태 등 부가 정보
  - 시간대별 기온 그래프(그리드 카드)
- **스켈레톤 및 에러 처리**
  - 로딩 중에는 `WeatherSkeleton` 표시.
  - API 에러 시 에러 메시지를 담은 카드 렌더링.
  - 데이터 자체가 없을 경우 “해당 장소의 정보가 제공되지 않습니다.” 문구 표시.
  - 상세페이지는 replace를 통해서 브라우저 히스토리를 남기지 않아
  - 뒤로가기시에 바로 홈으로 이동할 수 있도록 구현.

#### 3. 검색 기능

- **검색 단어 매칭**
  - `koreaDistricts.json` + `hangul-js`를 사용해 시/구/동 검색을 구현.
  - 공백으로 구분된 여러 토큰을 모두 포함하는 지역만 필터링합니다.
  - 강ㄴ 과 같은 조합 중에도 검색을 지원합니다.
- **자동완성 리스트**
  - 검색어와 매칭되는 상위 5개의 행정구역을 정렬하여 띄워주고,  
    마우스 hover/키보드 ↑↓로 활성 인덱스를 변경, Enter로 선택 가능합니다.

#### 4. 즐겨찾기

- **추가/삭제**
  - 홈/상세 페이지에서 현재 보고 있는 위치를 카드 우측상단 별표를 통해 즐겨찾기에 추가/삭제 가능.
  - 데이터는 `localStorage("weatherApp-favorites")`에 저장됩니다.
- **최대 6개 제한**
  - `useFavorite`에서 `favorites.length >= 6`일 경우 추가를 막고  
    “즐겨찾기는 최대 6개까지 등록할 수 있습니다.” 스낵바를 표시합니다.
- **별칭 수정**
  - 즐겨찾기 카드 우측의 편집 버튼으로 별칭 인라인 수정 가능.
  - Enter / 포커스 아웃 시 저장, Esc 취소 처리.
- **카드 내용**
  - 각 카드에는
    - 별칭
    - 주소
    - 현재 기온
    - 당일 최저/최고 기온
    - 날씨 캐릭터(강수 형태/온도에 따라 변하는 Canvas)
  - 을 보여줍니다.
- **상세 페이지 이동**
  - 즐겨찾기 카드를 클릭하면 해당 주소의 상세 페이지로 이동하고,  
    상세 페이지에서 요구된 모든 날씨 정보를 다시 조회해 표시합니다.
- **리스트에서 삭제**
  - 리스트에서 삭제시 모달에 알림을 띄워 한번 확인을 거칩니다.

#### 5. 날씨 캐릭터 & 파티클

- **캐릭터 상태**
  - 온도에 따라 **기본/추운/더운 캐릭터**가 달라집니다.
    - 추운 날: 귀마개, 떨림 강도 증가, 눈 찌끄러짐
    - 보통 날: 비니 착용
    - 더운 날: 땀 이펙트
    - 공통: 눈 깜빡임, 좌우 스윙 이펙트
- **파티클 효과**
  - 강수 타입(비/눈/없음)에 따라
    - 비: 세로로 떨어지는 파티클
    - 눈: 천천히 떨어지는 파티클
    - 맑음: 음악 노트 파티클
  - 을 캐릭터 뒤 배경에 표시합니다.

#### 6. 날씨 모드 토글

- 우측 상단 별표 아래의 버튼들로 날씨 모드를 변경 할 수 있습니다.
  - **날씨 변경**
    - 좌측부터 맑음, 비, 눈의 배경 상태를 확인할 수 있습니다.
  - **온도 변경**
    - 좌측부터 더움, 중간, 추움의 캐릭터 상태를 확인할 수 있습니다.

#### 7. 에러 페이지 & 404

- **라우트 에러 페이지 (`RouterError`)**
  - React Router의 에러 상태를 활용해 router 단에서 확인할 수 있는 에러를 방지합니다.
- **전역 ErrorBoundary (`Error.tsx`)**
  - `react-error-boundary` 기반 에러 페이지를 구현해,  
    Layout 내부 주요 섹션에서 치명적인 예외 발생 시  
    “문제가 발생했어요 / 페이지 새로 고침” UI로 graceful degrade 합니다.
- **NotFound 페이지**
  - 존재하지 않는 경로에(/:address/:id 등) 접근 시 404 NotFound 화면을 표시하고 “홈으로 돌아가기” 버튼을 제공합니다.

---

### 기술적 의사결정 및 이유

#### 1. FSD(Feature-Sliced Design) 아키텍처

- 구조를 `app / page / widgets / feature / entity / shared` 로 분리했습니다.
- 이유:
  - **관심사의 분리**: 라우팅/프로바이더 등 기본 구성(app), 화면 구성(page), 재사용 가능한 복합 UI(widgets), 도메인 기능(feature), 데이터/모델(entity), 공용(shared)을 분리.
  - **확장성**: 날씨, 위치, 즐겨찾기, 캐릭터 도메인이 늘어나도 각 레이어 내에서만 변경 가능.
  - **테스트/리팩터링 용이성**: entity/feature 레이어를 UI와 독립적으로 다룰 수 있음.

#### 2. React Query(TanStack Query) 활용

- `useGetWeatherQuery`, `useGetAddressQuery`, `useGetGeoQuery` 등으로 서버 상태를 관리.
- 이유:
  - **캐싱 + 재시도 + 로딩/에러 상태 자동 관리**로 날씨 API/카카오 API 호출 패턴을 단순화.
  - `enabled`, `placeholderData` 등을 활용해
    - 불필요한 재요청을 줄이고,
    - 즐겨찾기·상세 페이지 이동 시 UX를 자연스럽게 유지.
    - 특히 주소 검색 => 날씨 검색을 enable로 자연스럽게 연결함.

#### 3. Kakao API 인스턴스 분리

- `shared/api/instance.ts`에서
  - `kakaoAddressApiInstance`, `kakaoGeoApiInstance`를 별도 인스턴스로 분리하고  
    공통 Auth 인터셉터를 사용.
- 이유:
  - 주소검색(`v2/local/search/address`)과 좌표→주소(`coord2address`)의 baseURL/파라미터가 서로 달라
    **목적별 인스턴스 분리가 가독성과 유지보수에 유리**함.

#### 4. 검색 UX – koreaDistricts + Hangul-js + Debounce

- `koreaDistricts.json` + `hangul-js`를 사용해 시/구/동 검색을 구현.
- `useSearchBarLocation`에서 debounced 상태를 관리하고,  
  초성·중성 분해 후 포함 여부를 검사.
- 이유:
  - 과제 요구사항(시/구/동 자유 검색 + 제공된 JSON 사용)을 만족하면서,
  - 한글 입력 특성(조합 중인 글자, 초성 검색 등)을 자연스럽게 지원하기 위함.

#### 5. 즐겨찾기: localStorage + entity/feature 분리

- `entity/favorite`에서 localStorage 접근, API 스타일의 CRUD(`addFavorite`, `removeFavorite`, `updateFavorite`, `isFavorite`)를 제공.
- `feature/favorite/useFavorite`에서 이를 래핑해 React state + 스낵바 + 6개 제한을 관리.
- 이유:
  - storage 접근 로직을 entity에 숨기고,
  - 비즈니스 규칙(최대 6개, 메시지 표기, 상태 동기화)은 feature에서 담당하도록  
    **책임을 계층별로 명확히 나누기 위해서**.

#### 6. 캐릭터 & 파티클

- `entity/character`에서 캐릭터 생성 로직(`createCharacterCommon/Cold/Warm`), 눈/귀/머리/액세서리 세팅, 색상 팔레트를 정의.
- `entity/particle`에서 비/눈/노트 파티클 생성/업데이트를 분리.
- `widgets/character/useGetCharacter` + `CharacterCanvas`에서 이를 합쳐  
  날씨 상태(강수 타입/온도)에 따라 다른 연출을 하는 위젯으로 사용.
- 이유:
  - 3D 로직을 UI에서 분리해 **재사용성과 테스트 가능성**을 높이고,
  - 캐릭터 표현 방식을 바꾸더라도 widget 레벨에서만 교체 가능하게 하기 위해서.
  - 3d 기술을 사용하는게 당사에 적합할 것이라 판단.

#### 7. Error Handling 전략

- 라우트 에러는 React Router의 `errorElement`로,  
  렌더링/로직 에러는 `react-error-boundary` 기반 Error 페이지로 처리.

---

### 사용 기술 스택

- **프론트엔드**
  - React (Functional Components)
  - TypeScript
  - Vite

- **상태 관리 / 데이터 fetching**
  - TanStack Query (React Query)

- **스타일링**
  - Tailwind CSS
  - radix UI 컴포넌트 (`Button`, `Card`, `Input`, `Skeleton`, `Modal`, `ConfirmModal` 등)

- **지도/주소/날씨**
  - Kakao Local API (주소 검색, 좌표 → 주소 변환)
  - 기상청(환경 변수로 baseURL/KEY만 주입)

- **유틸리티**
  - `hangul-js` (한글 초성/중성 분해 검색)
  - `@minus-ui/core`의 `Snackbar` (알림 메시지)
  - `react-error-boundary` (에러 바운더리)
  - `threejs` (3D 캐릭터 및 파티클 렌더링)

- **아키텍처**
  - Feature-Sliced Design (FSD)
  - `app / page / widgets / feature / entity / shared` 레이어링
